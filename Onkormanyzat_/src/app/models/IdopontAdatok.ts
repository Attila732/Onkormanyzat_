export class IdopontAdatok{

    [x: string]: any
    
    "nev": string
    "email": string
    "telefonszam":number|null
    "datum": {"startDate": string, "endDate": string}
    "idopont": {"startDate": string, "endDate": string};
    
    
    constructor() {
      this.nev= ""
      this.email= ""
      this.telefonszam= 0
      this.datum= {startDate:"", endDate:""}
      this.idopont= {startDate:"", endDate:""}
     }
    }