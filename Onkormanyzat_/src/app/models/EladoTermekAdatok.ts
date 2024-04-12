import { NumberValueAccessor } from "@angular/forms"

export class EladoTermekAdatok{

    [x: string]: any
    "id": string
    "userId":string
    "name": string  //termek neve
    "email":string
    "description": string
    "condition": string
    "location": string
    "phone": number|null
    "price":Number|null


    
    constructor() {
      this.id=""
      this.userId=""//bejelentkezett felhasználó (Profiladatok.userId) ből
      this.name= ""
      this.email=""
      this.description= ""
      this.condition= ""
      this.location= ""
      this.phone= null
      this.price=null
    
     }
    }