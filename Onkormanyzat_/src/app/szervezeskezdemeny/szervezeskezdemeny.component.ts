import { Component } from '@angular/core';
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
export class SzervezeskezdemenyComponent {
  szervezesModel = new SzervezesAdatok()
  private user: ProfilAdatok | null = null;
  private subscription:Subscription[]|null=null

  constructor(private szervezesService:SzervezesService, private auth: AuthService){

  }

  getUserInfo(){
    this.subscription?.push(this.auth.getUser().subscribe(
      (res: any) => this.user = res
    ));
  }
  inputForm() {
    if (this.user != null) {
      this.szervezesModel.userId = this.user.userId;
      this.szervezesService.postService(this.szervezesModel);
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
