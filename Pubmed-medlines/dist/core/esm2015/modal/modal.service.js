import { Injectable, Inject, Injector, InjectionToken } from "@angular/core";
import { OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Utils, Keys } from "@sinequa/core/base";
import { ModalRef } from "./modal-ref";
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
const DEFAULT_CONFIG = {
    hasBackdrop: true,
    backdropClass: ["cdk-overlay-dark-backdrop", "sq-modal-backdrop"],
    panelClass: "sq-modal-pane",
    model: null,
    closeOnBackdropClick: true
};
/**
 * The `MODAL_MODEL` injection token can be used to access the modal's model in
 * the the modal component. The value is `provided` from the value set in the
 * {@link ModalConfig} options when the modal is opened.
 */
export const MODAL_MODEL = new InjectionToken('MODAL_MODEL');
/**
 * A class representing a button displayed in a modal.
 */
export class ModalButton {
    constructor(options) {
        Utils.extend(this, { visible: true, anchor: false }, options);
    }
    /**
     * Get the button text. Buttons with non-custom result types
     * have default text depending on their result type -
     * `msg#modal.buttons.ok`, `msg#modal.buttons.cancel` etc
     */
    getText() {
        if (this.text) {
            return this.text;
        }
        switch (this.result) {
            case -1 /* OK */:
                return "msg#modal.buttons.ok";
            case -2 /* Cancel */:
                return "msg#modal.buttons.cancel";
            case -3 /* Yes */:
                return "msg#modal.buttons.yes";
            case -4 /* No */:
                return "msg#modal.buttons.no";
            case -5 /* Abort */:
                return "msg#modal.buttons.abort";
            case -6 /* Retry */:
                return "msg#modal.buttons.retry";
            case -7 /* Ignore */:
                return "msg#modal.buttons.ignore";
            default:
                return "";
        }
    }
    /**
     * Perform a click on a button. The button's explicit action is performed if set and
     * the modal closed with the button's modal result if the `result` type is non-`Custom`.
     * If the validation status not `valid` this method returns without performing any action.
     *
     * @param closer An object with a `close` method. If the result type is non-custom then
     * the `close` method of this object is called.
     */
    click(closer) {
        if (this.validation && !this.validation.valid) {
            return;
        }
        if (this.action) {
            this.action(this);
        }
        if (this.result !== 0 /* Custom */) {
            closer.close(this.result);
        }
    }
}
/**
 * An injection token to set the component to use for the `confirm` modal displayed
 * by the [ModalService.confirm]{@link ModalService#confirm} method.
 */
export const MODAL_CONFIRM = new InjectionToken('MODAL_CONFIRM');
/**
 * An injection token to set the component to use for the `prompt` modal displayed
 * by the [ModalService.prompt]{@link ModalService#confirm} method.
 */
export const MODAL_PROMPT = new InjectionToken('MODAL_PROMPT');
/**
 * A service to open modal dialogs.
 */
