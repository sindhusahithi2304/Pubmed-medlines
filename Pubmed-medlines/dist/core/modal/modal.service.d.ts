import { Type, Injector, InjectionToken } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";
import { Overlay } from '@angular/cdk/overlay';
import { MessageParams } from "@sinequa/core/intl";
import { IModalRef } from "./modal-ref";
import * as i0 from "@angular/core";
/** Describes the configuration object that can be passed when opening
 * a modal with the {@link ModalService}.
 */
export interface ModalConfig {
    /**
     * Classes that should be added to the `Overlay` pane.
     */
    panelClass?: string | string[];
    /**
     * Indicates whether a backdrop should be added when opening the modal.
     */
    hasBackdrop?: boolean;
    /**
     * Classes that should be added to the backdrop.
     */
    backdropClass?: string | string[];
    /**
     * The data model that the modal will operate on.
     */
    model?: any;
    /**
     * The CSS width of the modal.
     */
    width?: string;
    /**
     * The CSS height of the modal.
     */
    height?: string;
    /**
     * Indicates whether the modal should occupy the screen width and height. In this case
     * `width` and `height` are set to `100%` and the `sq-modal-fullscreen` class is added
     * to `panelClass`
     */
    fullscreen?: boolean;
    /**
     * Indicates whether a click on the backdrop should close the modal. The default value
     * is `true`.
     */
    closeOnBackdropClick?: boolean;
}
/**
 * The `MODAL_MODEL` injection token can be used to access the modal's model in
 * the the modal component. The value is `provided` from the value set in the
 * {@link ModalConfig} options when the modal is opened.
 */
export declare const MODAL_MODEL: InjectionToken<any>;
/**
 * The possible result values that can be set when a modal is closed. Buttons in a modal
 * have an associated `ModalResult` value. All buttons except those with a `Custom` result
 * value will close the modal when they are clicked.
 */
export declare const enum ModalResult {
    OK = -1,
    Cancel = -2,
    Yes = -3,
    No = -4,
    Abort = -5,
    Retry = -6,
    Ignore = -7,
    Custom = 0
}
/**
 * An enumeration of the types of confirm modals. The type of the confirm modal
 * can be reflected in the icon and/or colors used.
 */
export declare const enum ConfirmType {
    Success = 0,
    Info = 1,
    Warning = 2,
    Error = 3
}
/**
 * Describes the options that can be passed to the [ModalService.confirm]{@link ModalService#confirm}
 * method.
 */
export interface ConfirmOptions {
    /**
     * The title of the confirm modal.
     */
    title?: string;
    /**
     * The message dispayed in the confirm modal.
     */
    message: string;
    /**
     * Any parameters for the `message`.
     */
    messageParams?: MessageParams;
    /**
     * The type of the confirm modal.
     */
    confirmType?: ConfirmType;
    /**
     * The buttons to display in the confirm modal.
     */
    buttons: ModalButton[];
}
/**
 * Describes the options that can be passed to the [ModalService.prompt]{@link ModalService#prompt}
 * method.
 */
export interface PromptOptions extends ConfirmOptions {
    /**
     * text written by the user in the prompt input
     */
    output: string;
    /**
     * List of validators for the input form control
     */
    validators?: ValidatorFn[];
    /**
     * If omitted, a single-line input is displayed. If specified, a textarea with the
     * given number of rows is displayed
     */
    rowCount?: number;
}
/**
 * Describes the options that can be used when creating an instance of a {@link ModalButton}.
 */
export interface IModalButton {
    /**
     * The result associated with the button.
     */
    result: ModalResult;
    /**
     * Indicates whether this button is the primary button amongst a set of buttons.
     */
    primary?: boolean;
    /**
     * The button text.
     */
    text?: string;
    /**
     * Indicates whether the button is currently visible.
     */
    visible?: boolean;
    /**
     * The validation `FormGroup` that should be tested when the button is clicked.
     * The button will only perform its `action` when the validation is `valid`.
     */
    validation?: FormGroup;
    /**
     * Indicats whether the button should be rendered with an `<a>` tag rather than
     * a `<button>` tag.
     */
    anchor?: boolean;
    /**
     * The action to perform when the button is clicked. Buttons with `result` values other
     * than `Custom` also close the modal.
     */
    action?: (button: ModalButton) => void;
}
/**
 * A class representing a button displayed in a modal.
 */
