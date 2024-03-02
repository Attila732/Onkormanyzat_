export class SzervezesAdatok{

[x: string]: any

"nev": string //rendezvény neve
"leiras": string
"helyszin": string
"userid": string
"orgid": string
"startDate": string //yyyy-MM-dd hh:mm
"endDate": string //yyyy-MM-dd hh:mm
"telefonszam":Array<number> //csak itt kell array legyen mert lehet több elérhetőséget megadni
"email": Array<string> //csak itt kell array legyen mert lehet több elérhetőséget megadni


constructor() {
  this.nev= ""
  this.leiras= ""
  this.helyszin= ""
  this.userid= ""//bejelentkezett felhasználó (Profiladatok.userId) ből
  this.orgid= "" //bejelentkezett felhasználó (Profiladatok.orgs) ből ha több van a felhasználó választ
  this.startDate=""
  this.endDate=""
  this.telefonszam= []
  this.email= [];

 }
}