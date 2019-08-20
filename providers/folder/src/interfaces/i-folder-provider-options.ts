
import { IConfigurationValueProviderOptions } from "@idoconfig/base";

export interface IFolderConfigurationValueProviderOptions extends IConfigurationValueProviderOptions {
    path?: string;
    stripFileExtension?: boolean;
    uppercase?: boolean;
    underscore?: boolean;
    blacklist?: string[];
}
