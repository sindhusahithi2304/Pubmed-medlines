import { __awaiter } from "tslib";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { map, flatMap } from "rxjs/operators";
import { Utils } from "@sinequa/core/base";
import { AppService } from "@sinequa/core/app-utils";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
import * as i2 from "@sinequa/core/app-utils";
export class SuggestService {
    constructor(suggestQueryWebService, suggestFieldWebService, appService) {
        this.suggestQueryWebService = suggestQueryWebService;
        this.suggestFieldWebService = suggestFieldWebService;
        this.appService = appService;
        this.fieldCategory = "$field$";
    }
    addFields(text, suggests) {
        if (text.includes(" ")) {
            return;
        }
        for (const field of this.appService.fields) {
            if (Utils.startsWith(field, text)) {
                suggests.unshift({
                    category: this.fieldCategory,
                    display: field
                });
            }
        }
    }
    get(suggestQuery, text, fields, query) {
        if (!this.appService.ccquery) {
            return of([]);
        }
        const observable = this.suggestQueryWebService.get(suggestQuery, text, this.appService.ccquery.name, fields);
        return observable.pipe(flatMap(suggests => {
            if (!fields) {
                if (!suggests) {
                    suggests = [];
                }
                this.addFields(text, suggests);
            }
            else {
                if (!suggests || suggests.length === 0) {
                    const _fields = Utils.isArray(fields) ? fields : [fields];
                    fields = [];
                    for (const field of _fields) {
                        const column = this.appService.getColumn(field);
                        if (!!column && (column.eType === 15 /* csv */ || AppService.isScalar(column))) {
                            fields.push(field);
                        }
                    }
                    if (fields.length > 0) {
                        return this.suggestFieldWebService.get(text, fields, query).pipe(map((suggests) => {
                            suggests.forEach(value => value.display = Utils.toSqlValue(value.display)); // because dates get automatically converted by the interceptor
                            return suggests;
                        }));
                    }
                }
            }
            return of(suggests);
        }));
    }
    /**
     * Search for the input text in a list of objects and return autocomplete items asynchronously
     * @param query The text to search for
     * @param data The list of objects
     * @param primaryText A function that returns the primary text input given the object
     * @param secondaryText An (optional) function that returns a list of secondary text inputs given the object
     */
    searchData(category, query, data, primaryText, secondaryText, label) {
        return __awaiter(this, void 0, void 0, function* () {
            return data
                .map(obj => SuggestService.findMatch(primaryText(obj), query, !!secondaryText ? secondaryText(obj) : [], obj)) // Look for matches in all saved queries
                .filter(item => !!item) // Keep only the matches
                .sort((a, b) => b.score - a.score) // Sort by decreasing score
                .map(item => {
                item = item;
                return {
                    display: item.display,
                    displayHtml: item.displayHtml,
                    category,
                    label: label || category,
                    data: item.data,
                    score: item.score
                };
            });
        });
    }
    /**
     * Searches for the query string inside a given text. Returns a match object containing:
     * - a score proportional to the number and quality of matches
     * - the text formatted as HTML with the query found in the text
     * @param text The text to search
     * @param query The string to search for
     * @param secondaryText Secondary fields to search input, with less importance than the primary field
     * @param data A data object to be included in the match object (for convenience mostly)
     */
    static findMatch(text, query, secondaryText, data) {
        if (!text || !query) {
            return undefined;
        }
        // pass text and query in lower case and no accent to make search case insensitive
        const textLower = Utils.removeAccents(text.toLowerCase());
        query = Utils.removeAccents(query.toLowerCase());
        let i = 0;
        const matches = [];
        let score = 0;
        // Compute score of the match
        i = textLower.indexOf(query);
        while (i !== -1) { // While there's a match
            matches.push(i);
            if (i === 0) { // Start of the text
                score += 4;
            }
            else if (textLower[i - 1] === " ") { // Start of a word
                score += 2;
            }
            else {
                score += 1; // Middle of a word
            }
            i = textLower.indexOf(query, i + query.length);
        }
        // Format HTML display
        let html = text;
        for (let j = matches.length - 1; j >= 0; j--) { // decreasing order so the indices remain valid
            i = matches[j];
            html = html.slice(0, i).concat("<strong>", html.slice(i, i + query.length), "</strong>", html.slice(i + query.length));
        }
        // Secondary text
        if (secondaryText) {
            secondaryText
                .map(t => this.findMatch(t, query)) // Search each secondary text for matches
                .filter(item => !!item) // Keep only the matches
                .sort((a, b) => b.score - a.score) // Sort by decreasing score
                .forEach(match => {
                match = match;
                score += match.score / 2; // Secondary matches added to the score, but count half
                html += " <small>" + match.displayHtml + "</small>"; // Concatenate secondary match html to the main html
            });
        }
        if (score > 0) {
            return {
                display: text,
                displayHtml: html,
                score: score,
                data: data
            };
        }
        return undefined;
    }
}
SuggestService.ɵfac = function SuggestService_Factory(t) { return new (t || SuggestService)(i0.ɵɵinject(i1.SuggestQueryWebService), i0.ɵɵinject(i1.SuggestFieldWebService), i0.ɵɵinject(i2.AppService)); };
SuggestService.ɵprov = i0.ɵɵdefineInjectable({ token: SuggestService, factory: SuggestService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SuggestService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: i1.SuggestQueryWebService }, { type: i1.SuggestFieldWebService }, { type: i2.AppService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnZ2VzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLyIsInNvdXJjZXMiOlsic3VnZ2VzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBYSxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFekMsT0FBTyxFQUFDLFVBQVUsRUFBUSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBTTFELE1BQU0sT0FBTyxjQUFjO0lBSXZCLFlBQ1ksc0JBQThDLEVBQzlDLHNCQUE4QyxFQUM5QyxVQUFzQjtRQUZ0QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDOUMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRU8sU0FBUyxDQUFDLElBQVksRUFBRSxRQUFzQjtRQUNsRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEIsT0FBTztTQUNWO1FBQ0QsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUMvQixRQUFRLENBQUMsT0FBTyxDQUFDO29CQUNiLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYTtvQkFDNUIsT0FBTyxFQUFFLEtBQUs7aUJBQ2pCLENBQUMsQ0FBQzthQUNOO1NBQ0o7SUFDTCxD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QyxFQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBRSxDQUFDLEtBQUssR0FBRyxDQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsMkJBQTJCO2lCQUM5RCxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2IsS0FBSyxHQUFHLEtBQU0sQ0FBQztnQkFDZixLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBRSx1REFBdUQ7Z0JBQ2xGLElBQUksSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsQ0FBQyxvREFBb0Q7WUFDN0csQ0FBQyxDQUFDLENBQUM7U0FDVjtRQUVELElBQUcsS0FBSyxHQUFHLENBQUMsRUFBQztZQUNULE9BQU87Z0JBQ0gsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxJQUFJO2FBQ2IsQ0FBQztTQUNMO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQzs7NEVBbEtRLGNBQWM7c0RBQWQsY0FBYyxXQUFkLGNBQWMsbUJBRlgsTUFBTTtrREFFVCxjQUFjO2NBSDFCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2Z9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge21hcCwgZmxhdE1hcH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge1N1Z2dlc3RRdWVyeVdlYlNlcnZpY2UsIFN1Z2dlc3RGaWVsZFdlYlNlcnZpY2UsIFN1Z2dlc3Rpb24sIEVuZ2luZVR5cGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtBcHBTZXJ2aWNlLCBRdWVyeX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYXBwLXV0aWxzXCI7XG5pbXBvcnQge0F1dG9jb21wbGV0ZUl0ZW19IGZyb20gJy4vYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBTdWdnZXN0U2VydmljZSB7XG5cbiAgICBmaWVsZENhdGVnb3J5OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzdWdnZXN0UXVlcnlXZWJTZXJ2aWNlOiBTdWdnZXN0UXVlcnlXZWJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHN1Z2dlc3RGaWVsZFdlYlNlcnZpY2U6IFN1Z2dlc3RGaWVsZFdlYlNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgYXBwU2VydmljZTogQXBwU2VydmljZSkge1xuICAgICAgICB0aGlzLmZpZWxkQ2F0ZWdvcnkgPSBcIiRmaWVsZCRcIjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZEZpZWxkcyh0ZXh0OiBzdHJpbmcsIHN1Z2dlc3RzOiBTdWdnZXN0aW9uW10pIHtcbiAgICAgICAgaWYgKHRleHQuaW5jbHVkZXMoXCIgXCIpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiB0aGlzLmFwcFNlcnZpY2UuZmllbGRzKSB7XG4gICAgICAgICAgICBpZiAoVXRpbHMuc3RhcnRzV2l0aChmaWVsZCwgdGV4dCkpIHtcbiAgICAgICAgICAgICAgICBzdWdnZXN0cy51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHRoaXMuZmllbGRDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmllbGRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldChzdWdnZXN0UXVlcnk6IHN0cmluZywgdGV4dDogc3RyaW5nLCBmaWVsZHM/OiBzdHJpbmcgfCBzdHJpbmdbXSwgcXVlcnk/OiBRdWVyeSk6IE9ic2VydmFibGU8U3VnZ2VzdGlvbltdPiB7XG4gICAgICAgIGlmICghdGhpcy5hcHBTZXJ2aWNlLmNjcXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBvZihbXSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IHRoaXMuc3VnZ2VzdFF1ZXJ5V2ViU2VydmljZS5nZXQoc3VnZ2VzdFF1ZXJ5LCB0ZXh0LCB0aGlzLmFwcFNlcnZpY2UuY2NxdWVyeS5uYW1lLCBmaWVsZHMpO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKFxuICAgICAgICAgICAgZmxhdE1hcChzdWdnZXN0cyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFmaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdWdnZXN0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEZpZWxkcyh0ZXh0LCBzdWdnZXN0cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXN1Z2dlc3RzIHx8IHN1Z2dlc3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgX2ZpZWxkcyA9IFV0aWxzLmlzQXJyYXkoZmllbGRzKSA/IGZpZWxkcyA6IFtmaWVsZHNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkIG9mIF9maWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmFwcFNlcnZpY2UuZ2V0Q29sdW1uKGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFjb2x1bW4gJiYgKGNvbHVtbi5lVHlwZSA9PT0gRW5naW5lVHlwZS5jc3YgfHwgQXBwU2VydmljZS5pc1NjYWxhcihjb2x1bW4pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHMucHVzaChmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3VnZ2VzdEZpZWxkV2ViU2VydmljZS5nZXQodGV4dCwgZmllbGRzLCBxdWVyeSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKChzdWdnZXN0cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdHMuZm9yRWFjaCh2YWx1ZSA9PiB2YWx1ZS5kaXNwbGF5ID0gVXRpbHMudG9TcWxWYWx1ZSh2YWx1ZS5kaXNwbGF5KSk7IC8vIGJlY2F1c2UgZGF0ZXMgZ2V0IGF1dG9tYXRpY2FsbHkgY29udmVydGVkIGJ5IHRoZSBpbnRlcmNlcHRvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1Z2dlc3RzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKHN1Z2dlc3RzKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3IgdGhlIGlucHV0IHRleHQgaW4gYSBsaXN0IG9mIG9iamVjdHMgYW5kIHJldHVybiBhdXRvY29tcGxldGUgaXRlbXMgYXN5bmNocm9ub3VzbHlcbiAgICAgKiBAcGFyYW0gcXVlcnkgVGhlIHRleHQgdG8gc2VhcmNoIGZvclxuICAgICAqIEBwYXJhbSBkYXRhIFRoZSBsaXN0IG9mIG9iamVjdHNcbiAgICAgKiBAcGFyYW0gcHJpbWFyeVRleHQgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHByaW1hcnkgdGV4dCBpbnB1dCBnaXZlbiB0aGUgb2JqZWN0XG4gICAgICogQHBhcmFtIHNlY29uZGFyeVRleHQgQW4gKG9wdGlvbmFsKSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBsaXN0IG9mIHNlY29uZGFyeSB0ZXh0IGlucHV0cyBnaXZlbiB0aGUgb2JqZWN0XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNlYXJjaERhdGE8VD4oXG4gICAgICAgIGNhdGVnb3J5OiBzdHJpbmcsXG4gICAgICAgIHF1ZXJ5OiBzdHJpbmcsXG4gICAgICAgIGRhdGE6IFRbXSxcbiAgICAgICAgcHJpbWFyeVRleHQ6IChvYmo6VCkgPT4gc3RyaW5nLFxuICAgICAgICBzZWNvbmRhcnlUZXh0PzogKG9iajpUKSA9PiBzdHJpbmdbXSxcbiAgICAgICAgbGFiZWw/OiBzdHJpbmcpIDogUHJvbWlzZTxBdXRvY29tcGxldGVJdGVtW10+IHtcblxuICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgICAgICAgLm1hcChvYmogPT4gU3VnZ2VzdFNlcnZpY2UuZmluZE1hdGNoKHByaW1hcnlUZXh0KG9iaiksIHF1ZXJ5LFxuICAgICAgICAgICAgICAgICEhc2Vjb25kYXJ5VGV4dCA/IHNlY29uZGFyeVRleHQob2JqKSA6IFtdLCBvYmopKSAvLyBMb29rIGZvciBtYXRjaGVzIGluIGFsbCBzYXZlZCBxdWVyaWVzXG4gICAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gISFpdGVtKSAvLyBLZWVwIG9ubHkgdGhlIG1hdGNoZXNcbiAgICAgICAgICAgIC5zb3J0KChhLGIpID0+IGIhLnNjb3JlIC0gYSEuc2NvcmUpIC8vIFNvcnQgYnkgZGVjcmVhc2luZyBzY29yZVxuICAgICAgICAgICAgLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlbSE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgICAgLy8gTWFrZSBhbiBhdXRvY29tcGxldGUgaXRlbVxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBpdGVtLmRpc3BsYXksXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlIdG1sOiBpdGVtLmRpc3BsYXlIdG1sLFxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsIHx8IGNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBpdGVtLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOiBpdGVtLnNjb3JlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2hlcyBmb3IgdGhlIHF1ZXJ5IHN0cmluZyBpbnNpZGUgYSBnaXZlbiB0ZXh0LiBSZXR1cm5zIGEgbWF0Y2ggb2JqZWN0IGNvbnRhaW5pbmc6XG4gICAgICogLSBhIHNjb3JlIHByb3BvcnRpb25hbCB0byB0aGUgbnVtYmVyIGFuZCBxdWFsaXR5IG9mIG1hdGNoZXNcbiAgICAgKiAtIHRoZSB0ZXh0IGZvcm1hdHRlZCBhcyBIVE1MIHdpdGggdGhlIHF1ZXJ5IGZvdW5kIGluIHRoZSB0ZXh0XG4gICAgICogQHBhcmFtIHRleHQgVGhlIHRleHQgdG8gc2VhcmNoXG4gICAgICogQHBhcmFtIHF1ZXJ5IFRoZSBzdHJpbmcgdG8gc2VhcmNoIGZvclxuICAgICAqIEBwYXJhbSBzZWNvbmRhcnlUZXh0IFNlY29uZGFyeSBmaWVsZHMgdG8gc2VhcmNoIGlucHV0LCB3aXRoIGxlc3MgaW1wb3J0YW5jZSB0aGFuIHRoZSBwcmltYXJ5IGZpZWxkXG4gICAgICogQHBhcmFtIGRhdGEgQSBkYXRhIG9iamVjdCB0byBiZSBpbmNsdWRlZCBpbiB0aGUgbWF0Y2ggb2JqZWN0IChmb3IgY29udmVuaWVuY2UgbW9zdGx5KVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZmluZE1hdGNoKHRleHQ6IHN0cmluZywgcXVlcnk6IHN0cmluZywgc2Vjb25kYXJ5VGV4dD86IHN0cmluZ1tdLCBkYXRhPzogYW55KToge2Rpc3BsYXk6IHN0cmluZywgZGlzcGxheUh0bWw6IHN0cmluZywgc2NvcmU6IG51bWJlciwgZGF0YT86YW55fSB8IHVuZGVmaW5lZCB7XG5cbiAgICAgICAgaWYoIXRleHQgfHwgIXF1ZXJ5KXtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwYXNzIHRleHQgYW5kIHF1ZXJ5IGluIGxvd2VyIGNhc2UgYW5kIG5vIGFjY2VudCB0byBtYWtlIHNlYXJjaCBjYXNlIGluc2Vuc2l0aXZlXG4gICAgICAgIGNvbnN0IHRleHRMb3dlciA9IFV0aWxzLnJlbW92ZUFjY2VudHModGV4dC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgcXVlcnkgPSBVdGlscy5yZW1vdmVBY2NlbnRzKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGNvbnN0IG1hdGNoZXM6IG51bWJlcltdID0gW107XG4gICAgICAgIGxldCBzY29yZSA9IDA7XG5cbiAgICAgICAgLy8gQ29tcHV0ZSBzY29yZSBvZiB0aGUgbWF0Y2hcbiAgICAgICAgaSA9IHRleHRMb3dlci5pbmRleE9mKHF1ZXJ5KTtcbiAgICAgICAgd2hpbGUoaSAhPT0gLTEpeyAgICAvLyBXaGlsZSB0aGVyZSdzIGEgbWF0Y2hcbiAgICAgICAgICAgIG1hdGNoZXMucHVzaChpKTtcbiAgICAgICAgICAgIGlmKGkgPT09IDApeyAgICAvLyBTdGFydCBvZiB0aGUgdGV4dFxuICAgICAgICAgICAgICAgIHNjb3JlICs9IDQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHRleHRMb3dlcltpLTFdID09PSBcIiBcIil7IC8vIFN0YXJ0IG9mIGEgd29yZFxuICAgICAgICAgICAgICAgIHNjb3JlICs9IDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY29yZSArPSAxOyAvLyBNaWRkbGUgb2YgYSB3b3JkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gdGV4dExvd2VyLmluZGV4T2YocXVlcnksIGkrcXVlcnkubGVuZ3RoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZvcm1hdCBIVE1MIGRpc3BsYXlcbiAgICAgICAgbGV0IGh0bWwgPSB0ZXh0O1xuICAgICAgICBmb3IobGV0IGo9bWF0Y2hlcy5sZW5ndGgtMTsgaj49MDsgai0tKSB7IC8vIGRlY3JlYXNpbmcgb3JkZXIgc28gdGhlIGluZGljZXMgcmVtYWluIHZhbGlkXG4gICAgICAgICAgICBpID0gbWF0Y2hlc1tqXTtcbiAgICAgICAgICAgIGh0bWwgPSBodG1sLnNsaWNlKDAsIGkpLmNvbmNhdChcIjxzdHJvbmc+XCIsIGh0bWwuc2xpY2UoaSwgaStxdWVyeS5sZW5ndGgpLCBcIjwvc3Ryb25nPlwiLCBodG1sLnNsaWNlKGkrcXVlcnkubGVuZ3RoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZWNvbmRhcnkgdGV4dFxuICAgICAgICBpZihzZWNvbmRhcnlUZXh0KSB7XG4gICAgICAgICAgICBzZWNvbmRhcnlUZXh0XG4gICAgICAgICAgICAgICAgLm1hcCh0ID0+IHRoaXMuZmluZE1hdGNoKHQsIHF1ZXJ5KSkgLy8gU2VhcmNoIGVhY2ggc2Vjb25kYXJ5IHRleHQgZm9yIG1hdGNoZXNcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gISFpdGVtKSAvLyBLZWVwIG9ubHkgdGhlIG1hdGNoZXNcbiAgICAgICAgICAgICAgICAuc29ydCgoYSxiKSA9PiBiIS5zY29yZSAtIGEhLnNjb3JlKSAvLyBTb3J0IGJ5IGRlY3JlYXNpbmcgc2NvcmVcbiAgICAgICAgICAgICAgICAuZm9yRWFjaChtYXRjaCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoID0gbWF0Y2ghO1xuICAgICAgICAgICAgICAgICAgICBzY29yZSArPSBtYXRjaC5zY29yZSAvIDI7ICAvLyBTZWNvbmRhcnkgbWF0Y2hlcyBhZGRlZCB0byB0aGUgc2NvcmUsIGJ1dCBjb3VudCBoYWxmXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gXCIgPHNtYWxsPlwiICsgbWF0Y2guZGlzcGxheUh0bWwgKyBcIjwvc21hbGw+XCI7IC8vIENvbmNhdGVuYXRlIHNlY29uZGFyeSBtYXRjaCBodG1sIHRvIHRoZSBtYWluIGh0bWxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNjb3JlID4gMCl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IHRleHQsXG4gICAgICAgICAgICAgICAgZGlzcGxheUh0bWw6IGh0bWwsXG4gICAgICAgICAgICAgICAgc2NvcmU6IHNjb3JlLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59Il19