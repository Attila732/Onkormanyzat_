import { APP_BASE_HREF } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
// import { CookieService } from "ngx-cookie-service";

import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { BTCCompComponent } from './btccomp/btccomp.component';
import { EladoTermekComponent } from './elado-termek/elado-termek.component';
import { FelhaszkezelesComponent } from './felhaszkezeles/felhaszkezeles.component';
import { FilePickerDirective } from './file-picker.directive';
import { HibaComponent } from './hiba/hiba.component';
import { JelenteskezeloComponent } from './jelenteskezelo/jelenteskezelo.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { OrvosEgyebUgyekComponent } from './orvos-egyeb-ugyek/orvos-egyeb-ugyek.component';
import { OrvosIdopontfoglalasComponent } from './orvos-idopont-foglalas/orvos-idopont-foglalas.component';
import { OrvosNyitvatartasComponent } from './orvos-nyitvatartas/orvos-nyitvatartas.component';
import { ProfilSzerkesztesComponent } from './profil-szerkesztes/profil-szerkesztes.component';
import { ProfilComponent } from './profil/profil.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SzervezesComponent } from './szervezes/szervezes.component';
import { SzervezeskezdemenyComponent } from './szervezeskezdemeny/szervezeskezdemeny.component';
import { TuzszabalyokComponent } from './tuzszabalyok/tuzszabalyok.component';
import { XsrfInterceptor } from './xsrf.interceptor';
import { SajatTermekekComponent } from './sajat-termekek/sajat-termekek.component';
import { SajatJelentesekComponent } from './sajat-jelentesek/sajat-jelentesek.component';
import { SajatIdopontokComponent } from './sajat-idopontok/sajat-idopontok.component';
import { SajatSzervezesekComponent } from './sajat-szervezesek/sajat-szervezesek.component';
import { OrgAdminComponent } from './org-admin/org-admin.component';

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
		LoginComponent,
		SignUpComponent,
		ProfilComponent,
		HibaComponent,
		BTCCompComponent,
		ProfilSzerkesztesComponent,
		FilePickerDirective,
		FelhaszkezelesComponent,
		SajatTermekekComponent,
		SajatJelentesekComponent,
		SajatIdopontokComponent,
		SajatSzervezesekComponent,
		OrgAdminComponent,
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
		MatTableModule,

	],
	providers: [
		{ provide: APP_BASE_HREF, useValue: '/client' },//Adds /client/ to all frontend urls
		{ provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor, multi: true }, //sets csrf protection header on all mutating requests
		//CookieService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
