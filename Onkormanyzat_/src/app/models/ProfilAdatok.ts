export class ProfilAdatok{

    [x: string]: any
    
    "email":string
    "nev": string
    "telefonszam": number
    "rang": string
    "helyszin": string;
    
    
    constructor() {
      this.email= ""
      this.nev= ""
      this.telefonszam= 0
      this.rang= ""
      this.helyszin= "";
    
     }
    }