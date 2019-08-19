import { ConfigurationProviderAbstract } from "../src/abstract-provider";
import { IConfigurationValueProviderOptions } from "../src/interfaces/i-configuration-value-provider-options";

export class MockProvider extends ConfigurationProviderAbstract {

    public get name() {
        return this.options && this.options.name || this.constructor.name;
    }

    constructor(
        protected options?: IConfigurationValueProviderOptions,
        protected config: Array<{key: string; value?: boolean|number|string}> = [],
    ) {
        super(options);
        for (const cfg of config) {
            this.values[this.sanitizeKey(cfg.key)] = cfg.value;
        }
    }

    public getValue(key: string) {
        key = this.sanitizeKey(key);
        for (const p of this.config) {
            if (p.key === key) {
                return p.value;
            }
        }
    }
}
