import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { OrvosEgyebUgyekComponent } from './orvos-egyeb-ugyek/orvos-egyeb-ugyek.component';
import { OrvosIdopontfoglalasComponent } from './orvos-idopont-foglalas/orvos-idopont-foglalas.component';
import { OrvosNyitvatartasComponent } from './orvos-nyitvatartas/orvos-nyitvatartas.component';
import { ProfilComponent } from './profil/profil.component';
import { KozteruletjelentoComponent} from './kozteruletjelento/kozteruletjelento.component';
import { UthibajelentoComponent } from './uthibajelento/uthibajelento.component';
import { LomtalanitasComponent } from './lomtalanitas/lomtalanitas.component';
import { SzemetszallitasComponent } from './szemetszallitas/szemetszallitas.component';
import { VizGazComponent } from './viz-gaz/viz-gaz.component';
import { TuzszabalyokComponent } from './tuzszabalyok/tuzszabalyok.component';
import { EladoTermekComponent } from './elado-termek/elado-termek.component';



const routes: Routes = [

  {path:"*", component:BodyComponent, pathMatch:'full'},
  {path:"app-body", component:BodyComponent,},
  {path:"sign-up", component:LoginComponent},  
  {path:"app-nav",component:NavComponent},
  {path:"app-orvos-egyeb-ugyek",component:OrvosEgyebUgyekComponent},
  {path:"app-orvos-idopont-foglalas",component:OrvosIdopontfoglalasComponent},
  {path:"app-orvos-nyitvatartas",component:OrvosNyitvatartasComponent},
  {path:"app-profil",component:ProfilComponent},
  {path:"app-kozteruletjelento",component:KozteruletjelentoComponent},
  {path:"app-uthibajelento",component:UthibajelentoComponent},
  {path:"app-profil",component:ProfilComponent},
  {path:"app-lomtalanitas",component:LomtalanitasComponent},
  {path:"app-szemetszallitas",component:SzemetszallitasComponent},
  {path:"app-viz-gaz",component:VizGazComponent},
  {path:"app-tuzszbalyok",component:TuzszabalyokComponent},
  {path:"app-elado-termek",component:EladoTermekComponent},


 
//   {path:"karbantartas", component:KarbantartasComponent},
//   {path:"**", component:HomeComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }