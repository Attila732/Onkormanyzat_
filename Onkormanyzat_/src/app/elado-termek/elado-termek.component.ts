import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-your-component',
  templateUrl: './elado-termek.component.html',
  styleUrls: ['./elado-termek.component.css'],
  animations:[
    // trigger('itemAnim',[
    //   transition('void=> *', [
    //     style({
    //       height:0,
    //       opacity:0,
    //       transform:'scale(0,85)',
    //       'margin-bottom':0,

    //       paddingTop:0,
    //       paddingBottom:0,
    //       paddingRight:0,
    //       paddingLeft:0
    //     }),
    //     animate('50ms',style({
    //       height:'*',
    //       'margin-bottom': '*',
    //       paddingTop: '*',
    //       paddingBottom: '*',
    //       paddingRight: '*',
    //       paddingLeft: '*'
    //     })),
    //     animate(68)
    //   ])

    // ])
  ]
})
export class EladoTermekComponent  implements OnInit {


buttonClicked=false;
posts: any;
form: any;
files:File[]=[];
interestPost(_t20: any) {
throw new Error('Method not implemented.');
}
likePost(_t20: any) {
throw new Error('Method not implemented.');
}
  //TODO:actually use it...
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
    this.files.push(event.target.files[0]);
    console.log(this.files)
    console.log(event)
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
