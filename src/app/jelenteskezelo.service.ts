import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JelenteskezeloService {
  private _adat: any;
  public get adat(): any {
    return this._adat;
  }
  public set adat(value: any) {
    this._adat = value;
  }

  constructor() { }
}
