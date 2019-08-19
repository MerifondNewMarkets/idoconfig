import { expect } from "chai";
import { Configuration } from "i-do-config";
import { describe, it } from "mocha";
import { FolderConfigurationValueProvider } from "../src/folder-provider";
import { FolderProviderOptions } from "../src/folder-provider-options";

describe("function test", () => {
    it("should not throw when an error is encountered", () => {
        const options: FolderProviderOptions = { path: "/does/not/exist/" };
        const provider = new FolderConfigurationValueProvider(options);
        const configuration = new Configuration([provider]);

        expect(configuration.getValue("MY_VAR")).to.not.throw;
    });

    it("should read files from a folder", () => {
        const options: FolderProviderOptions = {
            path: `${__dirname}/values`,
            stripFileExtension: false,
            underscore: false,
            uppercase: false,
        };
        const provider = new FolderConfigurationValueProvider(options);
        const configuration = new Configuration([provider]);

        expect(configuration.getValue("my-var.ext")).to.equal("my-value");
    });

    // Strip whitespace
    it("should remove whitespace from the read files", () => {
        const options: FolderProviderOptions = {
            path: `${__dirname}/values`,
        };
        const provider = new FolderConfigurationValueProvider(options);
        const configuration = new Configuration([provider]);

        expect(configuration.getValue("MY_VAR_WITH_WHITESPACE")).to.equal("my-value-with-whitespace");
    });

    // Strip file extension
    it("should strip file extensions", () => {
        const options: FolderProviderOptions = {
            path: `${__dirname}/values`,
            underscore: false,
            uppercase: false,
        };
        const provider = new FolderConfigurationValueProvider(options);
        const configuration = new Configuration([provider]);
        expect(configuration.getValue("my-var")).to.equal("my-value");
    });

    // Blacklist
    it("should support blacklisting files", () => {
        const options: FolderProviderOptions = {
            blacklist: ["my-blacklisted-var.ext"],
            path: `${__dirname}/values`,
        };
        const provider = new FolderConfigurationValueProvider(options);
        const configuration = new Configuration([provider]);
        expect(configuration.getValue("MY_BLACKLISTED_VAR")).to.be.undefined;
        expect(configuration.getValue("MY_VAR")).to.equal("my-value");
    });

    // Custom filters
    it("should support custom filters for filenames", () => {
        const options: FolderProviderOptions = {
            path: `${__dirname}/values`,
        };
        const customFilenamePrefix = "cUstOm_";
        const customFilenameTransformer = (filename: string): string => {
            return `${customFilenamePrefix}${filename}`;
        };
        const provider = new FolderConfigurationValueProvider(options, [customFilenameTransformer]);
        const configuration = new Configuration([provider]);
        expect(configuration.getValue("cUstOm_MY_VAR")).to.equal("my-value");
    });

});
