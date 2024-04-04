import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hir } from './models/Hir';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  url="/resource/"


  constructor(private http:HttpClient) { }

  getOrgsForUser(userId:string,pageNum:number){
    const opt = {params: new HttpParams()
      .append("pageNum",pageNum)
      }
    return this.http.get(this.url+"user/"+userId+"/orgs",opt)
  }
  getNews(value:string,pageNum:number,category:string){//value:search param, category: where to search (title, content, type...)
    const opt = {params: new HttpParams()
      .append("value",value)
      .append("pageNum",pageNum)
      .append("category",category)}
    return this.http.get(this.url+"news/search",opt)
  }

  postNewNews(body:any){
    return this.http.post(this.url+"news/new",body)
  }
}
