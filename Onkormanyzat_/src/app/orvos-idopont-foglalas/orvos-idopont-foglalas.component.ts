import { Component } from '@angular/core';
import { IdopontAdatok } from '../models/IdopontAdatok';
import { IdopontService } from '../idopont.service';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-orvosidopontfoglalas',
  templateUrl: './orvos-idopont-foglalas.component.html',
  styleUrls: ['./orvos-idopont-foglalas.component.css']
})
export class OrvosIdopontfoglalasComponent {
  idopontModel = new IdopontAdatok()
  private user: ProfilAdatok | null = null;
  private subscription:Subscription[] =[]

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
      this.idopontservice.postService(this.idopontModel);
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