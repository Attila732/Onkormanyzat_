export class EladoTermekAdatok{

    [x: string]: any
    "userId":string
    "nev": string
    "leiras": string
    "allapot": string
    "kepek": File[] //a képeket külön kell majd küldeni, lehet nem kell ide 
    "helyszin": string
    "telefonszam": number|null
    
    constructor() {
      this.userId=""//bejelentkezett felhasználó (Profiladatok.userId) ből
      this.nev= ""
      this.leiras= ""
      this.allapot= ""
      this.kepek= []
      this.helyszin= ""
      this.telefonszam= null
    
     }
    }