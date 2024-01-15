import { Component } from '@angular/core';

@Component({
  selector: 'app-jelenteskezelo',
  templateUrl: './jelenteskezelo.component.html',
  styleUrls: ['./jelenteskezelo.component.css']
})
export class JelenteskezeloComponent {
  submitForm() {
    throw new Error('Method not implemented.');
    }
      bejelentes = {
        tipus: '',
        nev: '',
        telefonszam: '',
        datum: '',
      }
    };
