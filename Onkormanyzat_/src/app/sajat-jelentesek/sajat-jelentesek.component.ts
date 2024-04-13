import { Component, OnDestroy, OnInit } from '@angular/core';
import { JelenteskezeloService } from '../jelenteskezelo.service';
import { BejelentesAdatok } from '../models/BejelentesAdatok';
import { AuthService } from '../auth.service';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { Observable, Subscription, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sajat-jelentesek',
  templateUrl: './sajat-jelentesek.component.html',
  styleUrls: ['./sajat-jelentesek.component.css']
})
export class SajatJelentesekComponent implements OnInit, OnDestroy{
  
  private user: ProfilAdatok | null = null;
  private userRoles: any;

  admin: boolean = false;
  orgAdmin: boolean = false;
  orgBooleanJelentesek: boolean = false;
  
  orgs: { id: string; name: string }[] = [];
  currentOrganization: {id: string, name: string}={id:"", name:""};
  
  ujBejelentes = new BejelentesAdatok()
  
  jelentesek: BejelentesAdatok[] = [];
  jelentesekOrg: BejelentesAdatok[] = [];
  private subscription:Subscription[]=[]

  constructor(private jelenteskezeloservice: JelenteskezeloService, private auth: AuthService) {}


  ngOnInit(): void {
    this.getUserInfo()
  }


  getUserInfo() {
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
    console.log("input submit User: ",this.user)
    if (this.user != null) {
      this.ujBejelentes.userId = this.user.userId;
      console.log(this.ujBejelentes)
      this.jelenteskezeloservice.postJelentes(this.ujBejelentes).subscribe(
        (res: any) => { 
          console.log("notice submitted ", res) 
        });
    }
    
  }
  
  getSajatJelentes() {
    if (this.user != null) { 
      this.subscription.push(
        this.jelenteskezeloservice.getSajatJelentesek(this.user.userId).subscribe({
          next: (res: any) => {
            this.jelentesek = res;
            // this.addBoolErdekel();
          },
        })
      );
    }
    }

  updateSajatJelentes(jelentes:any){
    this.jelenteskezeloservice.updateJelentes(jelentes).subscribe(
      (res:any)=>{console.log(res)}
    );
  }
  
  deleteSajatJelentes(jelentes:any){
    this.jelenteskezeloservice.deleteJelentes(jelentes.userId).subscribe(
      (res:any)=>{console.log("siker")}
    )
  }


  orgAdminKeres(){
    this.orgAdmin = !this.orgAdmin
  }

  adminKeres(){
    this.admin = !this.admin
  }
  

  orgRequest(){
    if (this.currentOrganization != null) {
      this.jelenteskezeloservice.getSajatJelentesekOrg(this.currentOrganization.id).subscribe(
        (res:any)=>{
          console.log(res)
          this.jelentesekOrg = res
          this.orgBooleanJelentesek = true;
        }
      )
    }
  }

  updateOrgIdopont(jelentes:any){
    this.jelenteskezeloservice.updateJelentesOrg(jelentes).subscribe(
      (res:any)=>{console.log(res)}
    );
  }
  
  deleteOrgIdopont(jelentes:any){
    this.jelenteskezeloservice.deleteJelentesOrg(jelentes.userId).subscribe(
      (res:any)=>{console.log("siker")}
    )
  }
  
  loadOrgsAdatok(pageNum: number, name: string){
    return this.jelenteskezeloservice.searchName( pageNum, name)
  }
  
  searchPeople = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((searchTerm) => searchTerm.length >= 3),
      switchMap((searchTerm) => this.loadOrgsAdatok(0, searchTerm))
    );

    
    resultFormatter = (result: {id: string, name: string}) => `${result.name}`;
    inputFormatter = (result: {id: string, name: string}) => `${result.name}`;
    
    
    
  onSelectItem(event: NgbTypeaheadSelectItemEvent<{id: string, name: string}>) {
    event.preventDefault()
    console.log(event.item.name)
    this.currentOrganization=event.item;

  }
  
  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.forEach(element => {
        element.unsubscribe();        
      });
    }
  }
}
