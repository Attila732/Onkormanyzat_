import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hir } from './models/Hir';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  url="/resource/"


  constructor(private http:HttpClient) { }
  
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

  updateNews(body:Hir){
    return this.http.put(this.url+"news/"+body.id,body)
  }

  deleteNews(id:string){
    return this.http.delete(this.url+"news/del/"+id)
  }

  getSajatHirekOrg(id: any) {
		return this.http.get(this.url + "news/org/" + id)
	}
}
