export class EladoTermekAdatok{

    [x: string]: any
    "userId":string
    "name": string
    "description": string
    "state": string
    "location": string
    "phone": number|null
    
    constructor() {
      this.userId=""//bejelentkezett felhasználó (Profiladatok.userId) ből
      this.name= ""
      this.description= ""
      this.state= ""
      this.location= ""
      this.phone= null
    
     }
    }