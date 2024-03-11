import { Component } from '@angular/core';
import { JelenteskezeloService } from '../jelenteskezelo.service';
import { BejelentesAdatok } from '../models/BejelentesAdatok';
import { BaseService } from '../base.service';
import { ProfilAdatok } from '../models/ProfilAdatok';

@Component({
  selector: 'app-jelenteskezelo',
  templateUrl: './jelenteskezelo.component.html',
  styleUrls: ['./jelenteskezelo.component.css']
})
export class JelenteskezeloComponent {
  bejelentesModel = new BejelentesAdatok
  private user:ProfilAdatok|null=null;

  inputForm() {
    if (this.user != null) {
      this.bejelentesModel.userid=this.user.userId;
      this.jelenteskezeloservice.postService(this.bejelentesModel);
    }

    }

  selectModel(){

    }

    constructor(private jelenteskezeloservice:JelenteskezeloService, private base:BaseService){
    base.getUser().subscribe(
      (res:any)=>this.user=res
    );
    }

    };