export class ModalService {
    constructor(injector, overlay, confirmModal, promptModal) {
        this.injector = injector;
        this.overlay = overlay;
        this.confirmModal = confirmModal;
        this.promptModal = promptModal;
    }
    /**
     * Open a modal dialog using the passed configuration options.
     *
     * @param component The type of the component to use for the modal.
     * @param config Configuration options for the modal.
     * @retuns An `IModalRef` object that can be used to close the modal.
     */
    openRef(component, config = {}) {
        // Override default configuration
        const modalConfig = Object.assign(Object.assign({}, DEFAULT_CONFIG), config);
        if (modalConfig.fullscreen) {
            modalConfig.width = "100%";
            modalConfig.height = "100%";
            if (Utils.isString(modalConfig.panelClass)) {
                modalConfig.panelClass = [modalConfig.panelClass, "sq-modal-fullscreen"];
            }
            else if (modalConfig.panelClass) {
                modalConfig.panelClass.push("sq-modal-fullscreen");
            }
            else {
                modalConfig.panelClass = "sq-modal-fullscreen";
            }
        }
        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(modalConfig);
        // Instantiate remote control
        const modalRef = new ModalRef(overlayRef);
        const overlayComponent = this.attachDialogContainer(component, overlayRef, modalConfig, modalRef);
        modalRef.componentInstance = overlayComponent;
        overlayRef.hostElement.classList.add("sq-modal-host");
        if (modalConfig.closeOnBackdropClick) {
            // NB backdropClick will not fire if pointer-events are enabled on modal-host
            overlayRef.backdropClick().subscribe(() => modalRef.close());
            // Provide support for a scrollable sq-modal-host (overlay wrapper)
            // The standard cdk styling disables pointer-events at this level which means that scrolling
            // won't work. We can enable pointer-events in css but then the backdrop will not receive the
            // click event. So, we handle the click event directly on sq-modal-host also and if the
            // click target === sq-modal-host then we initiate modal closing here
            overlayRef.hostElement.addEventListener("click", (event) => {
                if (event.target === overlayRef.hostElement) {
                    modalRef.close();
                }
            });
        }
        overlayRef.keydownEvents().subscribe((event) => {
            if (event.keyCode === Keys.esc) {
                modalRef.close();
            }
        });
        modalRef.disableSubmit();
        return modalRef;
    }
    /**
     * A wrapper around the {@link #openRef} method which returns a `Promise` that resolves
     * with the `ModalResult` when the modal is closed.
     *
     * @param component The type of the component to use for the modal.
     * @param config Configuration options for the modal.
     * @retuns The `ModalResult` when the modal is closed.
     */
    open(component, config = {}) {
        const modalRef = this.openRef(component, config);
        return modalRef.afterClosed().toPromise();
    }
    createOverlay(config) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }
    attachDialogContainer(component, overlayRef, config, modalRef) {
        // PortalInjector() is deprecated
        const injector = Injector.create({
            providers: [
                { provide: ModalRef, useValue: modalRef },
                { provide: MODAL_MODEL, useValue: config.model }
            ],
            parent: this.injector
        });
        const containerPortal = new ComponentPortal(component, null, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    getOverlayConfig(config) {
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });
        return overlayConfig;
    }
    /**
     * Open a confirmation modal dialog displaying a message and a set buttons. This is similar to the Javacsript
     * `Window.alert` method but renders a modal.
     *
     * @param options The options used to open the confirm modal. These are set as the `MODAL_MODEL`  of the modal.
     */
    confirm(options) {
        return this.open(this.confirmModal, { model: options });
    }
    /**
     * Open a prompt modal dialog displaying a message, an input and OK/Cancel buttons.
     *
     * @param options The options used to open the prompt modal. These are set as the `MODAL_MODEL`  of the modal.
     */
    prompt(options) {
        return this.open(this.promptModal, { model: options });
    }
    /**
     * Open a confirm modal that has an `OK` button.
     *
     * @param message The message to display in the modal.
     * @param messageParams The parameters for the message.
     * @param title The confirm modal's title.
     * @param confirmType The type of the confirm modal.
     */
    oK(message, messageParams, title, confirmType = 0 /* Success */) {
        return this.confirm({
            title,
            message,
            messageParams,
            confirmType,
            buttons: [
                new ModalButton({ visible: true, result: -1 /* OK */, primary: true })
            ]
        });
    }
    /**
     * Open a confirm modal that has `OK` and `Cancel` buttons.
     *
     * @param message The message to display in the modal.
     * @param messageParams The parameters for the message.
     * @param title The confirm modal's title.
     * @param confirmType The type of the confirm modal.
     * @param primaryButton The result type of the button which should be primary.
     */
    oKCancel(message, messageParams, title, confirmType = 1 /* Info */, primaryButton = -1 /* OK */) {
        return this.confirm({
            title,
            message,
            messageParams,
            confirmType,
            buttons: [
                new ModalButton({ visible: true, result: -1 /* OK */, primary: primaryButton === -1 /* OK */ }),
                new ModalButton({ visible: true, result: -2 /* Cancel */, primary: primaryButton === -2 /* Cancel */ })
            ]
        });
    }
    /**
     * Open a confirm modal that has `Yes` and `No` buttons.
     *
     * @param message The message to display in the modal.
     * @param messageParams The parameters for the message.
     * @param title The confirm modal's title.
     * @param confirmType The type of the confirm modal.
     * @param primaryButton The result type of the button which should be primary.
     */
    yesNo(message, messageParams, title, confirmType = 1 /* Info */, primaryButton = -3 /* Yes */) {
        return this.confirm({
            title,
            message,
            messageParams,
            confirmType,
            buttons: [
                new ModalButton({ visible: true, result: -3 /* Yes */, primary: primaryButton === -3 /* Yes */ }),
                new ModalButton({ visible: true, result: -4 /* No */, primary: primaryButton === -4 /* No */ })
            ]
        });
    }
}
ModalService.ɵfac = function ModalService_Factory(t) { return new (t || ModalService)(i0.ɵɵinject(i0.Injector), i0.ɵɵinject(i1.Overlay), i0.ɵɵinject(MODAL_CONFIRM), i0.ɵɵinject(MODAL_PROMPT)); };
ModalService.ɵprov = i0.ɵɵdefineInjectable({ token: ModalService, factory: ModalService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ModalService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: i0.Injector }, { type: i1.Overlay }, { type: i0.Type, decorators: [{
                type: Inject,
                args: [MODAL_CONFIRM]
            }] }, { type: i0.Type, decorators: [{
                type: Inject,
                args: [MODAL_PROMPT]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL21vZGFsLyIsInNvdXJjZXMiOlsibW9kYWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBUSxRQUFRLEVBQUUsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpGLE9BQU8sRUFBVSxhQUFhLEVBQWEsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUUvQyxPQUFPLEVBQUMsUUFBUSxFQUFZLE1BQU0sYUFBYSxDQUFDOzs7QUEyQ2hELE1BQU0sY0FBYyxHQUFnQjtJQUNoQyxXQUFXLEVBQUUsSUFBSTtJQUNqQixhQUFhLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxtQkFBbUIsQ0FBQztJQUNqRSxVQUFVLEVBQUUsZUFBZTtJQUMzQixLQUFLLEVBQUUsSUFBSTtJQUNYLG9CQUFvQixFQUFFLElBQUk7Q0FDN0IsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxjQUFjLENBQU0sYUFBYSxDQUFDLENBQUM7QUFrSGxFOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFdBQVc7SUFrQ3BCLFlBQVksT0FBcUI7UUFDN0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE9BQU87UUFDSCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDcEI7UUFDRCxRQUFRLElBQUksQ0FB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LEVBQ2QsV0FBVyxlQUFtQixFQUM5QixhQUFhLGVBQWtCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNoQixLQUFLO1lBQ0wsT0FBTztZQUNQLGFBQWE7WUFDYixXQUFXO1lBQ1gsT0FBTyxFQUFFO2dCQUNMLElBQUksV0FBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGNBQWlCLEVBQUUsT0FBTyxFQUFFLGFBQWEsaUJBQW9CLEVBQUUsQ0FBQztnQkFDdkcsSUFBSSxXQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBZ0IsRUFBRSxPQUFPLEVBQUUsYUFBYSxnQkFBbUIsRUFBRSxDQUFDO2FBQ3hHO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7d0VBL01RLFlBQVksaUVBSVQsYUFBYSxlQUNiLFlBQVk7b0RBTGYsWUFBWSxXQUFaLFlBQVksbUJBRlQsTUFBTTtrREFFVCxZQUFZO2NBSHhCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBS1EsTUFBTTt1QkFBQyxhQUFhOztzQkFDcEIsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3QsIFR5cGUsIEluamVjdG9yLCBJbmplY3Rpb25Ub2tlbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Rm9ybUdyb3VwLCBWYWxpZGF0b3JGbn0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge092ZXJsYXksIE92ZXJsYXlDb25maWcsIE92ZXJsYXlSZWZ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7Q29tcG9uZW50UG9ydGFsfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7VXRpbHMsIEtleXN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7TWVzc2FnZVBhcmFtc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiOyAvLyBEZXBlbmRlbmN5IHRvIElOVEwgIVxuaW1wb3J0IHtNb2RhbFJlZiwgSU1vZGFsUmVmfSBmcm9tIFwiLi9tb2RhbC1yZWZcIjtcblxuLyoqIERlc2NyaWJlcyB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgdGhhdCBjYW4gYmUgcGFzc2VkIHdoZW4gb3BlbmluZ1xuICogYSBtb2RhbCB3aXRoIHRoZSB7QGxpbmsgTW9kYWxTZXJ2aWNlfS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNb2RhbENvbmZpZyB7XG4gICAgLyoqXG4gICAgICogQ2xhc3NlcyB0aGF0IHNob3VsZCBiZSBhZGRlZCB0byB0aGUgYE92ZXJsYXlgIHBhbmUuXG4gICAgICovXG4gICAgcGFuZWxDbGFzcz86IHN0cmluZyB8IHN0cmluZ1tdO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIGEgYmFja2Ryb3Agc2hvdWxkIGJlIGFkZGVkIHdoZW4gb3BlbmluZyB0aGUgbW9kYWwuXG4gICAgICovXG4gICAgaGFzQmFja2Ryb3A/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIENsYXNzZXMgdGhhdCBzaG91bGQgYmUgYWRkZWQgdG8gdGhlIGJhY2tkcm9wLlxuICAgICAqL1xuICAgIGJhY2tkcm9wQ2xhc3M/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgICAvKipcbiAgICAgKiBUaGUgZGF0YSBtb2RlbCB0aGF0IHRoZSBtb2RhbCB3aWxsIG9wZXJhdGUgb24uXG4gICAgICovXG4gICAgbW9kZWw/OiBhbnk7XG4gICAgLyoqXG4gICAgICogVGhlIENTUyB3aWR0aCBvZiB0aGUgbW9kYWwuXG4gICAgICovXG4gICAgd2lkdGg/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIENTUyBoZWlnaHQgb2YgdGhlIG1vZGFsLlxuICAgICAqL1xuICAgIGhlaWdodD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgbW9kYWwgc2hvdWxkIG9jY3VweSB0aGUgc2NyZWVuIHdpZHRoIGFuZCBoZWlnaHQuIEluIHRoaXMgY2FzZVxuICAgICAqIGB3aWR0aGAgYW5kIGBoZWlnaHRgIGFyZSBzZXQgdG8gYDEwMCVgIGFuZCB0aGUgYHNxLW1vZGFsLWZ1bGxzY3JlZW5gIGNsYXNzIGlzIGFkZGVkXG4gICAgICogdG8gYHBhbmVsQ2xhc3NgXG4gICAgICovXG4gICAgZnVsbHNjcmVlbj86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgYSBjbGljayBvbiB0aGUgYmFja2Ryb3Agc2hvdWxkIGNsb3NlIHRoZSBtb2RhbC4gVGhlIGRlZmF1bHQgdmFsdWVcbiAgICAgKiBpcyBgdHJ1ZWAuXG4gICAgICovXG4gICAgY2xvc2VPbkJhY2tkcm9wQ2xpY2s/OiBib29sZWFuO1xufVxuXG5jb25zdCBERUZBVUxUX0NPTkZJRzogTW9kYWxDb25maWcgPSB7XG4gICAgaGFzQmFja2Ryb3A6IHRydWUsXG4gICAgYmFja2Ryb3BDbGFzczogW1wiY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcFwiLCBcInNxLW1vZGFsLWJhY2tkcm9wXCJdLFxuICAgIHBhbmVsQ2xhc3M6IFwic3EtbW9kYWwtcGFuZVwiLFxuICAgIG1vZGVsOiBudWxsLFxuICAgIGNsb3NlT25CYWNrZHJvcENsaWNrOiB0cnVlXG59O1xuXG4vKipcbiAqIFRoZSBgTU9EQUxfTU9ERUxgIGluamVjdGlvbiB0b2tlbiBjYW4gYmUgdXNlZCB0byBhY2Nlc3MgdGhlIG1vZGFsJ3MgbW9kZWwgaW5cbiAqIHRoZSB0aGUgbW9kYWwgY29tcG9uZW50LiBUaGUgdmFsdWUgaXMgYHByb3ZpZGVkYCBmcm9tIHRoZSB2YWx1ZSBzZXQgaW4gdGhlXG4gKiB7QGxpbmsgTW9kYWxDb25maWd9IG9wdGlvbnMgd2hlbiB0aGUgbW9kYWwgaXMgb3BlbmVkLlxuICovXG5leHBvcnQgY29uc3QgTU9EQUxfTU9ERUwgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignTU9EQUxfTU9ERUwnKTtcblxuLyoqXG4gKiBUaGUgcG9zc2libGUgcmVzdWx0IHZhbHVlcyB0aGF0IGNhbiBiZSBzZXQgd2hlbiBhIG1vZGFsIGlzIGNsb3NlZC4gQnV0dG9ucyBpbiBhIG1vZGFsXG4gKiBoYXZlIGFuIGFzc29jaWF0ZWQgYE1vZGFsUmVzdWx0YCB2YWx1ZS4gQWxsIGJ1dHRvbnMgZXhjZXB0IHRob3NlIHdpdGggYSBgQ3VzdG9tYCByZXN1bHRcbiAqIHZhbHVlIHdpbGwgY2xvc2UgdGhlIG1vZGFsIHdoZW4gdGhleSBhcmUgY2xpY2tlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gTW9kYWxSZXN1bHQge1xuICAgIE9LID0gLTEsXG4gICAgQ2FuY2VsID0gLTIsXG4gICAgWWVzID0gLTMsXG4gICAgTm8gPSAtNCxcbiAgICBBYm9ydCA9IC01LFxuICAgIFJldHJ5ID0gLTYsXG4gICAgSWdub3JlID0gLTcsXG4gICAgQ3VzdG9tID0gMFxufVxuXG4vKipcbiAqIEFuIGVudW1lcmF0aW9uIG9mIHRoZSB0eXBlcyBvZiBjb25maXJtIG1vZGFscy4gVGhlIHR5cGUgb2YgdGhlIGNvbmZpcm0gbW9kYWxcbiAqIGNhbiBiZSByZWZsZWN0ZWQgaW4gdGhlIGljb24gYW5kL29yIGNvbG9ycyB1c2VkLlxuICovXG5leHBvcnQgY29uc3QgZW51bSBDb25maXJtVHlwZSB7XG4gICAgU3VjY2VzcyxcbiAgICBJbmZvLFxuICAgIFdhcm5pbmcsXG4gICAgRXJyb3Jcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIG9wdGlvbnMgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIHRoZSBbTW9kYWxTZXJ2aWNlLmNvbmZpcm1de0BsaW5rIE1vZGFsU2VydmljZSNjb25maXJtfVxuICogbWV0aG9kLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1PcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBUaGUgdGl0bGUgb2YgdGhlIGNvbmZpcm0gbW9kYWwuXG4gICAgICovXG4gICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIG1lc3NhZ2UgZGlzcGF5ZWQgaW4gdGhlIGNvbmZpcm0gbW9kYWwuXG4gICAgICovXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEFueSBwYXJhbWV0ZXJzIGZvciB0aGUgYG1lc3NhZ2VgLlxuICAgICAqL1xuICAgIG1lc3NhZ2VQYXJhbXM/OiBNZXNzYWdlUGFyYW1zO1xuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9mIHRoZSBjb25maXJtIG1vZGFsLlxuICAgICAqL1xuICAgIGNvbmZpcm1UeXBlPzogQ29uZmlybVR5cGU7XG4gICAgLyoqXG4gICAgICogVGhlIGJ1dHRvbnMgdG8gZGlzcGxheSBpbiB0aGUgY29uZmlybSBtb2RhbC5cbiAgICAgKi9cbiAgICBidXR0b25zOiBNb2RhbEJ1dHRvbltdO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgb3B0aW9ucyB0aGF0IGNhbiBiZSBwYXNzZWQgdG8gdGhlIFtNb2RhbFNlcnZpY2UucHJvbXB0XXtAbGluayBNb2RhbFNlcnZpY2UjcHJvbXB0fVxuICogbWV0aG9kLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByb21wdE9wdGlvbnMgZXh0ZW5kcyBDb25maXJtT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogdGV4dCB3cml0dGVuIGJ5IHRoZSB1c2VyIGluIHRoZSBwcm9tcHQgaW5wdXRcbiAgICAgKi9cbiAgICBvdXRwdXQ6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIHZhbGlkYXRvcnMgZm9yIHRoZSBpbnB1dCBmb3JtIGNvbnRyb2xcbiAgICAgKi9cbiAgICB2YWxpZGF0b3JzPzogVmFsaWRhdG9yRm5bXTtcbiAgICAvKipcbiAgICAgKiBJZiBvbWl0dGVkLCBhIHNpbmdsZS1saW5lIGlucHV0IGlzIGRpc3BsYXllZC4gSWYgc3BlY2lmaWVkLCBhIHRleHRhcmVhIHdpdGggdGhlXG4gICAgICogZ2l2ZW4gbnVtYmVyIG9mIHJvd3MgaXMgZGlzcGxheWVkXG4gICAgICovICAgIFxuICAgIHJvd0NvdW50PzogbnVtYmVyO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgb3B0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIHdoZW4gY3JlYXRpbmcgYW4gaW5zdGFuY2Ugb2YgYSB7QGxpbmsgTW9kYWxCdXR0b259LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIElNb2RhbEJ1dHRvbiB7XG4gICAgLyoqXG4gICAgICogVGhlIHJlc3VsdCBhc3NvY2lhdGVkIHdpdGggdGhlIGJ1dHRvbi5cbiAgICAgKi9cbiAgICByZXN1bHQ6IE1vZGFsUmVzdWx0O1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoaXMgYnV0dG9uIGlzIHRoZSBwcmltYXJ5IGJ1dHRvbiBhbW9uZ3N0IGEgc2V0IG9mIGJ1dHRvbnMuXG4gICAgICovXG4gICAgcHJpbWFyeT86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVGhlIGJ1dHRvbiB0ZXh0LlxuICAgICAqL1xuICAgIHRleHQ/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGJ1dHRvbiBpcyBjdXJyZW50bHkgdmlzaWJsZS5cbiAgICAgKi9cbiAgICB2aXNpYmxlPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBUaGUgdmFsaWRhdGlvbiBgRm9ybUdyb3VwYCB0aGF0IHNob3VsZCBiZSB0ZXN0ZWQgd2hlbiB0aGUgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAgICogVGhlIGJ1dHRvbiB3aWxsIG9ubHkgcGVyZm9ybSBpdHMgYGFjdGlvbmAgd2hlbiB0aGUgdmFsaWRhdGlvbiBpcyBgdmFsaWRgLlxuICAgICAqL1xuICAgIHZhbGlkYXRpb24/OiBGb3JtR3JvdXA7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdHMgd2hldGhlciB0aGUgYnV0dG9uIHNob3VsZCBiZSByZW5kZXJlZCB3aXRoIGFuIGA8YT5gIHRhZyByYXRoZXIgdGhhblxuICAgICAqIGEgYDxidXR0b24+YCB0YWcuXG4gICAgICovXG4gICAgYW5jaG9yPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBhY3Rpb24gdG8gcGVyZm9ybSB3aGVuIHRoZSBidXR0b24gaXMgY2xpY2tlZC4gQnV0dG9ucyB3aXRoIGByZXN1bHRgIHZhbHVlcyBvdGhlclxuICAgICAqIHRoYW4gYEN1c3RvbWAgYWxzbyBjbG9zZSB0aGUgbW9kYWwuXG4gICAgICovXG4gICAgYWN0aW9uPzogKGJ1dHRvbjogTW9kYWxCdXR0b24pID0+IHZvaWQ7XG59XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRpbmcgYSBidXR0b24gZGlzcGxheWVkIGluIGEgbW9kYWwuXG4gKi9cbmV4cG9ydCBjbGFzcyBNb2RhbEJ1dHRvbiBpbXBsZW1lbnRzIElNb2RhbEJ1dHRvbiB7XG4gICAgLyoqXG4gICAgICogVGhlIHJlc3VsdCBhc3NvY2lhdGVkIHdpdGggdGhlIGJ1dHRvbi5cbiAgICAgKi9cbiAgICByZXN1bHQ6IE1vZGFsUmVzdWx0O1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoaXMgYnV0dG9uIGlzIHRoZSBwcmltYXJ5IGJ1dHRvbiBhbW9uZ3N0IGEgc2V0IG9mIGJ1dHRvbnMuXG4gICAgICovXG4gICAgcHJpbWFyeTogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBUaGUgYnV0dG9uIHRleHQuXG4gICAgICovXG4gICAgdGV4dDogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBidXR0b24gaXMgY3VycmVudGx5IHZpc2libGUuXG4gICAgICovXG4gICAgdmlzaWJsZTogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBUaGUgdmFsaWRhdGlvbiBgRm9ybUdyb3VwYCB0aGF0IHNob3VsZCBiZSB0ZXN0ZWQgd2hlbiB0aGUgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAgICogVGhlIGJ1dHRvbiB3aWxsIG9ubHkgcGVyZm9ybSBpdHMgYGFjdGlvbmAgd2hlbiB0aGUgdmFsaWRhdGlvbiBpcyBgdmFsaWRgLlxuICAgICAqL1xuICAgIHZhbGlkYXRpb246IEZvcm1Hcm91cDtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0cyB3aGV0aGVyIHRoZSBidXR0b24gc2hvdWxkIGJlIHJlbmRlcmVkIHdpdGggYW4gYDxhPmAgdGFnIHJhdGhlciB0aGFuXG4gICAgICogYSBgPGJ1dHRvbj5gIHRhZy5cbiAgICAgKi9cbiAgICBhbmNob3I6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYWN0aW9uIHRvIHBlcmZvcm0gd2hlbiB0aGUgYnV0dG9uIGlzIGNsaWNrZWQuIEJ1dHRvbnMgd2l0aCBgcmVzdWx0YCB2YWx1ZXMgb3RoZXJcbiAgICAgKiB0aGFuIGBDdXN0b21gIGFsc28gY2xvc2UgdGhlIG1vZGFsLlxuICAgICAqL1xuICAgIGFjdGlvbjogKGJ1dHRvbjogTW9kYWxCdXR0b24pID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJTW9kYWxCdXR0b24pIHtcbiAgICAgICAgVXRpbHMuZXh0ZW5kKHRoaXMsIHt2aXNpYmxlOiB0cnVlLCBhbmNob3I6IGZhbHNlfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBidXR0b24gdGV4dC4gQnV0dG9ucyB3aXRoIG5vbi1jdXN0b20gcmVzdWx0IHR5cGVzXG4gICAgICogaGF2ZSBkZWZhdWx0IHRleHQgZGVwZW5kaW5nIG9uIHRoZWlyIHJlc3VsdCB0eXBlIC1cbiAgICAgKiBgbXNnI21vZGFsLmJ1dHRvbnMub2tgLCBgbXNnI21vZGFsLmJ1dHRvbnMuY2FuY2VsYCBldGNcbiAgICAgKi9cbiAgICBnZXRUZXh0KCkge1xuICAgICAgICBpZiAodGhpcy50ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0O1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodGhpcy5yZXN1bHQpIHtcbiAgICAgICAgICAgIGNhc2UgTW9kYWxSZXN1bHQuT0s6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibXNnI21vZGFsLmJ1dHRvbnMub2tcIjtcbiAgICAgICAgICAgIGNhc2UgTW9kYWxSZXN1bHQuQ2FuY2VsOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIm1zZyNtb2RhbC5idXR0b25zLmNhbmNlbFwiO1xuICAgICAgICAgICAgY2FzZSBNb2RhbFJlc3VsdC5ZZXM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibXNnI21vZGFsLmJ1dHRvbnMueWVzXCI7XG4gICAgICAgICAgICBjYXNlIE1vZGFsUmVzdWx0Lk5vOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIm1zZyNtb2RhbC5idXR0b25zLm5vXCI7XG4gICAgICAgICAgICBjYXNlIE1vZGFsUmVzdWx0LkFib3J0OlxuICAgICAgICAgICAgICAgIHJldHVybiBcIm1zZyNtb2RhbC5idXR0b25zLmFib3J0XCI7XG4gICAgICAgICAgICBjYXNlIE1vZGFsUmVzdWx0LlJldHJ5OlxuICAgICAgICAgICAgICAgIHJldHVybiBcIm1zZyNtb2RhbC5idXR0b25zLnJldHJ5XCI7XG4gICAgICAgICAgICBjYXNlIE1vZGFsUmVzdWx0Lklnbm9yZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJtc2cjbW9kYWwuYnV0dG9ucy5pZ25vcmVcIjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgY2xpY2sgb24gYSBidXR0b24uIFRoZSBidXR0b24ncyBleHBsaWNpdCBhY3Rpb24gaXMgcGVyZm9ybWVkIGlmIHNldCBhbmRcbiAgICAgKiB0aGUgbW9kYWwgY2xvc2VkIHdpdGggdGhlIGJ1dHRvbidzIG1vZGFsIHJlc3VsdCBpZiB0aGUgYHJlc3VsdGAgdHlwZSBpcyBub24tYEN1c3RvbWAuXG4gICAgICogSWYgdGhlIHZhbGlkYXRpb24gc3RhdHVzIG5vdCBgdmFsaWRgIHRoaXMgbWV0aG9kIHJldHVybnMgd2l0aG91dCBwZXJmb3JtaW5nIGFueSBhY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2xvc2VyIEFuIG9iamVjdCB3aXRoIGEgYGNsb3NlYCBtZXRob2QuIElmIHRoZSByZXN1bHQgdHlwZSBpcyBub24tY3VzdG9tIHRoZW5cbiAgICAgKiB0aGUgYGNsb3NlYCBtZXRob2Qgb2YgdGhpcyBvYmplY3QgaXMgY2FsbGVkLlxuICAgICAqL1xuICAgIGNsaWNrKGNsb3Nlcjoge2Nsb3NlKHJlc3VsdDogYW55KTogdm9pZH0pIHtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGlvbiAmJiAhdGhpcy52YWxpZGF0aW9uLnZhbGlkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yZXN1bHQgIT09IE1vZGFsUmVzdWx0LkN1c3RvbSkge1xuICAgICAgICAgICAgY2xvc2VyLmNsb3NlKHRoaXMucmVzdWx0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBBbiBpbmplY3Rpb24gdG9rZW4gdG8gc2V0IHRoZSBjb21wb25lbnQgdG8gdXNlIGZvciB0aGUgYGNvbmZpcm1gIG1vZGFsIGRpc3BsYXllZFxuICogYnkgdGhlIFtNb2RhbFNlcnZpY2UuY29uZmlybV17QGxpbmsgTW9kYWxTZXJ2aWNlI2NvbmZpcm19IG1ldGhvZC5cbiAqL1xuZXhwb3J0IGNvbnN0IE1PREFMX0NPTkZJUk0gPSBuZXcgSW5qZWN0aW9uVG9rZW48VHlwZTxhbnk+PignTU9EQUxfQ09ORklSTScpO1xuXG4vKipcbiAqIEFuIGluamVjdGlvbiB0b2tlbiB0byBzZXQgdGhlIGNvbXBvbmVudCB0byB1c2UgZm9yIHRoZSBgcHJvbXB0YCBtb2RhbCBkaXNwbGF5ZWRcbiAqIGJ5IHRoZSBbTW9kYWxTZXJ2aWNlLnByb21wdF17QGxpbmsgTW9kYWxTZXJ2aWNlI2NvbmZpcm19IG1ldGhvZC5cbiAqL1xuZXhwb3J0IGNvbnN0IE1PREFMX1BST01QVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxUeXBlPGFueT4+KCdNT0RBTF9QUk9NUFQnKTtcblxuLyoqXG4gKiBBIHNlcnZpY2UgdG8gb3BlbiBtb2RhbCBkaWFsb2dzLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogXCJyb290XCJcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIEBJbmplY3QoTU9EQUxfQ09ORklSTSkgcHJvdGVjdGVkIGNvbmZpcm1Nb2RhbDogVHlwZTxhbnk+LFxuICAgICAgICBASW5qZWN0KE1PREFMX1BST01QVCkgcHJvdGVjdGVkIHByb21wdE1vZGFsOiBUeXBlPGFueT5cbiAgICApIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVuIGEgbW9kYWwgZGlhbG9nIHVzaW5nIHRoZSBwYXNzZWQgY29uZmlndXJhdGlvbiBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbXBvbmVudCBUaGUgdHlwZSBvZiB0aGUgY29tcG9uZW50IHRvIHVzZSBmb3IgdGhlIG1vZGFsLlxuICAgICAqIEBwYXJhbSBjb25maWcgQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgbW9kYWwuXG4gICAgICogQHJldHVucyBBbiBgSU1vZGFsUmVmYCBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byBjbG9zZSB0aGUgbW9kYWwuXG4gICAgICovXG4gICAgb3BlblJlZihjb21wb25lbnQ6IFR5cGU8YW55PiwgY29uZmlnOiBNb2RhbENvbmZpZyA9IHt9KTogSU1vZGFsUmVmIHtcbiAgICAgICAgLy8gT3ZlcnJpZGUgZGVmYXVsdCBjb25maWd1cmF0aW9uXG4gICAgICAgIGNvbnN0IG1vZGFsQ29uZmlnID0geyAuLi5ERUZBVUxUX0NPTkZJRywgLi4uY29uZmlnIH07XG4gICAgICAgIGlmIChtb2RhbENvbmZpZy5mdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBtb2RhbENvbmZpZy53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICAgICAgbW9kYWxDb25maWcuaGVpZ2h0ID0gXCIxMDAlXCI7XG4gICAgICAgICAgICBpZiAoVXRpbHMuaXNTdHJpbmcobW9kYWxDb25maWcucGFuZWxDbGFzcykpIHtcbiAgICAgICAgICAgICAgICBtb2RhbENvbmZpZy5wYW5lbENsYXNzID0gW21vZGFsQ29uZmlnLnBhbmVsQ2xhc3MsIFwic3EtbW9kYWwtZnVsbHNjcmVlblwiXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG1vZGFsQ29uZmlnLnBhbmVsQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICBtb2RhbENvbmZpZy5wYW5lbENsYXNzLnB1c2goXCJzcS1tb2RhbC1mdWxsc2NyZWVuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbW9kYWxDb25maWcucGFuZWxDbGFzcyA9IFwic3EtbW9kYWwtZnVsbHNjcmVlblwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJldHVybnMgYW4gT3ZlcmxheVJlZiB3aGljaCBpcyBhIFBvcnRhbEhvc3RcbiAgICAgICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheShtb2RhbENvbmZpZyk7XG4gICAgICAgIC8vIEluc3RhbnRpYXRlIHJlbW90ZSBjb250cm9sXG4gICAgICAgIGNvbnN0IG1vZGFsUmVmID0gbmV3IE1vZGFsUmVmKG92ZXJsYXlSZWYpO1xuICAgICAgICBjb25zdCBvdmVybGF5Q29tcG9uZW50ID0gdGhpcy5hdHRhY2hEaWFsb2dDb250YWluZXIoY29tcG9uZW50LCBvdmVybGF5UmVmLCBtb2RhbENvbmZpZywgbW9kYWxSZWYpO1xuICAgICAgICBtb2RhbFJlZi5jb21wb25lbnRJbnN0YW5jZSA9IG92ZXJsYXlDb21wb25lbnQ7XG4gICAgICAgIG92ZXJsYXlSZWYuaG9zdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNxLW1vZGFsLWhvc3RcIik7XG4gICAgICAgIGlmIChtb2RhbENvbmZpZy5jbG9zZU9uQmFja2Ryb3BDbGljaykge1xuICAgICAgICAgICAgLy8gTkIgYmFja2Ryb3BDbGljayB3aWxsIG5vdCBmaXJlIGlmIHBvaW50ZXItZXZlbnRzIGFyZSBlbmFibGVkIG9uIG1vZGFsLWhvc3RcbiAgICAgICAgICAgIG92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpLnN1YnNjcmliZSgoKSA9PiBtb2RhbFJlZi5jbG9zZSgpKTtcbiAgICAgICAgICAgIC8vIFByb3ZpZGUgc3VwcG9ydCBmb3IgYSBzY3JvbGxhYmxlIHNxLW1vZGFsLWhvc3QgKG92ZXJsYXkgd3JhcHBlcilcbiAgICAgICAgICAgIC8vIFRoZSBzdGFuZGFyZCBjZGsgc3R5bGluZyBkaXNhYmxlcyBwb2ludGVyLWV2ZW50cyBhdCB0aGlzIGxldmVsIHdoaWNoIG1lYW5zIHRoYXQgc2Nyb2xsaW5nXG4gICAgICAgICAgICAvLyB3b24ndCB3b3JrLiBXZSBjYW4gZW5hYmxlIHBvaW50ZXItZXZlbnRzIGluIGNzcyBidXQgdGhlbiB0aGUgYmFja2Ryb3Agd2lsbCBub3QgcmVjZWl2ZSB0aGVcbiAgICAgICAgICAgIC8vIGNsaWNrIGV2ZW50LiBTbywgd2UgaGFuZGxlIHRoZSBjbGljayBldmVudCBkaXJlY3RseSBvbiBzcS1tb2RhbC1ob3N0IGFsc28gYW5kIGlmIHRoZVxuICAgICAgICAgICAgLy8gY2xpY2sgdGFyZ2V0ID09PSBzcS1tb2RhbC1ob3N0IHRoZW4gd2UgaW5pdGlhdGUgbW9kYWwgY2xvc2luZyBoZXJlXG4gICAgICAgICAgICBvdmVybGF5UmVmLmhvc3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBvdmVybGF5UmVmLmhvc3RFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGFsUmVmLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEtleXMuZXNjKSB7XG4gICAgICAgICAgICAgICAgbW9kYWxSZWYuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG1vZGFsUmVmLmRpc2FibGVTdWJtaXQoKTtcbiAgICAgICAgcmV0dXJuIG1vZGFsUmVmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgd3JhcHBlciBhcm91bmQgdGhlIHtAbGluayAjb3BlblJlZn0gbWV0aG9kIHdoaWNoIHJldHVybnMgYSBgUHJvbWlzZWAgdGhhdCByZXNvbHZlc1xuICAgICAqIHdpdGggdGhlIGBNb2RhbFJlc3VsdGAgd2hlbiB0aGUgbW9kYWwgaXMgY2xvc2VkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbXBvbmVudCBUaGUgdHlwZSBvZiB0aGUgY29tcG9uZW50IHRvIHVzZSBmb3IgdGhlIG1vZGFsLlxuICAgICAqIEBwYXJhbSBjb25maWcgQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgbW9kYWwuXG4gICAgICogQHJldHVucyBUaGUgYE1vZGFsUmVzdWx0YCB3aGVuIHRoZSBtb2RhbCBpcyBjbG9zZWQuXG4gICAgICovXG4gICAgb3Blbihjb21wb25lbnQ6IFR5cGU8YW55PiwgY29uZmlnOiBNb2RhbENvbmZpZyA9IHt9KTogUHJvbWlzZTxNb2RhbFJlc3VsdD4ge1xuICAgICAgICBjb25zdCBtb2RhbFJlZiA9IHRoaXMub3BlblJlZihjb21wb25lbnQsIGNvbmZpZyk7XG4gICAgICAgIHJldHVybiBtb2RhbFJlZi5hZnRlckNsb3NlZCgpLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlT3ZlcmxheShjb25maWc6IE1vZGFsQ29uZmlnKTogT3ZlcmxheVJlZiB7XG4gICAgICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSB0aGlzLmdldE92ZXJsYXlDb25maWcoY29uZmlnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheS5jcmVhdGUob3ZlcmxheUNvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdHRhY2hEaWFsb2dDb250YWluZXIoY29tcG9uZW50OiBUeXBlPGFueT4sIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsIGNvbmZpZzogTW9kYWxDb25maWcsIG1vZGFsUmVmOiBNb2RhbFJlZikge1xuICAgICAgICAvLyBQb3J0YWxJbmplY3RvcigpIGlzIGRlcHJlY2F0ZWRcbiAgICAgICAgY29uc3QgaW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgICAgICAgcHJvdmlkZXJzOltcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogTW9kYWxSZWYsIHVzZVZhbHVlOiBtb2RhbFJlZn0sXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6IE1PREFMX01PREVMLCB1c2VWYWx1ZTogY29uZmlnLm1vZGVsfVxuICAgICAgICAgICAgXSwgXG4gICAgICAgICAgICBwYXJlbnQ6dGhpcy5pbmplY3RvclxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChjb21wb25lbnQsIG51bGwsIGluamVjdG9yKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyUmVmID0gb3ZlcmxheVJlZi5hdHRhY2g8VHlwZTxhbnk+Pihjb250YWluZXJQb3J0YWwpO1xuXG4gICAgICAgIHJldHVybiBjb250YWluZXJSZWYuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPdmVybGF5Q29uZmlnKGNvbmZpZzogTW9kYWxDb25maWcpOiBPdmVybGF5Q29uZmlnIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgICAgICAuZ2xvYmFsKClcbiAgICAgICAgICAgIC5jZW50ZXJIb3Jpem9udGFsbHkoKVxuICAgICAgICAgICAgLmNlbnRlclZlcnRpY2FsbHkoKTtcblxuICAgICAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgICAgICAgaGFzQmFja2Ryb3A6IGNvbmZpZy5oYXNCYWNrZHJvcCxcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6IGNvbmZpZy5iYWNrZHJvcENsYXNzLFxuICAgICAgICAgICAgcGFuZWxDbGFzczogY29uZmlnLnBhbmVsQ2xhc3MsXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKSxcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3lcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG92ZXJsYXlDb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiBhIGNvbmZpcm1hdGlvbiBtb2RhbCBkaWFsb2cgZGlzcGxheWluZyBhIG1lc3NhZ2UgYW5kIGEgc2V0IGJ1dHRvbnMuIFRoaXMgaXMgc2ltaWxhciB0byB0aGUgSmF2YWNzcmlwdFxuICAgICAqIGBXaW5kb3cuYWxlcnRgIG1ldGhvZCBidXQgcmVuZGVycyBhIG1vZGFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgdXNlZCB0byBvcGVuIHRoZSBjb25maXJtIG1vZGFsLiBUaGVzZSBhcmUgc2V0IGFzIHRoZSBgTU9EQUxfTU9ERUxgICBvZiB0aGUgbW9kYWwuXG4gICAgICovXG4gICAgY29uZmlybShvcHRpb25zOiBDb25maXJtT3B0aW9ucyk6IFByb21pc2U8TW9kYWxSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3Blbih0aGlzLmNvbmZpcm1Nb2RhbCwge21vZGVsOiBvcHRpb25zfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiBhIHByb21wdCBtb2RhbCBkaWFsb2cgZGlzcGxheWluZyBhIG1lc3NhZ2UsIGFuIGlucHV0IGFuZCBPSy9DYW5jZWwgYnV0dG9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIHVzZWQgdG8gb3BlbiB0aGUgcHJvbXB0IG1vZGFsLiBUaGVzZSBhcmUgc2V0IGFzIHRoZSBgTU9EQUxfTU9ERUxgICBvZiB0aGUgbW9kYWwuXG4gICAgICovXG4gICAgcHJvbXB0KG9wdGlvbnM6IFByb21wdE9wdGlvbnMpOiBQcm9taXNlPE1vZGFsUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW4odGhpcy5wcm9tcHRNb2RhbCwge21vZGVsOiBvcHRpb25zfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiBhIGNvbmZpcm0gbW9kYWwgdGhhdCBoYXMgYW4gYE9LYCBidXR0b24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IGluIHRoZSBtb2RhbC5cbiAgICAgKiBAcGFyYW0gbWVzc2FnZVBhcmFtcyBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHRpdGxlIFRoZSBjb25maXJtIG1vZGFsJ3MgdGl0bGUuXG4gICAgICogQHBhcmFtIGNvbmZpcm1UeXBlIFRoZSB0eXBlIG9mIHRoZSBjb25maXJtIG1vZGFsLlxuICAgICAqL1xuICAgIG9LKFxuICAgICAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgICAgIG1lc3NhZ2VQYXJhbXM/OiBNZXNzYWdlUGFyYW1zLFxuICAgICAgICB0aXRsZT86IHN0cmluZyxcbiAgICAgICAgY29uZmlybVR5cGUgPSBDb25maXJtVHlwZS5TdWNjZXNzKTogUHJvbWlzZTxNb2RhbFJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIG1lc3NhZ2VQYXJhbXMsXG4gICAgICAgICAgICBjb25maXJtVHlwZSxcbiAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oeyB2aXNpYmxlOiB0cnVlLCByZXN1bHQ6IE1vZGFsUmVzdWx0Lk9LLCBwcmltYXJ5OiB0cnVlIH0pXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW4gYSBjb25maXJtIG1vZGFsIHRoYXQgaGFzIGBPS2AgYW5kIGBDYW5jZWxgIGJ1dHRvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IGluIHRoZSBtb2RhbC5cbiAgICAgKiBAcGFyYW0gbWVzc2FnZVBhcmFtcyBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHRpdGxlIFRoZSBjb25maXJtIG1vZGFsJ3MgdGl0bGUuXG4gICAgICogQHBhcmFtIGNvbmZpcm1UeXBlIFRoZSB0eXBlIG9mIHRoZSBjb25maXJtIG1vZGFsLlxuICAgICAqIEBwYXJhbSBwcmltYXJ5QnV0dG9uIFRoZSByZXN1bHQgdHlwZSBvZiB0aGUgYnV0dG9uIHdoaWNoIHNob3VsZCBiZSBwcmltYXJ5LlxuICAgICAqL1xuICAgIG9LQ2FuY2VsKFxuICAgICAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgICAgIG1lc3NhZ2VQYXJhbXM/OiBNZXNzYWdlUGFyYW1zLFxuICAgICAgICB0aXRsZT86IHN0cmluZyxcbiAgICAgICAgY29uZmlybVR5cGUgPSBDb25maXJtVHlwZS5JbmZvLFxuICAgICAgICBwcmltYXJ5QnV0dG9uID0gTW9kYWxSZXN1bHQuT0spOiBQcm9taXNlPE1vZGFsUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgbWVzc2FnZVBhcmFtcyxcbiAgICAgICAgICAgIGNvbmZpcm1UeXBlLFxuICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7IHZpc2libGU6IHRydWUsIHJlc3VsdDogTW9kYWxSZXN1bHQuT0ssIHByaW1hcnk6IHByaW1hcnlCdXR0b24gPT09IE1vZGFsUmVzdWx0Lk9LIH0pLFxuICAgICAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7IHZpc2libGU6IHRydWUsIHJlc3VsdDogTW9kYWxSZXN1bHQuQ2FuY2VsLCBwcmltYXJ5OiBwcmltYXJ5QnV0dG9uID09PSBNb2RhbFJlc3VsdC5DYW5jZWwgfSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiBhIGNvbmZpcm0gbW9kYWwgdGhhdCBoYXMgYFllc2AgYW5kIGBOb2AgYnV0dG9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgaW4gdGhlIG1vZGFsLlxuICAgICAqIEBwYXJhbSBtZXNzYWdlUGFyYW1zIFRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0gdGl0bGUgVGhlIGNvbmZpcm0gbW9kYWwncyB0aXRsZS5cbiAgICAgKiBAcGFyYW0gY29uZmlybVR5cGUgVGhlIHR5cGUgb2YgdGhlIGNvbmZpcm0gbW9kYWwuXG4gICAgICogQHBhcmFtIHByaW1hcnlCdXR0b24gVGhlIHJlc3VsdCB0eXBlIG9mIHRoZSBidXR0b24gd2hpY2ggc2hvdWxkIGJlIHByaW1hcnkuXG4gICAgICovXG4gICAgeWVzTm8oXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgbWVzc2FnZVBhcmFtcz86IE1lc3NhZ2VQYXJhbXMsXG4gICAgICAgIHRpdGxlPzogc3RyaW5nLFxuICAgICAgICBjb25maXJtVHlwZSA9IENvbmZpcm1UeXBlLkluZm8sXG4gICAgICAgIHByaW1hcnlCdXR0b24gPSBNb2RhbFJlc3VsdC5ZZXMpOiBQcm9taXNlPE1vZGFsUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgbWVzc2FnZVBhcmFtcyxcbiAgICAgICAgICAgIGNvbmZpcm1UeXBlLFxuICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7IHZpc2libGU6IHRydWUsIHJlc3VsdDogTW9kYWxSZXN1bHQuWWVzLCBwcmltYXJ5OiBwcmltYXJ5QnV0dG9uID09PSBNb2RhbFJlc3VsdC5ZZXMgfSksXG4gICAgICAgICAgICAgICAgbmV3IE1vZGFsQnV0dG9uKHsgdmlzaWJsZTogdHJ1ZSwgcmVzdWx0OiBNb2RhbFJlc3VsdC5ObywgcHJpbWFyeTogcHJpbWFyeUJ1dHRvbiA9PT0gTW9kYWxSZXN1bHQuTm8gfSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19