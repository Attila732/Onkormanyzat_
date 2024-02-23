import { Injectable } from '@angular/core';
import { IdopontAdatok } from './models/IdopontAdatok';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdopontService {
  idopontadatok:IdopontAdatok= new IdopontAdatok();

  url = "http://localhost:4200";

  constructor(private http:HttpClient){

  }

  postService(body:IdopontAdatok){
    this.http.post(this.url, body).subscribe();
}
}