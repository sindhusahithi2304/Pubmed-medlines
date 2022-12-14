import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Action } from '@sinequa/components/action';
import { FacetConfig } from '@sinequa/components/facet';
import { PreviewDocument, PreviewService } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';
import { SelectionService } from '@sinequa/components/selection';
import { UIService } from '@sinequa/components/utils';
import { AppService } from '@sinequa/core/app-utils';
import { IntlService } from '@sinequa/core/intl';
import { LoginService } from '@sinequa/core/login';
import { AuditWebService, Record, Results, UserSettingsWebService } from '@sinequa/core/web-services';
import { Subscription } from 'rxjs';
import { FACETS, FEATURES, METADATA } from '../../config';
import { Utils } from "@sinequa/core/base";
import { PrincipalWebService} from "@sinequa/core/web-services";
import { JsonMethodPluginService} from "@sinequa/core/web-services";
import { ActivatedRoute } from '@angular/router';
import { AuditEventType,AuditEvent} from "@sinequa/core/web-services";
import { BasketsService } from '@sinequa/components/baskets';
//import { ConfirmType, ModalButton, ModalResult, ModalService } from '@sinequa/core/modal';
import { BsModal } from '@sinequa/components/modal';
import { ModalService } from '@sinequa/core/modal';
//import { MyPopupComponent } from '../../app/PopupModel/popup.component';

interface GetBasketIdsList {
  ids: string[];
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() searchRoute: string = "/search";
  @Input() icon: string = "fas fa-shopping-basket";
  @Input() autoAdjust: boolean = true;
  @Input() autoAdjustBreakpoint: string = "xl";
  @Input() collapseBreakpoint: string = "sm";
  @Input() results: Results
  @Input() size: string;
  enableSubscribe : boolean;
  publishedUser : string;
  currentUser : string;
  sharedBasket : string;
  lookupSubscription: Subscription;
  auditEvent : AuditEvent;
 
 
  menu: Action | undefined;

  // Basket actions
  SubscribeAction: Action;

  // Dynamic display of facets titles/icons in the multi-facet component
  public multiFacetIcon? = "fas fa-filter fa-fw";
  public multiFacetTitle = "msg#facet.filters.title";

  // Document "opened" via a click (opens the preview facet)
  public openedDoc?: Record;

  // Custom action for the preview facet (open the preview route)
  public previewCustomActions: Action[];

  // Whether the left facet bar is shown
  public _showFilters = this.ui.screenSizeIsEqual('md');
  // Whether the menu is shown on small screens
  public _showMenu = false;

  private _searchServiceSubscription: Subscription;
 graphFlag = false;

  constructor(
    private previewService: PreviewService,
    private titleService: Title,
    private intlService: IntlService,
    private appService: AppService,
    public searchService: SearchService,
    public selectionService: SelectionService,
    public loginService: LoginService,
    public auditService: AuditWebService,
    public ui: UIService,
    public basketsService: BasketsService,
    public principalService: PrincipalWebService,
    public userSettingsService: UserSettingsWebService,
    private route: ActivatedRoute,
    public api: JsonMethodPluginService, 
      private modalService: ModalService ){
        this.route.queryParamMap.subscribe(params => {
            this.publishedUser = this.route.snapshot.queryParams["user"];
            this.sharedBasket = this.route.snapshot.queryParams["sharedBasket"];
        });
  

    // Initialize the facet preview action (opens the preview route)
    const expandPreviewAction = new Action({
      icon: "fas fa-expand-alt",
      title: "msg#facet.preview.expandTitle",
      action: () => {
        if (this.openedDoc) {
          this.previewService.openRoute(this.openedDoc, this.searchService.query);
        }
      }
    });

    this.previewCustomActions = [ expandPreviewAction ];
  }

