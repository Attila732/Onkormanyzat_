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
import { KozteruletjelentoComponent} from './kozteruletjelento/kozteruletjelento.component';
import { UthibajelentoComponent } from './uthibajelento/uthibajelento.component';
import { LomtalanitasComponent } from './lomtalanitas/lomtalanitas.component';
import { SzemetszallitasComponent } from './szemetszallitas/szemetszallitas.component';
import { VizGazComponent } from './viz-gaz/viz-gaz.component';
import { TuzszabalyokComponent } from './tuzszabalyok/tuzszabalyok.component';
import { ProfilComponent } from './profil/profil.component';



const routes: Routes = [

  {path:"*", component:BodyComponent, pathMatch:'full'},
  {path:"app-nav",component:NavComponent},
  {path:"sign-up", component:LoginComponent},
  {path:"body", component:BodyComponent,},
  {path:"elado-termekek",component:EladoTermekComponent},
  {path:"orvos-egyeb-ugyek",component:OrvosEgyebUgyekComponent},
  {path:"orvos-idopont-foglalas",component:OrvosIdopontfoglalasComponent},
  {path:"orvos-nyitvatartas",component:OrvosNyitvatartasComponent},
  {path:"jelenteskezelo",component:JelenteskezeloComponent},
  {path:"kozteruletjelento",component:KozteruletjelentoComponent},
  {path:"uthibajelento",component:UthibajelentoComponent},
  {path:"viz-gaz",component:VizGazComponent},
  {path:"tuzszabalyok",component:TuzszabalyokComponent},
  {path:"lomtalanitas",component:LomtalanitasComponent},
  {path:"szemetszallitas",component:SzemetszallitasComponent},
  {path:"profil",component:ProfilComponent},


 
//   {path:"karbantartas", component:KarbantartasComponent},
//   {path:"**", component:HomeComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }