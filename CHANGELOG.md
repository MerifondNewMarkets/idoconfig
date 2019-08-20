# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.3.3](https://github.com/MerifondNewMarkets/idoconfig/compare/v1.3.2...v1.3.3) (2019-08-20)

**Note:** Version bump only for package root





# Changelog i-do-config

<!---
BEGIN: TEMPLATE FOR NEW RELEASES, @see https://keepachangelog.com/en/1.0.0/ for more information

## [X.Y.Z] - {RELEASE NAME} - YYYY-MM-DD

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security

END: TEMPLATE

While working on one or more features keep a summary of the changes (hint: commit messages) in
the [Unreleased] section. When a new release is done you only have to come up with a new version.

Don't forget the date.

--->

## [Unreleased]


---

## v1.3.0 - 2019-08-19

This is a maintenance release. The main package was renamed from `i-do-config` to `idoconfig`. The code has been centralized in a (this) monorepo and is managed by [lerna.js](https://lerna.js.org/).

---

## v1.2.2 - 2019-07-12

### Changed

Remove the generic parameter from `getValue` method. Instead the method now only supports boolean, number or string values, as they are the most common primitive types.

---

## v1.1.1 - 2019-01-07

### Removed

* Support for Travis CI

### Added

* Support for GitHub Actions

---

## v1.1.0 - 2018-12-17

### Added

* `getValueAsBoolean` method (+ tests) - For times when you really must have that boolean
* Sections, baby! You can now retrieve a whole configuration section by calling the brand-spanking-new `getSection` method.

### Changed

* Refactored key sanitation method from individual providers to common abstract provider (no need to reinvent the wheel everytime, eh?)

---

## v1.0.2 - ???

Oh, right. I forgot a changelog. Stuff happend before this. You know how it is. Sorry.
