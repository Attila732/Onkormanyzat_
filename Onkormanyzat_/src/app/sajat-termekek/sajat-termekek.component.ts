import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { FilePickerDirective } from '../file-picker.directive';
import { ImagesService } from '../images.service';
import { EladoTermekAdatok } from '../models/EladoTermekAdatok';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { TermekKepekkel } from '../models/TermekKepekkel';
import { TermekkezeloService } from '../termekkezelo.service';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { ProfiladatokCategory } from '../models/Enums';

@Component({
  selector: 'app-sajat-termekek',
  templateUrl: './sajat-termekek.component.html',
  styleUrls: ['./sajat-termekek.component.css']
})
export class SajatTermekekComponent implements OnInit, OnDestroy {
  private user: ProfilAdatok | null = null;
  userRoles: any;

  buttonClicked = false;
  admin: boolean = false;
  // orgAdmin: boolean = false;

  currentCategory: ProfiladatokCategory = ProfiladatokCategory.USERNAME

  currentPerson: ProfilAdatok = new ProfilAdatok();
  persons: ProfilAdatok[] = [];

  eladoTermek: EladoTermekAdatok = new EladoTermekAdatok();
  termekek: EladoTermekAdatok[] = [];

  private subscriptions: Subscription[] = [];


  conditions = [
    { key: 'new', text: 'Új' },
    { key: 'newish', text: 'Újszerű' },
    { key: 'used', text: 'Használt' },
  ];

  categories = [
    { key: 'id', text: 'Id', category: ProfiladatokCategory.ID },
    { key: 'firstName', text: 'Keresztnév', category: ProfiladatokCategory.FIRSTNAME },
    { key: 'lastName', text: 'Vezetéknév', category: ProfiladatokCategory.LASTNAME },
    { key: 'userName', text: 'Felhasználónév', category: ProfiladatokCategory.USERNAME },
    { key: 'email', text: 'Email', category: ProfiladatokCategory.EMAIL },
    { key: 'phone', text: 'Telefon', category: ProfiladatokCategory.PHONE },

  ];

  constructor(
    private auth: AuthService,
    private termekService: TermekkezeloService,
    private ImageS: ImagesService,
    private userS: UserService
  ) { }



  getUserInfo() {
    this.subscriptions.push(
      this.auth.getUser().subscribe((res: any) => {
        this.user = res;
        this.currentPerson = res;
        this.subscriptions.push(
          this.auth.getUserRoles().subscribe((roles: Map<String, boolean>) => {
            this.userRoles = roles;

            if (this.user != null && this.userRoles.get('ADMIN')) {
              this.getTermekekForChoosenUser(this.user)
            }
          })
        );
      })
    );
  }

  setupDataAndSend() {
    if (this.user != null) {
      console.log("setupAndSend eladotermekek: ", this.eladoTermek);
      console.log("setupAndSend user: ", this.user);
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
    // this.getSajatTermekek();
  }

  getTermekekForChoosenUser(user:any) {
    console.log("getTermekekForChoosenUser outside if: ", user)
    let id =null
    if (user != null) {
      console.log("getTermekekForChoosenUser inside if: ", user)
      if (user.id) {
        id=user.id
      }else if (user.userId) {
        id=user.userId
      }
      console.log("getTermekekForChoosenUser id: ",id)
      this.subscriptions.push(
        this.termekService.getTermekekForUserById(id).subscribe({
          next: (res: any) => {
            console.log("getTermekekForChoosenUser res: ", res)
            this.termekek = res;
          },
        })
      );
    }
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

  // toggleSellerInfo(item: any) {
  //   item.erdekel = !item.erdekel;
  // }

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

  updateTermek(termek: EladoTermekAdatok) {
    console.log(termek)
    this.termekService.updateTermek(termek).subscribe(
      (res: any) => { 
        console.log(res) 
        console.log("currentPerson: ",this.currentPerson) 
        this.getTermekekForChoosenUser(this.currentPerson)
      }
    );
  }

  deleteTermek(termek: any) {
    console.log("deleteTermek termek: ",termek)
    this.termekService.deleteTermek(termek.itemId).subscribe(
      (res: any) => { 
        console.log("siker") 
        console.log("currentPerson: ",this.currentPerson) 
        this.getTermekekForChoosenUser(this.currentPerson)
      }
    )
  }

  // orgAdminKeres(){
  //   this.orgAdmin = !this.orgAdmin
  // }

  adminKeres() {
    this.admin = !this.admin
  }

  orgRequest() {

  }

  getUsersByPropertyLike(value: string, pageNum: number, category: string) {
    return this.userS.getUsersByPropertyLike(value, pageNum, category)
  }

  searchPeople = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((searchTerm) => searchTerm.length >= 2),
      switchMap((searchTerm) => this.getUsersByPropertyLike(searchTerm, 0, this.currentCategory))
    );


  resultFormatter = (result: ProfilAdatok) => `${result[this.translateCurrentCategory(this.currentCategory)]}`;
  inputFormatter = (result: ProfilAdatok) => `${result[this.translateCurrentCategory(this.currentCategory)]}`;



  onSelectItem(event: NgbTypeaheadSelectItemEvent<ProfilAdatok>) {
    event.preventDefault()
    console.log(event.item)
    console.log("event.item: ", event.item)
    this.currentPerson = event.item;
    console.log("currentPerson: ", this.currentPerson)
    this.getTermekekForChoosenUser(this.currentPerson)

  }

  translateCurrentCategory(category: ProfiladatokCategory) {
    switch (category) {
      case ProfiladatokCategory.ID:
        return this.categories.find((o) => o.category == ProfiladatokCategory.ID)!.key
      case ProfiladatokCategory.FIRSTNAME:
        return this.categories.find((o) => o.category == ProfiladatokCategory.FIRSTNAME)!.key
        return "firstName"

      case ProfiladatokCategory.LASTNAME:
        return this.categories.find((o) => o.category == ProfiladatokCategory.LASTNAME)!.key
        return "lastName"

      case ProfiladatokCategory.USERNAME:
        return this.categories.find((o) => o.category == ProfiladatokCategory.USERNAME)!.key
        return "userName"

      case ProfiladatokCategory.EMAIL:
        return this.categories.find((o) => o.category == ProfiladatokCategory.EMAIL)!.key
        return "email"

      case ProfiladatokCategory.PHONE:
        return this.categories.find((o) => o.category == ProfiladatokCategory.PHONE)!.key
        return "phone"

    }
  }


}
