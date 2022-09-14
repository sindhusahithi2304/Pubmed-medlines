import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/intl";
const _c0 = function (a0) { return { values: a0 }; };
/**
 * A default component to be used by the {@link ValidationDirective} directive to display
 * a validation error message using {@link MessagePipe}.
 */
export class ValidationMessageComponent {
}
ValidationMessageComponent.ɵfac = function ValidationMessageComponent_Factory(t) { return new (t || ValidationMessageComponent)(); };
ValidationMessageComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ValidationMessageComponent, selectors: [["sq-validation-message"]], inputs: { text: "text", info: "info" }, decls: 3, vars: 6, consts: [[1, "sq-validation-message"]], template: function ValidationMessageComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtext(1);
        i0.ɵɵpipe(2, "sqMessage");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, ctx.text, i0.ɵɵpureFunction1(4, _c0, ctx.info)));
    } }, pipes: [i1.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ValidationMessageComponent, [{
        type: Component,
        args: [{
                selector: "sq-validation-message",
                template: `
        <div class="sq-validation-message">{{text | sqMessage:{values: info} }}</div>
    `
            }]
    }], null, { text: [{
            type: Input
        }], info: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1tZXNzYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3ZhbGlkYXRpb24vIiwic291cmNlcyI6WyJ2YWxpZGF0aW9uLW1lc3NhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7O0FBRS9DOzs7R0FHRztBQU9ILE1BQU0sT0FBTywwQkFBMEI7O29HQUExQiwwQkFBMEI7K0RBQTFCLDBCQUEwQjtRQUgvQiw4QkFBbUM7UUFBQSxZQUFvQzs7UUFBQSxpQkFBTTs7UUFBMUMsZUFBb0M7UUFBcEMsMEZBQW9DOztrREFHbEUsMEJBQTBCO2NBTnRDLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7O0tBRVQ7YUFDSjtnQkFLWSxJQUFJO2tCQUFaLEtBQUs7WUFLRyxJQUFJO2tCQUFaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbi8qKlxuICogQSBkZWZhdWx0IGNvbXBvbmVudCB0byBiZSB1c2VkIGJ5IHRoZSB7QGxpbmsgVmFsaWRhdGlvbkRpcmVjdGl2ZX0gZGlyZWN0aXZlIHRvIGRpc3BsYXlcbiAqIGEgdmFsaWRhdGlvbiBlcnJvciBtZXNzYWdlIHVzaW5nIHtAbGluayBNZXNzYWdlUGlwZX0uXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLXZhbGlkYXRpb24tbWVzc2FnZVwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcS12YWxpZGF0aW9uLW1lc3NhZ2VcIj57e3RleHQgfCBzcU1lc3NhZ2U6e3ZhbHVlczogaW5mb30gfX08L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25NZXNzYWdlQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBUaGUgZXJyb3IgbWVzc2FnZSB0ZXh0IHBhc3NlZCB0byB0aGUgYHNxTWVzc2FnZWAgcGlwZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKSB0ZXh0OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIGVudHJ5IGZvciB0aGUgdmFsaWRhdG9yIGluIGEgYFZhbGlkYXRpb25FcnJvcnNgIG9iamVjdC4gVGhpcyBpcyBwYXNzZWRcbiAgICAgKiBhcyB0aGUgdmFsdWVzIHRvIHRoZSBgc3FNZXNzYWdlYCBwaXBlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGluZm86IGFueTtcbn1cbiJdfQ==