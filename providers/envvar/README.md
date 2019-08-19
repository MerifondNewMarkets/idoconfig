# Environment Variables Provider

Read values from `process.env` and make them accessible through [`Configuration`](https://github.com/MerifondNewMarkets/i-do-config)

[![Version npm](https://img.shields.io/npm/v/idoconfig-provider-envvar.svg?style=flat-square)](https://www.npmjs.com/package/idoconfig-provider-envvar)
[![npm Downloads](https://img.shields.io/npm/dm/idoconfig-provider-envvar.svg?style=flat-square)](https://npmcharts.com/compare/idoconfig-provider-envvar?minimal=true)
[![Build Status](https://img.shields.io/travis/MerifondNewMarkets/idoconfig-provider-envvar/master.svg?style=flat-square)](https://travis-ci.org/MerifondNewMarkets/idoconfig-provider-envvar)
[![Dependencies](https://img.shields.io/david/MerifondNewMarkets/idoconfig-provider-envvar.svg?style=flat-square)](https://david-dm.org/MerifondNewMarkets/idoconfig-provider-envvar)
[![Dev-Dependencies](https://img.shields.io/david/dev/MerifondNewMarkets/idoconfig-provider-envvar.svg?style=flat-square)](https://david-dm.org/MerifondNewMarkets/idoconfig-provider-envvar)

[![NPM](https://nodei.co/npm/idoconfig-provider-envvar.png?downloads=true&downloadRank=true)](https://nodei.co/npm/idoconfig-provider-envvar/)


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
import { Configuration, IConfiguration, IConfigurationValueProvider } from "i-do-config";
import { EnvVarConfigurationValueProvider } from "idoconfig-provider-envvar";

const di = new Container({ defaultScope: "Singleton" });

decorate(injectable(), Configuration);
decorate(injectable(), EnvVarConfigurationValueProvider);

di.bind<IConfigurationValueProvider>("ConfigProvider").to(EnvVarConfigurationValueProvider);
di.bind<IConfiguration>("Configuration").to(Configuration);
```