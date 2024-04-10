import { Component } from '@angular/core';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { Observable, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { NgbTypeaheadModule, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { AdminAdatok } from '../models/AdminAdatok';
import { FelhaszKeresService } from '../felhasz-keres.service';
import { ImagesService } from '../images.service';

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

  constructor(private felhaszkeres: FelhaszKeresService, private images:ImagesService) {

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


  resultFormatter = (result: AdminAdatok) => `${result[this.category]}`;
  inputFormatter = (result: AdminAdatok) => `${result[this.category]}`;



  onSelectItem(event: NgbTypeaheadSelectItemEvent<AdminAdatok>) {
    event.preventDefault()
    console.log(event.item.email)
    this.adminAdatok=event.item;

  }



loadAdminAdatok(value: string, pageNum: number, category: string){
  return this.felhaszkeres.getAdminAdatok(value, pageNum, category)
}


setCol(col:any){
  this.col=col
}

updateUser(){
  this.felhaszkeres.updateUser(this.adminAdatok).subscribe(
    (res:any)=>{console.log(res)}
  );
}

deleteUser(){
  this.felhaszkeres.deleteUser(this.adminAdatok.id).subscribe(
    (res:any)=>{console.log("siker")}
  )
}

}
