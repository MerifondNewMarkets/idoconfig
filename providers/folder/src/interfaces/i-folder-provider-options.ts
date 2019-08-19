
import { IConfigurationValueProviderOptions } from "idoconfig";

export interface IFolderConfigurationValueProviderOptions extends IConfigurationValueProviderOptions {
    path?: string;
    stripFileExtension?: boolean;
    uppercase?: boolean;
    underscore?: boolean;
    blacklist?: string[];
}
