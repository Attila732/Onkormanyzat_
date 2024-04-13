export class IdopontAdatok{

    [x: string]: any
    "userId":string
    "orgId":string
    "name": string
    "email": string
    "phone":number|null
    "startDate": string //yyyy-MM-dd hh:mm
    "endDate": string //yyyy-MM-dd hh:mm
    
    
    constructor() {
      this.userId=""//bejelentkezett felhasználó (Profiladatok.userId) ből
      this.orgId="" 
      this.name= ""
      this.email= ""
      this.phone= null
      this.startDate=""
      this.endDate=""
     }
    }