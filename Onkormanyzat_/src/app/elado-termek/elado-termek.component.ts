import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EladoTermekAdatok } from '../models/EladoTermekAdatok';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { Subscription } from 'rxjs';
import { BaseService } from '../base.service';
import { TermekkezeloService } from '../termekkezelo.service';
import { TermekKepekkel } from '../models/TermekKepekkel';
import { FilePickerDirective } from '../file-picker.directive';
import { ImagesService } from '../images.service';

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
  showSellerInfo: boolean = false;
  // selectedPostUser: any; 
  eladoTermek:EladoTermekAdatok = new EladoTermekAdatok();
  buttonClicked = false;
  // posts: any;
  // form: any;
  // files: File[] = [];
  userRoles:any
  private user: ProfilAdatok | null = null;
  private subscriptions:Subscription[]=[]
  conditions=[
    {key:"new",text:"Új"},
    {key:"newish",text:"Újszerű"},
    {key:"used",text:"Használt"}
  ]
  termekek:TermekKepekkel[] = []
  termekekFree:TermekKepekkel[] = []
  
  constructor(private base: BaseService, private termekService:TermekkezeloService, private ImageS:ImagesService) {
  }
  getUserInfo(){
    this.subscriptions.push(
      this.base.getUser().subscribe(
        (res: any) => this.user = res
    ));
    this.subscriptions.push(
      this.base.getUserRoles().subscribe(
        (roles:Map<String,boolean>)=>this.userRoles=roles
    ))
  }
  setupDataAndSend() {
    if (this.user != null) {
      console.log(this.eladoTermek)
      this.eladoTermek.userId=this.user.userId
      console.log(this.eladoTermek)
      this.termekService.postTermek(this.eladoTermek).subscribe({
        next:(res:any)=>{
          if (this._selectedFiles.length!=0) {
            this.ImageS.postfile(this._selectedFiles,res)
          }
        }
      })
    }
  }
  
  ngOnInit(): void {
    this.getUserInfo()
    this.getTermekek(0,0)
    this.getTermekekFree(0)
  }
  
  getTermekek(pageNum:number, price:number){
    this.subscriptions.push(
      this.termekService.getTermekek(pageNum,price).subscribe({
        next:(res:any)=>{
          this.termekek = res
          this.addBoolErdekel()
        }
      })
      )
    }
    getTermekekFree(pageNum:number){
    this.subscriptions.push(
      this.termekService.getTermekekFree(pageNum).subscribe({
        next:(res:any)=>{
          this.termekekFree = res
        }
      })
    )
  }

  // onFileSelected(event: any) {
  //   this.files.push(event.target.files[0]);
  //   console.log(this.files)
  //   console.log(event)
    
  // }
  
  addBoolErdekel(){

    this.termekek.forEach(element => {
      element['erdekel']=false
    });
    this.termekekFree.forEach(element => {
      element['erdekel']=false
    });


  }

  onSubmit() {
    this.buttonClicked=true;
    
  }
  toggleForm() {
    this.buttonClicked = !this.buttonClicked;
    if (!this.buttonClicked) {
      
      // this.form.reset();
    }

  }
  elrejt() {
    this.buttonClicked = false;
  }
  
  translateCondition(cond:string){
    let value=""
    this.conditions.forEach(element => {
      if (element.key==cond) {
        value= element.text
      }
    });
    return value
  }
  
  
  toggleSellerInfo(item:any) {
    item.erdekel = !item.erdekel;
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub)=>{
      sub.unsubscribe()
    })


  }
  
  
  
      //ebben tárolódnak a képek
      _selectedFiles:File[] = [];
      //ez állítja be hogy egy vagy több képet lehet kiválasztani
      _multiple = true;
      
      //references the appFilePicker button
      @ViewChild('buttonPicker', { static: true })
      _buttonPicker!: FilePickerDirective;
      _displayedColumns = ['name', 'type', 'size', 'lastModified'];
      _onFilesChanged(files: FileList) {
        this._selectedFiles = [];
        for (let i = 0; i < files.length; i++) {
          this._selectedFiles.push(files[i]);
        }
      }
    
      _onReset() {
        this._selectedFiles = [];
      }
    
      _reset() {
        this._buttonPicker.reset();
      }
}
