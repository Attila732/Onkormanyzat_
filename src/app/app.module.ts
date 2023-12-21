import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BodyComponent } from './body/body.component';
import { KozteruletjelentoComponent } from './kozteruletjelento/kozteruletjelento.component';
import { LoginComponent } from './login/login.component';
import { LomtalanitasComponent } from './lomtalanitas/lomtalanitas.component';
import { NavComponent } from './nav/nav.component';
import { OrvosEgyebUgyekComponent } from './orvos-egyeb-ugyek/orvos-egyeb-ugyek.component';
import { ProfilComponent } from './profil/profil.component';
import { SzemetszallitasComponent } from './szemetszallitas/szemetszallitas.component';
import { TuzszabalyokComponent } from './tuzszabalyok/tuzszabalyok.component';
import { UthibajelentoComponent } from './uthibajelento/uthibajelento.component';
import { VizGazComponent } from './viz-gaz/viz-gaz.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    KozteruletjelentoComponent,
    LoginComponent,
    LomtalanitasComponent,
    NavComponent,
    OrvosEgyebUgyekComponent,
    ProfilComponent,
    SzemetszallitasComponent,
    TuzszabalyokComponent,
    UthibajelentoComponent,
    VizGazComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
