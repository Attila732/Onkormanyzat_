export class BejelentesAdatok{

    [x: string]: any
    
    "tipus": string
    "sulyossag": string
    "nev": string
    "leiras": string
    "helyszin": string
    "telefonszam": Array<string>
    "idopont": {"startDate": string, "endDate": string};
    
    
    constructor() {
      this.tipus= ""
      this.sulyossag= ""
      this.nev= ""
      this.leiras= ""
      this.helyszin= ""
      this.telefonszam= []
      this.idopont= {startDate:"", endDate:""};
    
     }
    }