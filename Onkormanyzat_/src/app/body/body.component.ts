import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  userProfile1: any;
  AdminText: any;
admin: any;
  
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

  userText: string = '';
  displayedText: string = '';

  writeText() {
    this.displayedText = this.userText;
  }
}
