import { IConfiguration } from "./interfaces/i-configuration";
import { IConfigurationValueProvider } from "./interfaces/i-configuration-value-provider";

export class Configuration implements IConfiguration {

    public constructor(
        private configValueProviders: IConfigurationValueProvider[] = [],
    ) {}

    //#region Public methods

    /**
     * Get a section from configured value providers. Later providers overwrite
     * values with the same key.
     *
     * @param key The key for wich to get the section
     */
    public getSection(key: string): object {
        let section = {};
        for (const provider of this.configValueProviders) {
            // Merge provider section with existing values
            section = Object.assign({}, section, provider.getSection(key));
        }
        return section;
    }

    /**
     * Get a value from configuration
     *
     * @param key The key for which to get value
     * @param defaultValue A default value that will be returned when no provider yields a result
     * @param preferredProvider Optional. When specified return a value only from this provider
     * @return The configuration value for key
     */
    public getValue(
        key: string,
        defaultValue?: boolean|number|string,
        preferredProvider?: string,
    ): boolean|number|string {
        let value = defaultValue;
        for (const provider of this.configValueProviders) {
            const providerValue = provider.getValue(key);
            if (provider.name === preferredProvider) {
                value = providerValue;
                break;
            }
            if (providerValue != null) {
                value = providerValue;
            }
        }
        return value;
    }

    public getValueAsString(key: string, defaultValue?: boolean|number|string, preferredProvider?: string) {
        return `${this.getValue(key, defaultValue, preferredProvider)}`;
    }

    public getValueAsNumber(key: string, defaultValue?: boolean|number|string, preferredProvider?: string) {
        return parseInt(`${this.getValue(key, defaultValue, preferredProvider)}`, 10);
    }

    public getValueAsBoolean(key: string, defaultValue?: boolean|number|string, preferredProvider?: string) {
        const val = this.getValue(key, defaultValue, preferredProvider);
        if (val === undefined) {
            return;
        }
        if (`${val}` === "false" || this.getValueAsNumber(key) === 0) {
            return false;
        }
        return !!val;
    }

    //#endregion
}
