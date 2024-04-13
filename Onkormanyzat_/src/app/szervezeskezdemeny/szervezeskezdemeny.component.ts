import { Component, OnDestroy, OnInit } from '@angular/core';
import { SzervezesAdatok } from '../models/SzervezesAdatok';
import { SzervezesService } from '../szervezes.service';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-szervezeskezdemeny',
  templateUrl: './szervezeskezdemeny.component.html',
  styleUrls: ['./szervezeskezdemeny.component.css']
})
export class SzervezeskezdemenyComponent implements OnInit, OnDestroy{
  szervezesModel = new SzervezesAdatok()
  private user: ProfilAdatok | null = null;
  private subscription:Subscription[]=[]

  constructor(private szervezesService:SzervezesService, private auth: AuthService){
    
  }
  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo(){
    this.subscription.push(
      this.auth.getUser().subscribe(
      (res: any) => this.user = res
    ));
  }
  inputForm() {
    console.log("outside inputForm",this.user)
    if (this.user != null) {
      console.log("inside inputForm",this.user)
      console.log("inside inputForm",this.szervezesModel)
      this.szervezesModel.userId = this.user.userId;
      this.szervezesService.postSzervezes(this.szervezesModel)
      .subscribe({
        next: (res) => {
          console.log("images post res: ",res);
          return res;
        },
        error: (err) => {
          console.log("Error in post hello ");
          console.log(err);
        }
      });
    }
    
  }  
  
  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.forEach(element => {
        element.unsubscribe();        
      });
    }
  }

}
