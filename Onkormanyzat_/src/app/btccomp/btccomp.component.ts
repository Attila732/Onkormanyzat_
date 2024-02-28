import { Component } from '@angular/core';
import { BarnaTestCuccosaService } from '../barna-test-cuccosa.service';

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
  file:File[]=[]

  constructor(private testS:BarnaTestCuccosaService){

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
  postfile() {
    console.log(this.file[1].name)
    const formData = new FormData();
    for (let i = 0; i < this.file.length; i++) {
      formData.append('images', this.file[i]);
    }
    
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



}
