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
  showsikerPopup: boolean = false; // A felugró ablak megjelenítésére szolgáló állapotváltozó
  showsikertelenPopup: boolean = false; // A felugró ablak megjelenítésére szolgáló állapotváltozó
  currentDateTime: string = this.getCurrentDateTime();


  constructor(private jelenteskezeloservice: JelenteskezeloService, private auth: AuthService) {
    this.getUserInfo()
    const now = new Date();
  }
  redirectToLogin(){
    window.location.href = "/client/"
  }
  showelrejtPopup() {
    this.showsikertelenPopup = false;
    this.showsikerPopup=false
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
      this.jelenteskezeloservice.postJelentes(this.bejelentesModel).subscribe({
        next:(res: any) => { 
          console.log("notice submitted ", res);
          this.showsikerPopup = true;
          
        },
        error:(err:any)=>{
          console.log("nem sikeres küldés")
          this.showsikertelenPopup = true
        }
      })
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
