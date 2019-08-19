export class Helpers {
    /**
     * Sanitize a configuration key.
     *
     * Valid key chars are [-_:a-zA-Z0-9]. Invalid chars are discarded. Dash,
     * Colon and underscore are converted to Colon which serves as a section
     * separator.
     *
     * @param key
     */
    public static sanitizeConfigKey(key: string) {
        return key
            .split(" ").join("_")
            .replace(/[^-_:a-z0-9]+/gi, "")
            .replace(/[-_:]{2,}/gi, ":")
            .toLowerCase();
    }
}
