import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReturnUserRoles } from './models/ReturnUserRoles';
import { ProfilAdatok } from './models/ProfilAdatok';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  returnUserRoles:ReturnUserRoles = new ReturnUserRoles()

  constructor(private http:HttpClient) { }

  getUserRoles(profilAdatok:ProfilAdatok[]){
    let returnUserRoles: ReturnUserRoles[] = []
    profilAdatok.forEach(person => {
      let ret = new ReturnUserRoles()
      ret.userId = person.userId
      ret.userName = person.userName
      returnUserRoles.push(ret)
    });
    return this.http.post("/resource/user/admin/userRoles",returnUserRoles)
  }

  updateUserRoles(profilAdatok:ProfilAdatok, roles: Map<String,boolean>){
    let ret = new ReturnUserRoles()
    ret.userId = profilAdatok.userId
    ret.userName = profilAdatok.userName
    ret.roles = []
    if (roles.get("ADMIN")) {
    ret.roles.push("ADMIN")
    }
    if (roles.get("ORG_ADMIN")) {
    ret.roles.push("ORG_ADMIN")
    }

    return this.http.put("/resource/user/admin/setRolesTo",ret)
  }


}
