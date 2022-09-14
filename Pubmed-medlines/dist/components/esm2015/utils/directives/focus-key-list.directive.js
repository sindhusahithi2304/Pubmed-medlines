import { Directive, Input, Output, HostBinding, EventEmitter, ContentChildren, HostListener } from "@angular/core";
import { FocusKeyManager } from "@angular/cdk/a11y";
import { FocusKeyListItemDirective } from "./focus-key-list-item.directive";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
export class FocusKeyListDirective {
    constructor() {
        this.activeItem = -1;
        this.withWrap = true;
        this.itemSelect = new EventEmitter();
        this.role = "list";
    }
    ngOnChanges() {
        if (this.keyManager) {
            this.keyManager.setActiveItem(this.activeItem);
        }
    }
    ngAfterContentInit() {
        this.keyManager = new FocusKeyManager(this.components);
        if (this.withWrap) {
            this.keyManager.withWrap();
        }
        if (this.activeItem >= 0 && this.components.length > 0) {
            Utils.delay().then(() => {
                this.keyManager.setActiveItem(this.activeItem);
            });
        }
    }
    onKeydown(event) {
        this.keyManager.onKeydown(event);
        this.itemSelect.emit(this.keyManager.activeItemIndex !== null ? this.keyManager.activeItemIndex : undefined);
    }
}
FocusKeyListDirective.ɵfac = function FocusKeyListDirective_Factory(t) { return new (t || FocusKeyListDirective)(); };
FocusKeyListDirective.ɵdir = i0.ɵɵdefineDirective({ type: FocusKeyListDirective, selectors: [["", "sqFocusKeyList", ""]], contentQueries: function FocusKeyListDirective_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, FocusKeyListItemDirective, false);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.components = _t);
    } }, hostVars: 1, hostBindings: function FocusKeyListDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("keydown", function FocusKeyListDirective_keydown_HostBindingHandler($event) { return ctx.onKeydown($event); });
    } if (rf & 2) {
        i0.ɵɵattribute("role", ctx.role);
    } }, inputs: { activeItem: "activeItem", withWrap: "withWrap" }, outputs: { itemSelect: "itemSelect" }, features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FocusKeyListDirective, [{
        type: Directive,
        args: [{
                selector: "[sqFocusKeyList]"
            }]
    }], null, { activeItem: [{
            type: Input
        }], withWrap: [{
            type: Input
        }], itemSelect: [{
            type: Output
        }], role: [{
            type: HostBinding,
            args: ["attr.role"]
        }], components: [{
            type: ContentChildren,
            args: [FocusKeyListItemDirective]
        }], onKeydown: [{
            type: HostListener,
            args: ["keydown", ["$event"]]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMta2V5LWxpc3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvdXRpbHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2ZvY3VzLWtleS1saXN0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFDeEQsZUFBZSxFQUFhLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUszQyxNQUFNLE9BQU8scUJBQXFCO0lBSGxDO1FBSWEsZUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDZixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUN4QixTQUFJLEdBQUcsTUFBTSxDQUFDO0tBMkIzQztJQXZCRyxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNsRDtJQUNMLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksZUFBZSxDQUE0QixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEYsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM5QjtRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3BELEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFHRCxTQUFTLENBQUMsS0FBSztRQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pILENBQUM7OzBGQTlCUSxxQkFBcUI7MERBQXJCLHFCQUFxQjtvQ0FLYix5QkFBeUI7Ozs7OzRHQUxqQyxxQkFBaUI7Ozs7a0RBQWpCLHFCQUFxQjtjQUhqQyxTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjthQUMvQjtnQkFFWSxVQUFVO2tCQUFsQixLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUNJLFVBQVU7a0JBQW5CLE1BQU07WUFDbUIsSUFBSTtrQkFBN0IsV0FBVzttQkFBQyxXQUFXO1lBQ29CLFVBQVU7a0JBQXJELGVBQWU7bUJBQUMseUJBQXlCO1lBc0IxQyxTQUFTO2tCQURSLFlBQVk7bUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBIb3N0QmluZGluZywgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIEhvc3RMaXN0ZW5lciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY2RrL2ExMXlcIjtcbmltcG9ydCB7IEZvY3VzS2V5TGlzdEl0ZW1EaXJlY3RpdmUgfSBmcm9tIFwiLi9mb2N1cy1rZXktbGlzdC1pdGVtLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzcUZvY3VzS2V5TGlzdF1cIlxufSlcbmV4cG9ydCBjbGFzcyBGb2N1c0tleUxpc3REaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xuICAgIEBJbnB1dCgpIGFjdGl2ZUl0ZW0gPSAtMTtcbiAgICBASW5wdXQoKSB3aXRoV3JhcCA9IHRydWU7XG4gICAgQE91dHB1dCgpIGl0ZW1TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgICBASG9zdEJpbmRpbmcoXCJhdHRyLnJvbGVcIikgcm9sZSA9IFwibGlzdFwiO1xuICAgIEBDb250ZW50Q2hpbGRyZW4oRm9jdXNLZXlMaXN0SXRlbURpcmVjdGl2ZSkgY29tcG9uZW50czogUXVlcnlMaXN0PEZvY3VzS2V5TGlzdEl0ZW1EaXJlY3RpdmU+O1xuICAgIHByb3RlY3RlZCBrZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8Rm9jdXNLZXlMaXN0SXRlbURpcmVjdGl2ZT47XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgaWYgKHRoaXMua2V5TWFuYWdlcikge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0odGhpcy5hY3RpdmVJdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcjxGb2N1c0tleUxpc3RJdGVtRGlyZWN0aXZlPih0aGlzLmNvbXBvbmVudHMpO1xuICAgICAgICBpZiAodGhpcy53aXRoV3JhcCkge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLndpdGhXcmFwKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlSXRlbSA+PSAwICYmIHRoaXMuY29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBVdGlscy5kZWxheSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKHRoaXMuYWN0aXZlSXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJrZXlkb3duXCIsIFtcIiRldmVudFwiXSlcbiAgICBvbktleWRvd24oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgIHRoaXMuaXRlbVNlbGVjdC5lbWl0KHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggIT09IG51bGwgPyB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4IDogdW5kZWZpbmVkKTtcbiAgICB9XG59XG4iXX0=