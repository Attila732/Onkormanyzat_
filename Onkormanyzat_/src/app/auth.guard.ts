import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { ProfilAdatok } from './models/ProfilAdatok';
import { Observable, catchError, map, of } from 'rxjs';

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
    return auth.getAuthGuardUser().pipe(
      (res:any)=>{
        console.log("something",res)
        return res;
      },
      map((rawRes: any) => {
        console.log("in map before cast",rawRes)
        const res:ProfilAdatok = rawRes
        console.log("in map after cast",res)
        var initialRoles = new Map<String, boolean> ([["USER",false],["ADMIN",false],["ORG_ADMIN", false]]);
        
        if (res != null && res.userId) {
          console.log("res not null")
          initialRoles.set("USER",rawRes.roles.includes("ROLE_USER"))
          initialRoles.set("ADMIN",rawRes.roles.includes("ROLE_ADMIN"))
          initialRoles.set("ORG_ADMIN",rawRes.roles.includes("ROLE_ORG_ADMIN"))
          const roles: Map<String, boolean> = (initialRoles as Map<String, boolean>);
          
          const allowed = allowedRoles.some(role => roles.get(role));
          if (!allowed) { //the user is authenticated but doesn't have the required roles
            console.log("not allowed before saving url in service and redirecting to /unauthorized")
            // auth.setAttemptedUrl(state.url);
            return router.createUrlTree(['/unauthorized']);
          }
          else{ //the user is authenticated and has the needed role
            console.log("all good should proceed with navigation to the requested url")
            return true
          }
        }else{
         
          console.log("window.location about to be set to",state.url)
          window.location.href="http://localhost:8081/client"+state.url

          return false
        }
      }),
      catchError((error: any) => {
        // Handle HTTP error here
        console.error("HTTP Error:", error);
        // Redirect to login page
        // return of(router.createUrlTree(['/login']));
        console.log("window.location about to be set to",state.url)
        window.location.href="http://localhost:8081/client"+state.url
        return of(false)
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
