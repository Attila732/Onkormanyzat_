import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Bejelentkezes } from '../models/Bejelentkezes';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	userProfile: any;
	bejelentkezes = new Bejelentkezes();
	result: any;
	showsikerPopup: boolean = false; // A felugró ablak megjelenítésére szolgáló állapotváltozó
	showsikertelenPopup: boolean = false; // A felugró ablak megjelenítésére szolgáló állapotváltozó

	onFileSelected($event: Event) {
		throw new Error('Method not implemented.');
	}
	title = 'Onkormanyzat';
	login = new FormGroup({
		userName01: new FormControl(''),
		email01: new FormControl(''),
		password01: new FormControl(''),
	});

	signup = new FormGroup({
		userName: new FormControl(''),
		email: new FormControl(''),
		password: new FormControl(''),
	});

	signUp() {
		// console.log(this.signUp.userName, this.signUp.email, this.signUp.password);
		console.log(this.signup.getRawValue());
	}
	logIn() {
		console.log();
		console.log(this.login.getRawValue());
		this.userProfile.get('/resource/user', this.bejelentkezes).subscribe({
			next: (res: any) => {
				console.log('posted', res);
				(this.result = res), (this.showsikerPopup = true);
			},
			error: (err: any) => (this.showsikertelenPopup = true),
		});
	}
  showelrejtPopup() {
    this.showsikertelenPopup = false;
    this.showsikerPopup=false
}
}
