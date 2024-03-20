import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { EladoTermekComponent } from './elado-termek/elado-termek.component';
import { OrvosEgyebUgyekComponent } from './orvos-egyeb-ugyek/orvos-egyeb-ugyek.component';
import { OrvosIdopontfoglalasComponent } from './orvos-idopont-foglalas/orvos-idopont-foglalas.component';
import { OrvosNyitvatartasComponent } from './orvos-nyitvatartas/orvos-nyitvatartas.component';
import { TuzszabalyokComponent } from './tuzszabalyok/tuzszabalyok.component';
import { JelenteskezeloComponent } from './jelenteskezelo/jelenteskezelo.component';
import { JelenteskezelogombComponent } from './jelenteskezelogomb/jelenteskezelogomb.component';
import { SzervezesComponent } from './szervezes/szervezes.component';
import { SzervezeskezdemenyComponent } from './szervezeskezdemeny/szervezeskezdemeny.component';
import { ProfilComponent } from './profil/profil.component';
import { HibaComponent } from './hiba/hiba.component';
import { BTCCompComponent } from './btccomp/btccomp.component';
import { ProfilSzerkesztesComponent } from './profil-szerkesztes/profil-szerkesztes.component';
import { XsrfInterceptor } from './xsrf.interceptor';
import { HeaderComponent } from './header/header.component';
import { FilePickerDirective } from './file-picker.directive';
import { FelhaszkezelesComponent } from './felhaszkezeles/felhaszkezeles.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    NavComponent,
    EladoTermekComponent,
    OrvosEgyebUgyekComponent,
    OrvosIdopontfoglalasComponent,
    OrvosNyitvatartasComponent,
    TuzszabalyokComponent,
    SzervezesComponent,
    SzervezeskezdemenyComponent,
    JelenteskezeloComponent,
    JelenteskezelogombComponent,
    LoginComponent,
    SignUpComponent,
    ProfilComponent,
    HibaComponent,
    BTCCompComponent,
    ProfilSzerkesztesComponent,
    HeaderComponent,
    FilePickerDirective,
    FelhaszkezelesComponent,
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
    HttpClientModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [
    {provide:APP_BASE_HREF, useValue:'/client'},//Adds /client/ to all frontend urls
    { provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor, multi: true } //sets csrf protection header on all mutating requests

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
