import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AdminAdatok } from './models/AdminAdatok';
import { ProfilAdatok } from './models/ProfilAdatok';

@Injectable({
  providedIn: 'root'
})
export class FelhaszKeresService {

  constructor(private http: HttpClient) { }

  getAdminAdatok(value: string, pageNum: number, category: string) {
    const opt = {
      params: new HttpParams()
        .append("value", value)
        .append("pageNum", pageNum)
        .append("category", category)
    }

    return this.http.get<AdminAdatok[]>("/resource/user/admin/search", opt).pipe(
      map((res:any) => {
        console.log('Successfully got person:', res.content);
        return res.content;
      }),
      catchError((error) => {
        console.error('Error in getPersonByName:', error);
        return throwError(() => error);
      })
    )
  }

  getProfilAdatok(value: string, pageNum: number, category: string):Observable<ProfilAdatok[]>  {
    const opt = {
      params: new HttpParams()
        .append("value", value)
        .append("pageNum", pageNum)
        .append("category", category)
    }

    return this.http.get<ProfilAdatok[]>("/resource/user/admin/search", opt).pipe(
      map((res:any) => {
        console.log('Successfully got person:', res.content);
        return res.content;
      }),
      // catchError((error) => {
      //   console.error('Error in getPersonByName:', error);
      //   return throwError(() => error);
      // })
    )
  }


  updateUser(body:any){
    console.log("ez vagyok",body)
    return this.http.put("resource/user/"+ body.id, body)
  }

  deleteUser(id:any){
    return this.http.delete("resource/user/del/"+ id)
  }


}
  // getPersonByName(name:string): Observable<Array<{id:number;name:string;sex:boolean}>> {
  //   console.log(name)
  //   return this.http.get<{id:number;name:string;sex:boolean}[]>((this.url+"reference/"+name)).pipe(
  //     map((res:{id:number;name:string; sex:boolean}[]) => {
  //       console.log('Successfully got person:', res);
  //       return res;
  //     }),
  //     catchError((error) => {
  //       console.error('Error in getPersonByName:', error);
  //       return throwError(() => error); // Pass a factory function to throwError
  //     })
  //   );
  // }

