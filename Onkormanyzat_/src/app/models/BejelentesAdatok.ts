export class BejelentesAdatok{

    [x: string]: any
    
    "tipus": string
    "sulyossag": string
    "nev": string
    "leiras": string
    "helyszin": string
    "telefonszam":number|null
    "idopont": {"startDate": string, "endDate": string};
    
    
    constructor() {
      this.tipus= ""
      this.sulyossag= ""
      this.nev= ""
      this.leiras= ""
      this.helyszin= ""
      this.telefonszam= 0
      this.idopont= {startDate:"", endDate:""};
    
     }
    }