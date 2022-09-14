import { Utils } from '@sinequa/core/base';
import { enLogin, frLogin, deLogin } from '@sinequa/core/login';

const enCore = Utils.merge({}, enLogin);
const frCore = Utils.merge({}, frLogin);
const deCore = Utils.merge({}, deLogin);

class DefaultLocalesConfig {
    constructor() {
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
}

/**
 * Generated bundle index. Do not edit.
 */

export { DefaultLocalesConfig, deCore, enCore, frCore };
//# sourceMappingURL=sinequa-core.js.map
