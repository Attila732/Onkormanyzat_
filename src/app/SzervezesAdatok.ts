export class SzervezesAdatok{

[x: string]: any

"name": string
"description": string
"location": string
"userid": number
"orgid": number
"orgname": string
"time": {"startDate": string, "endDate": string}
"phone": Array<string>
"email": Array<string>;


constructor() {
  this.name= ""
  this.description= ""
  this.location= ""
  this.userid= 0
  this.orgid= 0
  this.orgname= ""
  this.time= {startDate:"", endDate:""}
  this.phone= []
  this.email= [];

 }
}