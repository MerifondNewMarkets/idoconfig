export interface IConfigurationValueProvider {

    name: string;

    getValue(key: string): boolean|number|string;

    getSection(key: string): object;
}
