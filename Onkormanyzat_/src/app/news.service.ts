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

  getOrgsForUser(userId:string,pageNum:number):Observable<{id:string, name:string}[]>{
    const opt = {params: new HttpParams()
      .append("pageNum",pageNum)
      }
    return this.http.get<{id:string, name:string}[]>(this.url+"user/"+userId+"/orgs",opt)
  }
  getNews(value:string,pageNum:number,category:string):Observable<Hir[]>{//value:search param, category: where to search (title, content, type...)
    const opt = {params: new HttpParams()
      .append("value",value)
      .append("pageNum",pageNum)
      .append("category",category)}
    return this.http.get<Hir[]>(this.url+"news/search",opt)
  }
}
