import { Component, OnDestroy } from '@angular/core';
import { JelenteskezeloService } from '../jelenteskezelo.service';
import { BejelentesAdatok } from '../models/BejelentesAdatok';
import { AuthService } from '../auth.service';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jelenteskezelo',
  templateUrl: './jelenteskezelo.component.html',
  styleUrls: ['./jelenteskezelo.component.css']
})
export class JelenteskezeloComponent implements OnDestroy{
  bejelentesModel = new BejelentesAdatok()
  private user: ProfilAdatok | null = null;
  private subscription:Subscription[]=[]
  currentDate: string;
  constructor(private jelenteskezeloservice: JelenteskezeloService, private auth: AuthService) {
    this.getUserInfo()
    const now = new Date();
    this.currentDate = now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
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
};
