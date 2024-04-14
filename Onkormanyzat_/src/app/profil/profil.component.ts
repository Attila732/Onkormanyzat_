import { Component, OnInit } from '@angular/core';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { AdminAdatok } from '../models/AdminAdatok';
import { ProfilKezeloServiceService } from '../profil-kezelo-service.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  result:any
  profil = new ProfilAdatok();
  user = {
    email: 'example@email.com',
    nev: 'John Doe',
    telefon: '123-456-7890',
    lakhely: 'Budapest',

  };

  isEditing = false;

  // Hozz létre egy FileUploader példányt
  //uploader: FileUploader = new FileUploader({});

  constructor(profilkezeloService :ProfilKezeloServiceService) { }
ngOnInit(): void {
//     this.profil.getProfil().subscribe((data) => {
//         this.profil = data;
//     });
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
      AdminAdatok
    };
    reader.readAsDataURL(file);
  }
}
