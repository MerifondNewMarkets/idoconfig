import { expect } from "chai";
import { Configuration } from "@idoconfig/base";
import { describe, it } from "mocha";
import { EnvVarConfigurationValueProvider } from "../src/environment-variable-provider";

const provider = new EnvVarConfigurationValueProvider();
const configuration = new Configuration([provider]);

describe("function test", () => {
    it("should sanitize the key", () => {
        expect(configuration.getValue("my_var")).to.equal("my-value");
        expect(configuration.getValue("My_Var")).to.equal("my-value");
        expect(configuration.getValue("MY_VAR")).to.equal("my-value");
    });

    it("return default value when requested env var is not defined", () => {
        expect(configuration.getValue("non-existing-key", "default-value")).to.equal("default-value");
    });

    it("should read multiple values", () => {
        expect(configuration.getValue("my_var")).to.equal("my-value");
        expect(configuration.getValue("my-lowercase-var")).to.equal("my-lowercase-value");
        expect(configuration.getValue("my_other_lowercase_var")).to.equal("my-other-lowercase-value");
    });

    it("should support sections", () => {
        expect(configuration.getSection("my:nested")).to.eql({ key: "nested-value" });
    });
});
