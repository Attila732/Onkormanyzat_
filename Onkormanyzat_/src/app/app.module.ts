import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { EladoTermekComponent } from './elado-termek/elado-termek.component';
import { OrvosEgyebUgyekComponent } from './orvos-egyeb-ugyek/orvos-egyeb-ugyek.component';
import { OrvosIdopontfoglalasComponent } from './orvos-idopont-foglalas/orvos-idopont-foglalas.component';
import { OrvosNyitvatartasComponent } from './orvos-nyitvatartas/orvos-nyitvatartas.component';
import { KozteruletjelentoComponent } from './kozteruletjelento/kozteruletjelento.component';
import { UthibajelentoComponent } from './uthibajelento/uthibajelento.component';
import { VizGazComponent } from './viz-gaz/viz-gaz.component';
import { TuzszabalyokComponent } from './tuzszabalyok/tuzszabalyok.component';
import { LomtalanitasComponent } from './lomtalanitas/lomtalanitas.component';
import { SzemetszallitasComponent } from './szemetszallitas/szemetszallitas.component';
import { JelenteskezeloComponent } from './jelenteskezelo/jelenteskezelo.component';
import { JelenteskezelogombComponent } from './jelenteskezelogomb/jelenteskezelogomb.component';
import { SzervezesComponent } from './szervezes/szervezes.component';
import { SzervezeskezdemenyComponent } from './szervezeskezdemeny/szervezeskezdemeny.component';
import { ProfilComponent } from './profil/profil.component';
import { BTCCompComponent } from './btccomp/btccomp.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    NavComponent,
    EladoTermekComponent,
    OrvosEgyebUgyekComponent,
    OrvosIdopontfoglalasComponent,
    OrvosNyitvatartasComponent,
    KozteruletjelentoComponent,
    LomtalanitasComponent,
    SzemetszallitasComponent,
    TuzszabalyokComponent,
    UthibajelentoComponent,
    VizGazComponent,
    SzervezesComponent,
    SzervezeskezdemenyComponent,
    JelenteskezeloComponent,
    JelenteskezelogombComponent,
    LoginComponent,
    SignUpComponent,
    ProfilComponent,
    BTCCompComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbDropdownModule, 
    NgbNavModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
