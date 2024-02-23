export class EladoTermekAdatok{

    [x: string]: any
    
    "nev": string
    "leiras": string
    "allapot": string
    "kepek": File[]
    "helyszin": string
    "telefonszam": number|null
    
    constructor() {
      this.nev= ""
      this.leiras= ""
      this.allapot= ""
      this.kepek= []
      this.helyszin= ""
      this.telefonszam= null
    
     }
    }