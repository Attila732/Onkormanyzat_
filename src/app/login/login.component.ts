import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
userProfile: any;
onFileSelected($event: Event) {
throw new Error('Method not implemented.');
}
  title = 'Onkormanyzat';
  login=new FormGroup({
    userName01:new FormControl(''),
    email01:new FormControl(''),
    password01:new FormControl('')
  });



  signup=new FormGroup({
    userName:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl('')
});
      

  

  

  
  signUp() {
    // console.log(this.signUp.userName, this.signUp.email, this.signUp.password);
    console.log(this.signup.getRawValue());

  }
  logIn(){

    console.log(this.login.getRawValue());
    // console.log(this.login.email01,this.password01);
  }
}
