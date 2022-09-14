(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@sinequa/core/base'), require('@sinequa/core/login')) :
    typeof define === 'function' && define.amd ? define('@sinequa/core', ['exports', '@sinequa/core/base', '@sinequa/core/login'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.core = {}), global.sinequa.core.base, global.sinequa.core.login));
}(this, (function (exports, base, login) { 'use strict';

    var enCore = base.Utils.merge({}, login.enLogin);
    var frCore = base.Utils.merge({}, login.frLogin);
    var deCore = base.Utils.merge({}, login.deLogin);

    var DefaultLocalesConfig = /** @class */ (function () {
        function DefaultLocalesConfig() {
            this.defaultLocale = {
                name: "en",
                display: "English",
                data: {
                    intl: {
                        locale: "en-US"
                    },
                    messages: enCore,
                }
            };
            this.locales = [this.defaultLocale];
        }
        return DefaultLocalesConfig;
    }());

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DefaultLocalesConfig = DefaultLocalesConfig;
    exports.deCore = deCore;
    exports.enCore = enCore;
    exports.frCore = frCore;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-core.umd.js.map
