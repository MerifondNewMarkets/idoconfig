import { expect } from "chai";
import { describe, it } from "mocha";
import { MockProvider } from "./mock-provider";

describe("ValueProvider", () => {

    it("should sanitize keys", () => {
        const provider = new MockProvider();
        const values = [
            { a: "", b: "" },
            { a: "key with spaces", b: "key_with_spaces" },
            { a: "key with   multiple spaces", b: "key_with:multiple_spaces" },
            { a: "key w|th in^alid char$", b: "key_wth_inalid_char" },
            { a: "LOWERCASE", b: "lowercase" },
            { a: "foo__bar", b: "foo:bar" },
            { a: "Bar_FOO", b: "bar_foo" },
            { a: "bar:foo", b: "bar:foo" },
            { a: "bar::foo", b: "bar:foo" },
            { a: "bar:::foo", b: "bar:foo" },
            { a: "bar___foo", b: "bar:foo" },
            { a: "FOO__BAR__LOREM", b: "foo:bar:lorem" },
        ];
        for (const v of values) {
            expect(provider.sanitizeKey(v.a)).to.equal(v.b);
        }
    });

    it("should support sections", () => {
        const values = [
            { key: "foo", value: "foo" },
            { key: "foo:bar", value: "foo/bar" },
            { key: "foo:baz", value: "foo/baz" },
            { key: "foo:bar:baz", value: "foo/bar/baz" },
        ];
        const provider = new MockProvider(null, values);

        expect(provider.getSection("foo")).to.eql({
            bar: "foo/bar",
            baz: "foo/baz",
        });
    });

});