export declare class ModalButton implements IModalButton {
    /**
     * The result associated with the button.
     */
    result: ModalResult;
    /**
     * Indicates whether this button is the primary button amongst a set of buttons.
     */
    primary: boolean;
    /**
     * The button text.
     */
    text: string;
    /**
     * Indicates whether the button is currently visible.
     */
    visible: boolean;
    /**
     * The validation `FormGroup` that should be tested when the button is clicked.
     * The button will only perform its `action` when the validation is `valid`.
     */
    validation: FormGroup;
    /**
     * Indicats whether the button should be rendered with an `<a>` tag rather than
     * a `<button>` tag.
     */
    anchor: boolean;
    /**
     * The action to perform when the button is clicked. Buttons with `result` values other
     * than `Custom` also close the modal.
     */
    action: (button: ModalButton) => void;
    constructor(options: IModalButton);
    /**
     * Get the button text. Buttons with non-custom result types
     * have default text depending on their result type -
     * `msg#modal.buttons.ok`, `msg#modal.buttons.cancel` etc
     */
    getText(): string;
    /**
     * Perform a click on a button. The button's explicit action is performed if set and
     * the modal closed with the button's modal result if the `result` type is non-`Custom`.
     * If the validation status not `valid` this method returns without performing any action.
     *
     * @param closer An object with a `close` method. If the result type is non-custom then
     * the `close` method of this object is called.
     */
    click(closer: {
        close(result: any): void;
    }): void;
}
/**
 * An injection token to set the component to use for the `confirm` modal displayed
 * by the [ModalService.confirm]{@link ModalService#confirm} method.
 */
export declare const MODAL_CONFIRM: InjectionToken<Type<any>>;
/**
 * An injection token to set the component to use for the `prompt` modal displayed
 * by the [ModalService.prompt]{@link ModalService#confirm} method.
 */
export declare const MODAL_PROMPT: InjectionToken<Type<any>>;
/**
 * A service to open modal dialogs.
 */
export declare class ModalService {
    protected injector: Injector;
    protected overlay: Overlay;
    protected confirmModal: Type<any>;
    protected promptModal: Type<any>;
    constructor(injector: Injector, overlay: Overlay, confirmModal: Type<any>, promptModal: Type<any>);
    /**
     * Open a modal dialog using the passed configuration options.
     *
     * @param component The type of the component to use for the modal.
     * @param config Configuration options for the modal.
     * @retuns An `IModalRef` object that can be used to close the modal.
     */
    openRef(component: Type<any>, config?: ModalConfig): IModalRef;
    /**
     * A wrapper around the {@link #openRef} method which returns a `Promise` that resolves
     * with the `ModalResult` when the modal is closed.
     *
     * @param component The type of the component to use for the modal.
     * @param config Configuration options for the modal.
     * @retuns The `ModalResult` when the modal is closed.
     */
    open(component: Type<any>, config?: ModalConfig): Promise<ModalResult>;
    private createOverlay;
    private attachDialogContainer;
    private getOverlayConfig;
    /**
     * Open a confirmation modal dialog displaying a message and a set buttons. This is similar to the Javacsript
     * `Window.alert` method but renders a modal.
     *
     * @param options The options used to open the confirm modal. These are set as the `MODAL_MODEL`  of the modal.
     */
    confirm(options: ConfirmOptions): Promise<ModalResult>;
    /**
     * Open a prompt modal dialog displaying a message, an input and OK/Cancel buttons.
     *
     * @param options The options used to open the prompt modal. These are set as the `MODAL_MODEL`  of the modal.
     */
    prompt(options: PromptOptions): Promise<ModalResult>;
    /**
     * Open a confirm modal that has an `OK` button.
     *
     * @param message The message to display in the modal.
     * @param messageParams The parameters for the message.
     * @param title The confirm modal's title.
     * @param confirmType The type of the confirm modal.
     */
    oK(message: string, messageParams?: MessageParams, title?: string, confirmType?: ConfirmType): Promise<ModalResult>;
    /**
     * Open a confirm modal that has `OK` and `Cancel` buttons.
     *
     * @param message The message to display in the modal.
     * @param messageParams The parameters for the message.
     * @param title The confirm modal's title.
     * @param confirmType The type of the confirm modal.
     * @param primaryButton The result type of the button which should be primary.
     */
    oKCancel(message: string, messageParams?: MessageParams, title?: string, confirmType?: ConfirmType, primaryButton?: ModalResult): Promise<ModalResult>;
    /**
     * Open a confirm modal that has `Yes` and `No` buttons.
     *
     * @param message The message to display in the modal.
     * @param messageParams The parameters for the message.
     * @param title The confirm modal's title.
     * @param confirmType The type of the confirm modal.
     * @param primaryButton The result type of the button which should be primary.
     */
    yesNo(message: string, messageParams?: MessageParams, title?: string, confirmType?: ConfirmType, primaryButton?: ModalResult): Promise<ModalResult>;
    static ɵfac: i0.ɵɵFactoryDef<ModalService, never>;
    static ɵprov: i0.ɵɵInjectableDef<ModalService>;
}
//# sourceMappingURL=modal.service.d.ts.map