import { Component, OnInit } from '@angular/core';
import { ProfilAdatok } from '../models/ProfilAdatok';


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
    profileImage: '' // Hozzáadva: profilkép
  };

  isEditing = false;

  // Hozz létre egy FileUploader példányt
  //uploader: FileUploader = new FileUploader({});

  constructor() { }

  ngOnInit(): void {
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
      this.user.profileImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
