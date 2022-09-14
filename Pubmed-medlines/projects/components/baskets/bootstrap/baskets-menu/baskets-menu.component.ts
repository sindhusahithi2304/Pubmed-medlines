import { Component, OnInit, Input } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { LoginService } from "@sinequa/core/login";
import { BasketsService } from "../../baskets.service";
import {PrincipalWebService} from "@sinequa/core/web-services";
import {UserSettingsWebService} from "@sinequa/core/web-services";
import {AppWebService} from "@sinequa/core/web-services";

@Component({
  selector: "sq-baskets-menu",
  templateUrl: "./baskets-menu.component.html",
})
export class BsBasketsMenuComponent implements OnInit {
  @Input() searchRoute: string = "/search";
  @Input() icon: string = "fas fa-shopping-basket";
  @Input() autoAdjust: boolean = true;
  @Input() autoAdjustBreakpoint: string = "xl";
  @Input() collapseBreakpoint: string = "sm";
  @Input() size: string;

  basketOptions: string[] = ["Select", "Share"];

  menu: Action | undefined;

  // Basket actions
  createAction: Action;
  manageAction: Action;
  selectAction: Action;
  shareAction: Action;
  basketCustomOptions: Action[] = [];

  constructor(
    public loginService: LoginService,
    public basketsService: BasketsService,
    public principalService:PrincipalWebService,
    public userSettingsService:UserSettingsWebService,
    public appService: AppWebService
  ) {
    this.createAction = new Action({
      text: "msg#baskets.createBasket",
      title: "msg#baskets.createBasket",
      action: (_) => {
        this.basketsService.createBasketModal();
      },
    });

    this.manageAction = new Action({
      text: "msg#baskets.manageBaskets",
      title: "msg#baskets.manageBaskets",
      action: (_) => {
        this.basketsService.manageBasketsModal();
      },
    });
  }

  ngOnInit() {
    this.updateMenu();
    this.basketsService.changes.subscribe({
      next: () => {
        this.updateMenu();
      },
    });
    this.loginService.events.subscribe((event) => {
      if (event.type === "session-changed") {
        this.updateMenu();
      }
    });
  }

  updateMenu() {
    if (!this.loginService.complete) {
      this.menu = undefined;
      return;
    }

    //Select and Share options//

    const basketsActions: Action[] = [];
    if (this.basketsService.hasBasket) {
      this.basketsService.baskets.map((basket) =>
        basketsActions.push(
          new Action({
            text: basket.name,
            title: basket.name,
            children: [
              new Action({
                text: "Select",
                title: "Select",
                action: () =>
                  this.basketsService.searchBasket(basket, this.searchRoute),
              }),
              new Action({
                text: "Share",
                title: "Share",
                action:()=>this.sendEmail(basket,this.searchRoute),
              }),
            ],
          })
        )
      );
    }
    basketsActions.push(new Action({ separator: true }));
    basketsActions.push(this.createAction);

    if (this.basketsService.hasBasket) {
      basketsActions.push(this.manageAction);
    }

    this.menu = new Action({
      icon: this.icon,
      text: "msg#baskets.baskets",
      title: "msg#baskets.baskets",
      children: basketsActions,
    });
  }

  sendEmail(basket,curr)
{
            let mailToUrl = "";
            let name = this.principalService?.principal?.name;
            
            let basketName = basket.name
				    var query="#/search?query=%7B%22name%22:%22"+this.appService.appName+"%22,%22basket%22:%22"+basketName+"%22,%22user%22:%22"+name+"%22,%22tab%22:%22ALL%22%7D&view=list"+"&user="+name+"&sharedBasket="+basketName;
                
            var body = "https://"+window.location.host+window.location.pathname+ encodeURIComponent(query);
            console.log(body);
                //?query={%22name%22:%22GlobalSearch_V3.2%22,%22basket%22:%22Favorites%22,%22tab%22:%22ALL%22}&view=list&user=200035114&sharedBasket=Favorites
                
            mailToUrl = "mailto:?subject=Pubmed Search Basket&body="+body;
            console.log(mailToUrl);
            window.location.href=mailToUrl;
    }
}




