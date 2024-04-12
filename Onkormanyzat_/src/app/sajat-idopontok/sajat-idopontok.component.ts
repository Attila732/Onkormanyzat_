import { Component } from '@angular/core';
import { IdopontAdatok } from '../models/IdopontAdatok';
import { IdopontService } from '../idopont.service';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sajat-idopontok',
  templateUrl: './sajat-idopontok.component.html',
  styleUrls: ['./sajat-idopontok.component.css']
})
export class SajatIdopontokComponent {

  idopontModel = new IdopontAdatok()
  private user: ProfilAdatok | null = null;
  private subscription:Subscription[] =[]

  idopontok: IdopontAdatok[] = []

  constructor(private idopontservice:IdopontService, private auth: AuthService){
    this.getUserInfo()
  }

  getUserInfo(){
    this.subscription.push(this.auth.getUser().subscribe(
      (res: any) => this.user = res
    ));
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

};
