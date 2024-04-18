import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NewsService } from '../news.service';
import { ProfilAdatok } from '../models/ProfilAdatok';
import { Hir } from '../models/Hir';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sajat-hir',
  templateUrl: './sajat-hir.component.html',
  styleUrls: ['./sajat-hir.component.css']
})
export class SajatHirComponent {
	newArticle: Hir = new Hir();
	subscriptions: Subscription[] = [];
	private user: ProfilAdatok | null = null;
	orgBooleanNews: boolean = false;
	userRoles: any;
	currentOrganization: { id: string, name: string } = { id: "", name: "" };
	hirOrg: Hir[] = [];
	orgs: { id: string; name: string }[] = [];
	constructor(private newsService: NewsService, private auth: AuthService) { }

  ngOnInit(): void {
		this.getUserInfo();
	}
	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => {
			sub.unsubscribe();
		});
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
								this.auth.getOrgsForUser(this.user.userId, 0).subscribe({
									next: (res: any) => {
										this.orgs = res;
										this.currentOrganization = this.orgs[0]
									},
								})
							);
						}
					})
				);
			})
		);
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
					this.newArticle = new Hir();
				},
				error: (err: any) => console.log(err),
			});
		}
	}

	deleteNews(news: Hir) {
		this.newsService.deleteNews(news.id).subscribe(
			(res: any) => { console.log("delNews", res) }
		)
	}

	editNews(news: Hir) {
		this.newsService.updateNews(news).subscribe(
			(res: any) => { console.log("siker") }
		)
	}

	orgRequest() {
		console.log(this.currentOrganization, "lol")
		if (this.currentOrganization != null) {
			this.newsService.getSajatHirekOrg(this.currentOrganization.id).subscribe(
				(res: any) => {
					console.log(res)
					this.hirOrg = res
					this.orgBooleanNews = true;
					console.log("org sajat hirek lekeres")
				}
			)
		}
	}

}
