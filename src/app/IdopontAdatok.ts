export class IdopontAdatok{

    [x: string]: any
    
    "nev": string
    "email": Array<string>
    "telefonszam": Array<string>
    "datum": {"startDate": string, "endDate": string}
    "idopont": {"startDate": string, "endDate": string};
    
    
    constructor() {
      this.nev= ""
      this.email= []
      this.telefonszam= []
      this.datum= {startDate:"", endDate:""}
      this.idopont= {startDate:"", endDate:""}
     }
    }