import { Component } from '@angular/core';
import { SzervezesAdatok } from '../models/SzervezesAdatok';
import { SzervezesService } from '../szervezes.service';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sajat-szervezesek',
  templateUrl: './sajat-szervezesek.component.html',
  styleUrls: ['./sajat-szervezesek.component.css']
})
export class SajatSzervezesekComponent {
  szervezesModel = new SzervezesAdatok()
  private user: ProfilAdatok | null = null;
  private subscription:Subscription[]= []

  szervezesek: SzervezesAdatok[] = [];

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
      this.szervezesService.postSzervezes(this.szervezesModel);
    }
    
  }  
  
  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.forEach(element => {
        element.unsubscribe();        
      });
    }
  }  
  
  getSajatJelentes() {
    if (this.user != null) { 
      this.subscription.push(
        this.szervezesService.getSajatSzervezesek(this.user.userId).subscribe({
          next: (res: any) => {
            this.szervezesek = res;
            // this.addBoolErdekel();
          },
        })
      );
    }
    }

  updateSajatSzervezes(termek:any){
    this.szervezesService.updateSzervezes(termek).subscribe(
      (res:any)=>{console.log(res)}
    );
  }
  
  deleteSajatSzervezes(termek:any){
    this.szervezesService.deleteSzervezes(termek.userId).subscribe(
      (res:any)=>{console.log("siker")}
    )
  }
}
