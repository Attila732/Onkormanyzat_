import { Component } from '@angular/core';
import { SzervezesAdatok } from '../models/SzervezesAdatok';
import { SzervezesService } from '../szervezes.service';

@Component({
  selector: 'app-szervezeskezdemeny',
  templateUrl: './szervezeskezdemeny.component.html',
  styleUrls: ['./szervezeskezdemeny.component.css']
})
export class SzervezeskezdemenyComponent {
  szervezesModel = new SzervezesAdatok()
  inputModel() {
    this.szervezesservice.postService(this.szervezesModel);
    }

    constructor(private szervezesservice:SzervezesService){


    }

}