  /**
   * Initialize the page title
   */
  ngOnInit() {
    this.titleService.setTitle(this.intlService.formatMessage("msg#search.pageTitle", {search: ""}));

    this._searchServiceSubscription = this.searchService.resultsStream
      .subscribe(results => {
        this.titleService.setTitle(this.intlService.formatMessage("msg#search.pageTitle", {search: this.searchService.query.text || ""}));
        if (!this.showResults) {
          this.openedDoc = undefined;
          this._showFilters = false;
        }
      });
      
      //Check the Query parameter to enable/disbale the Subscribe Button
      if(this.searchService.query.basket && this.publishedUser!=null && this.publishedUser!='' && this.currentUser !== this.publishedUser) {
        if(this.userSettingsService.basketIndex("sub_"+this.route.snapshot.queryParams["sharedBasket"]) === -1)
        {
        this.enableSubscribe = true;
        }
    } else {
        this.enableSubscribe = false;
    }
    
  }

  openSubscribeDialog() {        
    this.modalService.open(BsModal)
        .then((result) => {
            if (result === ModalService.Result.OK) { 
                this.SubscribeBaskets();
            }
     });
        
            }


  /*clickMethod() {
    if(confirm("Would you like to Subscribe the documents..? ")) {
      console.log("confirmed")
    }
  }*/


SubscribeBaskets(){ 
  //getting all details required to subscribe to a bucket.      
  let basketName = this.route.snapshot.queryParams["sharedBasket"];
  let newBasketName="sub_"+basketName;
  let userID=this.route.snapshot.queryParams["user"];
  let appname=  this.route.snapshot.queryParams["appname"];
  const lookup = this.api.call('GetBasketIdsList', {userid: Utils.asString(userID),basketname:Utils.asString(basketName),appname:appname});
  this.lookupSubscription = lookup.subscribe((response: GetBasketIdsList) => {
      if (response.ids!=null) {
          console.log("id list: "+response.ids);      
          //move the records to the basket by passing the newly created basketname and the id's got from jsonmethodplugin
          this.createSharedBaskets(newBasketName,response.ids);
          // this.userSettingsService.addToBasket(newBasketName,response.ids);
      }
      },
      (error) => {
          console.log("lookup error: ", error);
      });
  //disable the subscribe button from the UI 
  this.enableSubscribe = false;
}
createSharedBaskets(basketName: string,idList:string[]){
  console.log("basketname:" + basketName)
  if(this.userSettingsService.basketIndex(basketName) === -1 ){
      let basket = this.userSettingsService.Basket =  {
          name: basketName,
          ids: idList              
      };   
      this.userSettingsService?.userSettings?.baskets.push(basket);

      this.auditEvent = {
          type: AuditEventType.Basket_Add,
          detail: {
              basket: basketName
          }
      };    
      this.userSettingsService.patchBaskets(this.auditEvent);
  }  
  else
  {
  this.enableSubscribe = false;
  }
}

  /**
   * Unsubscribe from the search service
   */
  ngOnDestroy(){
    this._searchServiceSubscription.unsubscribe();
  }
  

  /**
   * Returns the configuration of the facets displayed in the facet-multi component.
   * The configuration from the config.ts file can be overriden by configuration from
   * the app configuration on the server
   */
  public get facets(): FacetConfig[] {
    return this.appService.app?.data?.facets as any as FacetConfig[] || FACETS;
  }

  /**
   * Returns the list of features activated in the top right menus.
   * The configuration from the config.ts file can be overriden by configuration from
   * the app configuration on the server
   */
  public get features(): string[] {
    return this.appService.app?.data?.features as string[] || FEATURES;
  }

  /**
   * Returns the configuration of the metadata displayed in the facet-preview component.
   * The configuration from the config.ts file can be overriden by configuration from
   * the app configuration on the server
   */
  public get metadata(): string[] {
    return this.appService.app?.data?.metadata as string[] || METADATA;
  }

