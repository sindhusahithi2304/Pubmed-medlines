import {Component, Input, HostBinding, ViewEncapsulation} from "@angular/core";
//import {ConfirmType, ModalButton,  ModalResult} from "@sinequa/core/modal";
import { ModalButton} from "@sinequa/core/modal";



@Component({
    selector: "sq-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class BsModal {
    @Input() title: string;
    @Input() buttons: ModalButton[];
    @Input() showHeader = true;
    @Input() showFooter = true;
    @Input() isProcessingState = false;
    @Input() model: any;
    @Input() message: string;
    @HostBinding("class.sq-modal") true;
    @Input() confirm: any;
    @Input() closebutton: any;
    @Input() activeModal: any;
    @Input() btnOkText: any;
    @Input() btnCancelText: any;
    
    constructor(public modalService: BsModal) {        

    }
    ngOnInit() {
    }
  
    public decline() {
      this.activeModal.close(false);
    }
  
    public accept() {
      this.activeModal.close(true);
    }
  
    public dismiss() {
      this.activeModal.dismiss();
    }

        public onSave() {
            this.closebutton.nativeElement.click();
}
}
