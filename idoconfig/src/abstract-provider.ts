import { Helpers } from "./helpers";
import { IConfigurationValueProvider } from "./interfaces/i-configuration-value-provider";
import { IConfigurationValueProviderOptions } from "./interfaces/i-configuration-value-provider-options";

export abstract class ConfigurationProviderAbstract implements IConfigurationValueProvider {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected values: any = {};

    public get name() {
        return this.options && this.options.name || this.constructor.name;
    }

    constructor(
        protected options?: IConfigurationValueProviderOptions,
    ) {
    }

    public abstract getValue(key: string): boolean|number|string;

    /**
     * Get multiple values as key/value pairs
     *
     * @param key
     */
    public getSection(key: string): object {
        key = this.sanitizeKey(key);
        const section = {};
        for (const k in this.values) {
            // Make sure we retrieve a section and not a value
            if (k.indexOf(`${key}:`) === 0) {
                // Remove the prefixed key from the returned object
                const r = new RegExp(`${key}:`);
                const cleanedKey = k.replace(r, "");
                if (cleanedKey.indexOf(":") === -1) {
                    // Only add immediate values (discard nested values)
                    section[cleanedKey] = this.values[k];
                }
            }
        }
        return section;
    }

    public sanitizeKey(key: string) {
        return Helpers.sanitizeConfigKey(key);
    }
}
