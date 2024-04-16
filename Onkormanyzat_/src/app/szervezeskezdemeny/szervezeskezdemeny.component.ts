import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { SzervezesAdatok } from '../models/SzervezesAdatok';
import { SzervezesService } from '../szervezes.service';

@Component({
  selector: 'app-szervezeskezdemeny',
  templateUrl: './szervezeskezdemeny.component.html',
  styleUrls: ['./szervezeskezdemeny.component.css']
})
export class SzervezeskezdemenyComponent implements OnInit, OnDestroy{
  szervezesModel = new SzervezesAdatok()
  private user: ProfilAdatok | null = null;
  private subscription:Subscription[]=[]
	currentOrganization: { id: string, name: string } = { id: "", name: "" };
orgs: { id: string; name: string }[] = [];
userRoles: any;

  constructor(private szervezesService:SzervezesService, private auth: AuthService){
    
  }
  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo(){
    this.subscription.push(
      this.auth.getUser().subscribe(
      (res: any) => {this.user = res
        if (this.user != null && this.user.roles.get('ORG_ADMIN')) {
          this.subscription.push(
            this.auth.getOrgsForUser(this.user.userId, 0).subscribe({
              next: (res: any) => {
                this.orgs = res;
              },
            })
          );
        }
      }
        
      
    ));
  }
  inputForm() {
    console.log("outside inputForm",this.user)
    
    if (this.user != null) {
      console.log("inside inputForm",this.user)
      console.log("inside inputForm",this.szervezesModel)
      this.szervezesModel.userId = this.user.userId;
      console.log(this.currentOrganization,"helloka")
      this.szervezesModel.orgId=this.currentOrganization.id;
      this.szervezesService.postSzervezes(this.szervezesModel)
      .subscribe({
        next: (res) => {
          console.log("szervezés: ",res);
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
