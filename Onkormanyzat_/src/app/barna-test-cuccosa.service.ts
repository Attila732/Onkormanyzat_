import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarnaTestCuccosaService {
  private urlUser="http://localhost:8081/user/"
  private urlRes="http://localhost:8081/resource/"

  constructor(private http:HttpClient) { }
  postMakeAdmin(username:any){
    return this.http.post(this.urlUser+"make-admin",username)
    
  }
  postHello(ize:any){
    return this.http.post(this.urlRes+"hello",ize)
    
  }
  postFile(file:any){
    // var httpOptions={headers: new HttpHeaders({"Content-Type":"image/png"})}
    return this.http.post(this.urlRes+"img",file)
    
  }
  getHello(){
    return this.http.get(this.urlRes+"hello")
  }
}
