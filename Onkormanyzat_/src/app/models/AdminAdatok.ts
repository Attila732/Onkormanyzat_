export class AdminAdatok{
    [x: string]: any
    "id":string
    "email": string
    "userName": string
    "firstName": string
    "lastName": string
    "phone":number|null
    
    
    constructor() {
      this.id=""
      this.email= ""
      this.userName= ""
      this.firstName= ""
      this.lastName= ""
      this.phone= null
    }
}