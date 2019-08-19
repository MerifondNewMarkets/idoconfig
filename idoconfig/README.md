# Configuration

*tl;dr* Provide app configuration as key-value pairs from different providers. Inspired by ASP.net Core IConfiguration

[![Version npm](https://img.shields.io/npm/v/i-do-config.svg?style=flat-square)](https://www.npmjs.com/package/i-do-config)
[![npm Downloads](https://img.shields.io/npm/dm/i-do-config.svg?style=flat-square)](https://npmcharts.com/compare/i-do-config?minimal=true)
[![Build Status](https://img.shields.io/travis/MerifondNewMarkets/i-do-config/master.svg?style=flat-square)](https://travis-ci.org/MerifondNewMarkets/i-do-config)
[![Dependencies](https://img.shields.io/david/MerifondNewMarkets/i-do-config.svg?style=flat-square)](https://david-dm.org/MerifondNewMarkets/i-do-config)
[![Dev-Dependencies](https://img.shields.io/david/dev/MerifondNewMarkets/i-do-config.svg?style=flat-square)](https://david-dm.org/MerifondNewMarkets/i-do-config)

[![NPM](https://nodei.co/npm/i-do-config.png?downloads=true&downloadRank=true)](https://nodei.co/npm/i-do-config/)

---

## Motivation

Providing app configuration in Node projects seems surprisingly hard. There are a million ways to choose from [*citation needed*]. Environment variables, JSON files... Well, that's two. But even with environment variables there are at least two different approaches. The *real* env vars (available via `process.env.ENV_VAR_NAME`) and the `.env` file. When using the `.env` file you'll most likely use the [`dotenv` package](https://github.com/motdotla/dotenv).

This package was inspired by the [ASP.net (Core) IConfiguration](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.configuration.iconfiguration?view=aspnetcore-2.1) approach. A single class instance that you can pass around via DI (or any other way) and query for values.

## Example

```typescript
const providers = [
    new EnvVarConfigurationProvider();
    new JsonConfigurationProvider();
];
const config = new Configuration(providers);

const value  = config.getValue("ENV_VAR"); // Returns a single value, eg. "my-value"
const section = config.getSection("foo"); // Returns an object, eg. { "key-a": "value-a", "key-b": "value-b", ... }
```

*Note*: In your application you'll probably setup the providers via dependency injection.

## Dependency injection

In your `inversify.config.ts` file do this:

```typescript
import Container from "inversify";
import { Configuration, ExampleConfigProvider, IConfiguration, IConfigurationValueProvider } from "i-do-config";

const di = new Container({ defaultScope: "Singleton" });

decorate(injectable(), Configuration);
decorate(injectable(), ExampleConfigProvider);

di.bind<IConfigurationValueProvider>("ConfigProvider").to(ExampleConfigProvider);
di.bind<IConfiguration>("Configuration").to(Configuration);
```

> *Please note:* `ExampleConfigProvider` does exist in this repository. Nor elsewhere.

## Tests

Written in TypeScript, done with Mocha & Chai. Here's a working VS Code launch configuration:

```json
{
    "type": "node",
    "request": "launch",
    "name": "Tests",
    "program": "${workspaceRoot}/node_modules/mocha/bin/_mocha",
    "cwd": "${workspaceRoot}",
    "args": [
        "-u", "tdd",
        "--no-timeouts",
        "-r", "ts-node/register",
        "--colors",
        "${workspaceRoot}/test/**/*test.ts"
    ],
    "protocol": "inspector",
    "sourceMaps": true,
    "internalConsoleOptions": "openOnSessionStart"
}
```

## Provider Options

You can pass provider-specific options to provider class instances. The only (optional) default member is the name property. You may implement other behaviour as you see fit (e.g. key/value formatters).

```typescript
interface IConfigurationValueProviderOptions {
    name?: string;
}
```
