import { Component, OnDestroy } from '@angular/core';
import { JelenteskezeloService } from '../jelenteskezelo.service';
import { BejelentesAdatok } from '../models/BejelentesAdatok';
import { BaseService } from '../base.service';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jelenteskezelo',
  templateUrl: './jelenteskezelo.component.html',
  styleUrls: ['./jelenteskezelo.component.css']
})
export class JelenteskezeloComponent implements OnDestroy{
  bejelentesModel = new BejelentesAdatok
  private user: ProfilAdatok | null = null;
  private subscription:Subscription[]|null=null

  constructor(private jelenteskezeloservice: JelenteskezeloService, private base: BaseService) {
    this.getUserInfo()
  }
  getUserInfo(){
    this.subscription?.push(this.base.getUser().subscribe(
      (res: any) => this.user = res
    ));
  }
  inputForm() {
    if (this.user != null) {
      this.bejelentesModel.userId = this.user.userId;
      this.jelenteskezeloservice.postService(this.bejelentesModel);
    }
    
  }
  
  selectModel() {
    
  }
  
  
  
  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.forEach(element => {
        element.unsubscribe();        
      });
    }
  }
};
