export class ProfilAdatok{

    [x: string]: any
    "userId":string
    "email":string
    "nev": string
    "telefonszam": number|null
    "role": string[]
    "helyszin": string;
    "orgs":string[] // ha nincs admin role-ja akkor üres marad amúgy orgId(k) lesznek benne 
    
    constructor() {
      this.userId=""
      this.email= ""
      this.nev= ""
      this.telefonszam= null
      this.role= []
      this.helyszin= "";
      this.orgs = []
     }
    }