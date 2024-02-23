export class ProfilAdatok{

    [x: string]: any
    
    "email":string
    "nev": string
    "telefonszam": number|null
    "rang": string
    "helyszin": string;
    
    
    constructor() {
      this.email= ""
      this.nev= ""
      this.telefonszam= null
      this.rang= ""
      this.helyszin= "";
    
     }
    }