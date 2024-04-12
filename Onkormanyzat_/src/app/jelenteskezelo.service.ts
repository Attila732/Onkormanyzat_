import { Injectable } from '@angular/core';
import { BejelentesAdatok } from './models/BejelentesAdatok';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JelenteskezeloService {
  jelenetesadatok:BejelentesAdatok= new BejelentesAdatok();

  url = "resource/notice/new";

  constructor(private http:HttpClient){

  }

  postService(body:BejelentesAdatok){
    console.log("postService ",body)
    this.http.post(this.url, body).subscribe((res:any)=>{console.log("notice submitted ",res)});
}
}