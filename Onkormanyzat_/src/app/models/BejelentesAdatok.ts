export class BejelentesAdatok{

    [x: string]: any
    
    "userid":string
    "tipus": string
    "sulyossag": string
    "leiras": string
    "helyszin": string
    "telefonszam":number|null
    "date": string
    
    
    constructor() {
      this.userid=""//bejelentkezett felhasználó (Profiladatok.userId) ből
      this.tipus= ""
      this.sulyossag= ""
      this.leiras= ""
      this.helyszin= ""
      this.telefonszam= null
      this.date=""
    
     }
    }