### v1.3.0:
#### date: 2017-04-16
##### changes:
* New gulp task that copies fonts from node_modules into build dir.
##### bugfixes:
* Fixed watch task, to monitor changes in scss/sass files.


### v1.2.8:
#### date: 2017-04-14
##### changes:
* Installed plopjs for scaffolding the project setup.
* Moved config files into templates folder
* Made it installable via npm and runnable from `node_modules`

### v1.1.0:
#### date: 2016-10-19
##### changes:
* Renamed less gulp task to styles
* Added plumber to pug and styles tasks for better error handling
* Implemented Parker for CSS analysis with `--debug` option
* Implemented SASS/SCSS support through __cssPreprocessor__ package.json config.
* Added SASS example styles for the preview template.
* Added `node_modules` and `src/_modules` folders to SASS include paths.
