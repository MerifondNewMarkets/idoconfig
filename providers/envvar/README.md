# Environment Variables Provider

Read values from `process.env` and make them accessible through [`Configuration`](https://github.com/MerifondNewMarkets/ido-config)


[![Version npm](https://img.shields.io/npm/v/@idoconfig/provider-envvar.svg)](https://www.npmjs.com/package/@idoconfig/provider-envvar)
[![Actions Status](https://github.com/MerifondNewMarkets/idoconfig/workflows/Build/badge.svg)](https://github.com/MerifondNewMarkets/idoconfig/actions)
[![Actions Status](https://github.com/MerifondNewMarkets/idoconfig/workflows/Tests/badge.svg)](https://github.com/MerifondNewMarkets/idoconfig/actions)
[![npm Downloads](https://img.shields.io/npm/dm/@idoconfig/provider-envvar.svg)](https://npmcharts.com/compare/@idoconfig/provider-envvar?minimal=true)

[![NPM](https://nodeico.herokuapp.com/@idoconfig/provider-envvar.svg)](https://www.npmjs.com/package/@idoconfig/provider-envvar)


---

## Installation & Setup

Add this package to your `package.json`

```bash
npm install --save idoconfig-provider-envvar
```

Use it!

```typescript
import { EnvVarConfigurationValueProvider } from "idoconfig-provider-envvar";

// Use it

const envVarProvider = new EnvVarConfigurationValueProvider();
const configuration = new Configuration([envVarProvider]);

const value = configuration.getValue("my-key");
```

## Use with dependency injection

I'm using [inversify.io](http://inversify.io/)


```typescript
import Container from "inversify";
import { Configuration, IConfiguration, IConfigurationValueProvider } from "idoconfig";
import { EnvVarConfigurationValueProvider } from "idoconfig-provider-envvar";

const di = new Container({ defaultScope: "Singleton" });

decorate(injectable(), Configuration);
decorate(injectable(), EnvVarConfigurationValueProvider);

di.bind<IConfigurationValueProvider>("ConfigProvider").to(EnvVarConfigurationValueProvider);
di.bind<IConfiguration>("Configuration").to(Configuration);
```