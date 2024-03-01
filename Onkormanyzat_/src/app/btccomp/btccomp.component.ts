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
  getImagesRes:any
  username:any
  ize:{"ize":"ize"}={"ize":"ize"}
  files:any=[]

  _displayedColumns = ['name', 'type', 'size', 'lastModified'];


  constructor(private testS:BarnaTestCuccosaService, private image:ImagesService){

  }
  choseFile(event:Event){
    console.log(event)
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
  // postfile(selectedFiles:File[],uploadDetails:{url:string,multiple:boolean}) {
  //   console.log(this._selectedFiles)
  //   if (selectedFiles!=null && ((!uploadDetails.multiple && selectedFiles.length==1) || (uploadDetails.multiple))) {
      
  //     const formData = new FormData();
  //     for (let i = 0; i < selectedFiles.length; i++) {
  //       formData.append('images', selectedFiles[i]);
  //     }
  //     console.log(formData)
  //     this.testS.postFile(formData).subscribe({
  //       next: (res) => {
  //         this.postHelloRes = res;
  //         console.log(res);
  //         return res;
  //       },
  //       error: (err) => {
  //         this.postHelloRes = err;
  //         console.log("Error in post hello ");
  //         console.log(err);
  //       }
  //     });
  //   }
  // }
  _selectedFiles:File[] = [];
  _multiple = true;
  
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

}
