import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfilAdatok } from './models/ProfilAdatok';

@Injectable({
	providedIn: 'root',
})
export class ProfilKezeloServiceService {
	private profiladatok: ProfilAdatok = new ProfilAdatok();
	url = '/resource/user/';

	constructor(private http: HttpClient) {}
	getProfilRequest(id:string) {
    return this.http.get(this.url+"id/"+id)
  }
	
	public setprofiladatok(value: ProfilAdatok) {
		this.profiladatok = value;
	}
	//TODO:anything?
}
