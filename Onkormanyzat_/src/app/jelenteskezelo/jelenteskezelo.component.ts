import { Component } from '@angular/core';
import { JelenteskezeloService } from '../jelenteskezelo.service';
import { BejelentesAdatok } from '../BejelentesAdatok';

@Component({
  selector: 'app-jelenteskezelo',
  templateUrl: './jelenteskezelo.component.html',
  styleUrls: ['./jelenteskezelo.component.css']
})
export class JelenteskezeloComponent {
  bejelentesModel = new BejelentesAdatok
  inputForm() {
    this.jelenteskezeloservice.postService(this.bejelentesModel);
    }
  selectModel(){

    }

    constructor(private jelenteskezeloservice:JelenteskezeloService){

    }

    };
