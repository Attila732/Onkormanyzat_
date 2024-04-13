import { Injectable } from '@angular/core';
import { IdopontAdatok } from './models/IdopontAdatok';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class IdopontService {
	idopontadatok: IdopontAdatok = new IdopontAdatok();

	userResUrl = "/resource/user/reservation/";
	orgResUrl = "/resource/org/reservation/";
	orgUrl = "/resource/org/search/category/part"

	constructor(private http: HttpClient) {}

	postIdopont(body: IdopontAdatok) {
		return this.http.post(this.userResUrl + "new/", body)
	}

	updateIdopont(body: any) {
		return this.http.put(this.userResUrl + body.id, body)
	}

	deleteIdopont(id: any) {
		return this.http.delete(this.userResUrl + "del/" + id)
	}

	getSajatIdopontok(id: any) {
		return this.http.get(this.userResUrl + "sajat/" + id)
	}

	updateIdopontOrg(body: any) {
		return this.http.put(this.orgResUrl + body.id, body)
	}

	deleteIdopontOrg(id: any) {
		return this.http.delete(this.orgResUrl + "del/" + id)
	}

	getSajatIdopontokOrg(id: any) {
		return this.http.get(this.orgResUrl + "sajat/" + id)
	}

	searchName(pageNum: number, name: string) {
		const opt = {
			params: new HttpParams()
				.append("pageNum", pageNum)
				.append("name", name)
		}
		return this.http.get("/resource/org/search/name", opt).pipe(
			map((res: any) => {
				console.log('Successfully got org:', res);
				return res;
			}),
			catchError((error) => {
				console.error('Error in getorgByName:', error);
				return throwError(() => error);
			})
		)
	}

	getOrvosok(pageNum: number) {
		const opt = {
			params: new HttpParams()
				.append("pageNum", pageNum)
				.append("category", "DOCTOR")
		}
		return this.http.get(this.orgUrl, opt).pipe(
			map((res: any) => {
				console.log('Successfully got orvosok:', res);
				return res;
			}),
			catchError((error) => {
				console.error('Error in getOrvosok:', error);
				return throwError(() => error);
			})
		)

	}


}