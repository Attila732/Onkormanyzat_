import { Component, ViewChild } from '@angular/core';
import { BarnaTestCuccosaService } from '../barna-test-cuccosa.service';
import { FilePickerDirective } from '../file-picker.directive';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-btccomp',
  templateUrl: './btccomp.component.html',
  styleUrls: ['./btccomp.component.css']
})
export class BTCCompComponent {
  makeAdmin:any
  postHelloRes:any
  getHelloRes:any
  getMyUserInfoRes:any
  getOrgsForUserInfoRes:any
  getImagesRes:any
  username:any
  ize:{"ize":"ize"}={"ize":"ize"}
  files:any=[]

  _displayedColumns = ['name', 'type', 'size', 'lastModified'];


  constructor(private testS:BarnaTestCuccosaService, private image:ImagesService){

  }

  // choseFile(event:Event){
  //   console.log(event)
  // }
  //csak teszteléshez
  preprePostFile(){
    let adatok={id:"2",type:"users"}
    this.prePostFile(adatok,this._selectedFiles)
  }
  // profileAdatok, eladoTermekek vagy más képet is tartalmazó post request
  // szöveges adatait elküldő metódus, ami sikeres válasz esetén küldi a kép(ek)et
  // sikeres válasz tartalma: uploadDetails:{id:string,type:string,multiple:boolean}
  prePostFile(adatok:any, selectedFiles:File[]){
    this.testS.postData(adatok).subscribe({
      next: (res:any) => {
        this.image.postfile(selectedFiles,res)
        console.log(res);
        return res;
      },
      error: (err) => {
        this.postHelloRes = err;
        console.log("Error in post hello ");
        console.log(err);
      }
    })
  }
  //ebben tárolódnak a képek
  _selectedFiles:File[] = [];
  //ez állítja be hogy egy vagy több képet lehet kiválasztani
  _multiple = true;
  
  //references the appFilePicker button
  @ViewChild('buttonPicker', { static: true })
  _buttonPicker!: FilePickerDirective;




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


  postMakeAdmin(){
    this.testS.postMakeAdmin(this.username)
    .subscribe({
      next:(res)=>{
        console.log(res)
        return res
      },
      error:(err)=>{
        console.log("Error in post make-admin ")
        console.log(err)
      }
    })
  }
  postHello(){
    this.testS.postHello(this.ize)
    .subscribe({
      next:(res)=>{
        this.postHelloRes=res
        console.log(res)
        return res
      },
      error:(err)=>{
        this.postHelloRes=err
        console.log("Error in post hello ")
        console.log(err)
      }
    })
  }
  postItemDemo(){
    this.testS.postItemDemo()
    .subscribe({
      next:(res)=>{
        this.postHelloRes=res
        console.log(res)
        return res
      },
      error:(err)=>{
        this.postHelloRes=err
        console.log("Error in post hello ")
        console.log(err)
      }
    })
  }
  getHello(){
    this.testS.getHello()
    .subscribe({
      next:(res)=>{
        this.getHelloRes=res
        console.log(res)
        return res
      },
      error:(err)=>{
        this.getHelloRes=err
        console.log("Error in get ")
        console.log(err)
      }
    })
  }
  delPost(){
    this.testS.delPost()
    .subscribe((res:any)=>console.log(res))
  }
  getMyUserInfo(){
    this.testS.getMyUserInfo()
    .subscribe({
      next:(res:any)=>{
        this.getMyUserInfoRes=res
        console.log(res)
        return res
      },
      error:(err:any)=>{
        this.getMyUserInfoRes=err
        console.log("Error in get ")
        console.log(err)
      }
    })
  }
  getOrgsForUserInfo(){
    this.testS.getOrgsForUserInfo()
    .subscribe({
      next:(res:any)=>{
        this.getOrgsForUserInfoRes=res
        console.log(res)
        return res
      },
      error:(err:any)=>{
        this.getOrgsForUserInfoRes=err
        console.log("Error in get ")
        console.log(err)
      }
    })
  }
  getImages(){
    this.testS.getImages()
    .subscribe({
      next:(res)=>{
        this.getImagesRes=res
        console.log(res)
        return res
      },
      error:(err)=>{
        this.getImagesRes=err
        console.log("Error in get images")
        console.log(err)
      }
    })
  }
}
