import { Injectable } from '@angular/core';
import { SzervezesAdatok } from './SzervezesAdatok';

@Injectable({
  providedIn: 'root'
})
export class ProgramSzervezesService {
  szervezesadatok:SzervezesAdatok= new SzervezesAdatok();
}