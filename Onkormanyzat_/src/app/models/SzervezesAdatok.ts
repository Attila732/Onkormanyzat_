export class SzervezesAdatok{

[x: string]: any

"nev": string //rendezvény neve
"leiras": string
"helyszin": string
"userid": number
"orgid": number
"startDate": string //yyyy-MM-dd hh:mm
"endDate": string //yyyy-MM-dd hh:mm
"telefonszam":Array<number> //csak itt kell array legyen mert lehet több elérhetőséget megadni
"email": Array<string> //csak itt kell array legyen mert lehet több elérhetőséget megadni


constructor() {
  this.nev= ""
  this.leiras= ""
  this.helyszin= ""
  this.userid= 0
  this.orgid= 0
  this.startDate=""
  this.endDate=""
  this.telefonszam= []
  this.email= [];

 }
}