export class BejelentesAdatok{

    [x: string]: any
    
    "userId":string
    "type": string
    "urgency": string
    "description": string
    "location": string
    "phone":number|null
    "date": string
    
    
    constructor() {
      this.userId=""//bejelentkezett felhasználó (Profiladatok.userId) ből
      this.type= ""
      this.urgency= ""
      this.description= ""
      this.location= ""
      this.phone= null
      this.date=""
    
     }
    }