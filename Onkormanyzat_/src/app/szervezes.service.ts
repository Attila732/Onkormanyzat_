import { Injectable } from '@angular/core';
import { SzervezesAdatok } from './models/SzervezesAdatok';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SzervezesService {
  szervezesadatok:SzervezesAdatok= new SzervezesAdatok();

  url = "resource/event/new/";

  constructor(private http:HttpClient){

  }

  postService(body:SzervezesAdatok){
    this.http.post(this.url, body).subscribe();
  };
}
