import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Hir } from '../models/Hir';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { ProfilAdatok } from '../models/ProfilAdatok';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit, OnDestroy {

  news: Hir[] = []
  newArticle: Hir = new Hir()
  subscriptions: Subscription[] = []
  private user: ProfilAdatok | null = null;
  userRoles: any
  orgAdmin: boolean = false
  international: Hir[] = []
  national: Hir[] = []
  local: Hir[] = []
  orgs: { id: string, name: string }[] = []
  constructor(private newsService: NewsService, private auth: AuthService) {

  }
  ngOnInit(): void {
    this.getUserInfo()
    this.getNews()
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe()
    })
  }

  getNews() {
    this.subscriptions.push(
      this.newsService.getNews("INTERNATIONAL", 0, "type").subscribe({
        next: (res: any) => {
          this.international = res.content
        }
      }))
    this.subscriptions.push(
      this.newsService.getNews("NATIONAL", 0, "type").subscribe({
        next: (res:any) => {
          this.national = res.content
        }
      }))
    this.subscriptions.push(
      this.newsService.getNews("LOCAL", 0, "type").subscribe({
        next: (res: any) => {
          this.local = res.content
        }
      }))
  }

  getUserInfo() {
    this.subscriptions.push(
      this.auth.getUser().subscribe(
        (res: any) => {
          this.user = res
          this.subscriptions.push(
            this.auth.getUserRoles().subscribe(
              (roles: Map<String, boolean>) => {
                this.userRoles = roles
                this.orgAdmin = this.userRoles.get("ORG_ADMIN")

                if (this.user != null && this.userRoles.get("ORG_ADMIN")) {
                  this.subscriptions.push(
                    this.newsService.getOrgsForUser(this.user.userId, 0).subscribe({
                      next: (res: any) => {
                        this.orgs = res
                      }
                    }))
                }
              }))
        }
      ));
  }

  changeOrg(event: Event) {
    console.log(event)
  }


  submitNewArticle() {
    if (this.orgAdmin && this.user != null) {
      this.newArticle.userId = this.user.userId
      this.newArticle.userName = this.user.name
      this.newArticle.orgName = this.orgs.find((e) => e.id == this.newArticle.orgId)!.name
      console.log(this.newArticle)
      this.newsService.postNewNews(this.newArticle).subscribe((res=>console.log("successful post new article (i hope)",res)))
    }
  }

  // userProfile1: any;
  // AdminText: any;
  // // admin: any;

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   this.readImage(file);
  // }
  // readImage(file: File) {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     this.userProfile1.profileImage = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

  // userText: string = '';
  // displayedText: string = '';

  // writeText() {
  //   this.displayedText = this.userText;
  // }
}
