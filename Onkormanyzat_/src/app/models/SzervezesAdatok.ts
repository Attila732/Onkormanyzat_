export class SzervezesAdatok{

[x: string]: any

"nev": string
"leiras": string
"helyszin": string
"userid": number
"orgid": number
"orgnev": string
"idopont": {"startDate": string, "endDate": string}
"telefonszam":Array<number> //csak itt kell array legyen mert lehet több elérhetőséget megadni
"email": Array<string> //csak itt kell array legyen mert lehet több elérhetőséget megadni


constructor() {
  this.nev= ""
  this.leiras= ""
  this.helyszin= ""
  this.userid= 0
  this.orgid= 0
  this.orgnev= ""
  this.idopont= {startDate:"", endDate:""}
  this.telefonszam= []
  this.email= [];

 }
}