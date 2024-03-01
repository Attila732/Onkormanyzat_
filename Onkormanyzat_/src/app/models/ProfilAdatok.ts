export class ProfilAdatok{

    [x: string]: any
    "id":string
    "email":string
    "nev": string
    "telefonszam": number|null
    "role": string
    "helyszin": string;
    "orgs":string[] // ha nincs admin role-ja akkor üres marad amúgy orgId(k) lesznek benne 
    
    constructor() {
      this.id=""
      this.email= ""
      this.nev= ""
      this.telefonszam= null
      this.role= ""
      this.helyszin= "";
      this.orgs = []
     }
    }