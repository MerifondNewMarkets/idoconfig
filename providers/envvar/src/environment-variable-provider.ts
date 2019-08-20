import * as dotenv from "dotenv";
import { ConfigurationProviderAbstract, IConfigurationValueProviderOptions } from "@idoconfig/base";

dotenv.config();

/**
 * Read ENV vars from process.env. The extra-package dotenv helps with reading values
 * from a .env file. All env var values are read in memory at class instantiation.
 */
export class EnvVarConfigurationValueProvider extends ConfigurationProviderAbstract {

    constructor(
        protected options?: IConfigurationValueProviderOptions,
    ) {
        super(options);
        for (const key in process.env) {
            if (Object.prototype.hasOwnProperty.call(process.env, key)) {
                const v = process.env[key];
                const k = this.sanitizeKey(key);
                this.values[k] = v;
            }
        }
    }

    public getValue(key: string) {
        key = this.sanitizeKey(key);
        if (this.values[key]) {
            return this.values[key];
        }
        return process.env[key];
    }
}

export default EnvVarConfigurationValueProvider;
