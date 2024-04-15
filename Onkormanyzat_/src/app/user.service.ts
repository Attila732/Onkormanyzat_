import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfilAdatok } from './models/ProfilAdatok';
import { map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private profiladatok: ProfilAdatok = new ProfilAdatok();
	url = '/resource/user/';

	constructor(private http: HttpClient) {}

	getProfilRequest(id:string) {
    return this.http.get(this.url+"id/"+id)
  }

  getUsersByPropertyLike(value:string, pageNum:number, category:string){
    const opt = {
      params: new HttpParams()
        .append("value", value)
        .append("pageNum", pageNum)
        .append("category", category)
      }
      return this.http.get(this.url+"admin/search",opt)
      .pipe(
        map((res:any) => {
          console.log('getUsersByPropertyLike Successfully got users:', res);
          return res.content;
        }),
        catchError((error) => {
          console.error('Error in getUsersByPropertyLike:', error);
          return throwError(() => error);
        })
      )
  }
  searchName(value:string, pageNum:number, category:string){
    const opt = {
      params: new HttpParams()
        .append("value", value)
        .append("pageNum", pageNum)
        .append("category", category)}
    return this.http.get("/resource/event/search", opt)
    .pipe(
      map((res:any) => {
        console.log('Successfully got org:', res);
        return res;
      }),
      catchError((error) => {
        console.error('Error in getorgByName:', error);
        return throwError(() => error);
      })
    )
  }
	
	public setprofiladatok(value: ProfilAdatok) {
		this.profiladatok = value;
	}

  getUserById(id:string){
    return this.http.get(this.url+"id/ex/"+id)
  }
}
