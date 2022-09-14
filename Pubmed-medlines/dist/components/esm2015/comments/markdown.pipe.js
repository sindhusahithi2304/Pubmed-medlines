import { Pipe } from "@angular/core";
import * as marked from "marked";
import * as i0 from "@angular/core";
export class MarkdownPipe {
    transform(value) {
        if (value && value.length > 0) {
            return marked(value);
        }
        return value;
    }
}
MarkdownPipe.ɵfac = function MarkdownPipe_Factory(t) { return new (t || MarkdownPipe)(); };
MarkdownPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqMarkdown", type: MarkdownPipe, pure: true });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MarkdownPipe, [{
        type: Pipe,
        args: [{
                name: "sqMarkdown"
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2NvbW1lbnRzLyIsInNvdXJjZXMiOlsibWFya2Rvd24ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQzs7QUFLakMsTUFBTSxPQUFPLFlBQVk7SUFDdkIsU0FBUyxDQUFDLEtBQVU7UUFDbEIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0IsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O3dFQU5VLFlBQVk7aUVBQVosWUFBWTtrREFBWixZQUFZO2NBSHhCLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsWUFBWTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgKiBhcyBtYXJrZWQgZnJvbSBcIm1hcmtlZFwiO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6IFwic3FNYXJrZG93blwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXJrZG93blBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSk6IGFueSB7XHJcbiAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gbWFya2VkKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcbn0iXX0=