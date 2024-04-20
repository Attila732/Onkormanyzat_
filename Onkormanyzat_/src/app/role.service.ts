import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReturnUserRoles } from './models/ReturnUserRoles';
import { ProfilAdatok } from './models/ProfilAdatok';
import { AdminAdatok } from './models/AdminAdatok';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  returnUserRoles:ReturnUserRoles = new ReturnUserRoles()

  constructor(private http:HttpClient) { }

  getUserRoles(profilAdatok:any[]){
    console.log("getUserRoles profiladatok: ",profilAdatok)
    let returnUserRoles: ReturnUserRoles[] = []
    profilAdatok.forEach(person => {
      let ret = new ReturnUserRoles()
      ret.userId = person.id
      ret.userName = person.userName
      returnUserRoles.push(ret)
    });
    console.log("getUserRoles returnUserRoles: ",returnUserRoles)
    return this.http.post("/resource/user/admin/userRoles",returnUserRoles)
  }

  updateUserRoles(profilAdatok:any){
    let ret = new ReturnUserRoles()
    ret.userId = profilAdatok.userId
    ret.userName = profilAdatok.userName
    ret.roles = []
    if (profilAdatok.roles["ADMIN"]) {
    ret.roles.push("ADMIN")
    }
    if (profilAdatok.roles["ORG_ADMIN"]) {
    ret.roles.push("ORG_ADMIN")
    }
    console.log("updateUserRoles ret: ", ret)
    return this.http.put("/resource/user/admin/setRolesTo",ret)
  }


}
