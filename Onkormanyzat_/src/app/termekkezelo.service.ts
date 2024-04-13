import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EladoTermekAdatok } from './models/EladoTermekAdatok';
import { ImagesService } from './images.service';
import { TermekKepekkel } from './models/TermekKepekkel';

@Injectable({
  providedIn: 'root'
})
export class TermekkezeloService {
  private resUrl = "/resource/"
  private termekek = new BehaviorSubject<EladoTermekAdatok[]|null>(null)
  private termekekFree = new BehaviorSubject<EladoTermekAdatok[]|null>(null)


  constructor(private http:HttpClient) {

  }

public getTermekekFree(pageNum:number){
  const opt = {params: new HttpParams()
      .append("price",0)
      .append("pageNum",pageNum)
      .append("category","lower")}
  return this.http.get(this.resUrl+"items/search/price",opt)
}

public getTermekek(pageNum:number, price:number){
  const opt = {params: new HttpParams()
      .append("price",price)
      .append("pageNum",pageNum)
      .append("category","higher")}
  return this.http.get(this.resUrl+"items/search/price",opt)
}


postTermek(termek:any){
  return this.http.post(this.resUrl+"items/new",termek)
}

updateTermek(body:EladoTermekAdatok){
  return this.http.put(this.resUrl+"items/"+ body.userId, body)
}

deleteTermek(id:any){
  return this.http.delete(this.resUrl+"items/del/"+ id)
}

getSajatTermekek(id:any){
  return this.http.get(this.resUrl+"items/sajat/"+id)
}

}
