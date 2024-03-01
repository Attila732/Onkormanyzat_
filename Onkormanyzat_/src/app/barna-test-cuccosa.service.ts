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
    return this.http.post(this.urlRes+"img",file)
  }
  postData(data:any){
    return this.http.post(this.urlRes+"data",data)
  }
  getHello(){
    return this.http.get(this.urlRes+"hello")
  }
  getImages(){
    return this.http.get(this.urlRes+"img")
  }
}
