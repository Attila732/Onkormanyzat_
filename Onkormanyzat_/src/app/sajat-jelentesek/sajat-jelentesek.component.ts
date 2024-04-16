import { Component, OnDestroy, OnInit } from '@angular/core';
import { JelenteskezeloService } from '../jelenteskezelo.service';
import { BejelentesAdatok } from '../models/BejelentesAdatok';
import { AuthService } from '../auth.service';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { Observable, Subscription, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { NoticeTypes, ProfiladatokCategory } from '../models/Enums';
import { AdminAdatok } from '../models/AdminAdatok';
import { FelhaszKeresService } from '../felhasz-keres.service';
import { getLocaleMonthNames } from '@angular/common';

@Component({
  selector: 'app-sajat-jelentesek',
  templateUrl: './sajat-jelentesek.component.html',
  styleUrls: ['./sajat-jelentesek.component.css']
})
export class SajatJelentesekComponent implements OnInit, OnDestroy{
  
  private user: ProfilAdatok | null = null;
  userRoles: any;

  admin: boolean = false;
  orgAdmin: boolean = false;
  orgBooleanJelentesek: boolean = false;
  felhasznalok:ProfilAdatok[]=[]
  orgs: { id: string; name: string }[] = [];
  currentOrganization: {id: string, name: string}={id:"", name:""};
  currentUser:AdminAdatok=new AdminAdatok();
  ujBejelentes = new BejelentesAdatok()
  category = 'firstName';
	adminAdatok = new AdminAdatok();
	profilAdatok = new ProfilAdatok();

  jelentesek: BejelentesAdatok[] = [];
  jelentesekOrg: BejelentesAdatok[] = [];
  private subscription:Subscription[]=[]


  constructor(private jelenteskezeloService: JelenteskezeloService, private auth: AuthService ,private felhaszkeres: FelhaszKeresService,) {}


  NOTICES = [
    { text: 'Közterület', category: NoticeTypes.KOZTERULET },
    { text: 'Lomtalanítás', category: NoticeTypes.LOMTALANITAS },
    { text: 'Szemétszállítás', category: NoticeTypes.SZEMETSZALLITAS },
    { text: 'Úthiba', category: NoticeTypes.UTHIBA },
    { text: 'Víz-gáz', category: NoticeTypes.VIZGAZ },

  ];
  col: { key: string; text: string; type: string; min: number; category:ProfiladatokCategory } = {
		key: 'id',
		text: 'Id',
		type: 'text',
		min: 1,
		category:ProfiladatokCategory.ID
		
		
	};

	columns: Array<{ key: string; text: string; type: string; min: number; category:ProfiladatokCategory }> = [
		{ key: 'id', text: 'Id', type: 'text', min: 1, category:ProfiladatokCategory.ID },
		{ key: 'email', text: 'Email', type: 'text', min: 1, category:ProfiladatokCategory.EMAIL },
		{ key: 'userName', text: 'Felhasználónév', type: 'text', min: 1, category:ProfiladatokCategory.USERNAME },
		{ key: 'firstName', text: 'Keresztnév', type: 'text', min: 1, category:ProfiladatokCategory.FIRSTNAME },
		{ key: 'lastName', text: 'Vezetéknév', type: 'text', min: 1, category:ProfiladatokCategory.LASTNAME },
		{ key: 'phone', text: 'Telefon', type: 'text', min: 1, category:ProfiladatokCategory.PHONE },
	];
  jelentesekColumns: Array<{ key: string; text: string; type: string; }> = [
		{ key: 'userId', text: 'FelhasználóID', type: 'text' },
    { key: 'noticeId', text: 'Id', type: 'text' },
		{ key: 'type', text: 'típus', type: 'text'},
		{ key: 'urgency', text: 'Súlyosság', type: 'text' },
		{ key: 'description', text: 'Leírás', type: 'text'},
		{ key: 'location', text: 'Helyszín', type: 'text'},
    { key: 'phone', text: 'Telefonszám', type: 'text'},
    { key: 'date', text: 'Dátum', type: 'text'},
	];

  ngOnInit(): void {
    this.getUserInfo()
  }


  getUserInfo() {
    this.subscription.push(
      this.auth.getUser().subscribe((res: any) => {
        this.user = res;
        this.currentUser=res;
        this.getJelentesek(this.currentUser);
        this.subscription.push(
          this.auth.getUserRoles().subscribe((roles: Map<String, boolean>) => {
            this.userRoles = roles;

            if (this.user != null && this.userRoles.get('ORG_ADMIN')) {
              this.subscription.push(
                this.auth.getOrgsForUser(this.user.userId, 0).subscribe({
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

lekeres(){
  this.getJelentesek(this.currentUser)
}

  getJelentesek(user:any) {
    if (user != null) { 
      this.subscription.push(
        this.jelenteskezeloService.getSajatJelentesek(user.id).subscribe({
          next: (res: any) => {
            this.jelentesek = res;
            // this.addBoolErdekel();
          },
        })
      );
    }
    }

  updateSajatJelentes(jelentes:any){
    this.jelenteskezeloService.updateJelentes(jelentes).subscribe(
      (res:any)=>{console.log(res)}
    );
  }
  
  deleteSajatJelentes(jelentes:any){

    console.log("delete:jelentés",jelentes)
    this.jelenteskezeloService.deleteJelentes(jelentes.noticeId).subscribe(
      (res:any)=>{console.log("delete:",res)}
    
    )
  }



  orgAdminKeres(){
    this.orgAdmin = !this.orgAdmin
  }

  adminKeres(){
    this.admin = !this.admin
  }
  

  searchPeople = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			filter((searchTerm) => searchTerm.length >= this.col.min),
			// switchMap((searchTerm) =>
			// 	this.loadAdminAdatok(searchTerm, 0, this.col.category)
			// ),
			switchMap((searchTerm) =>
				this.loadProfilAdatok(searchTerm, 0, this.col.category)
			)
	);

	translateCurrentCategory(category: ProfiladatokCategory) {
		switch (category) {
		  case ProfiladatokCategory.ID:
			return this.columns.find((o) => o.category == ProfiladatokCategory.ID)!.key
		  case ProfiladatokCategory.FIRSTNAME:
			return this.columns.find((o) => o.category == ProfiladatokCategory.FIRSTNAME)!.key
			return "firstName"
	
		  case ProfiladatokCategory.LASTNAME:
			return this.columns.find((o) => o.category == ProfiladatokCategory.LASTNAME)!.key
			return "lastName"
	
		  case ProfiladatokCategory.USERNAME:
			return this.columns.find((o) => o.category == ProfiladatokCategory.USERNAME)!.key
			return "userName"
	
		  case ProfiladatokCategory.EMAIL:
			return this.columns.find((o) => o.category == ProfiladatokCategory.EMAIL)!.key
			return "email"
	
		  case ProfiladatokCategory.PHONE:
			return this.columns.find((o) => o.category == ProfiladatokCategory.PHONE)!.key
			return "phone"
	
		}
	  }
	

	  
	resultFormatter = (result: AdminAdatok) => `${result[this.category]}  ${result[this.col.key]}`;
	inputFormatter = (result: AdminAdatok) => `${result[this.category]}  ${result[this.col.key]}`;

	onSelectItem(event: NgbTypeaheadSelectItemEvent<AdminAdatok>) {
		event.preventDefault();
		console.log("event.item",event.item);
		this.currentUser = event.item;
    this.adminAdatok= event.item;
	}

	loadAdminAdatok(value: string, pageNum: number, category: string) {
		return this.felhaszkeres.getAdminAdatok(value, pageNum, category);
	}
	loadProfilAdatok(value: string, pageNum: number, category: string) {

		let result = this.felhaszkeres.getProfilAdatok(value, pageNum, category);
		result.subscribe(
		(res)=>this.felhasznalok = res
		)
		
		return result
	}

	setCol(col: any) {
		console.log("ez a col"+col.key)
		this.col = col;
		console.log(col)
	}












  orgRequest(){
    if (this.currentOrganization != null) {
      this.jelenteskezeloService.getSajatJelentesekOrg(this.currentOrganization.id).subscribe(
        (res:any)=>{
          console.log(res)
          this.jelentesekOrg = res
          this.orgBooleanJelentesek = true;
        }
      )
    }
  }


  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.forEach(element => {
        element.unsubscribe();        
      });
    }
  }
}
