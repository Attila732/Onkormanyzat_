import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-your-component',
  templateUrl: './elado-termek.component.html',
  styleUrls: ['./elado-termek.component.css']
})
export class EladoTermekComponent  implements OnInit {


buttonClicked=false;
posts: any;
form: any;
interestPost(_t20: any) {
throw new Error('Method not implemented.');
}
likePost(_t20: any) {
throw new Error('Method not implemented.');
}
  myForm: FormGroup | undefined;
  userProfile1 = { profileImage: null, textboxValue: '' };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      profileImage: [null], 
      textboxValue: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
     
      const reader = new FileReader();
      reader.onloadend = () => {
        this.userProfile1.profileImage = reader.result as any;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.buttonClicked=true;
   
  }
  toggleForm() {
    this.buttonClicked = !this.buttonClicked;
    if (!this.buttonClicked) {
    
      this.form.reset();
    }
    
  }
  elrejt() {
    this.buttonClicked = false;
   
    }
}
