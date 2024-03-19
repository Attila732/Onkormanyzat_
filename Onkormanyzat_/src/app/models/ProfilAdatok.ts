export class ProfilAdatok {

    [x: string]: any
    "userName":string
    "lastName":string
    "firstName":string
    "userId":string
    "email":string
    "name": string
    "phone": number|null
    "roles":string[]
    "orgs":string[]  //ha nincs admin role-ja akkor üres marad amúgy orgId(k) lesznek benne 
    
    constructor() {
      this.userName=""
      this.firstName=""
      this.lastName=""
      this.userId=""
      this.email= ""
      this.name= ""
      this.phone= null
      this.roles=[]
      this.orgs=[]
     }
    }
   