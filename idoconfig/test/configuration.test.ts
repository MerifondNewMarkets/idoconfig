import { expect } from "chai";
import { describe, it } from "mocha";
import { Configuration } from "../src/configuration";
import { MockProvider } from "./mock-provider";

describe("Configuration", () => {
    it("should return nothing when no configuration is set", () => {
        const configuration = new Configuration();
        const val = configuration.getValue("my-key");
        expect(val).to.be.undefined;
    });

    it("should return configured values", () => {
        const provider = new MockProvider({}, [
            { key: "my-key", value: "42" },
        ]);
        const configuration = new Configuration([provider]);

        const val = configuration.getValue("my-key");
        expect(val).to.equal("42");
    });

    it("should return empty values for non-existing keys", () => {
        const provider = new MockProvider({}, [{ key: "my-key", value: "42" }]);
        const configuration = new Configuration([provider]);

        const val = configuration.getValue("non-existing-key");
        expect(val).to.be.undefined;
    });

    it("should return the provided default value", () => {
        const provider = new MockProvider();
        const configuration = new Configuration([provider]);
        expect(configuration.getValue("my-key", "default-value")).to.equal("default-value");
    });

    it("should not return the default value when the requested key exists", () => {
        const provider = new MockProvider(null, [{ key: "my-key", value: "my-value" }]);
        const configuration = new Configuration([provider]);
        expect(configuration.getValue("my-key", "default-value")).to.equal("my-value");
    });

    it("should return the value from the latest provider", () => {
        const firstProviderValues  = [{ key: "my-key", value: "value-from-first-provider" }];
        const secondProviderValues = [{ key: "my-key", value: "value-from-second-provider" }];
        const firstProvider        = new MockProvider({ name: "first" }, firstProviderValues);
        const secondProvider       = new MockProvider({ name: "second" }, secondProviderValues);
        const thirdProvider        = new MockProvider({ name: "third" });

        const configuration = new Configuration([firstProvider, secondProvider, thirdProvider]);

        expect(configuration.getValue("my-key")).to.equal("value-from-second-provider");
    });

    it("should return the value from the requested provider", () => {
        const firstProviderValues  = [{ key: "my-key", value: "value-from-first-provider" }];
        const secondProviderValues = [{ key: "my-key", value: "value-from-second-provider" }];
        const firstProvider        = new MockProvider({ name: "first" }, firstProviderValues);
        const secondProvider       = new MockProvider({ name: "second" }, secondProviderValues);

        const configuration = new Configuration([firstProvider, secondProvider]);

        expect(configuration.getValue("my-key", "", "first")).to.equal("value-from-first-provider");
    });

    it("should cast value to number", () => {
        const values = [
            { key: "my-key", value: "42" },
            { key: "my-empty-value", value: "" },
            { key: "my-null-value", value: "0" },
            { key: "my-non-number-value", value: "abcde" },
        ];
        const provider = new MockProvider({}, values);
        const configuration = new Configuration([provider]);
        expect(configuration.getValueAsNumber("my-key")).to.equal(42);
        expect(configuration.getValueAsNumber("my-empty-value")).to.NaN;
        expect(configuration.getValueAsNumber("my-null-value")).to.equal(0);
        expect(configuration.getValueAsNumber("my-non-number-value")).to.NaN;
    });

    it("should cast value to string", () => {
        const values = [
            { key: "my-key", value: 42 },
            { key: "my-null-value", value: null },
            { key: "my-undefined-value", value: undefined },
            { key: "my-missing-value" },
        ];
        const provider = new MockProvider({}, values);
        const configuration = new Configuration([provider]);

        expect(configuration.getValueAsString("my-key")).to.equal("42");
        expect(configuration.getValueAsString("my-null-value")).to.equal("undefined");
        expect(configuration.getValueAsString("my-missing-value")).to.equal("undefined");
        expect(configuration.getValueAsString("my-undefined-value")).to.equal("undefined");
    });

    it("should cast value to boolean", () => {
        const values = [
            { key: "key-bool-true", value: true },
            { key: "key-bool-false", value: false },
            { key: "key-string-true", value: "true" },
            { key: "key-string-false", value: "false" },
            { key: "key-number-true", value: "1" },
            { key: "key-number-false", value: "0" },
            { key: "key-empty-false", value: "" },
            { key: "key-non-empty-string-true", value: "abc" },
            { key: "key-non-null-number-true", value: 2 },
        ];
        const provider = new MockProvider({}, values);
        const configuration = new Configuration([provider]);

        expect(configuration.getValueAsBoolean("key-bool-true")).to.equal(true);
        expect(configuration.getValueAsBoolean("key-bool-false")).to.equal(false);
        expect(configuration.getValueAsBoolean("key-string-true")).to.equal(true);
        expect(configuration.getValueAsBoolean("key-string-false")).to.equal(false);
        expect(configuration.getValueAsBoolean("key-number-true")).to.equal(true);
        expect(configuration.getValueAsBoolean("key-number-false")).to.equal(false);
        expect(configuration.getValueAsBoolean("key-empty-false")).to.equal(false);
        expect(configuration.getValueAsBoolean("key-non-empty-string-true")).to.equal(true);
        expect(configuration.getValueAsBoolean("key-non-null-number-true")).to.equal(true);
        expect(configuration.getValueAsBoolean("key-non-existing")).to.be.undefined;
    });

    it("should support sections", () => {
        const values = [
            { key: "foo", value: "foo" },
            { key: "foo:bar", value: "foo/bar" },
            { key: "foo:baz", value: "foo/baz" },
            { key: "foo:bar:baz", value: "foo/bar/baz" },
        ];
        const provider = new MockProvider(null, values);
        const configuration = new Configuration([provider]);

        expect(configuration.getSection("foo")).to.eql({
            bar: "foo/bar",
            baz: "foo/baz",
        });
    });


    it("should support getting a direct value from a nested section", () => {
        const values = [
            { key: "foo:bar", value: "foobar-value" },
            { key: "foo:bar:baz", value: "foobarbaz-value" },
        ];
        const provider = new MockProvider(null, values);
        const configuration = new Configuration([provider]);

        expect(configuration.getValue("foo:bar")).to.equal("foobar-value");
        expect(configuration.getValue("foo__bar")).to.equal("foobar-value");
        expect(configuration.getValue("foo--bar")).to.equal("foobar-value");
        expect(configuration.getValue("foo:bar:baz")).to.equal("foobarbaz-value");
    });

    it("should merge nested sections", () => {
        const valuesA = [
            { key: "foo", value: "foo" },
            { key: "foo:bar", value: "foo/bar" },
            { key: "foo:baz", value: "foo/baz" },
            { key: "foo:bar:baz", value: "foo/bar/baz" },
        ];
        const providerA = new MockProvider(null, valuesA);
        const valuesB = [
            { key: "foo:baz", value: "foo/baz-from-b" },
        ];
        const providerB = new MockProvider(null, valuesB);

        const configuration = new Configuration([providerA, providerB]);

        expect(configuration.getSection("foo")).to.eql({
            bar: "foo/bar",
            baz: "foo/baz-from-b",
        });
    });

});
