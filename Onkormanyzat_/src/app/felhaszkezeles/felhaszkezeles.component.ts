import { Component } from '@angular/core';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { Observable, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { NgbTypeaheadModule, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { AdminAdatok } from '../models/AdminAdatok';
import { FelhaszKeresService } from '../felhasz-keres.service';

@Component({
  selector: 'app-felhaszkezeles',
  templateUrl: './felhaszkezeles.component.html',
  styleUrls: ['./felhaszkezeles.component.css']
})
export class FelhaszkezelesComponent {
  id: number = 0
  selectedId: number | null = null
  col:{"key":string; "text": string; "type": string;  "min":number} =    {key: "id", text: "Id", type: "text", min:1}
  columns : Array<{"key":string; "text": string; "type": string;  "min":number}>=[
    {key: "id", text: "Id", type: "text", min:1},
    {key: "email", text: "Email", type: "text", min:3},
    {key: "userName", text: "Felhasználónév", type: "text", min:3},
    {key: "firstName", text: "Keresztnév", type: "text", min:3},
    {key: "lastName", text: "Vezetéknév", type: "text", min:3},
    {key: "phone", text: "Telefon", type: "number", min:3},

]
  category = "firstName"
  adminAdatok = new AdminAdatok()

  constructor(private felhaszkeres: FelhaszKeresService) {
    // this.columns = base.getColumns()

  }

  ngOnInit() {

  }

  searchPeople = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((searchTerm) => searchTerm.length >= this.col.min),
      switchMap((searchTerm) => this.loadAdminAdatok(searchTerm, 0, this.col.key))
    );

  // resultFormatter = (result: AdminAdatok) => result.firstName;
  // inputFormatter = (result: AdminAdatok) => result.firstName;

  resultFormatter = (result: AdminAdatok) => `${result[this.category]}`;
  inputFormatter = (result: AdminAdatok) => `${result[this.category]}`;



  onSelectItem(event: NgbTypeaheadSelectItemEvent<AdminAdatok>) {
    event.preventDefault()
    console.log(event.item.email)
    this.adminAdatok=event.item;
    // this.adminAdatok.email = event.item.email
    // this.adminAdatok.id = event.item.id
    // this.adminAdatok.userName = event.item.userName
    // this.adminAdatok.firstName = event.item.firstName
    // this.adminAdatok.lastName = event.item.lastName
    // this.adminAdatok.phone = event.item.phone
  }

// loadPeopleByName(col: Column) {
//   if (this.person[col.key] != null && this.person[col.key].length >= 3) {
//     console.log(this.person[col.key])
//     // console.log(col.key)
//     this.base.getProfilAdatokByName(this.person[col.key]).subscribe((res: { id: number; name: string }[]) => {

//     })
//   }
// }

loadAdminAdatok(value: string, pageNum: number, category: string){
  return this.felhaszkeres.getAdminAdatok(value, pageNum, category)
}


setCol(col:any){
  this.col=col
}
// loadProfilAdatokById(id: number) {
//   this.base.getProfilAdatok(id).subscribe({
//     next: (person: ProfilAdatok) => {
//       console.log('Received person:', person);
//       this.person = person
//     },
//     error: (error) => {
//       console.error('Error getting person:', error);
//     }
//   });
// }

// save(person: ProfilAdatok) {
//   if (person.id == 0 && this.id == 0) {
//     this.base.postProfilAdatok(person)
//   } else {
//     this.base.putProfilAdatok(this.id, person)
//   }
// }
// deleteP(id: number) {
//   if (id != null && id != 0) {
//     this.base.delProfilAdatok(id)
//   }
// }
}
