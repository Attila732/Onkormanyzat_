export class ProfilAdatok{

    [x: string]: any
    "userId":string
    "email":string
    "name": string
    "phone": number|null
    "role": string[]
    "location": string;
    "orgs":string[] // ha nincs admin role-ja akkor üres marad amúgy orgId(k) lesznek benne 
    
    constructor() {
      this.userId=""
      this.email= ""
      this.name= ""
      this.phone= null
      this.role= []
      this.location= "";
      this.orgs = []
     }
    }