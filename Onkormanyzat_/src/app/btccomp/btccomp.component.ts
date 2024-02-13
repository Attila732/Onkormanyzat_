import { Component } from '@angular/core';
import { BarnaTestCuccosaService } from '../barna-test-cuccosa.service';

@Component({
  selector: 'app-btccomp',
  templateUrl: './btccomp.component.html',
  styleUrls: ['./btccomp.component.css']
})
export class BTCCompComponent {

  username:any

  constructor(private testS:BarnaTestCuccosaService){

  }

  postMakeAdmin(){
    this.testS.postMakeAdmin(this.username)
  }



}