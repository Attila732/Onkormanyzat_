// import { Component } from '@angular/core';
// import { FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-elado-termek',
//   templateUrl: './elado-termek.component.html',
//   styleUrls: ['./elado-termek.component.css']
// })
// export class EladoTermekComponent {
// onSubmit() {
// throw new Error('Method not implemented.');
// }
//   userProfile1: any;

//   onFileSelected(event: any) {
//     const file: File = event.target.files[0];
//     this.readImage(file);
//   }
//   readImage(file: File) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       this.userProfile1.profileImage = reader.result as string;
//     };
//     reader.readAsDataURL(file);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-your-component',
  templateUrl: './elado-termek.component.html',
  styleUrls: ['./elado-termek.component.css']
})
export class EladoTermekComponent  implements OnInit {
  myForm: FormGroup | undefined;
  userProfile1 = { profileImage: null, textboxValue: '' };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      profileImage: [null], // Use 'null' as the initial value for the image
      textboxValue: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Convert the selected file to a base64 data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        this.userProfile1.profileImage = reader.result as any;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
   
  }
}
