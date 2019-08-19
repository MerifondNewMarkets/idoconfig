
import { IConfigurationValueProviderOptions } from "i-do-config";

export interface IFolderConfigurationValueProviderOptions extends IConfigurationValueProviderOptions {
    path?: string;
    stripFileExtension?: boolean;
    uppercase?: boolean;
    underscore?: boolean;
    blacklist?: string[];
}