  /**
   * Responds to a change of facet in the multi facet
   * @param facet
   */
  facetChanged(facet: FacetConfig){
    if(!facet) {
      this.multiFacetIcon = "fas fa-filter fa-fw";
      this.multiFacetTitle = "msg#facet.filters.title";
    }
    else {
      this.multiFacetIcon = facet.icon;
      this.multiFacetTitle = facet.title;
    }
  }

  /**
   * Responds to a click on a document (setting openedDoc will open the preview facet)
   * @param record
   * @param event
   */
  onDocumentClicked(record: Record, event: Event) {
    if(!this.isClickAction(event)){
      this.openedDoc = record;
      if(this.ui.screenSizeIsLessOrEqual('md')){
        this._showFilters = false; // Hide filters on small screens if a document gets opened
      }
    }
  }

  /**
   * Open the preview when this record has no url1
   * @param record
   * @param isLink
   */
  openPreviewIfNoUrl(record: Record, isLink: boolean) {
    if(!isLink){
      this.previewService.openRoute(record, this.searchService.query);
    }
  }

  /**
   * Responds to the preview facet being closed by a user action
   */
  closeDocument(){
    if(this.openedDoc){
      this.auditService.notify({
        type: "Preview.close",
        detail: this.previewService.getAuditPreviewDetail(this.openedDoc.id, this.searchService.query, this.openedDoc, this.searchService.results?.id)
      });
      this.openedDoc = undefined;
      if(this.ui.screenSizeIsEqual('md')){
        this._showFilters = true; // Show filters on medium screen when document is closed
      }
    }
  }

  /**
   * Document is loaded and displayed on screen. It could be manipulated easily.
   *
   * eg: scroll to a specific location
   * document.getContentWindow().scrollTo(0, 3000);
   * @param document the document currently in preview
   */
  previewReady(document: PreviewDocument) {
    // document.getContentWindow().scrollTo(0, Math.random() * 4000);
  }

  // VERY SPECIFIC TO THIS APP:
  // Make sure the click is not meant to trigger an action (from sq-result-source or sq-result-title)
  private isClickAction(event: Event): boolean {
    if (event.type !== 'click') {
      return true;
    }
    const target = event.target as HTMLElement;
    if (!target) {
      return false;
    }
    return event.type !== 'click' ||
      target.tagName === "A" ||
      target.tagName === "INPUT" ||
      target.matches("sq-result-selector *, .sq-result-title, sq-result-source *, sq-labels *");
  }


  /**
   * Controls visibility of filters (small screen sizes)
   */
  get showFilters(): boolean {
    return this.ui.screenSizeIsGreaterOrEqual('lg') || this._showFilters;
  }

  /**
   * Show or hide the left facet bar (small screen sizes)
   */
  toggleFilters(){
    this._showFilters = !this._showFilters;
    if(this._showFilters){ // Close document if filters are displayed
      this.openedDoc = undefined;
    }
  }

  /**
   * Controls visibility of menu (small screen sizes)
   */
  get showMenu(): boolean {
    return this.ui.screenSizeIsGreaterOrEqual('sm') || (this._showMenu && !this._showFilters);
  }

  /**
   * Show or hide the user menus (small screen sizes)
   */
  toggleMenu(){
    this._showMenu = !this._showMenu;
  }

  /**
   * Determine whether to show or hide results
   */
  get showResults(): boolean {
    if(this.ui.screenSizeIsLessOrEqual('sm')){
      return !this.showFilters && !this.openedDoc;
    }
    return true;
  }

  /**
   * On small screens only show the search form when the facets are displayed
   */
  get showForm(): boolean {
    return this.ui.screenSizeIsGreaterOrEqual('sm') || this.showFilters;
  }

  /**
   * Whether the UI is in dark or light mode
   */
  isDark(): boolean {
    return document.body.classList.contains("dark");
  }
  select(item: string, valueItem) {
    if(item = 'dOIURL'){
      window.open(valueItem.value,'_blank');
    }
    
}

 displayGraphicView() {
    this.graphFlag = !this.graphFlag;
  }

  
  
}

 