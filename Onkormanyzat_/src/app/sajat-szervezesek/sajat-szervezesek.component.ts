import { Component, OnDestroy, OnInit } from '@angular/core';
import { SzervezesAdatok } from '../models/SzervezesAdatok';
import { SzervezesService } from '../szervezes.service';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { AuthService } from '../auth.service';
import { Observable, Subscription, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

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
  currentOrganization: {id: string, name: string}={id:"", name:""}
  
  ujSzervezes = new SzervezesAdatok()
  szervezesek: SzervezesAdatok[] = []
  szervezesOrg: SzervezesAdatok[] = []

  private subscription:Subscription[]= []

  constructor(private szervezesService:SzervezesService, private auth: AuthService){

  }
  ngOnInit(): void {
    this.getUserInfo()
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
      this.ujSzervezes.userId = this.user.userId;
      this.szervezesService.postSzervezes(this.ujSzervezes);
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
    if (this.user != null) { 
      this.subscription.push(
        this.szervezesService.getSajatSzervezesek(this.user.userId).subscribe({
          next: (res: any) => {
            this.szervezesek = res;
            // this.addBoolErdekel();
          },
        })
      );
    }
    }

  updateSajatSzervezes(termek:any){
    this.szervezesService.updateSzervezes(termek).subscribe(
      (res:any)=>{console.log(res)}
    );
  }
  
  deleteSajatSzervezes(termek:any){
    this.szervezesService.deleteSzervezes(termek.userId).subscribe(
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
      this.szervezesService.getSajatSzervezesekOrg(this.currentOrganization.id).subscribe(
        (res:any)=>{this.szervezesOrg = res
          this.orgBooleanSzervezesek = true;
        }
      )
    }
  }

  updateOrgIdopont(termek:any){
    this.szervezesService.updateSzervezesOrg(termek).subscribe(
      (res:any)=>{console.log(res)}
    );
  }
  
  deleteOrgIdopont(termek:any){
    this.szervezesService.deleteSzervezesOrg(termek.userId).subscribe(
      (res:any)=>{console.log("siker")}
    )
  }

  loadOrgsAdatok(value:string, pageNum: number, category: string){
    return this.szervezesService.searchName( value, pageNum, category)
  }

  searchPeople = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((searchTerm) => searchTerm.length >= 2),
      switchMap((searchTerm) => this.loadOrgsAdatok(searchTerm, 0, "name"))
    );


  resultFormatter = (result: {id: string, name: string}) => `${result.name}`;
  inputFormatter = (result: {id: string, name: string}) => `${result.name}`;



  onSelectItem(event: NgbTypeaheadSelectItemEvent<{id: string, name: string}>) {
    event.preventDefault()
    console.log(event.item.name)
    this.currentOrganization=event.item;

  }
}
