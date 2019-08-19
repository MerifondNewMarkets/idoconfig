export interface IConfiguration {

    /**
     * Return a single value for a given key.
     *
     * @param key The key for which to get the value
     * @param defaultValue A default value, if no value can be found at given key
     * @param preferredProvider If specified, get value from this provider
     */
    getValue(
        key: string,
        defaultValue?: boolean|number|string,
        preferredProvider?: string,
    ): boolean|number|string;

    /**
     * Get nested values as key-value pairs for given key.
     *
     * @param key The key for which to get the section
     */
    getSection(key: string): object;

    getValueAsString(key: string, defaultValue?: boolean|number|string, preferredProvider?: string): string;
    getValueAsNumber(key: string, defaultValue?: boolean|number|string, preferredProvider?: string): number;
    getValueAsBoolean(key: string, defaultValue?: boolean|number|string, preferredProvider?: string): boolean;
}
