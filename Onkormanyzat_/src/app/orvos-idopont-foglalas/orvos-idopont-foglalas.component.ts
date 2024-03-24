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
  private subscription:Subscription[]|null=null

  constructor(private idopontservice:IdopontService, private auth: AuthService){

  }

  getUserInfo(){
    this.subscription?.push(this.auth.getUser().subscribe(
      (res: any) => this.user = res
    ));
  }
  inputForm() {
    if (this.user != null) {
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