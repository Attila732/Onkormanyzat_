import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodyComponent } from './body/body.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { EladoTermekComponent } from './elado-termek/elado-termek.component';
import { OrvosEgyebUgyekComponent } from './orvos-egyeb-ugyek/orvos-egyeb-ugyek.component';
import { OrvosIdopontfoglalasComponent } from './orvos-idopont-foglalas/orvos-idopont-foglalas.component';
import { OrvosNyitvatartasComponent } from './orvos-nyitvatartas/orvos-nyitvatartas.component';
import { JelenteskezeloComponent } from './jelenteskezelo/jelenteskezelo.component';
import { TuzszabalyokComponent } from './tuzszabalyok/tuzszabalyok.component';
import { SzervezesComponent } from './szervezes/szervezes.component';
import { SzervezeskezdemenyComponent } from './szervezeskezdemeny/szervezeskezdemeny.component';
import { ProfilComponent } from './profil/profil.component';
import { HibaComponent } from './hiba/hiba.component';
import { BTCCompComponent } from './btccomp/btccomp.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfilSzerkesztesComponent } from './profil-szerkesztes/profil-szerkesztes.component';
import { FelhaszkezelesComponent } from './felhaszkezeles/felhaszkezeles.component';


const routes: Routes = [

  {path:"", component:BodyComponent, pathMatch:'full'},
  {path:"app-nav",component:NavComponent},
  {path:"barna-test",component:BTCCompComponent},
  {path:"login", component:LoginComponent},
  {path:"sign-up", component:SignUpComponent},
  {path:"body", component:BodyComponent,},
  {path:"elado-termekek",component:EladoTermekComponent},
  {path:"orvos-egyeb-ugyek",component:OrvosEgyebUgyekComponent},
  {path:"orvos-idopont-foglalas",component:OrvosIdopontfoglalasComponent},
  {path:"orvos-nyitvatartas",component:OrvosNyitvatartasComponent},
  {path:"jelenteskezelo",component:JelenteskezeloComponent},
  {path:"tuzszabalyok",component:TuzszabalyokComponent},
  {path:"szervezes",component:SzervezesComponent},
  {path:"szervezeskezd",component:SzervezeskezdemenyComponent},
  {path:"profil",component:ProfilComponent},
  {path:"profilszerkesztes",component:ProfilSzerkesztesComponent},
  {path:"btccomp",component:BTCCompComponent},
  {path:"felhaszkezeles",component:FelhaszkezelesComponent},
  {path:"**",component:HibaComponent}


 
//   {path:"karbantartas", component:KarbantartasComponent},
//   {path:"**", component:HomeComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }