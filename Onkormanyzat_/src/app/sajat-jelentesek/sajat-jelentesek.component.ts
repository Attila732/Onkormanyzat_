import { Component, OnDestroy } from '@angular/core';
import { JelenteskezeloService } from '../jelenteskezelo.service';
import { BejelentesAdatok } from '../models/BejelentesAdatok';
import { AuthService } from '../auth.service';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sajat-jelentesek',
  templateUrl: './sajat-jelentesek.component.html',
  styleUrls: ['./sajat-jelentesek.component.css']
})
export class SajatJelentesekComponent implements OnDestroy{

  bejelentesModel = new BejelentesAdatok()
  private user: ProfilAdatok | null = null;
  private subscription:Subscription[]=[]

  jelentesek: BejelentesAdatok[] = [];

  constructor(private jelenteskezeloservice: JelenteskezeloService, private auth: AuthService) {
    this.getUserInfo()
  }
  getUserInfo(){
    this.subscription.push(this.auth.getUser().subscribe(
      (res: any) => this.user = res
    ));
  }
  inputForm() {
    console.log("input submit User: ",this.user)
    if (this.user != null) {
      this.bejelentesModel.userId = this.user.userId;
      console.log(this.bejelentesModel)
      this.jelenteskezeloservice.postJelentes(this.bejelentesModel);
    }
    
  }
  
  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.forEach(element => {
        element.unsubscribe();        
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

  updateSajatJelentes(termek:any){
    this.jelenteskezeloservice.updateJelentes(termek).subscribe(
      (res:any)=>{console.log(res)}
    );
  }
  
  deleteSajatJelentes(termek:any){
    this.jelenteskezeloservice.deleteJelentes(termek.userId).subscribe(
      (res:any)=>{console.log("siker")}
    )
  }

}
