export class ProfilAdatok{

    [x: string]: any
    
    "email": Array<string>
    "nev": string
    "telefonszam": Array<string>
    "rang": string
    "helyszin": string;
    
    
    constructor() {
      this.email= []
      this.nev= ""
      this.telefonszam= []
      this.rang= ""
      this.helyszin= "";
    
     }
    }