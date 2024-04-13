import { Component } from '@angular/core';
import { IdopontAdatok } from '../models/IdopontAdatok';
import { IdopontService } from '../idopont.service';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { Observable, Subscription, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { AdminAdatok } from '../models/AdminAdatok';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sajat-idopontok',
  templateUrl: './sajat-idopontok.component.html',
  styleUrls: ['./sajat-idopontok.component.css']
})
export class SajatIdopontokComponent {

  idopontModel = new IdopontAdatok()
  private user: ProfilAdatok | null = null;
  private subscription:Subscription[] =[]
  
  idopontok: IdopontAdatok[] = [];
  idopontokOrg: IdopontAdatok[] = [];
  orgs: { id: string; name: string }[] = [];
  userRoles: any;
  admin: boolean = false;
  orgAdmin: boolean = false;
  orgBooleanIdopontok: boolean = false;
  currentOrganization: any;
  
  constructor(private idopontservice:IdopontService, private auth: AuthService){
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
    console.log("form submit User: ", this.user)
    console.log("form submit idopont: ", this.idopontModel)
    if (this.user != null) {
      this.idopontModel['preferredName']=this.idopontModel.name
      this.idopontModel.userId = this.user.userId;
      this.idopontservice.postIdopont(this.idopontModel);
    }
    
  }  
  
  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.forEach(element => {
        element.unsubscribe();        
      });
    }
  }

  getSajatIdopontok() {
    if (this.user != null) { 
      this.subscription.push(
        this.idopontservice.getSajatIdopontok(this.user.userId).subscribe({
          next: (res: any) => {
            this.idopontok = res;
            // this.addBoolErdekel();
          },
        })
      );
    }
    }

  updateSajatIdopont(termek:any){
    this.idopontservice.updateIdopont(termek).subscribe(
      (res:any)=>{console.log(res)}
    );
  }
  
  deleteSajatIdopont(termek:any){
    this.idopontservice.deleteIdopont(termek.userId).subscribe(
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
      this.idopontservice.getSajatIdopontokOrg(this.currentOrganization).subscribe(
        (res:any)=>{this.idopontokOrg = res
          this.orgBooleanIdopontok = true;
        }
      )
    }
  }

  updateOrgIdopont(termek:any){
    this.idopontservice.updateIdopontOrg(termek).subscribe(
      (res:any)=>{console.log(res)}
    );
  }
  
  deleteOrgIdopont(termek:any){
    this.idopontservice.deleteIdopontOrg(termek.userId).subscribe(
      (res:any)=>{console.log("siker")}
    )
  }

  loadOrgsAdatok(pageNum: number, name: string){
    return this.idopontservice.searchName( pageNum, name)
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

};
