import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EladoTermekAdatok } from '../models/EladoTermekAdatok';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { Subscription } from 'rxjs';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-your-component',
  templateUrl: './elado-termek.component.html',
  styleUrls: ['./elado-termek.component.css'],
  animations: [
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
export class EladoTermekComponent implements OnInit, OnDestroy {
  eladoTermek = new EladoTermekAdatok();
  buttonClicked = false;
  posts: any;
  form: any;
  files: File[] = [];
  userRoles:any
  private user: ProfilAdatok | null = null;
  private subscriptions:Subscription[]=[]

  constructor(private base: BaseService) {
    this.getUserInfo()
  }
  getUserInfo(){
    this.subscriptions.push(this.base.getUser().subscribe(
      (res: any) => this.user = res
    ));
    this.subscriptions.push(
      this.base.getUserRoles().subscribe(
        (roles:Map<String,boolean>)=>this.userRoles=roles
        ))
  }
  setupDataToSend() {
    if (this.user != null) {
      this.eladoTermek.userId=this.user.userId
    }
    
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
  
  
  
  showUserInfo: boolean = false;
  selectedPostUser: any; 
  
  toggleUserInfo() {
    this.showUserInfo = !this.showUserInfo;
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((val)=>{
      val.unsubscribe()
    })


  }
  
  
}
