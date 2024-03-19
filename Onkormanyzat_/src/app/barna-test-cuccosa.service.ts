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
  postItemDemo(){
    return this.http.get(this.urlRes+"items/demo")
    
  }
  // postFile(file:any){
  //   return this.http.post(this.urlRes+"img",file)
  // }
  getHello(){
    return this.http.get(this.urlRes+"hello")
  }
  delPost(){
    return this.http.delete(this.urlRes+"post/del/"+1)
  }
  getMyUserInfo(){
    return this.http.get(this.urlRes+"user/myUserInfo")
  }
  getOrgsForUserInfo(){
    return this.http.get(this.urlRes+"orgIds/4")
  }
  getImages(){
    return this.http.get(this.urlRes+"img")
  }
  postData(data:any){
    return this.http.post(this.urlRes+"data",data)
  }
}
