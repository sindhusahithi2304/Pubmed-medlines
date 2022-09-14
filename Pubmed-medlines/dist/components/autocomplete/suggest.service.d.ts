import { Observable } from "rxjs";
import { SuggestQueryWebService, SuggestFieldWebService, Suggestion } from "@sinequa/core/web-services";
import { AppService, Query } from "@sinequa/core/app-utils";
import { AutocompleteItem } from './autocomplete.directive';
import * as i0 from "@angular/core";
export declare class SuggestService {
    private suggestQueryWebService;
    private suggestFieldWebService;
    private appService;
    fieldCategory: string;
    constructor(suggestQueryWebService: SuggestQueryWebService, suggestFieldWebService: SuggestFieldWebService, appService: AppService);
    private addFields;
    get(suggestQuery: string, text: string, fields?: string | string[], query?: Query): Observable<Suggestion[]>;
    /**
     * Search for the input text in a list of objects and return autocomplete items asynchronously
     * @param query The text to search for
     * @param data The list of objects
     * @param primaryText A function that returns the primary text input given the object
     * @param secondaryText An (optional) function that returns a list of secondary text inputs given the object
     */
    searchData<T>(category: string, query: string, data: T[], primaryText: (obj: T) => string, secondaryText?: (obj: T) => string[], label?: string): Promise<AutocompleteItem[]>;
    /**
     * Searches for the query string inside a given text. Returns a match object containing:
     * - a score proportional to the number and quality of matches
     * - the text formatted as HTML with the query found in the text
     * @param text The text to search
     * @param query The string to search for
     * @param secondaryText Secondary fields to search input, with less importance than the primary field
     * @param data A data object to be included in the match object (for convenience mostly)
     */
    static findMatch(text: string, query: string, secondaryText?: string[], data?: any): {
        display: string;
        displayHtml: string;
        score: number;
        data?: any;
    } | undefined;
    static ɵfac: i0.ɵɵFactoryDef<SuggestService, never>;
    static ɵprov: i0.ɵɵInjectableDef<SuggestService>;
}
//# sourceMappingURL=suggest.service.d.ts.map