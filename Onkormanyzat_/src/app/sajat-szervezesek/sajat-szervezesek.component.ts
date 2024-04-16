import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { JelenteskezeloService } from '../jelenteskezelo.service';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { SzervezesAdatok } from '../models/SzervezesAdatok';
import { SzervezesService } from '../szervezes.service';

@Component({
  selector: 'app-sajat-szervezesek',
  templateUrl: './sajat-szervezesek.component.html',
  styleUrls: ['./sajat-szervezesek.component.css']
})
export class SajatSzervezesekComponent implements OnInit, OnDestroy{
  private user: ProfilAdatok | null = null
  userRoles: any;
  
  admin: boolean = false;
  orgAdmin: boolean = false;
  orgBooleanSzervezesek: boolean = false;
  
  orgs: { id: string; name: string }[] = []
  currentOrganization: {    [x: string]: any, id: string, name: string}={id:"", name:""}
  columns=[
    { key: 'id', text: 'Id', type: 'text' },
    { key: 'name', text: 'Név', type: 'text' },

  ]
  ujSzervezes = new SzervezesAdatok()
  szervezesek: SzervezesAdatok[] = []
  szervezesOrg: SzervezesAdatok[] = []
  category = 'firstName';
  private subscription:Subscription[]= []

  // EVENTS = [
  //   { text: 'Közterület', category: NoticeTypes.KOZTERULET },
  //   { text: 'Lomtalanítás', category: NoticeTypes.LOMTALANITAS },
  //   { text: 'Szemétszállítás', category: NoticeTypes.SZEMETSZALLITAS },
  //   { text: 'Úthiba', category: NoticeTypes.UTHIBA },
  //   { text: 'Víz-gáz', category: EventsTypes. },

  // ];
  szervezesekColumns: Array<{ key: string; text: string; type: string; }> = [
		{ key: 'userId', text: 'FelhasználóID', type: 'text' },
    { key: 'noticeId', text: 'Id', type: 'text' },
		{ key: 'type', text: 'típus', type: 'text'},
		{ key: 'urgency', text: 'Súlyosság', type: 'text' },
		{ key: 'description', text: 'Leírás', type: 'text'},
		{ key: 'location', text: 'Helyszín', type: 'text'},
    { key: 'phone', text: 'Telefonszám', type: 'text'},
    { key: 'date', text: 'Dátum', type: 'text'},
	];



  constructor(private szervezesService:SzervezesService, private auth: AuthService,private jelentesKezeloService:JelenteskezeloService){

  }
  ngOnInit(): void {
    this.getUserInfo()
  }
	setCol(col: any) {
    
    this.currentOrganization.id = col.key;
    console.log("ez a col",col.key)
		console.log(this.currentOrganization)
	}

  getUserInfo(){
    this.subscription.push(
      this.auth.getUser().subscribe((res: any) => {
        this.user = res;
        this.subscription.push(
          this.auth.getUserRoles().subscribe((roles: Map<String, boolean>) => {
            this.userRoles = roles;

            if (this.user != null && this.userRoles.get('ORG_ADMIN')) {
              this.subscription.push(
                this.auth.getOrgsForUser(this.user.userId, 0).subscribe({
                  next: (res: any) => {
                    console.log("getOrgsForUser res: ",res);
                    this.orgs = res;
                    this.currentOrganization = res[0];
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
      this.ujSzervezes.userId = this.user.userId;
      this.szervezesService.postSzervezes(this.ujSzervezes)
      .subscribe(
        (res:any)=>{console.log("siker")}
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
  
  getSajatSzervezes() {
    if (this.currentOrganization != null) { 
      this.subscription.push(
        this.szervezesService.getSajatSzervezesekOrg(this.currentOrganization.id).subscribe({
          next: (res: any) => {
            this.szervezesek = res;
          },
        })
      );
    }
    } 


  orgAdminKeres(){
    this.orgAdmin = !this.orgAdmin
  }

  adminKeres(){
    this.admin = !this.admin
  }

  orgRequest(){
    if (this.currentOrganization != null) {
      console.log("orgRequest currentOrganization: ",this.currentOrganization)
      this.szervezesService.getSajatSzervezesekOrg(this.currentOrganization.id).subscribe(
        (res:any)=>{
          console.log("orgRequest res: ", res)
          this.szervezesOrg = res
          this.orgBooleanSzervezesek = true;
        }
      )
    }
  }

  updateSzervezes(szervezes:any){
    this.szervezesService.updateSzervezes(szervezes).subscribe(
      (res:any)=>{console.log(res)}
    );
  }
  
  deleteSzervezes(szervezes:any){
    this.szervezesService.deleteSzervezes(szervezes.eventId).subscribe(
      (res:any)=>{console.log("siker")}
    )
  }

  loadOrgsAdatok(name:string, pageNum: number){
    return this.jelentesKezeloService.searchName( pageNum,name)
  }

  searchPeople = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((searchTerm) => searchTerm.length >= 2),
      switchMap((searchTerm) => this.loadOrgsAdatok(searchTerm, 0))
    );


  resultFormatter = (result: {id: string, name: string}) => `${result.name}`;
  inputFormatter = (result: {id: string, name: string}) => `${result.name}`;



  onSelectItem(event: NgbTypeaheadSelectItemEvent<{id: string, name: string}>) {
    event.preventDefault()
    console.log("onSelectItem event.item.name: ",event.item.name)
    this.currentOrganization=event.item;

  }
}
