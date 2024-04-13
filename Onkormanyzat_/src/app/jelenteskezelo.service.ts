import { Injectable } from '@angular/core';
import { BejelentesAdatok } from './models/BejelentesAdatok';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JelenteskezeloService {
  jelenetesadatok: BejelentesAdatok = new BejelentesAdatok();

  url = "resource/notice/";

  constructor(private http: HttpClient) {

  }

  postJelentes(body: BejelentesAdatok) {
    console.log("postService ", body)
    this.http.post(this.url+"/new", body).subscribe((res: any) => { console.log("notice submitted ", res) });
  }

  updateJelentes(body: any) {
    return this.http.put(this.url + body.id, body)
  }

  deleteJelentes(id: any) {
    return this.http.delete(this.url + "del/" + id)
  }

  getSajatJelentesek(id: any) {
    return this.http.get(this.url + "sajat/" + id)
  }
}