import { Component, ViewChild } from '@angular/core';
import { BarnaTestCuccosaService } from '../barna-test-cuccosa.service';
import { FilePickerDirective } from '../file-picker.directive';

@Component({
  selector: 'app-btccomp',
  templateUrl: './btccomp.component.html',
  styleUrls: ['./btccomp.component.css']
})
export class BTCCompComponent {
  makeAdmin:any
  postHelloRes:any
  getHelloRes:any
  username:any
  ize:{"ize":"ize"}={"ize":"ize"}
  files:any=[]

  _displayedColumns = ['name', 'type', 'size', 'lastModified'];


  constructor(private testS:BarnaTestCuccosaService){

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
  
  postfile() {
    console.log(this._selectedFiles)
    // console.log(this.files[0].name)
    // console.log(this.files[0])
    const formData = new FormData();
    for (let i = 0; i < this._selectedFiles.length; i++) {
      // console.log(this.files[i])
      formData.append('images', this._selectedFiles[i]);
    }
    console.log(formData)
    this.testS.postFile(formData).subscribe({
      next: (res) => {
        this.postHelloRes = res;
        console.log(res);
        return res;
      },
      error: (err) => {
        this.postHelloRes = err;
        console.log("Error in post hello ");
        console.log(err);
      }
    });
  }
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
