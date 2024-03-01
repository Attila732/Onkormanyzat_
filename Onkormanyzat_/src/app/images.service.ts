import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {  //for use in other services after succesfull data transfer to send the images belonging to  them
  private url="resource/"
  constructor(private http:HttpClient) { }


  postfile(selectedFiles:File[],uploadDetails:{url:string,multiple:boolean}) {
    console.log(selectedFiles)
    if (selectedFiles!=null && ((!uploadDetails.multiple && selectedFiles.length==1) || (uploadDetails.multiple))) {
      
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('images', selectedFiles[i]);
      }
      console.log(formData)

      this.http.post(this.url+uploadDetails.url,formData)
      
      .subscribe({
        next: (res) => {
          console.log(res);
          return res;
        },
        error: (err) => {
          console.log("Error in post hello ");
          console.log(err);
        }
      });
    }else{
      console.log("hibás paraméterek a kép feltöltéshez")
    }
  }
}
