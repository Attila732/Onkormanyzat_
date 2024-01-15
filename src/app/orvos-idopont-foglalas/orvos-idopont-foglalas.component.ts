import { Component } from '@angular/core';

@Component({
  selector: 'app-orvosidopontfoglalas',
  templateUrl: './orvos-idopont-foglalas.component.html',
  styleUrls: ['./orvos-idopont-foglalas.component.css']
})
export class OrvosIdopontfoglalasComponent {
submitForm() {
throw new Error('Method not implemented.');
}
  idopont = {
    nev: '',
    email: '',
    telefonszam: '',
    datum: '',
    ido: '',
  }
};