import { IFolderConfigurationValueProviderOptions } from "./interfaces/i-folder-provider-options";

export class FolderProviderOptions implements IFolderConfigurationValueProviderOptions {
    public path?: string = "/run/secrets/";
    public stripFileExtension?: boolean = true;
    public uppercase?: boolean = true;
    public underscore?: boolean = true;
    public blacklist?: string[] = [];
}

export default FolderProviderOptions;
