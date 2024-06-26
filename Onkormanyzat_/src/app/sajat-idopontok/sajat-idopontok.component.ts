import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { IdopontService } from '../idopont.service';
import { IdopontAdatok } from '../models/IdopontAdatok';
import { ProfilAdatok } from '../models/ProfilAdatok';

@Component({
	selector: 'app-sajat-idopontok',
	templateUrl: './sajat-idopontok.component.html',
	styleUrls: ['./sajat-idopontok.component.css']
})
export class SajatIdopontokComponent implements OnInit, OnDestroy {

	idopontModel = new IdopontAdatok()
	private user: ProfilAdatok | null = null;
	private subscription: Subscription[] = []
	orvosok: { id: string, name: string }[] = []
	idopontok: IdopontAdatok[] = [];
	idopontokOrg: IdopontAdatok[] = [];
	orgs: { id: string; name: string }[] = [];
	userRoles: any;
	admin: boolean = false;
	orgAdmin: boolean = false;
	orgBooleanIdopontok: boolean = false;
	currentOrganization: { id: string, name: string } = { id: "", name: "" };
	currentPerson: ProfilAdatok = new ProfilAdatok();

	constructor(private idopontservice: IdopontService, private auth: AuthService) { }


	ngOnInit(): void {
		this.getUserInfo()
		this.getOrvosok()
	}


	getOrvosok() {
		this.subscription.push(
			this.idopontservice.getOrvosok(0).subscribe({
				next: (res: any) => {
					console.log(res)
					this.orvosok = res
				},
				error: (err: any) => console.log(err)
			}))
	}


	getUserInfo() {
		this.subscription.push(
			this.auth.getUser().subscribe((res: any) => {
				this.user = res;
				this.currentPerson = res
				this.subscription.push(
					this.auth.getUserRoles().subscribe((roles: Map<String, boolean>) => {
						this.userRoles = roles;

						if (this.user != null && this.userRoles.get('ORG_ADMIN')) {
							this.subscription.push(
								this.auth.getOrgsForUser(this.currentPerson.userId, 0).subscribe({
									next: (res: any) => {
										this.orgs = res;
									},
								})
							);
						}
					})
				);
			})
		);
	}


	inputForm() {
		if (this.user != null) {
			this.idopontModel['preferredName'] = this.idopontModel.name
			this.idopontModel.userId = this.user.userId;
			console.log("form submit User: ", this.user)
			console.log("form submit idopont: ", this.idopontModel)
			this.idopontservice.postIdopont(this.idopontModel).subscribe(
				(res:any)=>{
					console.log("successful post",res)

			});
		}

	}


	ngOnDestroy(): void {
		if (this.subscription != null) {
			this.subscription.forEach(element => {
				element.unsubscribe();
			});
		}
	}


	getSajatIdopontok(user:any) {
		console.log("getSajatIdopontok user: ", user)
		if (user != null) {
			this.subscription.push(
				this.idopontservice.getSajatIdopontok(user.userId).subscribe({
					next: (res: any) => {
						this.idopontok = res;
						console.log("getSajatIdopontok, idopontok: ", this.idopontok)
					},
				})
			);
		}
	}
	getOrgIdopontok(orgId:string) {
		console.log("getOrgIdopontok orgId: ", orgId)
		if (orgId != null) {
			this.subscription.push(
				this.idopontservice.getSajatIdopontokOrg(orgId).subscribe({
					next: (res: any) => {
						this.idopontokOrg = res;
						console.log("getOrgIdopontok, idopontokOrg: ", this.idopontokOrg)
					},
				})
			);
		}
	}


	updateSajatIdopont(termek: any) {
		this.idopontservice.updateIdopont(termek).subscribe(
			(res: any) => { console.log("updateSajatIdopont", res) }
		);
	}


	deleteSajatIdopont(termek: any) {
		this.idopontservice.deleteIdopont(termek.userId).subscribe(
			(res: any) => { console.log("deleteSajatIdopont siker", res) }
		)
	}


	orgAdminKeres() {
		this.orgAdmin = !this.orgAdmin
	}


	adminKeres() {
		this.admin = !this.admin
	}


	orgRequest() {
		if (this.currentOrganization != null) {
			this.idopontservice.getSajatIdopontokOrg(this.currentOrganization.id).subscribe(
				(res: any) => {
					console.log(res)
					this.idopontokOrg = res
					this.orgBooleanIdopontok = true;
				}
			)
		}
	}


	updateOrgIdopont(idopont: any) {
		this.idopontservice.updateIdopontOrg(idopont).subscribe(
			(res: any) => {
				 console.log(res) 
				this.getSajatIdopontok(this.currentPerson)
			}
		);
	}

	deleteOrgIdopont(idopont: any) {
		this.idopontservice.deleteIdopontOrg(idopont.userId).subscribe(
			(res: any) => { console.log("siker") }
		)
	}

	loadOrgsAdatok(pageNum: number, name: string) {
		return this.idopontservice.searchName(pageNum, name)
	}

	searchPeople = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			filter((searchTerm) => searchTerm.length >= 3),
			switchMap((searchTerm) => this.loadOrgsAdatok(0, searchTerm))
		);


	resultFormatter = (result: { id: string, name: string }) => `${result.name}`;
	inputFormatter = (result: { id: string, name: string }) => `${result.name}`;



	onSelectItem(event: NgbTypeaheadSelectItemEvent<{ id: string, name: string }>) {
		event.preventDefault()
		console.log("event.item.name",event.item.name)
		console.log("event.item",event.item)
		this.currentOrganization = event.item;
		this.getOrgIdopontok(this.currentOrganization.id)
	}

};