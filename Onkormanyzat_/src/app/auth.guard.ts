import { CanActivateFn, UrlTree } from '@angular/router';
import { BaseService } from './base.service';
import { inject } from '@angular/core';
import { ProfilAdatok } from './models/ProfilAdatok';

// lets through authenticated users with roles matching any in the allowedRoles[] 
//IMPORTANT!! Use all capital letters eg: 'USER' 'ADMIN' ORG_ADMIN
export function authGuard(allowedRoles:string[]): CanActivateFn{return (route, state) => {
  const base:BaseService=inject(BaseService)
  let roles:Map<String,boolean>
  let allowed:boolean=false
  base.getUser().subscribe(
    (res:any)=>{
      if (res != null) {
        let user:ProfilAdatok=res 
        roles = (user.roles as Map<String,boolean>)
        console.log(roles)
      } else{
        return new UrlTree()
      }
    }
    )

    allowedRoles.forEach(
      (value)=>{
        // console.log(value)
        if(roles.get(value)){
          // console.log("in if")
          allowed=true
        }
      }
    )
    // console.log("returning allowed: "+allowed)
  return allowed;
}};
