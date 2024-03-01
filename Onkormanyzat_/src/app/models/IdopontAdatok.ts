export class IdopontAdatok{

    [x: string]: any
    "userId":string
    "orgId":string
    "nev": string
    "email": string
    "telefonszam":number|null
    "startDate": string //yyyy-MM-dd hh:mm
    "endDate": string //yyyy-MM-dd hh:mm
    
    
    constructor() {
      this.nev= ""
      this.email= ""
      this.telefonszam= null
      this.startDate=""
      this.endDate=""
     }
    }