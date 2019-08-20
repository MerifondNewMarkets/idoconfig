# Folder Provider

Read values from files within a folder and make them accessible through [`Configuration`](https://github.com/MerifondNewMarkets/idoconfig)

[![Version npm](https://img.shields.io/npm/v/@idoconfig/provider-folder.svg)](https://www.npmjs.com/package/@idoconfig/provider-folder)
[![Actions Status](https://github.com/MerifondNewMarkets/idoconfig/workflows/Build/badge.svg)](https://github.com/MerifondNewMarkets/idoconfig/actions)
[![Actions Status](https://github.com/MerifondNewMarkets/idoconfig/workflows/Tests/badge.svg)](https://github.com/MerifondNewMarkets/idoconfig/actions)
[![npm Downloads](https://img.shields.io/npm/dm/@idoconfig/provider-folder.svg)](https://npmcharts.com/compare/@idoconfig/provider-folder?minimal=true)

[![NPM](https://nodeico.herokuapp.com/@idoconfig/provider-folder.svg)](https://www.npmjs.com/package/@idoconfig/provider-folder)

---

## Installation & Setup

Add this package to your `package.json`

```bash
npm install --save idoconfig-provider-folder
```

Use it!

```typescript
import { FolderConfigurationValueProvider } from "idoconfig-provider-folder";

// Use it

const folderProvider = new FolderConfigurationValueProvider();
const configuration = new Configuration([folderProvider]);

const value = configuration.getValue("my-key");
```

## Use with dependency injection

I'm using [inversify.io](http://inversify.io/)


```typescript
import Container from "inversify";
import { Configuration, IConfiguration, IConfigurationValueProvider } from "idoconfig";
import { FolderConfigurationValueProvider } from "idoconfig-provider-folder";

const di = new Container({ defaultScope: "Singleton" });

decorate(injectable(), Configuration);
decorate(injectable(), FolderConfigurationValueProvider);

di.bind<IConfigurationValueProvider>("ConfigProvider").to(FolderConfigurationValueProvider);
di.bind<IConfiguration>("Configuration").to(Configuration);
```