import { Component } from '@angular/core';

@Component({
  selector: 'app-elado-termek',
  templateUrl: './elado-termek.component.html',
  styleUrls: ['./elado-termek.component.css']
})
export class EladoTermekComponent {
  userProfile1: any;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.readImage(file);
  }
  readImage(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.userProfile1.profileImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
