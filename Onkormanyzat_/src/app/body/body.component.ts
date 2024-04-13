import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Hir } from '../models/Hir';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit, OnDestroy {
  news: Hir[] = [];
  newArticle: Hir = new Hir();
  subscriptions: Subscription[] = [];
  private user: ProfilAdatok | null = null;
  userRoles: any;
  international: Hir[] = [];
  national: Hir[] = [];
  local: Hir[] = [];
  orgs: { id: string; name: string }[] = [];
  constructor(private newsService: NewsService, private auth: AuthService) {}
  ngOnInit(): void {
    this.getUserInfo();
    this.getNews();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  getNews() {
    this.getLocal();
    this.getNational();
    this.getInterNational();
  }
  getInterNational() {
    this.subscriptions.push(
      this.newsService.getNews('INTERNATIONAL', 0, 'type').subscribe({
        next: (res: any) => {
          this.international = res.content;
        },
      })
    );
  }
  getNational() {
    this.subscriptions.push(
      this.newsService.getNews('NATIONAL', 0, 'type').subscribe({
        next: (res: any) => {
          this.national = res.content;
        },
      })
    );
  }
  getLocal() {
    this.subscriptions.push(
      this.newsService.getNews('LOCAL', 0, 'type').subscribe({
        next: (res: any) => {
          this.local = res.content;
        },
      })
    );
  }

  getUserInfo() {
    this.subscriptions.push(
      this.auth.getUser().subscribe((res: any) => {
        this.user = res;
        this.subscriptions.push(
          this.auth.getUserRoles().subscribe((roles: Map<String, boolean>) => {
            this.userRoles = roles;

            if (this.user != null && this.userRoles.get('ORG_ADMIN')) {
              this.subscriptions.push(
                this.newsService.getOrgsForUser(this.user.userId, 0).subscribe({
                  next: (res: any) => {
                    this.orgs = res;
                  },
                })
              );
            }
          })
        );
      })
    );
  }

  changeOrg(event: Event) {
    console.log(event);
  }

  submitNewArticle() {
    if (this.user != null && this.userRoles.get('ORG_ADMIN')) {
      this.newArticle.userId = this.user.userId;
      this.newArticle.userName = this.user.name;
      this.newArticle.orgName = this.orgs.find(
        (e) => e.id == this.newArticle.orgId
      )!.name;
      console.log(this.newArticle);
      this.newsService.postNewNews(this.newArticle).subscribe({
        next: (res: any) => {
          console.log('successful post new article ', res);
          switch (this.newArticle.type) {
            case 'LOCAL':
              this.getLocal();
              break;
            case 'NATIONAL':
              this.getNational();
              break;
            case 'INTERNATIONAL':
              this.getInterNational();
              break;

            default:
              break;
          }
          this.newArticle = new Hir();
        },
        error: (err: any) => console.log(err),
      });
    }
  }
  deleteLocalNews(news: any) {
    // Implement logic to delete local news from array
    const index = this.local.indexOf(news);
    if (index !== -1) {
      this.local.splice(index, 1);
    }
  }
  deleteNews(news: Hir) {
    this.newsService.deleteNews(news.id).subscribe(
      (res:any)=>{console.log("siker")}
    )
  }
  editLocalNews(news: any) {
    // Implement logic to edit local news
    // For example, you can open a modal with a form to edit the news
    console.log("Editing local news:", news);
  }
  editNews(news: Hir) {
    this.newsService.updateNews(news).subscribe(
      (res:any)=>{console.log("siker")}
    )
  }
}
