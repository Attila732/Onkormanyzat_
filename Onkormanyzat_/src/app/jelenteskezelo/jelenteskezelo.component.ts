import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { JelenteskezeloService } from '../jelenteskezelo.service';
import { BejelentesAdatok } from '../models/BejelentesAdatok';
import { ProfilAdatok } from '../models/ProfilAdatok';

@Component({
  selector: 'app-jelenteskezelo',
  templateUrl: './jelenteskezelo.component.html',
  styleUrls: ['./jelenteskezelo.component.css']
})
export class JelenteskezeloComponent implements OnDestroy{
  bejelentesModel = new BejelentesAdatok( )
  private user: ProfilAdatok | null = null;
  private subscription:Subscription[]=[]
  currentDateTime: string = this.getCurrentDateTime();


  constructor(private jelenteskezeloservice: JelenteskezeloService, private auth: AuthService) {
    this.getUserInfo()
    const now = new Date();
  }
  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
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
      this.jelenteskezeloservice.postJelentes(this.bejelentesModel).subscribe(
        (res: any) => { 
          console.log("notice submitted ", res) 
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
};
