import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { SzervezesAdatok } from './models/SzervezesAdatok';

@Injectable({
  providedIn: 'root'
})
export class SzervezesService {
  szervezesadatok:SzervezesAdatok= new SzervezesAdatok();

  url = "resource/event/";

  constructor(private http:HttpClient){

  }

  postSzervezes(body:SzervezesAdatok){
    return this.http.post(this.url+"new", body)
  };

  updateSzervezes(body: any) {
    return this.http.put(this.url + body.eventId, body)
  }

  
  deleteSzervezes(id: any) {
    return this.http.delete(this.url + "del/" + id)
  }
  
  getSajatSzervezesekOrg(id: any) {
    console.log("getSajatSzervezesekOrg id: ", id)
    return this.http.get(this.url + "sajat/" + id)
  }
  
  searchName(value:string, pageNum:number, category:string){
    const opt = {
      params: new HttpParams()
        .append("value", value)
        .append("pageNum", pageNum)
        .append("category", category)}
    return this.http.get("/resource/event/search", opt).pipe(
      map((res:any) => {
        console.log('Successfully got org:', res.content);
        return res.content;
      }),
      // catchError((error) => {
      //   console.error('Error in getorgByName:', error);
      //   return throwError(() => error);
      // })
    )
  }
}
