# idoconfig - what about you?

[![Version npm](https://img.shields.io/npm/v/@idoconfig/base.svg)](https://www.npmjs.com/package/@idoconfig/base)
[![Actions Status](https://github.com/MerifondNewMarkets/idoconfig/workflows/Build/badge.svg)](https://github.com/MerifondNewMarkets/idoconfig/actions)
[![Actions Status](https://github.com/MerifondNewMarkets/idoconfig/workflows/Tests/badge.svg)](https://github.com/MerifondNewMarkets/idoconfig/actions)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

---

Every wanted to read some configuration values from different sources in NodeJS? I did. This is my answer.

This project was inspired by the ASP.net Core feature `IConfiguration`.

## Organization

This is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) managed by lerna.js. For separation of concerns it is split up into the main or parent package `idoconfig` and individual configuration value provider implementations that live in `providers`.

See individual `README.md` files for usage information and other details:

* [Base package](idoconfig/README.md)
* [Environment variables provider](providers/envvar/README.md)
* [Folder provider](providers/folder/README.md)
