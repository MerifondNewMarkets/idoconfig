# Folder Provider

Read values from files within a folder and make them accessible through [`Configuration`](https://github.com/MerifondNewMarkets/idoconfig)

[![Version npm](https://img.shields.io/npm/v/idoconfig-provider-folder.svg?style=flat-square)](https://www.npmjs.com/package/idoconfig-provider-folder)
[![npm Downloads](https://img.shields.io/npm/dm/idoconfig-provider-folder.svg?style=flat-square)](https://npmcharts.com/compare/idoconfig-provider-folder?minimal=true)
![Build Status](https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/badge/MerifondNewMarkets/idoconfig-provider-folder?style=flat-square)
[![Dependencies](https://img.shields.io/david/MerifondNewMarkets/idoconfig-provider-folder.svg?style=flat-square)](https://david-dm.org/MerifondNewMarkets/idoconfig-provider-folder)
[![Dev-Dependencies](https://img.shields.io/david/dev/MerifondNewMarkets/idoconfig-provider-folder.svg?style=flat-square)](https://david-dm.org/MerifondNewMarkets/idoconfig-provider-folder)

[![NPM](https://nodei.co/npm/idoconfig-provider-folder.png?downloads=true&downloadRank=true)](https://nodei.co/npm/idoconfig-provider-folder/)

<!--[![Build Status](https://img.shields.io/travis/MerifondNewMarkets/idoconfig-provider-folder/master.svg?style=flat-square)](https://travis-ci.org/MerifondNewMarkets/idoconfig-provider-folder)-->

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