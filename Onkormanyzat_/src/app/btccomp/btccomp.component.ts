import { Component } from '@angular/core';
import { BarnaTestCuccosaService } from '../barna-test-cuccosa.service';

@Component({
  selector: 'app-btccomp',
  templateUrl: './btccomp.component.html',
  styleUrls: ['./btccomp.component.css']
})
export class BTCCompComponent {

  username:any
  ize:{"ize":"ize"}={"ize":"ize"}

  constructor(private testS:BarnaTestCuccosaService){

  }

  postMakeAdmin(){
    this.testS.postMakeAdmin(this.username)
  }
  postHello(){
    this.testS.postHello(this.ize)
  }
  getHello(){
    this.testS.getHello()
  }



}
