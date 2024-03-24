import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit{
  attemptedUrl:string=""

  constructor(private auth:AuthService){

  }
  ngOnInit(): void {

    this.attemptedUrl = this.auth.getAttemptedUrl()

  }
  
}
