import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { IdopontService } from '../idopont.service';
import { IdopontAdatok } from '../models/IdopontAdatok';
import { ProfilAdatok } from '../models/ProfilAdatok';

@Component({
  selector: 'app-orvosidopontfoglalas',
  templateUrl: './orvos-idopont-foglalas.component.html',
  styleUrls: ['./orvos-idopont-foglalas.component.css']
})
export class OrvosIdopontfoglalasComponent {
  showsikerPopup: boolean = false; // A felugró ablak megjelenítésére szolgáló állapotváltozó
  showsikertelenPopup: boolean = false; // A felugró ablak megjelenítésére szolgáló állapotváltozó
  idopontModel = new IdopontAdatok()
  private user: ProfilAdatok | null = null;
  private subscription:Subscription[] =[];
  currentDate: string;
  orvosok:{id: string, name: string}[]=[]


  constructor(private idopontservice:IdopontService, private auth: AuthService){
    this.getUserInfo()
    const now = new Date();
    this.currentDate = now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
    this.getOrvosok()
  }
  showelrejtPopup() {
    this.showsikertelenPopup = false;
    this.showsikerPopup=false
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
      this.idopontservice.postIdopont(this.idopontModel).subscribe(
        (res:any)=>{
          console.log("successful post",res),
          this.showsikerPopup = true;
          
        })
    } error:(err:any)=>this.showsikertelenPopup = true
    
  }  
  getOrvosok(){
    console.log("szeva")
    this.subscription.push(
    this.idopontservice.getOrvosok(0).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.orvosok=res

      },
      error:(err:any)=>console.log("szeva",err)
    }))
  }
  
  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.forEach(element => {
        element.unsubscribe();        
      });
    }
  }
};