import { Type } from "@angular/core";
import { OverlayRef } from '@angular/cdk/overlay';
import { Observable } from "rxjs";
import { ModalResult } from "./modal.service";
/**
 * Describes the event raised by an {@link IModalRef} instance before a modal dialog is closed.
 */
export interface CheckCloseEvent {
    /**
     * The result passed to the [IModalRef.close]{@link IModalRef#close} method.
     */
    result: ModalResult;
    /**
     * A flag that can be set by the event receiver to indicate that the closing of the modal dialog
     * should be cancelled.
     */
    cancelled?: Observable<boolean>;
}
/**
 * Describes the object returned by the [ModalService.openRef]{@link ModalService.openRef} method
 * to maintain a reference to the opened modal.
 */
export interface IModalRef {
    /**
     * The component instance of the referenced modal component.
     */
    componentInstance: Type<any> | undefined;
    /**
     * A stream that emits before the referenced modal is closed to allow an observer
     * to cancel the closing.
     */
    checkClose(): Observable<CheckCloseEvent>;
    /**
     * A stream that emits before the referenced modal is closed.
     */
    beforeClosed(): Observable<ModalResult>;
    /**
     * A stream that emits after the referenced modal is closed.
     */
    afterClosed(): Observable<ModalResult>;
    /**
     * Close the referenced modal with the passed `result`.
     * @param result The referenced modal's result.
     */
    close(result: ModalResult): any;
}
/**
 * An implementation of the {@link IModalRef} interface.
 */
export declare class ModalRef implements IModalRef {
    private overlayRef;
    /**
     * The component instance of the referenced modal component.
     */
    componentInstance: Type<any> | undefined;
    /**
     * A flag indicating whether the referenced modal has been submitted.
     */
    submitted: boolean;
    private _checkClose;
    private _beforeClosed;
    private _afterClosed;
    private formElement;
    constructor(overlayRef: OverlayRef);
    /**
     * A stream that emits before the referenced modal is closed to allow an observer
     * to cancel the closing.
     */
    checkClose(): Observable<CheckCloseEvent>;
    /**
     * A stream that emits before the referenced modal is closed.
     */
    beforeClosed(): Observable<ModalResult>;
    /**
     * A stream that emits aftervthe referenced modal is closed.
     */
    afterClosed(): Observable<ModalResult>;
    /**
     * Close the referenced modal with the passed `result`.
     * @param result The referenced modal's result.
     */
    close(result?: ModalResult): void;
    private submitListener;
    /**
     * Disable the standard browser submit handling on any HTML form in the modal component.
     */
    disableSubmit(): void;
    private removeSubmitListener;
}
//# sourceMappingURL=modal-ref.d.ts.map