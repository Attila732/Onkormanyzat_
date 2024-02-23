import { Component } from '@angular/core';
import { IdopontAdatok } from '../models/IdopontAdatok';
import { IdopontService } from '../idopont.service';

@Component({
  selector: 'app-orvosidopontfoglalas',
  templateUrl: './orvos-idopont-foglalas.component.html',
  styleUrls: ['./orvos-idopont-foglalas.component.css']
})
export class OrvosIdopontfoglalasComponent {
  idopontModel = new IdopontAdatok()
  inputForm() {
    this.idopontservice.postService(this.idopontModel);
  }

  constructor(private idopontservice:IdopontService){

  }
};