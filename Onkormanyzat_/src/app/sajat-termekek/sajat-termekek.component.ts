import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { FilePickerDirective } from '../file-picker.directive';
import { ImagesService } from '../images.service';
import { EladoTermekAdatok } from '../models/EladoTermekAdatok';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { TermekKepekkel } from '../models/TermekKepekkel';
import { TermekkezeloService } from '../termekkezelo.service';

@Component({
  selector: 'app-sajat-termekek',
  templateUrl: './sajat-termekek.component.html',
  styleUrls: ['./sajat-termekek.component.css']
})
export class SajatTermekekComponent implements OnInit, OnDestroy {
  showSellerInfo: boolean = false;
  eladoTermek: EladoTermekAdatok = new EladoTermekAdatok();
  buttonClicked = false;
  userRoles: any;
  private user: ProfilAdatok | null = null;
  private subscriptions: Subscription[] = [];
  conditions = [
    { key: 'new', text: 'Új' },
    { key: 'newish', text: 'Újszerű' },
    { key: 'used', text: 'Használt' },
  ];
  termekek: TermekKepekkel[] = [];

  constructor(
    private auth: AuthService,
    private termekService: TermekkezeloService,
    private ImageS: ImagesService
  ) {}
  getUserInfo() {
    this.subscriptions.push(
      this.auth.getUser().subscribe((res: any) => (this.user = res))
    );
    this.subscriptions.push(
      this.auth
        .getUserRoles()
        .subscribe((roles: Map<String, boolean>) => (this.userRoles = roles))
    );
  }
  setupDataAndSend() {
    if (this.user != null) {
      console.log("setupAndSend eladotermekek: ",this.eladoTermek);
      console.log("setupAndSend user: ",this.user);
      this.eladoTermek.userId = this.user.userId;
      console.log(this.eladoTermek);
      this.termekService.postTermek(this.eladoTermek).subscribe({
        next: (res: any) => {
          if (this._selectedFiles.length != 0) {
            console.log("this._selectedFiles.length != 0 images post")
            this.ImageS.postfile(this._selectedFiles, res);
          }
        },
      });
    }
  }

  ngOnInit(): void {
    this.getUserInfo();
    this.getSajatTermekek();
  }

  getSajatTermekek() {
    console.log("getSajatTermekek outside if: ",this.user)
    if (this.user != null) { 
      console.log("getSajatTermekek inside if: ",this.user)

      this.subscriptions.push(
        this.termekService.getSajatTermekek(this.user.userId).subscribe({
          next: (res: any) => {
            console.log("getSajatTermekek res: ",res)
            this.termekek = res;
            // this.addBoolErdekel();
          },
        })
      );
    }
    }
    
  //   addBoolErdekel() {
  //     this.termekek.forEach((element) => {
  //     element['erdekel'] = false;
  //   });
  // }

  onSubmit() {
    this.buttonClicked = true;
  }
  toggleForm() {
    this.buttonClicked = !this.buttonClicked;
    if (!this.buttonClicked) {
      // this.form.reset();
    }
  }
  elrejt() {
    this.buttonClicked = false;
  }

  translateCondition(cond: string) {
    let value = '';
    this.conditions.forEach((element) => {
      if (element.key == cond) {
        value = element.text;
      }
    });
    return value;
  }

  toggleSellerInfo(item: any) {
    item.erdekel = !item.erdekel;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  //ebben tárolódnak a képek
  _selectedFiles: File[] = [];
  //ez állítja be hogy egy vagy több képet lehet kiválasztani
  _multiple = true;

  //references the appFilePicker button
  @ViewChild('buttonPicker', { static: true })
  _buttonPicker!: FilePickerDirective;
  _displayedColumns = ['name', 'type', 'size', 'lastModified'];
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

  updateTermek(termek:any){
    this.termekService.updateTermek(termek).subscribe(
      (res:any)=>{console.log(res)}
    );
  }
  
  deleteTermek(termek:any){
    this.termekService.deleteTermek(termek.id).subscribe(
      (res:any)=>{console.log("siker")}
    )
  }
}
