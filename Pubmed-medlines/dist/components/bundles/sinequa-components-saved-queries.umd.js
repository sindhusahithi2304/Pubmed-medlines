(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@sinequa/core/web-services'), require('@sinequa/core/app-utils'), require('@sinequa/core/base'), require('@sinequa/components/action'), require('@sinequa/components/search'), require('@sinequa/core/modal'), require('@sinequa/components/selection'), require('@angular/forms'), require('@sinequa/components/modal'), require('@sinequa/components/utils'), require('@sinequa/core/validation'), require('@sinequa/core/intl'), require('@sinequa/core/notification'), require('@angular/common'), require('@angular/cdk/drag-drop'), require('@angular/router'), require('@sinequa/core/login'), require('@sinequa/components/facet')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/saved-queries', ['exports', '@angular/core', 'rxjs', '@sinequa/core/web-services', '@sinequa/core/app-utils', '@sinequa/core/base', '@sinequa/components/action', '@sinequa/components/search', '@sinequa/core/modal', '@sinequa/components/selection', '@angular/forms', '@sinequa/components/modal', '@sinequa/components/utils', '@sinequa/core/validation', '@sinequa/core/intl', '@sinequa/core/notification', '@angular/common', '@angular/cdk/drag-drop', '@angular/router', '@sinequa/core/login', '@sinequa/components/facet'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components['saved-queries'] = {}), global.ng.core, global.rxjs, global.sinequa.core['web-services'], global.sinequa.core['app-utils'], global.sinequa.core.base, global.sinequa.components.action, global.sinequa.components.search, global.sinequa.core.modal, global.sinequa.components.selection, global.ng.forms, global.sinequa.components.modal, global.sinequa.components.utils, global.sinequa.core.validation, global.sinequa.core.intl, global.sinequa.core.notification, global.ng.common, global.ng.cdk.dragDrop, global.ng.router, global.sinequa.core.login, global.sinequa.components.facet));
}(this, (function (exports, i0, rxjs, i1, i4, base, i3, i2, i3$1, i5, i1$1, i3$2, i3$3, i5$1, i6, i6$1, i4$1, i5$2, i3$4, i1$2, facet) { 'use strict';

    // Types of events triggering a change event
    var SAVED_QUERIES_CHANGE_EVENTS = [
        "SavedQuery_Add" /* Add */,
        "SavedQuery_Delete" /* Delete */,
        "SavedQuery_DeleteAll" /* DeleteAll */,
        "SavedQuery_Rename" /* Rename */,
        "SavedQuery_Update" /* Update */
    ];
    var SAVEDQUERY_COMPONENTS = new i0.InjectionToken('SAVEDQUERY_COMPONENTS');
    var SavedQueriesService = /** @class */ (function () {
        function SavedQueriesService(userSettingsService, searchService, modalService, appService, queryExportService, downloadService, selectionService, savedQueryComponents) {
            var _this = this;
            this.userSettingsService = userSettingsService;
            this.searchService = searchService;
            this.modalService = modalService;
            this.appService = appService;
            this.queryExportService = queryExportService;
            this.downloadService = downloadService;
            this.selectionService = selectionService;
            this.savedQueryComponents = savedQueryComponents;
            this._events = new rxjs.Subject();
            this._changes = new rxjs.Subject();
            // Listen to the user settings
            this.userSettingsService.events.subscribe(function (event) {
                // E.g. new login occurs
                // ==> Menus need to be rebuilt
                _this._events.next({ type: "SavedQuery_Loaded" /* Loaded */ });
            });
            // Listen to own events, to trigger change events
            this._events.subscribe(function (event) {
                if (SAVED_QUERIES_CHANGE_EVENTS.indexOf(event.type) !== -1) {
                    _this.changes.next(event);
                }
            });
            // Initialize selection action
            this.selectedRecordsAction = new i3.Action({
                icon: 'fas fa-download',
                title: 'msg#exportQuery.btnTitle',
                action: function (_item, _event) {
                    _this.exportModal(_this.selectionService.haveSelectedRecords
                        ? i1.ExportSourceType.Selection
                        : i1.ExportSourceType.Result);
                },
            });
        }
        Object.defineProperty(SavedQueriesService.prototype, "savedqueries", {
            // GETTERS
            /**
             * Returns the list of this user's saved queries.
             * The list is stored in the user settings (this is a redirection).
             * Using this service creates the list of saved queries if it does not already exist.
             */
            get: function () {
                if (!this.userSettingsService.userSettings)
                    this.userSettingsService.userSettings = {};
                if (!this.userSettingsService.userSettings["savedQueries"])
                    this.userSettingsService.userSettings["savedQueries"] = [];
                return this.userSettingsService.userSettings["savedQueries"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SavedQueriesService.prototype, "events", {
            /**
             * Triggers any event among SavedQueryChangeEvent
             * (use for fine-grained control of saved queries workflow)
             */
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SavedQueriesService.prototype, "changes", {
            /**
             * Triggers when events affect the list of saved queries
             * (use to refresh saved queries menus)
             * Cf. CHANGE_EVENTS list
             */
            get: function () {
                return this._changes;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SavedQueriesService.prototype, "hasSavedQuery", {
            /**
             * @returns true if there is at least one saved query
             */
            get: function () {
                return this.savedqueries.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @returns a saved query with the given name or null if it does not exist
         * @param name
         */
        SavedQueriesService.prototype.savedquery = function (name) {
            var i = this.savedqueryIndex(name);
            return i >= 0 ? this.savedqueries[i] : undefined;
        };
        SavedQueriesService.prototype.savedqueryIndex = function (name) {
            for (var i = 0, ic = this.savedqueries.length; i < ic; i++) {
                var savedquery = this.savedqueries[i];
                if (savedquery && savedquery.name === name) {
                    return i;
                }
            }
            return -1;
        };
        // CRUD
        /**
         * Creates a new saved query unless it already exists.
         * Emits an savedquery event.
         * Update the data on the server.
         * @param savedquery the savedquery to create
         * @returns true if savedquery was created
         */
        SavedQueriesService.prototype.createSavedQuery = function (savedquery) {
            if (this.savedqueryIndex(savedquery.name) >= 0)
                return false; // This savedquery already exists
            this.savedqueries.unshift(savedquery);
            this._events.next({ type: "SavedQuery_Add" /* Add */, savedquery: savedquery });
            this.patchSavedQueries([{
                    type: "SavedQuery_Add" /* Add */,
                    detail: {
                        savedquery: savedquery.name
                    }
                }]);
            return true;
        };
        /**
         * Update the saved query at the given index, unless a saved query with the same name
         * already exists in the list of saved queries.
         * Emits an Saved Query event.
         * Update the data on the server.
         * @param savedquery the saved query to update
         * @param index the index at which to update the saved query
         * @returns true if saved query was updated
         */
        SavedQueriesService.prototype.updateSavedQuery = function (savedquery, index) {
            var prevIndex = this.savedqueryIndex(savedquery.name);
            if (prevIndex !== -1 && index !== prevIndex)
                return false; // A saved query with the same name exists at a different index
            if (index >= 0 && index < this.savedqueries.length) {
                this.savedqueries.splice(index, 1, savedquery);
                this._events.next({ type: "SavedQuery_Update" /* Update */, savedquery: savedquery });
                this.patchSavedQueries([
                    {
                        type: "SavedQuery_Update" /* Update */,
                        detail: {
                            savedquery: savedquery.name
                        }
                    }
                ]);
                return true;
            }
            return false; // This saved query does not exist
        };
        /**
         * Updates the full list of saved queries.
         * Emits an SavedQuery event.
         * Update the data on the server.
         * @param savedqueries the new list of saved queries
         * @param auditEvents the list of audit events to log
         */
        SavedQueriesService.prototype.updateSavedQueries = function (savedqueries, auditEvents) {
            base.Utils.arraySet(this.savedqueries, savedqueries);
            this._events.next({ type: "SavedQuery_Update" /* Update */ });
            this.patchSavedQueries(auditEvents);
            return true;
        };
        /**
         * Deletes the given SavedQuery (based on its name)
         * Emits an SavedQuery event.
         * Update the data on the server.
         * @param savedquery
         * @returns true if saved query was deleted
         */
        SavedQueriesService.prototype.deleteSavedQuery = function (savedquery) {
            var index = this.savedqueryIndex(savedquery.name);
            if (index === -1)
                return false; // Nothing to delete
            this.savedqueries.splice(index, 1);
            this._events.next({ type: "SavedQuery_Delete" /* Delete */, savedquery: savedquery });
            this.patchSavedQueries([
                {
                    type: "SavedQuery_Delete" /* Delete */,
                    detail: {
                        savedquery: savedquery.name
                    }
                }
            ]);
            return true;
        };
        /**
         * Sets this saved query to the current search context, using the search service
         */
        SavedQueriesService.prototype.setSavedQueryToCurrentQuery = function (savedquery) {
            savedquery.query = i4.Query.copy(this.searchService.query);
        };
        /**
         * Updates Saved Queries in User settings.
         * @param auditEvents : Audit Events to be triggered
         * @returns an Observable which can be used to trigger further events
         */
        SavedQueriesService.prototype.patchSavedQueries = function (auditEvents) {
            var _this = this;
            return this.userSettingsService.patch({ savedQueries: this.savedqueries }, auditEvents)
                .subscribe(function (next) {
                _this._events.next({ type: "SavedQuery_Patched" /* Patched */ });
            }, function (error) {
                console.error("Could not patch Saved queries!", error);
            });
        };
        SavedQueriesService.prototype.rssHref = function (item) {
            return base.Utils.addSearchParams(this.appService.appWebService.makeUrl("query.rss"), {
                app: this.appService.appName,
                name: item.name
            });
        };
        SavedQueriesService.prototype.hasRssEnabled = function () {
            return !!this.appService.app && !!this.appService.app.queryRssEnabled;
        };
        /**
         * Checks if there is a configuration for the export web service.
         *
         * @returns true if there is a configuration for the export web service.
         */
        SavedQueriesService.prototype.hasExportConfig = function () {
            return !!this.appService.app && !!this.appService.app.queryExport;
        };
        SavedQueriesService.prototype.download = function (model) {
            return this.downloadService.download(this.requestExport(model));
        };
        SavedQueriesService.prototype.requestExport = function (model) {
            switch (model.export) {
                case i1.ExportSourceType.Result:
                    return this.queryExportService.exportResult(model.webService, this.searchService.query, this.searchService.results, model.format, model.maxCount, model.exportedColumns);
                case i1.ExportSourceType.Selection:
                    return this.queryExportService.exportSelection(model.webService, this.searchService.query, this.searchService.results, this.selectionService.getSelectedIds(), model.format, model.maxCount, model.exportedColumns);
                case i1.ExportSourceType.SavedQuery:
                    return this.queryExportService.exportSavedQuery(model.webService, model.queryName || "", model.format, model.maxCount, model.exportedColumns);
                default:
                    console.log('QueryExporter.export unexpected export type: ', i1.ExportSourceType[model.export]);
                    return rxjs.throwError('QueryExporter.export unexpected export type: ');
            }
        };
        // EVENT HANDLERS (Menus)
        /**
         * Uses the SearchService to perform a search returning all
         * the documents matching this saved query.
         * @param saved query
         * @returns the search service promise
         */
        SavedQueriesService.prototype.searchSavedQuery = function (savedquery, path) {
            this.searchService.setQuery(base.Utils.extend(this.searchService.makeQuery(), base.Utils.copy(savedquery.query)));
            this._events.next({ type: "Search_SavedQuery" /* Search */, savedquery: savedquery });
            return this.searchService.search({ path: path }, {
                type: "Search_SavedQuery" /* Search */,
                detail: {
                    "saved-query": savedquery.name
                }
            });
        };
        /**
         * Opens a dialog allowing a user to save the current query.
         * @returns a boolean promise resolved when the user closes the dialog
         * the result is true if the query was saved.
         */
        SavedQueriesService.prototype.createSavedQueryModal = function (query) {
            var _this = this;
            if (query === void 0) { query = this.searchService.query; }
            var savedQuery = {
                name: query.text || "",
                query: i4.Query.copy(query)
            };
            return this.modalService.open(this.savedQueryComponents.editSavedQueryModal, { model: savedQuery })
                .then(function (result) {
                if (result === -1 /* OK */) {
                    var index_1 = _this.savedqueryIndex(savedQuery.name);
                    if (index_1 !== -1) {
                        return _this.modalService.yesNo("msg#savedQueries.savedQueryAlreadyExists")
                            .then(function (result) {
                            if (result === -3 /* Yes */) {
                                return _this.updateSavedQuery(savedQuery, index_1);
                            }
                            return false;
                        });
                    }
                    else {
                        return _this.createSavedQuery(savedQuery);
                    }
                }
                return false;
            });
        };
        /**
         * Opens a dialog allowing a user to reorganize and edit the
         * list of saved queries.
         * @returns a boolean promise resolved when the user closes the dialog
         * the result is true is the list was updated.
         */
        SavedQueriesService.prototype.manageSavedQueriesModal = function () {
            var _this = this;
            var model = { savedQueries: base.Utils.copy(this.savedqueries) };
            return this.modalService.open(this.savedQueryComponents.manageSavedQueriesModal, { model: model })
                .then(function (result) {
                if (result === -1 /* OK */) {
                    return _this.updateSavedQueries(model.savedQueries, model.auditEvents);
                }
                return false;
            });
        };
        /**
         * Exports a query via a modal dialog.
         *
         * @param exportType type of export to perform (selection, saved query, results)
         * @param savedQuery The saved query
         */
        SavedQueriesService.prototype.exportModal = function (exportType, savedQuery) {
            if (!this.hasExportConfig() || !this.appService.app) {
                return Promise.resolve(-2 /* Cancel */);
            }
            var model = {
                format: i1.ExportOutputFormat.Csv,
                export: exportType,
                webService: this.appService.app.queryExport
            };
            if (savedQuery && exportType === i1.ExportSourceType.SavedQuery) {
                model.queryName = savedQuery.name;
            }
            return this.modalService.open(this.savedQueryComponents.exportSavedQueryModal, { model: model });
        };
        SavedQueriesService.prototype.notifyOpenSavedQuery = function (savedquery) {
            this._events.next({ type: "Search_SavedQuery" /* Search */, savedquery: savedquery });
        };
        SavedQueriesService.prototype.ngOnDestroy = function () {
            this.events.complete();
            this.changes.complete();
        };
        return SavedQueriesService;
    }());
    SavedQueriesService.ɵfac = function SavedQueriesService_Factory(t) { return new (t || SavedQueriesService)(i0.ɵɵinject(i1.UserSettingsWebService), i0.ɵɵinject(i2.SearchService), i0.ɵɵinject(i3$1.ModalService), i0.ɵɵinject(i4.AppService), i0.ɵɵinject(i1.QueryExportWebService), i0.ɵɵinject(i1.DownloadWebService), i0.ɵɵinject(i5.SelectionService), i0.ɵɵinject(SAVEDQUERY_COMPONENTS)); };
    SavedQueriesService.ɵprov = i0.ɵɵdefineInjectable({ token: SavedQueriesService, factory: SavedQueriesService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SavedQueriesService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () {
            return [{ type: i1.UserSettingsWebService }, { type: i2.SearchService }, { type: i3$1.ModalService }, { type: i4.AppService }, { type: i1.QueryExportWebService }, { type: i1.DownloadWebService }, { type: i5.SelectionService }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [SAVEDQUERY_COMPONENTS]
                        }] }];
        }, null);
    })();

    // Types of events triggering a change event
    var RECENT_QUERIES_CHANGE_EVENTS = [
        "RecentQuery_Add" /* Add */,
        "RecentQuery_Update" /* Update */,
        "RecentQuery_Delete" /* Delete */,
    ];
    var MAX_QUERIES = new i0.InjectionToken("MAX_QUERIES");
    var RecentQueriesService = /** @class */ (function () {
        function RecentQueriesService(userSettingsService, searchService, maxQueries) {
            var _this = this;
            this.userSettingsService = userSettingsService;
            this.searchService = searchService;
            this.maxQueries = maxQueries;
            this._events = new rxjs.Subject();
            this._changes = new rxjs.Subject();
            if (!this.maxQueries) {
                this.maxQueries = 20;
            }
            // Listen to the user settings
            this.userSettingsService.events.subscribe(function (event) {
                // E.g. new login occurs
                // ==> Revive dates
                _this.recentqueries.forEach(function (rq) {
                    if (base.Utils.isString(rq.date)) {
                        var date = base.Utils.toDate(rq.date);
                        if (date) {
                            rq.date = date;
                        }
                    }
                });
                // ==> Menus need to be rebuilt
                _this._events.next({ type: "RecentQuery_Loaded" /* Loaded */ });
            });
            // Listen to own events, to trigger change events
            this._events.subscribe(function (event) {
                if (RECENT_QUERIES_CHANGE_EVENTS.indexOf(event.type) !== -1) {
                    _this.changes.next(event);
                }
            });
            // Listen to search service and store queries
            this.searchService.queryStream.subscribe(function (query) {
                if (query) {
                    _this.addRecentQuery({ query: query.copy(), date: new Date() });
                }
            });
        }
        Object.defineProperty(RecentQueriesService.prototype, "recentqueries", {
            // GETTERS
            /**
             * Returns the list of this user's recent queries.
             * The list is stored in the user settings (this is a redirection).
             * Using this service creates the list of recent queries if it does not already exist.
             */
            get: function () {
                if (!this.userSettingsService.userSettings)
                    this.userSettingsService.userSettings = {};
                if (!this.userSettingsService.userSettings["recentQueries"])
                    this.userSettingsService.userSettings["recentQueries"] = [];
                return this.userSettingsService.userSettings["recentQueries"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RecentQueriesService.prototype, "events", {
            /**
             * Triggers any event among RecentQueryChangeEvent
             * (use for fine-grained control of recent queries workflow)
             */
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RecentQueriesService.prototype, "changes", {
            /**
             * Triggers when events affect the list of recent queries
             * (use to refresh recent queries menus)
             * Cf. CHANGE_EVENTS list
             */
            get: function () {
                return this._changes;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RecentQueriesService.prototype, "hasRecentQuery", {
            /**
             * @returns true if there is at least one recent query
             */
            get: function () {
                return this.recentqueries.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @returns a recent query with the given name or undefined if it does not exist
         * @param name
         */
        RecentQueriesService.prototype.recentquery = function (text) {
            var i = this.recentqueryIndex(text);
            return i >= 0 ? this.recentqueries[i] : undefined;
        };
        RecentQueriesService.prototype.recentqueryIndex = function (text) {
            for (var i = 0, ic = this.recentqueries.length; i < ic; i++) {
                var recentquery = this.recentqueries[i];
                if (recentquery && recentquery.query.text && recentquery.query.text.toLowerCase() === text.toLowerCase()) {
                    return i;
                }
            }
            return -1;
        };
        RecentQueriesService.prototype.comparator = function (q1, q2) {
            return q2.date.getTime() - q1.date.getTime();
        };
        // CRUD
        /**
         * Creates a new recent query unless it already exists, in which case the existing query is updated.
         * Emits an recentquery event.
         * Update the data on the server.
         * @param recentquery the recentquery to create
         * @returns true if recentquery was created
         */
        RecentQueriesService.prototype.addRecentQuery = function (recentquery) {
            if (!recentquery.query || !recentquery.query.text || recentquery.query.text.trim() === '') {
                return false;
            }
            var i = this.recentqueryIndex(recentquery.query.text); // If the query already exists
            if (i >= 0) {
                // Ignore identical queries issued within a certain time window (1s)
                // to avoid flooding the server. NB the request flooding mitigation in
                // SqHttpClient will not work in this case as the request payload includes
                // a timestamp
                if (Math.abs(recentquery.date.getTime() - this.recentqueries[i].date.getTime()) < 1000) {
                    if (base.Utils.equals(this.recentqueries[i].query, recentquery.query)) {
                        return false;
                    }
                }
                this.recentqueries[i].date = recentquery.date; // Update the date of the existing query
                this.recentqueries[i].query = recentquery.query;
                this._events.next({ type: "RecentQuery_Update" /* Update */, recentquery: this.recentqueries[i] });
            }
            else {
                this.recentqueries.push(recentquery);
                this._events.next({ type: "RecentQuery_Add" /* Add */, recentquery: recentquery });
            }
            // Sort the list
            this.recentqueries.sort(this.comparator);
            // Truncate the list
            if (this.maxQueries >= 0)
                this.recentqueries.splice(this.maxQueries);
            this.patchRecentQueries(); // No need to emit an "Add" audit event, since it is redundant with the main search API
            return true;
        };
        /**
         * Deletes the given RecentQuery (based on its name)
         * Emits an RecentQuery event.
         * Update the data on the server.
         * @param recentquery
         * @returns true if recent query was deleted
         */
        RecentQueriesService.prototype.deleteRecentQuery = function (recentquery) {
            var index = this.recentqueryIndex(recentquery.query.text || "");
            if (index === -1)
                return false; // Nothing to delete
            this.recentqueries.splice(index, 1);
            this._events.next({ type: "RecentQuery_Delete" /* Delete */, recentquery: recentquery });
            this.patchRecentQueries([
                {
                    type: "RecentQuery_Delete" /* Delete */,
                    detail: {
                        recentquery: recentquery.query.text
                    }
                }
            ]);
            return true;
        };
        /**
         * Updates Recent Queries in User settings.
         * @param auditEvents : Audit Events to be triggered
         * @returns an Observable which can be used to trigger further events
         */
        RecentQueriesService.prototype.patchRecentQueries = function (auditEvents) {
            var _this = this;
            return this.userSettingsService.patch({ recentQueries: this.recentqueries }, auditEvents)
                .subscribe(function (next) {
                _this._events.next({ type: "RecentQuery_Patched" /* Patched */ });
            }, function (error) {
                console.error("Could not patch Recent queries!", error);
            });
        };
        // EVENT HANDLERS (Menus)
        /**
         * Uses the SearchService to perform a search returning all
         * the documents matching this recent query.
         * @param recentquery
         * @returns the search service promise
         */
        RecentQueriesService.prototype.searchRecentQuery = function (recentquery, path) {
            this.searchService.setQuery(base.Utils.extend(this.searchService.makeQuery(), base.Utils.copy(recentquery.query)));
            this._events.next({ type: "Search_RecentQuery" /* Search */, recentquery: recentquery });
            return this.searchService.search({ path: path }, {
                type: "Search_RecentQuery" /* Search */,
                detail: {
                    recentquery: recentquery.query.text
                }
            });
        };
        RecentQueriesService.prototype.notifyOpenRecentQuery = function (recentquery) {
            this._events.next({ type: "Search_RecentQuery" /* Search */, recentquery: recentquery });
        };
        RecentQueriesService.prototype.ngOnDestroy = function () {
            this.events.complete();
            this.changes.complete();
        };
        return RecentQueriesService;
    }());
    RecentQueriesService.ɵfac = function RecentQueriesService_Factory(t) { return new (t || RecentQueriesService)(i0.ɵɵinject(i1.UserSettingsWebService), i0.ɵɵinject(i2.SearchService), i0.ɵɵinject(MAX_QUERIES, 8)); };
    RecentQueriesService.ɵprov = i0.ɵɵdefineInjectable({ token: RecentQueriesService, factory: RecentQueriesService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(RecentQueriesService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () {
            return [{ type: i1.UserSettingsWebService }, { type: i2.SearchService }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [MAX_QUERIES]
                        }] }];
        }, null);
    })();

    // Types of events triggering a change event
    var RECENT_DOCUMENTS_CHANGE_EVENTS = [
        "RecentDocument_Add" /* Add */,
        "RecentDocument_Update" /* Update */,
        "RecentDocument_Delete" /* Delete */,
    ];
    var MAX_DOCUMENTS = new i0.InjectionToken("MAX_DOCUMENTS");
    var RecentDocumentsService = /** @class */ (function () {
        function RecentDocumentsService(userSettingsService, searchService, maxDocuments) {
            var _this = this;
            this.userSettingsService = userSettingsService;
            this.searchService = searchService;
            this.maxDocuments = maxDocuments;
            this._events = new rxjs.Subject();
            this._changes = new rxjs.Subject();
            if (!this.maxDocuments) {
                this.maxDocuments = 20;
            }
            // Listen to the user settings
            this.userSettingsService.events.subscribe(function (event) {
                // E.g. new login occurs
                // ==> Revive dates
                _this.recentdocuments.forEach(function (rd) {
                    if (base.Utils.isString(rd.date)) {
                        var date = base.Utils.toDate(rd.date);
                        if (date) {
                            rd.date = date;
                        }
                    }
                });
                // ==> Menus need to be rebuilt
                _this.events.next({ type: "RecentDocument_Loaded" /* Loaded */ });
            });
            // Listen to own events, to trigger change events
            this._events.subscribe(function (event) {
                if (RECENT_DOCUMENTS_CHANGE_EVENTS.indexOf(event.type) !== -1) {
                    _this.changes.next(event);
                }
            });
            /**
             * Subscribe to the search service to capture "open-original-document" event
             * and add documents to this service
             */
            this.searchService.events.subscribe(function (event) {
                if (event.type === "open-original-document" && event.record) {
                    _this.addDocument(event.record, true);
                }
            });
        }
        Object.defineProperty(RecentDocumentsService.prototype, "recentdocuments", {
            // GETTERS
            /**
             * Returns the list of this user's recent documents.
             * The list is stored in the user settings (this is a redirection).
             * Using this service creates the list of recent documents if it does not already exist.
             */
            get: function () {
                if (!this.userSettingsService.userSettings)
                    this.userSettingsService.userSettings = {};
                if (!this.userSettingsService.userSettings["recentDocuments"])
                    this.userSettingsService.userSettings["recentDocuments"] = [];
                return this.userSettingsService.userSettings["recentDocuments"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RecentDocumentsService.prototype, "events", {
            /**
             * Triggers any event among RecentDocumentChangeEvent
             * (use for fine-grained control of recent documents workflow)
             */
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RecentDocumentsService.prototype, "changes", {
            /**
             * Triggers when events affect the list of recent documents
             * (use to refresh recent documents menus)
             * Cf. CHANGE_EVENTS list
             */
            get: function () {
                return this._changes;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RecentDocumentsService.prototype, "hasRecentDocument", {
            /**
             * @returns true if there is at least one recent document
             */
            get: function () {
                return this.recentdocuments.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @returns a recent document with the given name or null if it does not exist
         * @param name
         */
        RecentDocumentsService.prototype.recentdocument = function (text) {
            var i = this.recentdocumentIndex(text);
            return i >= 0 ? this.recentdocuments[i] : undefined;
        };
        RecentDocumentsService.prototype.recentdocumentIndex = function (id) {
            for (var i = 0, ic = this.recentdocuments.length; i < ic; i++) {
                var recentdocument = this.recentdocuments[i];
                if (recentdocument && recentdocument.id === id) {
                    return i;
                }
            }
            return -1;
        };
        RecentDocumentsService.prototype.comparator = function (q1, q2) {
            return q2.date.getTime() - q1.date.getTime();
        };
        // CRUD
        /**
         * Creates a new recent document unless it already exists, in which case the existing document is updated.
         * Emits an recentdocument event.
         * Update the data on the server.
         * @param record Record to add to the service
         * @param original Whether the original doc was opened or the preview
         * @returns true if recentdocument was created
         */
        RecentDocumentsService.prototype.addDocument = function (record, original) {
            if (record) {
                return this.addRecentDocument({
                    id: record.id,
                    title: record.title,
                    url1: record.url1,
                    treepath: record.treepath,
                    docformat: record.docformat,
                    authors: record.authors,
                    date: new Date(),
                    original: original
                });
            }
            return false;
        };
        /**
         * Creates a new recent document unless it already exists, in which case the existing document is updated.
         * Emits an recentdocument event.
         * Update the data on the server.
         * @param recentdocument the recentdocument to create
         * @returns true if recentdocument was created
         */
        RecentDocumentsService.prototype.addRecentDocument = function (recentdocument) {
            if (!recentdocument.id) {
                return false;
            }
            var i = this.recentdocumentIndex(recentdocument.id); // If the document already exists
            if (i >= 0) {
                this.recentdocuments[i].date = recentdocument.date; // Update the date of the existing document
                this.events.next({ type: "RecentDocument_Update" /* Update */, recentdocument: this.recentdocuments[i] });
            }
            else {
                this.recentdocuments.push(recentdocument);
                this.events.next({ type: "RecentDocument_Add" /* Add */, recentdocument: recentdocument });
            }
            // Sort the list
            this.recentdocuments.sort(this.comparator);
            // Truncate the list
            if (this.maxDocuments >= 0)
                this.recentdocuments.splice(this.maxDocuments);
            this.patchRecentDocuments(); // No need to emit an "Add" audit event, since it is redundant with the main search API
            return true;
        };
        /**
         * Deletes the given RecentDocument (based on its name)
         * Emits an RecentDocument event.
         * Update the data on the server.
         * @param recentdocument
         * @returns true if recent document was deleted
         */
        RecentDocumentsService.prototype.deleteRecentDocument = function (recentdocument) {
            var index = this.recentdocumentIndex(recentdocument.id);
            if (index === -1)
                return false; // Nothing to delete
            this.recentdocuments.splice(index, 1);
            this.events.next({ type: "RecentDocument_Delete" /* Delete */, recentdocument: recentdocument });
            this.patchRecentDocuments([
                {
                    type: "RecentDocument_Delete" /* Delete */,
                    detail: {
                        recentdocument: recentdocument.id
                    }
                }
            ]);
            return true;
        };
        /**
         * Updates Recent Documents in User settings.
         * @param auditEvents : Audit Events to be triggered
         * @returns an Observable which can be used to trigger further events
         */
        RecentDocumentsService.prototype.patchRecentDocuments = function (auditEvents) {
            var _this = this;
            return this.userSettingsService.patch({ recentDocuments: this.recentdocuments }, auditEvents)
                .subscribe(function (next) {
                _this.events.next({ type: "RecentDocument_Patched" /* Patched */ });
            }, function (error) {
                console.error("Could not patch Recent documents!", error);
            });
        };
        RecentDocumentsService.prototype.ngOnDestroy = function () {
            this.events.complete();
            this.changes.complete();
        };
        return RecentDocumentsService;
    }());
    RecentDocumentsService.ɵfac = function RecentDocumentsService_Factory(t) { return new (t || RecentDocumentsService)(i0.ɵɵinject(i1.UserSettingsWebService), i0.ɵɵinject(i2.SearchService), i0.ɵɵinject(MAX_DOCUMENTS, 8)); };
    RecentDocumentsService.ɵprov = i0.ɵɵdefineInjectable({ token: RecentDocumentsService, factory: RecentDocumentsService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(RecentDocumentsService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () {
            return [{ type: i1.UserSettingsWebService }, { type: i2.SearchService }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [MAX_DOCUMENTS]
                        }] }];
        }, null);
    })();

    var BsEditSavedQuery = /** @class */ (function () {
        function BsEditSavedQuery(model, formBuilder) {
            this.model = model;
            this.formBuilder = formBuilder;
        }
        BsEditSavedQuery.prototype.ngOnInit = function () {
            var _this = this;
            this.nameControl = new i1$1.FormControl(this.model.name, i1$1.Validators.required);
            this.form = this.formBuilder.group({
                savedQueryName: this.nameControl
            });
            this.formChanges = base.Utils.subscribe(this.form.valueChanges, function (value) {
                _this.model.name = _this.nameControl.value;
            });
            this.buttons = [
                new i3$1.ModalButton({
                    result: -1 /* OK */,
                    primary: true,
                    validation: this.form
                }),
                new i3$1.ModalButton({
                    result: -2 /* Cancel */
                })
            ];
        };
        BsEditSavedQuery.prototype.ngOnDestroy = function () {
            this.formChanges.unsubscribe();
        };
        return BsEditSavedQuery;
    }());
    BsEditSavedQuery.ɵfac = function BsEditSavedQuery_Factory(t) { return new (t || BsEditSavedQuery)(i0.ɵɵdirectiveInject(i3$1.MODAL_MODEL), i0.ɵɵdirectiveInject(i1$1.FormBuilder)); };
    BsEditSavedQuery.ɵcmp = i0.ɵɵdefineComponent({ type: BsEditSavedQuery, selectors: [["sq-edit-saved-query"]], decls: 7, vars: 7, consts: [["name", "editSavedQuery", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "savedQueryName"], ["type", "text", "id", "savedQueryName", "formControlName", "savedQueryName", "spellcheck", "off", "sqAutofocus", "", 1, "form-control", 3, "sqValidation"]], template: function BsEditSavedQuery_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "sq-modal", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelementStart(3, "label", 3);
                i0.ɵɵtext(4);
                i0.ɵɵpipe(5, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(6, "input", 4);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", "msg#editSavedQuery.title")("buttons", ctx.buttons);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 5, "msg#editSavedQuery.name"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("sqValidation", ctx.form);
            }
        }, directives: [i1$1.ɵangular_packages_forms_forms_y, i1$1.NgControlStatusGroup, i1$1.FormGroupDirective, i3$2.BsModal, i1$1.DefaultValueAccessor, i1$1.NgControlStatus, i1$1.FormControlName, i3$3.Autofocus, i5$1.ValidationDirective], pipes: [i6.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsEditSavedQuery, [{
                type: i0.Component,
                args: [{
                        selector: "sq-edit-saved-query",
                        templateUrl: "./edit-saved-query.html"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3$1.MODAL_MODEL]
                        }] }, { type: i1$1.FormBuilder }];
        }, null);
    })();

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    function BsExportQuery_option_7_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "option", 11);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var format_r3 = ctx.$implicit;
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("value", format_r3);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx_r0.outputFormats[format_r3].toUpperCase());
        }
    }
    function BsExportQuery_option_14_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "option", 11);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var column_r4 = ctx.$implicit;
            i0.ɵɵproperty("value", column_r4);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(column_r4);
        }
    }
    function BsExportQuery_div_21_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵelementStart(1, "label", 12);
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div");
            i0.ɵɵelementStart(5, "div", 13);
            i0.ɵɵelementStart(6, "label", 14);
            i0.ɵɵelementStart(7, "input", 15);
            i0.ɵɵlistener("change", function BsExportQuery_div_21_Template_input_change_7_listener($event) { i0.ɵɵrestoreView(_r6_1); var ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.sourceChanged($event, ctx_r5.sourceTypes.Result); });
            i0.ɵɵelementEnd();
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "div", 13);
            i0.ɵɵelementStart(11, "label", 14);
            i0.ɵɵelementStart(12, "input", 16);
            i0.ɵɵlistener("change", function BsExportQuery_div_21_Template_input_change_12_listener($event) { i0.ɵɵrestoreView(_r6_1); var ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.sourceChanged($event, ctx_r7.sourceTypes.Selection); });
            i0.ɵɵelementEnd();
            i0.ɵɵtext(13);
            i0.ɵɵpipe(14, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 6, "msg#exportQuery.dialogSourceType"));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("checked", ctx_r2.sourceChosen(ctx_r2.sourceTypes.Result));
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(9, 8, "msg#exportQuery.dialogResult"), " ");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("checked", ctx_r2.sourceChosen(ctx_r2.sourceTypes.Selection))("disabled", !ctx_r2.hasSelectedRecords());
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(14, 10, "msg#exportQuery.dialogSelection"), " ");
        }
    }
    var _c0 = function (a0) { return { count: a0 }; };
    var _c1 = function (a0) { return { values: a0 }; };
    /**
     * Component representing the Export dialog where user can customize the query export action.
     *
     */
    var BsExportQuery = /** @class */ (function () {
        function BsExportQuery(model, formBuilder, appService, selectionService, savedQueriesService, validationService, notificationsService, changeDetectorRef, modalRef) {
            this.model = model;
            this.formBuilder = formBuilder;
            this.appService = appService;
            this.selectionService = selectionService;
            this.savedQueriesService = savedQueriesService;
            this.validationService = validationService;
            this.notificationsService = notificationsService;
            this.changeDetectorRef = changeDetectorRef;
            this.modalRef = modalRef;
            this.supportedFormats = [
                i1.ExportOutputFormat.Csv,
                i1.ExportOutputFormat.Xlsx,
                i1.ExportOutputFormat.Json
            ];
            this.outputFormats = i1.ExportOutputFormat;
            this.sourceTypes = i1.ExportSourceType;
            this.maxCount = 1000; // Default max count hard coded in web service
        }
        BsExportQuery.prototype.ngOnInit = function () {
            var e_1, _a, e_2, _b;
            var _this = this;
            this.savedQueries = [];
            try {
                for (var _c = __values(this.savedQueriesService.savedqueries), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var query = _d.value;
                    this.savedQueries.push(query.name);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.exportableColumns = [];
            if (this.appService.app) {
                var queryExportConfig = this.getDefaultQueryExportConfig(this.appService.app);
                var columns = (queryExportConfig.columns && queryExportConfig.columns['column$']) || [];
                try {
                    for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                        var column = columns_1_1.value;
                        this.exportableColumns.push(column.title);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (columns_1_1 && !columns_1_1.done && (_b = columns_1.return)) _b.call(columns_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                if (queryExportConfig.maxCount && base.Utils.isNumber(queryExportConfig.maxCount)) {
                    this.maxCount = queryExportConfig.maxCount;
                }
            }
            this.form = this.formBuilder.group({
                'format': [this.supportedFormats[0]],
                'exportedColumns': [this.model.exportedColumns],
                'export': [this.model.export, i1$1.Validators.required],
                'maxCount': [this.model.maxCount, i1$1.Validators.compose([
                        this.validationService.integerValidator(),
                        this.validationService.minValidator(1)
                    ])],
            });
            this.isDownloading = false;
            this.buttons = [
                new i3$1.ModalButton({
                    text: "msg#exportQuery.btnDownload",
                    result: 0 /* Custom */,
                    anchor: true,
                    primary: true,
                    action: function (_button) {
                        var observable = _this.savedQueriesService.download(_this.model);
                        if (observable) {
                            base.Utils.subscribe(observable, function (response) {
                                console.log('exportQuery.download done.');
                                _this.notificationsService.info('msg#exportQuery.successNotification');
                                _this.modalRef.close(-1 /* OK */);
                                return response;
                            }, function (error) {
                                console.log('exportQuery.download failure - error: ', error);
                                _this.modalRef.close(error);
                            });
                            _this.isDownloading = true;
                            _this.changeDetectorRef.markForCheck();
                        }
                    },
                }),
                new i3$1.ModalButton({
                    result: -2 /* Cancel */,
                })
            ];
            var onFormChanged = function () {
                var newFormat = _this.form.value['format'];
                var newMaxCount = _this.form.value['maxCount'];
                var newExportedColumns = _this.form.value['exportedColumns'];
                if (_this.model.format !== newFormat) {
                    _this.model.format = newFormat;
                }
                if (_this.model.maxCount !== newMaxCount) {
                    _this.model.maxCount = newMaxCount;
                }
                _this.model.exportedColumns = newExportedColumns;
            };
            this.formChanges = base.Utils.subscribe(this.form.valueChanges, onFormChanged);
        };
        BsExportQuery.prototype.ngOnDestroy = function () {
            if (this.formChanges) {
                this.formChanges.unsubscribe();
            }
        };
        BsExportQuery.prototype.getDefaultQueryExportConfig = function (app) {
            var queryExport = app.queryExport;
            if (queryExport.indexOf(',') !== -1) {
                queryExport = queryExport.substring(0, queryExport.indexOf(','));
            }
            return base.Utils.getField(app.webServices, queryExport);
        };
        /**
         * Check if the client has selected some records.
         *
         * @returns true if the client has selected some records.
         */
        BsExportQuery.prototype.hasSelectedRecords = function () {
            return this.selectionService.haveSelectedRecords;
        };
        /**
         * Checks if the user chosen export source is the same as the given one.
         * <p>
         * Used to control the radio button state.
         *
         * @param type The source to check.
         * @returns true if the user chosen export source is the same as the given one.
         */
        BsExportQuery.prototype.sourceChosen = function (type) {
            return (this.model.export & type) !== 0;
        };
        /**
         * Callback called when user chooses a new export source.
         *
         * @param event The related UI event.
         * @param type The new chosen source.
         */
        BsExportQuery.prototype.sourceChanged = function (event, type) {
            var input = event.target;
            if (input.checked) {
                this.model.export = type;
            }
        };
        /**
         * Checks if the dialog allows user to choose export source.
         * Generally, it returns false when the input model export type is already saved query.
         *
         * @returns true if the dialog allows user to choose export source.
         */
        BsExportQuery.prototype.showSourceChooser = function () {
            return !this.sourceChosen(i1.ExportSourceType.SavedQuery);
        };
        return BsExportQuery;
    }());
    BsExportQuery.ɵfac = function BsExportQuery_Factory(t) { return new (t || BsExportQuery)(i0.ɵɵdirectiveInject(i3$1.MODAL_MODEL), i0.ɵɵdirectiveInject(i1$1.FormBuilder), i0.ɵɵdirectiveInject(i4.AppService), i0.ɵɵdirectiveInject(i5.SelectionService), i0.ɵɵdirectiveInject(SavedQueriesService), i0.ɵɵdirectiveInject(i5$1.ValidationService), i0.ɵɵdirectiveInject(i6$1.NotificationsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i3$1.ModalRef)); };
    BsExportQuery.ɵcmp = i0.ɵɵdefineComponent({ type: BsExportQuery, selectors: [["sq-export-query"]], decls: 22, vars: 30, consts: [["name", "exportQuery", "novalidate", "", 3, "formGroup"], [3, "title", "buttons", "isProcessingState"], [1, "form-group", "sq-form-group"], ["for", "format"], ["formControlName", "format", "id", "format", "sqAutofocus", "", 1, "form-control", "custom-select", 3, "sqValidation"], [3, "value", 4, "ngFor", "ngForOf"], ["for", "exportedColumns", 3, "title"], ["id", "exportedColumns", "formControlName", "exportedColumns", "sqAutofocus", "", "multiple", "", 1, "form-control", "custom-select", 3, "sqValidation"], ["for", "maxCount", 3, "title"], ["type", "number", "id", "maxCount", "formControlName", "maxCount", "autocomplete", "off", "spellcheck", "off", 1, "form-control", 3, "sqValidation"], ["class", "form-group sq-form-group", 4, "ngIf"], [3, "value"], ["for", "export"], [1, "form-check", "form-check-inline"], [1, "form-check-label"], ["type", "radio", 1, "form-check-input", 3, "checked", "change"], ["type", "radio", 1, "form-check-input", 3, "checked", "disabled", "change"]], template: function BsExportQuery_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "sq-modal", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelementStart(3, "label", 3);
                i0.ɵɵtext(4);
                i0.ɵɵpipe(5, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(6, "select", 4);
                i0.ɵɵtemplate(7, BsExportQuery_option_7_Template, 2, 2, "option", 5);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(8, "div", 2);
                i0.ɵɵelementStart(9, "label", 6);
                i0.ɵɵpipe(10, "sqMessage");
                i0.ɵɵtext(11);
                i0.ɵɵpipe(12, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(13, "select", 7);
                i0.ɵɵtemplate(14, BsExportQuery_option_14_Template, 2, 2, "option", 5);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(15, "div", 2);
                i0.ɵɵelementStart(16, "label", 8);
                i0.ɵɵpipe(17, "sqMessage");
                i0.ɵɵtext(18);
                i0.ɵɵpipe(19, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(20, "input", 9);
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(21, BsExportQuery_div_21_Template, 15, 12, "div", 10);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", "msg#exportQuery.dialogTitle")("buttons", ctx.buttons)("isProcessingState", ctx.isDownloading);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 15, "msg#exportQuery.dialogOutputFormat"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("sqValidation", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.supportedFormats);
                i0.ɵɵadvance(2);
                i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(10, 17, "msg#exportQuery.exportedColumnsLabelTooltip"));
                i0.ɵɵadvance(2);
                i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(12, 19, "msg#exportQuery.exportedColumns"), "\u00A0\u24D8 ");
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("sqValidation", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.exportableColumns);
                i0.ɵɵadvance(2);
                i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(17, 21, "msg#exportQuery.dialogMaxCountTooltip", i0.ɵɵpureFunction1(28, _c1, i0.ɵɵpureFunction1(26, _c0, ctx.maxCount))));
                i0.ɵɵadvance(2);
                i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(19, 24, "msg#exportQuery.dialogMaxCount"), "\u00A0\u24D8");
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("sqValidation", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.showSourceChooser());
            }
        }, directives: [i1$1.ɵangular_packages_forms_forms_y, i1$1.NgControlStatusGroup, i1$1.FormGroupDirective, i3$2.BsModal, i1$1.SelectControlValueAccessor, i1$1.NgControlStatus, i1$1.FormControlName, i3$3.Autofocus, i5$1.ValidationDirective, i4$1.NgForOf, i1$1.SelectMultipleControlValueAccessor, i1$1.NumberValueAccessor, i1$1.DefaultValueAccessor, i4$1.NgIf, i1$1.NgSelectOption, i1$1.ɵangular_packages_forms_forms_x], pipes: [i6.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsExportQuery, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-export-query',
                        templateUrl: './export-query.html'
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3$1.MODAL_MODEL]
                        }] }, { type: i1$1.FormBuilder }, { type: i4.AppService }, { type: i5.SelectionService }, { type: SavedQueriesService }, { type: i5$1.ValidationService }, { type: i6$1.NotificationsService }, { type: i0.ChangeDetectorRef }, { type: i3$1.ModalRef }];
        }, null);
    })();

    function BsManageSavedQueries_div_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r3_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 6);
            i0.ɵɵelementStart(1, "button", 7);
            i0.ɵɵlistener("click", function BsManageSavedQueries_div_2_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r3_1); var ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.reorder(); });
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, ctx_r0.reordering ? "msg#manageSavedQueries.edit" : "msg#manageSavedQueries.reorder"));
        }
    }
    function BsManageSavedQueries_div_5_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 16);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var savedQuery_r4 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(savedQuery_r4.name);
        }
    }
    function BsManageSavedQueries_div_5_sq_editable_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r15_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "sq-editable", 17);
            i0.ɵɵlistener("valueChange", function BsManageSavedQueries_div_5_sq_editable_2_Template_sq_editable_valueChange_0_listener($event) { i0.ɵɵrestoreView(_r15_1); var savedQuery_r4 = i0.ɵɵnextContext().$implicit; var ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.setName(savedQuery_r4, $event); });
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var savedQuery_r4 = i0.ɵɵnextContext().$implicit;
            var ctx_r7 = i0.ɵɵnextContext();
            i0.ɵɵproperty("value", savedQuery_r4.name)("model", savedQuery_r4)("validators", ctx_r7.nameValidators);
        }
    }
    function BsManageSavedQueries_div_5_a_4_Template(rf, ctx) {
        if (rf & 1) {
            var _r19_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 18);
            i0.ɵɵlistener("click", function BsManageSavedQueries_div_5_a_4_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r19_1); var savedQuery_r4 = i0.ɵɵnextContext().$implicit; var ctx_r17 = i0.ɵɵnextContext(); return ctx_r17.export(savedQuery_r4); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelement(2, "span", 19);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#manageSavedQueries.export"));
        }
    }
    function BsManageSavedQueries_div_5_a_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "a", 20);
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelement(2, "span", 21);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var savedQuery_r4 = i0.ɵɵnextContext().$implicit;
            var ctx_r9 = i0.ɵɵnextContext();
            i0.ɵɵpropertyInterpolate("href", ctx_r9.savedQueriesService.rssHref(savedQuery_r4), i0.ɵɵsanitizeUrl);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 2, "msg#manageSavedQueries.rss"));
        }
    }
    function BsManageSavedQueries_div_5_a_6_Template(rf, ctx) {
        if (rf & 1) {
            var _r23_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 18);
            i0.ɵɵlistener("click", function BsManageSavedQueries_div_5_a_6_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r23_1); var ctx_r22 = i0.ɵɵnextContext(); var savedQuery_r4 = ctx_r22.$implicit; var $index_r5 = ctx_r22.index; var ctx_r21 = i0.ɵɵnextContext(); return ctx_r21.remove(savedQuery_r4, $index_r5); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelement(2, "span", 22);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#manageSavedQueries.remove"));
        }
    }
    function BsManageSavedQueries_div_5_span_7_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 23);
        }
    }
    var _c0$1 = "list-group-item list-group-item-action d-flex w-auto-unimportant";
    var _c1$1 = function (a1) { return [_c0$1, a1]; };
    function BsManageSavedQueries_div_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 8);
            i0.ɵɵtemplate(1, BsManageSavedQueries_div_5_div_1_Template, 2, 1, "div", 9);
            i0.ɵɵtemplate(2, BsManageSavedQueries_div_5_sq_editable_2_Template, 1, 3, "sq-editable", 10);
            i0.ɵɵelementStart(3, "div", 11);
            i0.ɵɵtemplate(4, BsManageSavedQueries_div_5_a_4_Template, 3, 3, "a", 12);
            i0.ɵɵtemplate(5, BsManageSavedQueries_div_5_a_5_Template, 3, 4, "a", 13);
            i0.ɵɵtemplate(6, BsManageSavedQueries_div_5_a_6_Template, 3, 3, "a", 14);
            i0.ɵɵtemplate(7, BsManageSavedQueries_div_5_span_7_Template, 1, 0, "span", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c1$1, ctx_r1.reordering ? "cursor-move" : ""));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r1.reordering);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r1.reordering);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx_r1.reordering && ctx_r1.savedQueriesService.hasExportConfig());
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r1.reordering && ctx_r1.savedQueriesService.hasRssEnabled());
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx_r1.reordering);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r1.reordering);
        }
    }
    var BsManageSavedQueries = /** @class */ (function () {
        function BsManageSavedQueries(model, savedQueriesService) {
            var _this = this;
            this.model = model;
            this.savedQueriesService = savedQueriesService;
            this.reordering = false;
            this.nameValidators = [
                i1$1.Validators.required,
                function (control) {
                    var e_1, _a;
                    var modelControl = control.root.get("model");
                    if (modelControl) {
                        try {
                            for (var _b = __values(_this.model.savedQueries), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var item = _c.value;
                                if (modelControl.value === item) {
                                    continue;
                                }
                                if (control.value === item.name) {
                                    return {
                                        unique: true
                                    };
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    return null;
                }
            ];
        }
        BsManageSavedQueries.prototype.ngOnInit = function () {
            var _this = this;
            this.buttons = [
                this.removeAllButton = new i3$1.ModalButton({
                    text: "msg#manageSavedQueries.removeAll",
                    result: 0 /* Custom */,
                    action: function (button) {
                        _this.model.savedQueries.splice(0);
                        button.visible = false;
                        _this.addAuditEvent({
                            type: "SavedQuery_DeleteAll" /* DeleteAll */
                        });
                    },
                    visible: this.model.savedQueries.length > 0
                }),
                new i3$1.ModalButton({
                    result: -1 /* OK */,
                    primary: true
                }),
                new i3$1.ModalButton({
                    result: -2 /* Cancel */
                })
            ];
        };
        BsManageSavedQueries.prototype.addAuditEvent = function (auditEvent) {
            if (!this.model.auditEvents) {
                this.model.auditEvents = [];
            }
            this.model.auditEvents.push(auditEvent);
        };
        BsManageSavedQueries.prototype.reorder = function () {
            this.reordering = !this.reordering;
        };
        BsManageSavedQueries.prototype.setName = function (savedQuery, name) {
            if (!base.Utils.eqNC(savedQuery.name, name)) {
                this.addAuditEvent({
                    type: "SavedQuery_Rename" /* Rename */,
                    detail: {
                        query: name,
                        "old-name": savedQuery.name
                    }
                });
                savedQuery.name = name;
            }
        };
        BsManageSavedQueries.prototype.remove = function (savedQuery, index) {
            this.model.savedQueries.splice(index, 1);
            this.removeAllButton.visible = this.model.savedQueries.length > 0;
            this.addAuditEvent({
                type: "SavedQuery_Delete" /* Delete */,
                detail: {
                    query: savedQuery.name
                }
            });
            return false;
        };
        BsManageSavedQueries.prototype.export = function (savedQuery) {
            this.savedQueriesService.exportModal(i1.ExportSourceType.SavedQuery, savedQuery);
            return false;
        };
        BsManageSavedQueries.prototype.dropped = function (drop) {
            base.Utils.arrayMove(this.model.savedQueries, drop.previousIndex, drop.currentIndex);
        };
        return BsManageSavedQueries;
    }());
    BsManageSavedQueries.ɵfac = function BsManageSavedQueries_Factory(t) { return new (t || BsManageSavedQueries)(i0.ɵɵdirectiveInject(i3$1.MODAL_MODEL), i0.ɵɵdirectiveInject(SavedQueriesService)); };
    BsManageSavedQueries.ɵcmp = i0.ɵɵdefineComponent({ type: BsManageSavedQueries, selectors: [["sq-manage-saved-queries"]], decls: 6, vars: 6, consts: [["name", "manageSavedQueries", "novalidate", ""], [3, "title", "buttons"], ["class", "form-group clearfix", 4, "ngIf"], [1, "form-group"], ["cdkDropList", "", 1, "list-group", 3, "cdkDropListData", "cdkDropListDisabled", "cdkDropListDropped"], ["cdkDrag", "", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "form-group", "clearfix"], ["type", "button", 1, "btn", "btn-secondary", "float-right", 3, "click"], ["cdkDrag", "", 3, "ngClass"], ["class", "sq-saved-query-text", 4, "ngIf"], ["name", "msg#manageSavedQueries.name", 3, "value", "model", "validators", "valueChange", 4, "ngIf"], [1, "ml-auto"], ["class", "ml-2", "href", "#", 3, "title", "click", 4, "ngIf"], ["class", "ml-2", "target", "_blank", 3, "href", "title", 4, "ngIf"], ["href", "#", "class", "ml-2", 3, "title", "click", 4, "ngIf"], ["class", "ml-2 fas fa-bars sq-move", 4, "ngIf"], [1, "sq-saved-query-text"], ["name", "msg#manageSavedQueries.name", 3, "value", "model", "validators", "valueChange"], ["href", "#", 1, "ml-2", 3, "title", "click"], [1, "fas", "fa-download", "sq-export"], ["target", "_blank", 1, "ml-2", 3, "href", "title"], [1, "fas", "fa-rss", "sq-rss"], [1, "fas", "fa-times", "sq-remove"], [1, "ml-2", "fas", "fa-bars", "sq-move"]], template: function BsManageSavedQueries_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "sq-modal", 1);
                i0.ɵɵtemplate(2, BsManageSavedQueries_div_2_Template, 4, 3, "div", 2);
                i0.ɵɵelementStart(3, "div", 3);
                i0.ɵɵelementStart(4, "div", 4);
                i0.ɵɵlistener("cdkDropListDropped", function BsManageSavedQueries_Template_div_cdkDropListDropped_4_listener($event) { return ctx.dropped($event); });
                i0.ɵɵtemplate(5, BsManageSavedQueries_div_5_Template, 8, 9, "div", 5);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", "msg#manageSavedQueries.title")("buttons", ctx.buttons);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.model.savedQueries.length);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("cdkDropListData", ctx.model.savedQueries)("cdkDropListDisabled", !ctx.reordering);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.model.savedQueries);
            }
        }, directives: [i1$1.ɵangular_packages_forms_forms_y, i1$1.NgControlStatusGroup, i1$1.NgForm, i3$2.BsModal, i4$1.NgIf, i5$2.CdkDropList, i4$1.NgForOf, i5$2.CdkDrag, i4$1.NgClass, i3$2.BsEditable], pipes: [i6.MessagePipe], styles: [".list-group[_ngcontent-%COMP%]{max-height:18.5rem;overflow-y:auto;width:100%}.sq-saved-query-text[_ngcontent-%COMP%]{overflow-wrap:break-word;width:100%;word-break:break-word;word-wrap:break-word}.sq-move[_ngcontent-%COMP%]{cursor:move}span.sq-move[_ngcontent-%COMP%]{color:grey}.sq-remove[_ngcontent-%COMP%]{color:#d3d3d3;cursor:pointer}.sq-remove[_ngcontent-%COMP%]:hover{color:#8b0000}.w-auto-unimportant[_ngcontent-%COMP%]{width:auto}.cursor-move[_ngcontent-%COMP%]{cursor:move}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsManageSavedQueries, [{
                type: i0.Component,
                args: [{
                        selector: "sq-manage-saved-queries",
                        templateUrl: "./manage-saved-queries.html",
                        styleUrls: ["./manage-saved-queries.scss"]
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3$1.MODAL_MODEL]
                        }] }, { type: SavedQueriesService }];
        }, null);
    })();

    var _c0$2 = function (a0) { return [a0]; };
    var _c1$2 = function (a0, a2) { return { items: a0, autoAdjust: true, rightAligned: a2 }; };
    /**
     * Toolbar component for Export query feature.
     *
     */
    var BsQueryExporter = /** @class */ (function () {
        function BsQueryExporter(selectionService, savedQueriesService) {
            var _this = this;
            this.selectionService = selectionService;
            this.savedQueriesService = savedQueriesService;
            this.exportAction = new i3.Action({
                icon: 'fas fa-download',
                title: 'msg#exportQuery.btnTitle',
                action: function (item, event) {
                    _this.export();
                }
            });
        }
        /**
         * Check if the client has selected some records.
         *
         * @returns true if the client has selected some records.
         */
        BsQueryExporter.prototype.hasSelectedRecords = function () {
            return this.selectionService.haveSelectedRecords;
        };
        /**
         * Generic export function.
         * <p>
         * Opens up a dialog to let user choose the export source, export format and other parameters.
         *
         * @memberof QueryExporter
         */
        BsQueryExporter.prototype.export = function () {
            this.savedQueriesService.exportModal(this.hasSelectedRecords() ? i1.ExportSourceType.Selection : i1.ExportSourceType.Result);
        };
        return BsQueryExporter;
    }());
    BsQueryExporter.ɵfac = function BsQueryExporter_Factory(t) { return new (t || BsQueryExporter)(i0.ɵɵdirectiveInject(i5.SelectionService), i0.ɵɵdirectiveInject(SavedQueriesService)); };
    BsQueryExporter.ɵcmp = i0.ɵɵdefineComponent({ type: BsQueryExporter, selectors: [["sq-query-exporter"]], inputs: { results: "results", rightAligned: "rightAligned" }, decls: 1, vars: 6, consts: [[3, "sq-action-buttons"]], template: function BsQueryExporter_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelement(0, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction2(3, _c1$2, i0.ɵɵpureFunction1(1, _c0$2, ctx.exportAction), ctx.rightAligned));
            }
        }, directives: [i3.BsActionButtons], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsQueryExporter, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-query-exporter',
                        templateUrl: './query-exporter.html'
                    }]
            }], function () { return [{ type: i5.SelectionService }, { type: SavedQueriesService }]; }, { results: [{
                    type: i0.Input
                }], rightAligned: [{
                    type: i0.Input
                }] });
    })();

    var _c0$3 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
    function BsSavedQueriesMenuComponent_li_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "li", 1);
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("sq-action-item", i0.ɵɵpureFunction4(2, _c0$3, ctx_r0.menu, ctx_r0.size, ctx_r0.autoAdjust, ctx_r0.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r0.collapseBreakpoint);
        }
    }
    var BsSavedQueriesMenuComponent = /** @class */ (function () {
        function BsSavedQueriesMenuComponent(loginService, savedQueriesService, searchService) {
            var _this = this;
            this.loginService = loginService;
            this.savedQueriesService = savedQueriesService;
            this.searchService = searchService;
            this.searchRoute = "/search";
            this.icon = "far fa-save";
            this.autoAdjust = true;
            this.autoAdjustBreakpoint = 'xl';
            this.collapseBreakpoint = 'sm';
            this.saveAction = new i3.Action({
                text: "msg#savedQueries.saveCurrentQuery",
                title: "msg#savedQueries.saveCurrentQuery",
                action: function () { _this.savedQueriesService.createSavedQueryModal(); }
            });
            this.manageAction = new i3.Action({
                text: "msg#savedQueries.manageSavedQueries",
                title: "msg#savedQueries.manageSavedQueries",
                action: function () { _this.savedQueriesService.manageSavedQueriesModal(); }
            });
        }
        BsSavedQueriesMenuComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.updateMenu();
            this._savedQueriesSubscription = this.savedQueriesService.changes.subscribe({
                next: function () { _this.updateMenu(); }
            });
            this._loginSubscription = this.loginService.events.subscribe(function (event) {
                if (event.type === "session-changed") {
                    _this.updateMenu();
                }
            });
            this._searchSubscription = this.searchService.resultsStream.subscribe(function (results) {
                _this.updateMenu();
            });
        };
        BsSavedQueriesMenuComponent.prototype.ngOnDestroy = function () {
            if (this._savedQueriesSubscription) {
                this._savedQueriesSubscription.unsubscribe();
            }
            if (this._loginSubscription) {
                this._loginSubscription.unsubscribe();
            }
            if (this._searchSubscription) {
                this._searchSubscription.unsubscribe();
            }
        };
        BsSavedQueriesMenuComponent.prototype.updateMenu = function () {
            var _this = this;
            if (!this.loginService.complete) {
                this.menu = undefined;
                return;
            }
            var savedQueriesActions = [];
            if (this.savedQueriesService.hasSavedQuery) {
                var scrollGroup = new i3.Action({
                    scrollGroup: true,
                    children: this.savedQueriesService.savedqueries.map(function (savedQuery) { return new i3.Action({
                        text: savedQuery.name,
                        title: savedQuery.name,
                        data: savedQuery,
                        action: function (item) { return _this.savedQueriesService.searchSavedQuery(item.data, _this.searchRoute); }
                    }); })
                });
                savedQueriesActions.push(scrollGroup);
            }
            if (!!this.searchService.results) {
                savedQueriesActions.push(this.saveAction);
            }
            if (this.savedQueriesService.hasSavedQuery) {
                savedQueriesActions.push(this.manageAction);
            }
            this.menu = new i3.Action({
                icon: this.icon,
                text: "msg#savedQueries.savedQueries",
                children: savedQueriesActions
            });
        };
        return BsSavedQueriesMenuComponent;
    }());
    BsSavedQueriesMenuComponent.ɵfac = function BsSavedQueriesMenuComponent_Factory(t) { return new (t || BsSavedQueriesMenuComponent)(i0.ɵɵdirectiveInject(i1$2.LoginService), i0.ɵɵdirectiveInject(SavedQueriesService), i0.ɵɵdirectiveInject(i2.SearchService)); };
    BsSavedQueriesMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsSavedQueriesMenuComponent, selectors: [["sq-saved-queries-menu"]], inputs: { searchRoute: "searchRoute", icon: "icon", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", size: "size" }, decls: 1, vars: 1, consts: [["class", "nav-item dropdown", 3, "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [1, "nav-item", "dropdown", 3, "sq-action-item", "collapseBreakpoint"]], template: function BsSavedQueriesMenuComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsSavedQueriesMenuComponent_li_0_Template, 1, 7, "li", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !!ctx.menu && !ctx.menu.hidden);
            }
        }, directives: [i4$1.NgIf, i3.BsActionItem], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsSavedQueriesMenuComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-saved-queries-menu',
                        templateUrl: './saved-queries-menu.component.html'
                    }]
            }], function () { return [{ type: i1$2.LoginService }, { type: SavedQueriesService }, { type: i2.SearchService }]; }, { searchRoute: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], autoAdjust: [{
                    type: i0.Input
                }], autoAdjustBreakpoint: [{
                    type: i0.Input
                }], collapseBreakpoint: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }] });
    })();

    function BsFacetSavedQueries_a_1_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 7);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var query_r2 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1("\"", query_r2.query.text, "\"");
        }
    }
    function BsFacetSavedQueries_a_1_i_4_Template(rf, ctx) {
        if (rf & 1) {
            var _r8_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "i", 8);
            i0.ɵɵlistener("click", function BsFacetSavedQueries_a_1_i_4_Template_i_click_0_listener($event) { i0.ɵɵrestoreView(_r8_1); var query_r2 = i0.ɵɵnextContext().$implicit; var ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.deleteQuery(query_r2, $event); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 1, "msg#savedQueries.delete"));
        }
    }
    var _c0$4 = function (a0) { return [a0]; };
    function BsFacetSavedQueries_a_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r10_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 3);
            i0.ɵɵlistener("click", function BsFacetSavedQueries_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r10_1); var query_r2 = ctx.$implicit; var ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.openSavedQuery(query_r2); });
            i0.ɵɵelementStart(1, "span", 4);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(3, BsFacetSavedQueries_a_1_span_3_Template, 2, 1, "span", 5);
            i0.ɵɵtemplate(4, BsFacetSavedQueries_a_1_i_4_Template, 2, 3, "i", 6);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var query_r2 = ctx.$implicit;
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(7, _c0$4, ctx_r0.searchRoute))("queryParams", ctx_r0.getQueryParams(query_r2))("state", ctx_r0.getRouterState(query_r2));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("title", query_r2.name);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(query_r2.name);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", query_r2.query.text);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.enableDelete);
        }
    }
    function BsFacetSavedQueries_div_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 9);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#savedQueries.noSavedQuery"), " ");
        }
    }
    var BsFacetSavedQueries = /** @class */ (function (_super) {
        __extends(BsFacetSavedQueries, _super);
        function BsFacetSavedQueries(savedQueriesService) {
            var _this = _super.call(this) || this;
            _this.savedQueriesService = savedQueriesService;
            _this.searchRoute = "/search";
            _this.maxQueries = 5;
            _this.enableDelete = true;
            _this.page = 0;
            _this.manageSavedQueries = new i3.Action({
                icon: "fas fa-cog",
                title: "msg#savedQueries.manageSavedQueries",
                action: function () {
                    _this.savedQueriesService.manageSavedQueriesModal();
                }
            });
            _this.previousPage = new i3.Action({
                icon: "fas fa-chevron-left",
                title: "msg#facet.previous",
                action: function () {
                    _this.page--;
                },
                updater: function (action) {
                    action.disabled = _this.page <= 0;
                    action.hidden = _this.maxPage === 0;
                }
            });
            _this.nextPage = new i3.Action({
                icon: "fas fa-chevron-right",
                title: "msg#facet.next",
                action: function () {
                    _this.page++;
                },
                updater: function (action) {
                    action.disabled = _this.page >= _this.maxPage;
                    action.hidden = _this.maxPage === 0;
                }
            });
            return _this;
        }
        Object.defineProperty(BsFacetSavedQueries.prototype, "maxPage", {
            get: function () {
                return Math.max(0, Math.ceil(this.savedQueriesService.savedqueries.length / this.maxQueries) - 1);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetSavedQueries.prototype, "startIndex", {
            get: function () {
                return this.page * this.maxQueries;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetSavedQueries.prototype, "endIndex", {
            get: function () {
                return (this.page + 1) * this.maxQueries;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetSavedQueries.prototype, "actions", {
            get: function () {
                this.previousPage.update();
                this.nextPage.update();
                return [this.previousPage, this.nextPage, this.manageSavedQueries];
            },
            enumerable: false,
            configurable: true
        });
        BsFacetSavedQueries.prototype.openSavedQuery = function (query) {
            this.savedQueriesService.notifyOpenSavedQuery(query);
            return true;
        };
        BsFacetSavedQueries.prototype.deleteQuery = function (query, event) {
            event.stopPropagation();
            this.savedQueriesService.deleteSavedQuery(query);
            this.page = Math.min(this.page, this.maxPage);
            return false;
        };
        BsFacetSavedQueries.prototype.getQueryParams = function (savedQuery) {
            var query = this.savedQueriesService.searchService.makeQuery(savedQuery.query);
            var queryParams = query.toJsonForQueryString();
            return { query: queryParams };
        };
        BsFacetSavedQueries.prototype.getRouterState = function (savedQuery) {
            return {
                audit: {
                    type: "Search_SavedQuery" /* Search */,
                    detail: {
                        "saved-query": savedQuery.name
                    }
                }
            };
        };
        return BsFacetSavedQueries;
    }(facet.AbstractFacet));
    BsFacetSavedQueries.ɵfac = function BsFacetSavedQueries_Factory(t) { return new (t || BsFacetSavedQueries)(i0.ɵɵdirectiveInject(SavedQueriesService)); };
    BsFacetSavedQueries.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetSavedQueries, selectors: [["sq-facet-saved-queries"]], inputs: { searchRoute: "searchRoute", maxQueries: "maxQueries", enableDelete: "enableDelete" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "list-group", "list-group-flush"], ["class", "saved-query-item list-group-item list-group-item-action d-flex align-items-center", 3, "routerLink", "queryParams", "state", "click", 4, "ngFor", "ngForOf"], ["class", "list-group-item text-center text-muted font-italic small py-5", 4, "ngIf"], [1, "saved-query-item", "list-group-item", "list-group-item-action", "d-flex", "align-items-center", 3, "routerLink", "queryParams", "state", "click"], [1, "query-name", "mr-auto", "text-truncate", 3, "title"], ["class", "query-text text-muted small font-italic text-right text-truncate ml-2", 4, "ngIf"], ["class", "query-delete ml-2 fas fa-times", 3, "title", "click", 4, "ngIf"], [1, "query-text", "text-muted", "small", "font-italic", "text-right", "text-truncate", "ml-2"], [1, "query-delete", "ml-2", "fas", "fa-times", 3, "title", "click"], [1, "list-group-item", "text-center", "text-muted", "font-italic", "small", "py-5"]], template: function BsFacetSavedQueries_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtemplate(1, BsFacetSavedQueries_a_1_Template, 5, 9, "a", 1);
                i0.ɵɵpipe(2, "slice");
                i0.ɵɵtemplate(3, BsFacetSavedQueries_div_3_Template, 3, 3, "div", 2);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(2, 2, ctx.savedQueriesService.savedqueries, ctx.startIndex, ctx.endIndex));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.savedQueriesService.savedqueries.length == 0);
            }
        }, directives: [i4$1.NgForOf, i4$1.NgIf, i3$4.RouterLinkWithHref], pipes: [i4$1.SlicePipe, i6.MessagePipe], styles: [".saved-query-item[_ngcontent-%COMP%]   .query-delete[_ngcontent-%COMP%]{\n    opacity: 0;\n}\n\n.saved-query-item[_ngcontent-%COMP%]:hover   .query-delete[_ngcontent-%COMP%]{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFacetSavedQueries, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-facet-saved-queries',
                        templateUrl: './facet-saved-queries.html',
                        styles: ["\n.saved-query-item .query-delete{\n    opacity: 0;\n}\n\n.saved-query-item:hover .query-delete{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}\n  "]
                    }]
            }], function () { return [{ type: SavedQueriesService }]; }, { searchRoute: [{
                    type: i0.Input
                }], maxQueries: [{
                    type: i0.Input
                }], enableDelete: [{
                    type: i0.Input
                }] });
    })();

    function BsFacetRecentQueries_a_1_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 8);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqDate");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var query_r2 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, query_r2.date));
        }
    }
    function BsFacetRecentQueries_a_1_i_4_Template(rf, ctx) {
        if (rf & 1) {
            var _r9_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "i", 9);
            i0.ɵɵlistener("click", function BsFacetRecentQueries_a_1_i_4_Template_i_click_0_listener($event) { i0.ɵɵrestoreView(_r9_1); var query_r2 = i0.ɵɵnextContext().$implicit; var ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.saveQuery(query_r2, $event); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 1, "msg#recentQueries.save"));
        }
    }
    function BsFacetRecentQueries_a_1_i_5_Template(rf, ctx) {
        if (rf & 1) {
            var _r12_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "i", 10);
            i0.ɵɵlistener("click", function BsFacetRecentQueries_a_1_i_5_Template_i_click_0_listener($event) { i0.ɵɵrestoreView(_r12_1); var query_r2 = i0.ɵɵnextContext().$implicit; var ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.deleteQuery(query_r2, $event); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 1, "msg#recentQueries.delete"));
        }
    }
    var _c0$5 = function (a0) { return [a0]; };
    function BsFacetRecentQueries_a_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r14_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 3);
            i0.ɵɵlistener("click", function BsFacetRecentQueries_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r14_1); var query_r2 = ctx.$implicit; var ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.openRecentQuery(query_r2); });
            i0.ɵɵelementStart(1, "span", 4);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(3, BsFacetRecentQueries_a_1_span_3_Template, 3, 3, "span", 5);
            i0.ɵɵtemplate(4, BsFacetRecentQueries_a_1_i_4_Template, 2, 3, "i", 6);
            i0.ɵɵtemplate(5, BsFacetRecentQueries_a_1_i_5_Template, 2, 3, "i", 7);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var query_r2 = ctx.$implicit;
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(8, _c0$5, ctx_r0.searchRoute))("queryParams", ctx_r0.getQueryParams(query_r2.query))("state", ctx_r0.getRouterState(query_r2.query));
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("title", query_r2.query.text);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(query_r2.query.text);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", query_r2.date);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.enableSave);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.enableDelete);
        }
    }
    function BsFacetRecentQueries_div_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 11);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#recentQueries.noRecentQuery"), " ");
        }
    }
    var BsFacetRecentQueries = /** @class */ (function (_super) {
        __extends(BsFacetRecentQueries, _super);
        function BsFacetRecentQueries(searchService, recentQueriesService, savedQueriesService) {
            var _this = _super.call(this) || this;
            _this.searchService = searchService;
            _this.recentQueriesService = recentQueriesService;
            _this.savedQueriesService = savedQueriesService;
            _this.searchRoute = "/search";
            _this.maxQueries = 5;
            _this.enableDelete = true;
            _this.enableSave = true;
            _this.page = 0;
            _this.previousPage = new i3.Action({
                icon: "fas fa-chevron-left",
                title: "msg#facet.previous",
                action: function () {
                    _this.page--;
                },
                updater: function (action) {
                    action.disabled = _this.page <= 0;
                    action.hidden = _this.maxPage === 0;
                }
            });
            _this.nextPage = new i3.Action({
                icon: "fas fa-chevron-right",
                title: "msg#facet.next",
                action: function () {
                    _this.page++;
                },
                updater: function (action) {
                    action.disabled = _this.page >= _this.maxPage;
                    action.hidden = _this.maxPage === 0;
                }
            });
            return _this;
        }
        Object.defineProperty(BsFacetRecentQueries.prototype, "maxPage", {
            get: function () {
                return Math.max(0, Math.ceil(this.recentQueriesService.recentqueries.length / this.maxQueries) - 1);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetRecentQueries.prototype, "startIndex", {
            get: function () {
                return this.page * this.maxQueries;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetRecentQueries.prototype, "endIndex", {
            get: function () {
                return (this.page + 1) * this.maxQueries;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetRecentQueries.prototype, "actions", {
            get: function () {
                this.previousPage.update();
                this.nextPage.update();
                return [this.previousPage, this.nextPage];
            },
            enumerable: false,
            configurable: true
        });
        BsFacetRecentQueries.prototype.openRecentQuery = function (query) {
            this.recentQueriesService.notifyOpenRecentQuery(query);
            return true;
        };
        BsFacetRecentQueries.prototype.deleteQuery = function (query, event) {
            event.stopPropagation();
            this.recentQueriesService.deleteRecentQuery(query);
            this.page = Math.min(this.page, this.maxPage);
            return false;
        };
        BsFacetRecentQueries.prototype.saveQuery = function (query, event) {
            event.stopPropagation();
            var q = base.Utils.extend(this.searchService.makeQuery(), base.Utils.copy(query.query));
            this.savedQueriesService.createSavedQueryModal(q);
            return false;
        };
        BsFacetRecentQueries.prototype.getQueryParams = function (recentQuery) {
            var query = this.searchService.makeQuery(recentQuery);
            var queryParams = query.toJsonForQueryString();
            return { query: queryParams };
        };
        BsFacetRecentQueries.prototype.getRouterState = function (recentQuery) {
            return {
                audit: {
                    type: "Search_RecentQuery" /* Search */,
                    detail: {
                        recentquery: recentQuery.text
                    }
                }
            };
        };
        return BsFacetRecentQueries;
    }(facet.AbstractFacet));
    BsFacetRecentQueries.ɵfac = function BsFacetRecentQueries_Factory(t) { return new (t || BsFacetRecentQueries)(i0.ɵɵdirectiveInject(i2.SearchService), i0.ɵɵdirectiveInject(RecentQueriesService), i0.ɵɵdirectiveInject(SavedQueriesService)); };
    BsFacetRecentQueries.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetRecentQueries, selectors: [["sq-facet-recent-queries"]], inputs: { searchRoute: "searchRoute", maxQueries: "maxQueries", enableDelete: "enableDelete", enableSave: "enableSave" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "list-group", "list-group-flush"], ["class", "recent-query-item list-group-item list-group-item-action d-flex align-items-center", 3, "routerLink", "queryParams", "state", "click", 4, "ngFor", "ngForOf"], ["class", "list-group-item text-center text-muted font-italic small py-5", 4, "ngIf"], [1, "recent-query-item", "list-group-item", "list-group-item-action", "d-flex", "align-items-center", 3, "routerLink", "queryParams", "state", "click"], [1, "query-text", "mr-auto", "text-truncate", 3, "title"], ["class", "query-date ml-2 text-muted small text-right", 4, "ngIf"], ["class", "query-save ml-2 far fa-save", 3, "title", "click", 4, "ngIf"], ["class", "query-delete ml-2 fas fa-times", 3, "title", "click", 4, "ngIf"], [1, "query-date", "ml-2", "text-muted", "small", "text-right"], [1, "query-save", "ml-2", "far", "fa-save", 3, "title", "click"], [1, "query-delete", "ml-2", "fas", "fa-times", 3, "title", "click"], [1, "list-group-item", "text-center", "text-muted", "font-italic", "small", "py-5"]], template: function BsFacetRecentQueries_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtemplate(1, BsFacetRecentQueries_a_1_Template, 6, 10, "a", 1);
                i0.ɵɵpipe(2, "slice");
                i0.ɵɵtemplate(3, BsFacetRecentQueries_div_3_Template, 3, 3, "div", 2);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(2, 2, ctx.recentQueriesService.recentqueries, ctx.startIndex, ctx.endIndex));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.recentQueriesService.recentqueries.length == 0);
            }
        }, directives: [i4$1.NgForOf, i4$1.NgIf, i3$4.RouterLinkWithHref], pipes: [i4$1.SlicePipe, i3$3.DatePipe, i6.MessagePipe], styles: [".recent-query-item[_ngcontent-%COMP%]   .query-delete[_ngcontent-%COMP%], .recent-query-item[_ngcontent-%COMP%]   .query-save[_ngcontent-%COMP%]{\n    opacity: 0;\n}\n\n.recent-query-item[_ngcontent-%COMP%]:hover   .query-delete[_ngcontent-%COMP%], .recent-query-item[_ngcontent-%COMP%]:hover   .query-save[_ngcontent-%COMP%]{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFacetRecentQueries, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-facet-recent-queries',
                        templateUrl: './facet-recent-queries.html',
                        styles: ["\n.recent-query-item .query-delete, .recent-query-item .query-save{\n    opacity: 0;\n}\n\n.recent-query-item:hover .query-delete, .recent-query-item:hover .query-save{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}\n  "]
                    }]
            }], function () { return [{ type: i2.SearchService }, { type: RecentQueriesService }, { type: SavedQueriesService }]; }, { searchRoute: [{
                    type: i0.Input
                }], maxQueries: [{
                    type: i0.Input
                }], enableDelete: [{
                    type: i0.Input
                }], enableSave: [{
                    type: i0.Input
                }] });
    })();

    function BsFacetRecentDocuments_ng_container_1_a_1_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 9);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqDate");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var document_r2 = i0.ɵɵnextContext(2).$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, document_r2.date));
        }
    }
    function BsFacetRecentDocuments_ng_container_1_a_1_i_4_Template(rf, ctx) {
        if (rf & 1) {
            var _r11_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "i", 10);
            i0.ɵɵlistener("click", function BsFacetRecentDocuments_ng_container_1_a_1_i_4_Template_i_click_0_listener($event) { i0.ɵɵrestoreView(_r11_1); var document_r2 = i0.ɵɵnextContext(2).$implicit; var ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.deleteDocument(document_r2, $event); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 1, "msg#recentDocuments.delete"));
        }
    }
    function BsFacetRecentDocuments_ng_container_1_a_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r14_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 5);
            i0.ɵɵlistener("click", function BsFacetRecentDocuments_ng_container_1_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r14_1); var document_r2 = i0.ɵɵnextContext().$implicit; var ctx_r12 = i0.ɵɵnextContext(); return ctx_r12.openRecentDocument(document_r2); });
            i0.ɵɵelementStart(1, "span", 6);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(3, BsFacetRecentDocuments_ng_container_1_a_1_span_3_Template, 3, 3, "span", 7);
            i0.ɵɵtemplate(4, BsFacetRecentDocuments_ng_container_1_a_1_i_4_Template, 2, 3, "i", 8);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var document_r2 = i0.ɵɵnextContext().$implicit;
            var ctx_r3 = i0.ɵɵnextContext();
            i0.ɵɵattribute("href", document_r2.url1, i0.ɵɵsanitizeUrl);
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("title", document_r2.title);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(document_r2.title);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", document_r2.date);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r3.enableDelete);
        }
    }
    function BsFacetRecentDocuments_ng_container_1_ng_template_2_span_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 9);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqDate");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var document_r2 = i0.ɵɵnextContext(2).$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, document_r2.date));
        }
    }
    function BsFacetRecentDocuments_ng_container_1_ng_template_2_i_4_Template(rf, ctx) {
        if (rf & 1) {
            var _r21_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "i", 10);
            i0.ɵɵlistener("click", function BsFacetRecentDocuments_ng_container_1_ng_template_2_i_4_Template_i_click_0_listener($event) { i0.ɵɵrestoreView(_r21_1); var document_r2 = i0.ɵɵnextContext(2).$implicit; var ctx_r19 = i0.ɵɵnextContext(); return ctx_r19.deleteDocument(document_r2, $event); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 1, "msg#recentDocuments.delete"));
        }
    }
    function BsFacetRecentDocuments_ng_container_1_ng_template_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r24_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 11);
            i0.ɵɵlistener("click", function BsFacetRecentDocuments_ng_container_1_ng_template_2_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r24_1); var document_r2 = i0.ɵɵnextContext().$implicit; var ctx_r22 = i0.ɵɵnextContext(); return ctx_r22.openRecentDocument(document_r2); });
            i0.ɵɵelementStart(1, "span", 6);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(3, BsFacetRecentDocuments_ng_container_1_ng_template_2_span_3_Template, 3, 3, "span", 7);
            i0.ɵɵtemplate(4, BsFacetRecentDocuments_ng_container_1_ng_template_2_i_4_Template, 2, 3, "i", 8);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var document_r2 = i0.ɵɵnextContext().$implicit;
            var ctx_r5 = i0.ɵɵnextContext();
            i0.ɵɵproperty("routerLink", ctx_r5.searchRoute)("queryParams", ctx_r5.getQueryParams(document_r2));
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("title", document_r2.title);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(document_r2.title);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", document_r2.date);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r5.enableDelete);
        }
    }
    function BsFacetRecentDocuments_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, BsFacetRecentDocuments_ng_container_1_a_1_Template, 5, 5, "a", 3);
            i0.ɵɵtemplate(2, BsFacetRecentDocuments_ng_container_1_ng_template_2_Template, 5, 6, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var document_r2 = ctx.$implicit;
            var _r4 = i0.ɵɵreference(3);
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r0.openOriginal && document_r2.url1)("ngIfElse", _r4);
        }
    }
    function BsFacetRecentDocuments_div_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 12);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#recentDocuments.noRecentDocument"), " ");
        }
    }
    var BsFacetRecentDocuments = /** @class */ (function (_super) {
        __extends(BsFacetRecentDocuments, _super);
        function BsFacetRecentDocuments(recentDocumentsService, searchService) {
            var _this = _super.call(this) || this;
            _this.recentDocumentsService = recentDocumentsService;
            _this.searchService = searchService;
            _this.searchRoute = "/preview";
            _this.maxDocuments = 5;
            _this.enableDelete = true;
            _this.openOriginal = false;
            _this.documentOpened = new i0.EventEmitter();
            _this.page = 0;
            _this.previousPage = new i3.Action({
                icon: "fas fa-chevron-left",
                title: "msg#facet.previous",
                action: function () {
                    _this.page--;
                },
                updater: function (action) {
                    action.disabled = _this.page <= 0;
                    action.hidden = _this.maxPage === 0;
                }
            });
            _this.nextPage = new i3.Action({
                icon: "fas fa-chevron-right",
                title: "msg#facet.next",
                action: function () {
                    _this.page++;
                },
                updater: function (action) {
                    action.disabled = _this.page >= _this.maxPage;
                    action.hidden = _this.maxPage === 0;
                }
            });
            return _this;
        }
        Object.defineProperty(BsFacetRecentDocuments.prototype, "maxPage", {
            get: function () {
                return Math.max(0, Math.ceil(this.recentDocumentsService.recentdocuments.length / this.maxDocuments) - 1);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetRecentDocuments.prototype, "startIndex", {
            get: function () {
                return this.page * this.maxDocuments;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetRecentDocuments.prototype, "endIndex", {
            get: function () {
                return (this.page + 1) * this.maxDocuments;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BsFacetRecentDocuments.prototype, "actions", {
            get: function () {
                this.previousPage.update();
                this.nextPage.update();
                return [this.previousPage, this.nextPage];
            },
            enumerable: false,
            configurable: true
        });
        BsFacetRecentDocuments.prototype.openRecentDocument = function (document) {
            if (this.openOriginal && !!document.url1) {
                this.searchService.notifyOpenOriginalDocument(document);
            }
            this.documentOpened.emit(document); // Can be use to trigger actions, like the preview
            return true;
        };
        BsFacetRecentDocuments.prototype.deleteDocument = function (document, event) {
            this.recentDocumentsService.deleteRecentDocument(document);
            this.page = Math.min(this.page, this.maxPage);
            return false;
        };
        BsFacetRecentDocuments.prototype.getQueryParams = function (document) {
            return {
                id: document.id,
                query: this.searchService.makeQuery().toJsonForQueryString()
            };
        };
        return BsFacetRecentDocuments;
    }(facet.AbstractFacet));
    BsFacetRecentDocuments.ɵfac = function BsFacetRecentDocuments_Factory(t) { return new (t || BsFacetRecentDocuments)(i0.ɵɵdirectiveInject(RecentDocumentsService), i0.ɵɵdirectiveInject(i2.SearchService)); };
    BsFacetRecentDocuments.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetRecentDocuments, selectors: [["sq-facet-recent-documents"]], inputs: { searchRoute: "searchRoute", maxDocuments: "maxDocuments", enableDelete: "enableDelete", openOriginal: "openOriginal" }, outputs: { documentOpened: "documentOpened" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "list-group", "list-group-flush"], [4, "ngFor", "ngForOf"], ["class", "list-group-item text-center text-muted font-italic small py-5", 4, "ngIf"], ["class", "recent-document-item list-group-item list-group-item-action d-flex align-items-center", "target", "_blank", "rel", "noopener", 3, "click", 4, "ngIf", "ngIfElse"], ["internalLink", ""], ["target", "_blank", "rel", "noopener", 1, "recent-document-item", "list-group-item", "list-group-item-action", "d-flex", "align-items-center", 3, "click"], [1, "document-text", "mr-auto", "text-truncate", 3, "title"], ["class", "document-date ml-2 text-muted small text-right", 4, "ngIf"], ["class", "document-delete ml-2 fas fa-times", 3, "title", "click", 4, "ngIf"], [1, "document-date", "ml-2", "text-muted", "small", "text-right"], [1, "document-delete", "ml-2", "fas", "fa-times", 3, "title", "click"], [1, "recent-document-item", "list-group-item", "list-group-item-action", "d-flex", "align-items-center", 3, "routerLink", "queryParams", "click"], [1, "list-group-item", "text-center", "text-muted", "font-italic", "small", "py-5"]], template: function BsFacetRecentDocuments_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtemplate(1, BsFacetRecentDocuments_ng_container_1_Template, 4, 2, "ng-container", 1);
                i0.ɵɵpipe(2, "slice");
                i0.ɵɵtemplate(3, BsFacetRecentDocuments_div_3_Template, 3, 3, "div", 2);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(2, 2, ctx.recentDocumentsService.recentdocuments, ctx.startIndex, ctx.endIndex));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.recentDocumentsService.recentdocuments.length == 0);
            }
        }, directives: [i4$1.NgForOf, i4$1.NgIf, i3$4.RouterLinkWithHref], pipes: [i4$1.SlicePipe, i3$3.DatePipe, i6.MessagePipe], styles: [".recent-document-item[_ngcontent-%COMP%]   .document-delete[_ngcontent-%COMP%]{\n    opacity: 0;\n}\n\n.recent-document-item[_ngcontent-%COMP%]:hover   .document-delete[_ngcontent-%COMP%]{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsFacetRecentDocuments, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-facet-recent-documents',
                        templateUrl: './facet-recent-documents.html',
                        styles: ["\n.recent-document-item .document-delete{\n    opacity: 0;\n}\n\n.recent-document-item:hover .document-delete{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}\n  "]
                    }]
            }], function () { return [{ type: RecentDocumentsService }, { type: i2.SearchService }]; }, { searchRoute: [{
                    type: i0.Input
                }], maxDocuments: [{
                    type: i0.Input
                }], enableDelete: [{
                    type: i0.Input
                }], openOriginal: [{
                    type: i0.Input
                }], documentOpened: [{
                    type: i0.Output
                }] });
    })();

    var BsSavedQueriesModule = /** @class */ (function () {
        function BsSavedQueriesModule() {
        }
        return BsSavedQueriesModule;
    }());
    BsSavedQueriesModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsSavedQueriesModule });
    BsSavedQueriesModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsSavedQueriesModule_Factory(t) { return new (t || BsSavedQueriesModule)(); }, providers: [
            {
                provide: SAVEDQUERY_COMPONENTS,
                useValue: {
                    editSavedQueryModal: BsEditSavedQuery,
                    manageSavedQueriesModal: BsManageSavedQueries,
                    exportSavedQueryModal: BsExportQuery
                }
            }
        ], imports: [[
                i4$1.CommonModule,
                i1$1.FormsModule, i1$1.ReactiveFormsModule,
                i5$2.DragDropModule,
                i3$2.BsModalModule,
                i6.IntlModule,
                i5$1.ValidationModule,
                i3$4.RouterModule,
                i5.BsSelectionModule,
                i3$2.BsModalModule,
                i3$3.UtilsModule,
                i3.BsActionModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsSavedQueriesModule, { declarations: [BsEditSavedQuery, BsManageSavedQueries,
                BsExportQuery, BsQueryExporter, BsSavedQueriesMenuComponent,
                BsFacetSavedQueries, BsFacetRecentQueries, BsFacetRecentDocuments], imports: [i4$1.CommonModule,
                i1$1.FormsModule, i1$1.ReactiveFormsModule,
                i5$2.DragDropModule,
                i3$2.BsModalModule,
                i6.IntlModule,
                i5$1.ValidationModule,
                i3$4.RouterModule,
                i5.BsSelectionModule,
                i3$2.BsModalModule,
                i3$3.UtilsModule,
                i3.BsActionModule], exports: [BsEditSavedQuery, BsManageSavedQueries,
                BsExportQuery, BsQueryExporter, BsSavedQueriesMenuComponent,
                BsFacetSavedQueries, BsFacetRecentQueries, BsFacetRecentDocuments] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsSavedQueriesModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i4$1.CommonModule,
                            i1$1.FormsModule, i1$1.ReactiveFormsModule,
                            i5$2.DragDropModule,
                            i3$2.BsModalModule,
                            i6.IntlModule,
                            i5$1.ValidationModule,
                            i3$4.RouterModule,
                            i5.BsSelectionModule,
                            i3$2.BsModalModule,
                            i3$3.UtilsModule,
                            i3.BsActionModule
                        ],
                        declarations: [
                            BsEditSavedQuery, BsManageSavedQueries,
                            BsExportQuery, BsQueryExporter, BsSavedQueriesMenuComponent,
                            BsFacetSavedQueries, BsFacetRecentQueries, BsFacetRecentDocuments
                        ],
                        exports: [
                            BsEditSavedQuery, BsManageSavedQueries,
                            BsExportQuery, BsQueryExporter, BsSavedQueriesMenuComponent,
                            BsFacetSavedQueries, BsFacetRecentQueries, BsFacetRecentDocuments
                        ],
                        providers: [
                            {
                                provide: SAVEDQUERY_COMPONENTS,
                                useValue: {
                                    editSavedQueryModal: BsEditSavedQuery,
                                    manageSavedQueriesModal: BsManageSavedQueries,
                                    exportSavedQueryModal: BsExportQuery
                                }
                            }
                        ]
                    }]
            }], null, null);
    })();

    var _enSavedQueries = {
        "savedQueries": {
            "savedQueries": "Saved Queries",
            "saveCurrentQuery": "Save Current Query",
            "manageSavedQueries": "Manage Saved Queries",
            "savedQueryAlreadyExists": "A saved query with that name already exists. Would you like to replace it?",
            "noSavedQuery": "You have not yet saved a search query...",
            "delete": "Delete this saved query"
        },
        "recentQueries": {
            "noRecentQuery": "You have not yet searched for something...",
            "delete": "Delete this recent query",
            "save": "Save this query"
        },
        "recentDocuments": {
            "recentDocuments": "Recent documents",
            "noRecentDocument": "You have not yet opened a document...",
            "delete": "Delete this recent document"
        },
        "editSavedQuery": {
            "title": "Saved Query",
            "name": "Name"
        },
        "exportQuery": {
            "dialogTitle": "Export",
            "dialogOutputFormat": "Output format",
            "dialogMaxCount": "Max rows",
            "dialogSourceType": "Export from",
            "dialogResult": "Current result",
            "dialogSelection": "Current selection",
            "btnTitle": "Export results",
            "exportResult": "Export result as {type}",
            "exportSelection": "Export selection as {type}",
            "btnDownload": "Download",
            "btnClose": "Close",
            "successNotification": "Download complete",
            "exportedColumns": "Columns to export",
            "exportedColumnsLabelTooltip": "Select the columns that you want to export, an empty selection means exporting all columns",
            "dialogMaxCountTooltip": "By default, the number of results is limited to {count}"
        },
        "manageSavedQueries": {
            "title": "Manage Saved Queries",
            "edit": "Edit",
            "reorder": "Reorder",
            "remove": "Remove",
            "removeAll": "Remove all",
            "export": "Export",
            "name": "Name",
            "rss": "RSS Feed"
        },
    };

    var _frSavedQueries = {
        "savedQueries": {
            "savedQueries": "Requêtes sauvegardées",
            "saveCurrentQuery": "Enregistrer la requête courante",
            "manageSavedQueries": "Gérer les requêtes sauvegardées",
            "savedQueryAlreadyExists": "Une requête sauvegardée avec ce nom existe déjà. Voulez-vous la remplacer ?",
            "noSavedQuery": "Vous n'avez pas encore enregistré de requête de recherche...",
            "delete": "Supprimer cette requête enregistrée"
        },
        "recentQueries": {
            "noRecentQuery": "Vous n'avez pas encore effectué de recherche...",
            "delete": "Supprimer cette requête",
            "save": "Enregistrer cette requête"
        },
        "recentDocuments": {
            "recentDocuments": "Documents récents",
            "noRecentDocument": "Vous n'avez pas encore ouvert de document...",
            "delete": "Supprimer ce document récent"
        },
        "editSavedQuery": {
            "title": "Requête sauvegardée",
            "name": "Nom"
        },
        "exportQuery": {
            "dialogTitle": "Export",
            "dialogOutputFormat": "Format de sortie",
            "dialogMaxCount": "Nb max de lignes",
            "dialogSourceType": "Exporter depuis",
            "dialogResult": "Résultat courant",
            "dialogSelection": "Sélection courante",
            "btnTitle": "Exporter les résultats",
            "exportResult": "Exporter le résultat en {type}",
            "exportSelection": "Exporter la sélection en {type}",
            "btnDownload": "Télécharger",
            "btnClose": "Fermer",
            "successNotification": "Téléchargement terminé",
            "exportedColumns": "Colonnes à exporter",
            "exportedColumnsLabelTooltip": "Sélectionnez les colonnes que vous souhaitez exporter, une sélection vide signifie la sélection de tous le colonnes",
            "dialogMaxCountTooltip": "Par défaut, le nombre de résultats est limité à {count}"
        },
        "manageSavedQueries": {
            "title": "Gérer les requêtes sauvegardées",
            "edit": "Editer",
            "reorder": "Réorganiser",
            "remove": "Effacer",
            "removeAll": "Effacer tout",
            "export": "Exporter",
            "name": "Nom",
            "rss": "Flux RSS"
        },
    };

    var _deSavedQueries = {
        "savedQueries": {
            "savedQueries": "Gespeicherte Suchanfragen",
            "saveCurrentQuery": "Aktuelle Suchanfrage speichern",
            "manageSavedQueries": "Aktuelle Suchanfragen verwalten",
            "savedQueryAlreadyExists": "Es existiert bereits eine Suchanfrage mit diesem Namen. Möchten Sie sie ersetzen?",
            "noSavedQuery": "Sie haben noch keine Suchanfrage gespeichert...",
            "delete": "Löschen Sie diese gespeicherte Suche"
        },
        "recentQueries": {
            "noRecentQuery": "Sie haben noch keine Suche durchgeführt...",
            "delete": "Löschen Sie diese letzte Suche",
            "save": "Speichern Sie diese letzte Suche"
        },
        "recentDocuments": {
            "recentDocuments": "Kürzlich angesehenes Dokument",
            "noRecentDocument": "Sie haben kein Dokument angezeigt",
            "delete": "Löschen Sie dieses kürzlich angezeigte Dokument"
        },
        "editSavedQuery": {
            "title": "Gespeicherte Suchanfrage",
            "name": "Name"
        },
        "exportQuery": {
            "dialogTitle": "Export",
            "dialogOutputFormat": "Ausgabeformat",
            "dialogMaxCount": "Maximale Anzahl der Zeilen",
            "dialogSourceType": "Exportiere ...",
            "dialogResult": "aktuelle Ergebnisliste",
            "dialogSelection": "aktuelle Auswahl",
            "btnTitle": "Export",
            "exportResult": "Exportiere die Ergebnisliste als {type}",
            "exportSelection": "Exportiere die Auswahl als {type}",
            "btnDownload": "Herunterladen",
            "btnClose": "Schließen",
            "successNotification": "Herunterladen beendet",
            "exportedColumns": "Zu exportierende Spalten",
            "exportedColumnsLabelTooltip": "Wählen Sie die Spalten aus, die Sie exportieren möchten. Eine leere Auswahl bedeutet, dass alle Spalten exportiert werden",
            "dialogMaxCountTooltip": "Standardmäßig ist die Anzahl der Ergebnisse auf {count} begrenzt"
        },
        "manageSavedQueries": {
            "title": "Gespeicherte Suchanfragen verwalten",
            "edit": "Bearbeiten",
            "reorder": "Neu sortieren",
            "remove": "Entfernen",
            "removeAll": "Alle entfernen",
            "export": "Exportieren",
            "name": "Name",
            "rss": "RSS-Feed"
        },
    };

    var enSavedQueries = base.Utils.merge({}, _enSavedQueries, i2.enSearch, i5.enSelection, i3$2.enModal);
    var frSavedQueries = base.Utils.merge({}, _frSavedQueries, i2.frSearch, i5.frSelection, i3$2.frModal);
    var deSavedQueries = base.Utils.merge({}, _deSavedQueries, i2.deSearch, i5.deSelection, i3$2.deModal);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BsEditSavedQuery = BsEditSavedQuery;
    exports.BsExportQuery = BsExportQuery;
    exports.BsFacetRecentDocuments = BsFacetRecentDocuments;
    exports.BsFacetRecentQueries = BsFacetRecentQueries;
    exports.BsFacetSavedQueries = BsFacetSavedQueries;
    exports.BsManageSavedQueries = BsManageSavedQueries;
    exports.BsQueryExporter = BsQueryExporter;
    exports.BsSavedQueriesMenuComponent = BsSavedQueriesMenuComponent;
    exports.BsSavedQueriesModule = BsSavedQueriesModule;
    exports.MAX_DOCUMENTS = MAX_DOCUMENTS;
    exports.MAX_QUERIES = MAX_QUERIES;
    exports.RECENT_DOCUMENTS_CHANGE_EVENTS = RECENT_DOCUMENTS_CHANGE_EVENTS;
    exports.RECENT_QUERIES_CHANGE_EVENTS = RECENT_QUERIES_CHANGE_EVENTS;
    exports.RecentDocumentsService = RecentDocumentsService;
    exports.RecentQueriesService = RecentQueriesService;
    exports.SAVEDQUERY_COMPONENTS = SAVEDQUERY_COMPONENTS;
    exports.SAVED_QUERIES_CHANGE_EVENTS = SAVED_QUERIES_CHANGE_EVENTS;
    exports.SavedQueriesService = SavedQueriesService;
    exports.deSavedQueries = deSavedQueries;
    exports.enSavedQueries = enSavedQueries;
    exports.frSavedQueries = frSavedQueries;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-saved-queries.umd.js.map
