export class SzervezesAdatok{

[x: string]: any

"name": string //rendezvény neve
"description": string
"location": string
"userid": string
"orgid": string
"startDate": string //yyyy-MM-dd hh:mm
"endDate": string //yyyy-MM-dd hh:mm
"phone":Array<number> //csak itt kell array legyen mert lehet több elérhetőséget megadni
"email": Array<string> //csak itt kell array legyen mert lehet több elérhetőséget megadni


constructor() {
  this.name= ""
  this.description= ""
  this.location= ""
  this.userid= ""//bejelentkezett felhasználó (Profiladatok.userId) ből
  this.orgid= "" //bejelentkezett felhasználó (Profiladatok.orgs) ből ha több van a felhasználó választ
  this.startDate=""
  this.endDate=""
  this.phone= []
  this.email= [];

 }
}