import { Component } from '@angular/core';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import {
	Observable,
	debounceTime,
	distinctUntilChanged,
	filter,
	switchMap
} from 'rxjs';
import { FelhaszKeresService } from '../felhasz-keres.service';
import { ImagesService } from '../images.service';
import { AdminAdatok } from '../models/AdminAdatok';
import { ProfiladatokCategory } from '../models/Enums';
import { ProfilAdatok } from '../models/ProfilAdatok';

@Component({
	selector: 'app-felhaszkezeles',
	templateUrl: './felhaszkezeles.component.html',
	styleUrls: ['./felhaszkezeles.component.css'],
})
export class FelhaszkezelesComponent {
	felhasznalok:ProfilAdatok[]=[]
	id: number = 0;
	selectedId: number | null = null;
	col: { key: string; text: string; type: string; min: number; category:ProfiladatokCategory } = {
		key: 'id',
		text: 'Id',
		type: 'text',
		min: 1,
		category:ProfiladatokCategory.ID
		
		
	};
	columns: Array<{ key: string; text: string; type: string; min: number; category:ProfiladatokCategory }> = [
		{ key: 'id', text: 'Id', type: 'text', min: 1, category:ProfiladatokCategory.ID },
		{ key: 'email', text: 'Email', type: 'text', min: 1, category:ProfiladatokCategory.EMAIL },
		{ key: 'userName', text: 'Felhasználónév', type: 'text', min: 1, category:ProfiladatokCategory.USERNAME },
		{ key: 'firstName', text: 'Keresztnév', type: 'text', min: 1, category:ProfiladatokCategory.FIRSTNAME },
		{ key: 'lastName', text: 'Vezetéknév', type: 'text', min: 1, category:ProfiladatokCategory.LASTNAME },
		{ key: 'phone', text: 'Telefon', type: 'text', min: 1, category:ProfiladatokCategory.PHONE },
	];
	category = 'firstName';
	adminAdatok = new AdminAdatok();
	profilAdatok = new ProfilAdatok();
	// profiladatok: AdminAdatok[] = [];
	// adminadatok: ProfilAdatok[] = [];

	constructor(
		private felhaszkeres: FelhaszKeresService,
		private images: ImagesService
	) {}
	showAllElements: boolean = false;

	toggleElementsVisibility() {
	  this.showAllElements = !this.showAllElements;
	}

	ngOnInit() {}

	searchPeople = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			filter((searchTerm) => searchTerm.length >= this.col.min),
			// switchMap((searchTerm) =>
			// 	this.loadAdminAdatok(searchTerm, 0, this.col.category)
			// ),
			switchMap((searchTerm) =>
				this.loadProfilAdatok(searchTerm, 0, this.col.category)
			)
	);

	translateCurrentCategory(category: ProfiladatokCategory) {
		switch (category) {
		  case ProfiladatokCategory.ID:
			return this.columns.find((o) => o.category == ProfiladatokCategory.ID)!.key
		  case ProfiladatokCategory.FIRSTNAME:
			return this.columns.find((o) => o.category == ProfiladatokCategory.FIRSTNAME)!.key
			return "firstName"
	
		  case ProfiladatokCategory.LASTNAME:
			return this.columns.find((o) => o.category == ProfiladatokCategory.LASTNAME)!.key
			return "lastName"
	
		  case ProfiladatokCategory.USERNAME:
			return this.columns.find((o) => o.category == ProfiladatokCategory.USERNAME)!.key
			return "userName"
	
		  case ProfiladatokCategory.EMAIL:
			return this.columns.find((o) => o.category == ProfiladatokCategory.EMAIL)!.key
			return "email"
	
		  case ProfiladatokCategory.PHONE:
			return this.columns.find((o) => o.category == ProfiladatokCategory.PHONE)!.key
			return "phone"
	
		}
	  }
	

	  
	resultFormatter = (result: AdminAdatok) => `${result[this.category]}  ${result[this.col.key]}`;
	inputFormatter = (result: AdminAdatok) => `${result[this.category]}  ${result[this.col.key]}`;

	onSelectItem(event: NgbTypeaheadSelectItemEvent<AdminAdatok>) {
		event.preventDefault();
		console.log("event.item",event.item);
		this.adminAdatok = event.item;
	}

	loadAdminAdatok(value: string, pageNum: number, category: string) {
		return this.felhaszkeres.getAdminAdatok(value, pageNum, category);
	}
	loadProfilAdatok(value: string, pageNum: number, category: string) {

		let result = this.felhaszkeres.getProfilAdatok(value, pageNum, category);
		result.subscribe(
		(res)=>this.felhasznalok = res
		)
		
		return result
	}

	setCol(col: any) {
		console.log("ez a col"+col.key)
		this.col = col;
		console.log(col)
	}

	updateUser(user:any) {
		this.felhaszkeres.updateUser(user).subscribe((res: any) => {
			console.log(res);
		});
	}

	deleteUser(user:any) {
		console.log("ez voltam én",user)
		this.felhaszkeres
			.deleteUser(user.id)
			.subscribe((res: any) => {
				console.log('siker');
			});
	}
}
