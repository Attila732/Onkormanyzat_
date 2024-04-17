import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { AdminAdatok } from '../models/AdminAdatok';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { ProfilKezeloServiceService } from '../profil-kezelo-service.service';
import { FelhaszKeresService } from '../felhasz-keres.service';

@Component({
	selector: 'app-profil',
	templateUrl: './profil.component.html',
	styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit, OnDestroy {
	result: any;
	profil = new ProfilAdatok();
	// user = {
	// };
	private user: ProfilAdatok | null = null;

	isEditing = true;
	subscription: Subscription[] = [];
	isDisabled: boolean=true;

	// Hozz létre egy FileUploader példányt
	//uploader: FileUploader = new FileUploader({});

	constructor(
		private profilkez: ProfilKezeloServiceService,
		private auth: AuthService,
		private felhaszkeres: FelhaszKeresService
	) {}
	enableEdit() {
		this.isDisabled = false;
	  }
	ngOnDestroy(): void {
    this.subscription.forEach(element => {
      element.unsubscribe();
      
    });
	
	}
  getprofil(){
	if (this.user != null) {
		
		this.subscription.push(
			this.profilkez.getProfilRequest(this.user.userId).subscribe((res:any)=>{
				console.log("getprofil res: ",res)
				this.profil=res;
			})
		)
	}
  }
  updateUser(user:any) {
	this.felhaszkeres.updateUser(user).subscribe((res: any) => {
		console.log(res);
	});
}
	ngOnInit(): void {
		this.getUserInfo();
	}
	getUserInfo() {
		this.subscription.push(
			this.auth.getUser().subscribe((res: any) => {
				this.user = res;
        this.getprofil();
			})
		); 

	}

	toggleEditing() {
		this.isEditing = !this.isEditing;
	}

	saveChanges() {
		// Add logic to save changes to the backend or perform any other necessary actions
		this.isEditing = false;
	}

	// Fájl kiválasztás eseménykezelője
	onFileSelected(event: any) {
		const file: File = event.target.files[0];
		this.readImage(file);
	}

	// Fájl beolvasása és átalakítása base64 kódra
	readImage(file: File) {
		const reader = new FileReader();
		reader.onloadend = () => {
			AdminAdatok;
		};
		reader.readAsDataURL(file);
	}
}
