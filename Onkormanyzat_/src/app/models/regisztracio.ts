export class Regisztracio{

    [x: string]: any
    "userName":string
    "lastName":string
    "firstName":string
    "email":string
    "password1":string
    "password2":string 
    "phone": number|string|null
   
    
    constructor() {
      this.userName=""
      this.firstName=""
      this.lastName=""
      this.email= ""
      this.password1=""
      this.password2 =""
      this.phone= ""
     }
    }