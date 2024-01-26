import { Injectable } from '@angular/core';
import { ProfilAdatok } from './ProfilAdatok';

@Injectable({
  providedIn: 'root'
})
export class ProfilKezeloServiceService {

  profiladatok:ProfilAdatok= new ProfilAdatok();

  constructor() { }
}
