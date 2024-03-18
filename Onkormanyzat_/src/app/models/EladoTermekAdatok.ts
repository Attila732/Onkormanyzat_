import { NumberValueAccessor } from "@angular/forms"

export class EladoTermekAdatok{

    [x: string]: any
    "userId":string
    "name": string
    "email":string
    "description": string
    "state": string
    "location": string
    "phone": number|null
    "price":Number|null
    "termekneve":string


    
    constructor() {
      this.userId=""//bejelentkezett felhasználó (Profiladatok.userId) ből
      this.name= ""
      this.email=""
      this.description= ""
      this.state= ""
      this.location= ""
      this.phone= null
      this.price=null
      this.termekneve=""
    
     }
    }