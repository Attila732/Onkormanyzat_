import { Injectable } from '@angular/core';
import { ProfilAdatok } from './models/ProfilAdatok';

@Injectable({
  providedIn: 'root'
})
export class ProfilKezeloServiceService {

  profiladatok:ProfilAdatok= new ProfilAdatok();

  constructor() { }
}
