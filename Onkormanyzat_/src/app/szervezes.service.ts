import { Injectable } from '@angular/core';
import { SzervezesAdatok } from './models/SzervezesAdatok';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SzervezesService {
  szervezesadatok:SzervezesAdatok= new SzervezesAdatok();

  url = "resource/event/";

  constructor(private http:HttpClient){

  }

  postSzervezes(body:SzervezesAdatok){
    this.http.post(this.url+"new/", body).subscribe();
  };

  updateSzervezes(body: any) {
    return this.http.put("*" + body.id, body)
  }

  deleteSzervezes(id: any) {
    return this.http.delete(this.url + "del/" + id)
  }

  getSajatSzervezesek(id: any) {
    return this.http.get(this.url + "sajat/" + id)
  }
}
