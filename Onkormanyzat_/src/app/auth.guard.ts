import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { ProfilAdatok } from './models/ProfilAdatok';
import { Observable, map } from 'rxjs';

// lets through authenticated users with roles matching any in the allowedRoles[] 
//IMPORTANT!! Use all capital letters eg: 'USER' 'ADMIN' ORG_ADMIN
export function authGuard(allowedRoles: string[]): CanActivateFn {
  return (route, state) => {
    const auth: AuthService = inject(AuthService)
    const router: Router = inject(Router)
    
    console.log("before pipe")
    // auth.getUserRoles().pipe(
    //   map((roles:any)=>{
    //     const allowed = allowedRoles.some(role=>roles.get(role))
    // }),(s):any=>{})
    return auth.getUser().pipe(
      map((res: ProfilAdatok|null) => {
        console.log("in map")
        
        if (res != null && res.userId) {
          console.log("res not null")
          const roles: Map<String, boolean> = (res.roles as Map<String, boolean>);
          
          const allowed = allowedRoles.some(role => roles.get(role));
          if (!allowed) { //the user is authenticated but doesn't have the required roles
            console.log("not allowed before saving url in service and redirecting to /unauthorized")
            auth.setAttemptedUrl(state.url);
            return router.createUrlTree(['/unauthorized']);
          }
          else{ //the user is authenticated and has the needed role
            console.log("all good should proceed with navigation to the requested url")
            return true
          }
        }else{
          // User is not authenticated or does not have the required role
          console.log("not authenticated before setting redirectUrl in localstorage setting to: "+state.url)
          localStorage.setItem('redirectUrl', state.url);
          // return router.createUrlTree(['../oauth2/authorization/myClient'],{relativeTo:null});
          // return router.createUrlTree(['http://localhost:8081/oauth2/authorization/myClient']);
          // router.navigateByUrl('/oauth2/authorization/myClient');
          window.location.href='http://localhost:8081/login'
          // window.location.href='http://localhost:8081/oauth2/authorization/myClient'
          console.log("after navigating to /oauth2/authorization/myClient before returning false")
          return false
        }
      })
    );
  }}
    
    
    
  //   const auth: AuthService = inject(AuthService)
  //   const router: Router = inject(Router)
  //   let roles: Map<String, boolean>
  //   let allowed: boolean = false
  //   let authenticated: boolean = false
  //   auth.getUser().subscribe(
  //     (res: any) => {
  //       if (res != null) {
  //         let user: ProfilAdatok = res
  //         if (user.userId != null && user.userId.length > 0) {
  //           authenticated = true
  //         }
  //         roles = (user.roles as Map<String, boolean>)
  //         console.log(roles)

  //         allowedRoles.forEach(
  //           (value) => {
  //             // console.log(value)
  //             if (roles.get(value)) {
  //               // console.log("in if")
  //               allowed = true
  //             }
  //           }
  //         )
  //       }

  //       if (!allowed && !authenticated) {
  //         localStorage.setItem('redirectUrl', state.url)
  //         return router.createUrlTree(["/oauth2/authorization/myClient"])
  //         // return router.createUrlTree(["http://", "localhost:8081", "/oauth2/authorization/myClient"])
  //       } else if (!allowed && authenticated) {
  //         auth.setAttemptedUrl(state.url)
  //         return router.createUrlTree(["/unauthorized"])
  //       }
  //       return allowed;


  //     }
  //   )
  //   return false
  // }
// };
