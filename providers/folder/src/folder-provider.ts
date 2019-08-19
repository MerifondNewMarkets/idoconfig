import * as fs from "fs";
import { ConfigurationProviderAbstract } from "i-do-config";
import { isBinaryFileSync } from "isbinaryfile";
import { join, normalize, sep } from "path";
import { FolderProviderOptions } from "./folder-provider-options";
import { IFolderConfigurationValueProviderOptions } from "./interfaces/i-folder-provider-options";

const SIZE_ONE_MB = 1024 * 1024;
const MAX_FILES = 100;

/**
 * Read files (content) from a folder. Filenames are mangled through filters which (may)
 * transform the filename into ENV_VAR_SYNTAX (or something entirely different).
 *
 * Default filename filters remove the file extension and enforce ALL_CAPS_STYLE, so
 * "my-secret-file.txt" becomes "MY_SECRET_FILE". Additional filename filters may be
 * inserted via dependency injection.
 */
export class FolderConfigurationValueProvider extends ConfigurationProviderAbstract {

    protected options: IFolderConfigurationValueProviderOptions;
    protected filenameFilters?: Array<(v: string) => string> = [];

    constructor(
        options?: IFolderConfigurationValueProviderOptions,
        additionalFilters: Array<(v: string) => string> = [],
    ) {
        super();

        const defaultOptions = new FolderProviderOptions();
        const opts = Object.assign({}, defaultOptions, options);
        if (opts.stripFileExtension) { this.filenameFilters.push(this.removeExtension); }
        this.options = opts;

        // Push additional filename filters onto list
        for (const filter of additionalFilters) {
            this.filenameFilters.push(filter);
        }

        // Read files from folder
        try {
            const normalizedPath = this.normalizePath(this.options.path);
            const items = fs.readdirSync(normalizedPath);
            if (items.length <= MAX_FILES) {
                for (const item of items) {
                    if (this.options.blacklist.indexOf(item) !== -1) {
                        continue;
                    }
                    const file = join(normalizedPath, item);
                    const stat = fs.statSync(file);
                    // Only read files that are non-binary and smaller than 1MB
                    if (stat.isFile() && stat.size < SIZE_ONE_MB && !isBinaryFileSync(file, stat.size)) {
                        const filename = this.applyFiltersToFilename(item);
                        const key = this.sanitizeKey(filename);
                        const val = fs.readFileSync(file, "utf8").trim();
                        // Regular version
                        this.values[key] = val;
                        // All underscore version
                        this.values[key.replace(/[^0-9a-z]+/ig, "_")] = val;
                        // All dash version
                        this.values[key.replace(/[^0-9a-z]+/ig, "-")] = val;
                    }
                }
            }
        } catch (e) {
            // @TODO: Implement log emitter
            // console.warn(`Could not read secrets from ${this.options.path}. ${e.message}`);
        }
    }

    /**
     * Try to get cached value first. Upon cache miss read file directly
     * @param key
     */
    public getValue(key: string) {
        key = this.sanitizeKey(key);
        if (this.values[key]) {
            return this.values[key];
        }
        return this.getValueFromFile(key);
    }

    /**
     * When given path starts with PATH_SEP it is absolute. Don't perform
     * any other action. If it is relative prepend the current path.
     *
     * @param unsafePath
     */
    private normalizePath(unsafePath: string) {
        const parts = unsafePath.split("/");
        return normalize(parts.join(sep));
    }

    /**
     * Return trimmed value of requested file
     * @param file
     */
    private getValueFromFile(file: string): string {
        const filepath = `${this.options.path}${file}`;
        if (file.indexOf(sep) !== -1) {
            throw new Error("File name cannot contain path separator");
        }
        if (!fs.existsSync(filepath)) {
            return;
        }
        return fs.readFileSync(filepath, "utf8").trim();
    }

    private applyFiltersToFilename(val: string): string {
        for (const filter of this.filenameFilters) {
            val = filter.call(this, val);
        }
        return val;
    }

    private removeExtension(val: string): string {
        const parts = val.split(".");
        if (parts.length > 1) {
            parts.pop();
        }
        return parts.join(".");
    }
}

export default FolderConfigurationValueProvider;
