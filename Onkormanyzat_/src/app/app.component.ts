import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Onkormanyzat';

	constructor(private router: Router, private auth: AuthService) { }

	ngOnInit(): void {
		// this.auth.navigateToRequestedUrlIfExists()

	}



}
