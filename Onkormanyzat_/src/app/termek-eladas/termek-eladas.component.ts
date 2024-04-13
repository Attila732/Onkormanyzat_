import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { FilePickerDirective } from '../file-picker.directive';
import { ImagesService } from '../images.service';
import { EladoTermekAdatok } from '../models/EladoTermekAdatok';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { TermekkezeloService } from '../termekkezelo.service';

@Component({
  selector: 'app-termek-eladas',
  templateUrl: './termek-eladas.component.html',
  styleUrls: ['./termek-eladas.component.css']
})
export class TermekEladasComponent {

  private user: ProfilAdatok | null = null;
  
  buttonClicked = false;
  
  currentOrganization:any;
  orgs: { id: string; name: string }[] = [];
  
  eladoTermek: EladoTermekAdatok = new EladoTermekAdatok();
  termekek: EladoTermekAdatok[] = [];
  
  private subscriptions: Subscription[] = [];
  
  
  conditions = [
    { key: 'new', text: 'Új' },
    { key: 'newish', text: 'Újszerű' },
    { key: 'used', text: 'Használt' },
  ];

  constructor(
    private auth: AuthService,
    private termekService: TermekkezeloService,
    private ImageS: ImagesService
  ) {}



  getUserInfo() {
    this.subscriptions.push(
      this.auth.getUser().subscribe((res: any) => {
        console.log("getUserInfo in termekeladas res: ",res)
        this.user = res;
      })
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
  }


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

  
  _selectedFiles: File[] = [];
  _multiple = true;

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
  
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
