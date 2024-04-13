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
  idopontModel = new IdopontAdatok()
  private user: ProfilAdatok | null = null;
  private subscription:Subscription[] =[];
  currentDate: string;

  constructor(private idopontservice:IdopontService, private auth: AuthService){
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
};