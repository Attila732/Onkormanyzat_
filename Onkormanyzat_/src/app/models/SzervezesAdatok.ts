export class SzervezesAdatok{

[x: string]: any

"name": string //rendezvény neve
"description": string
"location": string
"userId": string
"orgId": string
"startDate": string //yyyy-MM-dd hh:mm
"endDate": string //yyyy-MM-dd hh:mm
"phone":Array<number> //csak itt kell array legyen mert lehet több elérhetőséget megadni
"email": Array<string> //csak itt kell array legyen mert lehet több elérhetőséget megadni


constructor() {
  this.name= ""
  this.description= ""
  this.location= ""
  this.userId= ""//bejelentkezett felhasználó (Profiladatok.userId) ből
  this.orgId= "" //bejelentkezett felhasználó (Profiladatok.orgs) ből ha több van a felhasználó választ
  this.startDate=""
  this.endDate=""
  this.phone= []
  this.email= [];

 }
}