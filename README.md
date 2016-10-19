# Scffld
> A modern front-end template development recipe with automated tasks using [gulp](http://gulpjs.com/) for the build process.

## Features

* Use future JS now! [ES6/2015](https://babeljs.io/docs/learn-es2015/) enabled.
* ES6/2015 transpiled using [Babel](https://babeljs.io) for support in all browsers.
* Forget about CSS browser prefixes! Autoprefixing included.
* Built-in preview server with [BrowserSync](https://www.browsersync.io/)
* Sharing preview server on internet over tunnels using [ngrok](http://ngrok.io)
* Bundling all of your JavaScript files into one with [Browserify](http://browserify.org/)
* HTML templating with [Pug](https://pugjs.or) (former Jade)
* Seeding of templates with data from JSON or YAML files
* Write modular CSS with [lesscss](http://lesscss.org/) or [sass](http://sass-lang.com/)
* Automagically lint your scripts with [ESLint](http://eslint.org/)
* Automagically compile {LESS|SASS}/ES6/PUG into CSS/JS/HTML
* Map compiled CSS and JS with sourcemaps
* Configurable build dirs for each resource via config
* Awesome image optimization

## Quickstart

- Download this project from github or run the following command in your terminal:
```
curl -L https://github.com/matejsvajger/scffld/tarball/master | tar -xzv --strip-components 1 --exclude={README.md,LICENSE.md,CONDUCT.md,CONTRIBUTING.md,CHANGELOG.md}
```
- Install dependencies: `npm install`
- Run `gulp serve` to preview and watch for changes
- Run `gulp build` to compile production version

## Getting Started

Scffld utilizes [npm](https://www.npmjs.com/) and [Gulp](http://gulpjs.com/) to automate tasks, and manage front-end dependencies respectively. If this is your first time here, it is recommended you read about these tools before proceeding.

### Installation
There are a few dependencies that this project relies on:

#### Node.js
Check to see if you already have Node installed. Do this by bringing up a terminal/command prompt and type `node -v`. If the response shows a version at or above `v4.3.2`, you are all set and can proceed to installing Gulp and dependencies. If you see an error and/or your version is too low, navigate to the [Node.js](http://nodejs.org/) website and install Node from there.

#### npm & Gulp
Once you have Node installed, make sure you have these tools by opening up a terminal/command prompt and entering following commands:

| Command  | Response
|---------- |:---------:
| `npm -v`  | at or above `v3.0.x`
| `gulp -v` | `gulp-cli` at or above `v3.9.x`

> NOTE: npm v2 is supported but it doesn't create flatened dependency tree by default, which seriously impacts performance with babel. You can still use npm v2 but run the [dedupe](https://docs.npmjs.com/cli/dedupe) command after dependency install: `npm install && npm dedupe`.

If you get any errors or Gulp version is too low, you should run `npm install -g gulp`.
This will install and update gulp to its' latest version.

#### Scffld
Once your system is setup you'll need to run `npm install` in your project folder for tasks to work.

## Setup
Scffld has a predefined folder structure, but you can customize the build destinations for all resources.
```
├── dist/                      # Folder for build output
├── gulp/                      # Folder for gulp tasks
├── src
|   ├── _images                # Images
|   ├── _layouts               # Layout structure for app
|   |   └── base.pug
|   ├── _modules               # Reusable modules
|   |   └── module
|   |       ├── module.js
|   |       ├── module.less
|   |       ├── module.sass
|   |       └── module.pug
|   ├── _seeds                # JSON/YAML files that add data to templates
|   ├── _styles               # Global styles, mixins, variables, etc
|   |   └── main.less         # Main stylesheet (import everything to this file if using less)
|   |   └── main.sass         # Main stylesheet (import everything to this file if using sass)
|   ├── _scripts              # Global scripts, base classes, etc
|   |   └── main.js           # JavaScript entry file
|   └── index.pug             # Homepage template
├── gulpfile.babel.js         # Gulp task configuration
├── package.json              # Dependencies and site/folder configuration
└── README.md                 # Hey! This file!
```


Congratulations! You are ready to start building something awesome.

Now you can run the following gulp tasks:

- `gulp build`: Default task. Same as `gulp` compiles preprocessors, minifies files and images, creates sourcemaps.
- `gulp serve`: Compiles preprocessors and boots up development server
- `gulp test`: Lints all `*.js` file in the `source` folder using eslint

You can learn more about what tasks are available in the [gulp tasks](#gulp-workflow) section.


## Configuration

In the `package.json` file, within the root of the project, you have the ability to configure some project settings:

### Site
| Setting | Description |
|---------|-------
| port    | Port of the development server (browserSync)
| baseUrl | Root directory of your site
| cssPreprocessor | values: `"less"` or `"sass"`; default: `"less"`

### Main Directories
| Setting | Description |
|---------|-------
| source      | Source folder for all development files
| destination | Build folder where compiled files are generated

### Source Directories
Folders relative to the `source` configured directory

| Setting | Description |
|---------|-------
| scripts  | Scripts folder where all `.js` files are located (main.js must be in root of this folder)
| [seeds](#seed-files) | Data folder where JSON/YAML files are loaded into templates
| styles   | Styles folder where all stylesheet files are located (main stylesheet must be in root of this folder)
| modules  | Modules folder where all reusable code should live
| layouts  | Layouts folder where all layout templates should live
| images   | Images folder where all `.png, .jpeg, .jpg, .svg, .gif` files should live


### Entry files
Files that should be searched for and created by build tasks.
File strings and [Globs](https://github.com/isaacs/node-glob) can be used to process desired file(s).
Ex: `main**.js` will process all files that start with `main` and end with `.js`

| Setting | Description |
|---------|-------
| js     | Tells browserify what file(s) to bundle and generate at your desired build target
| css  | Tells your less/sass preprocessor what file(s) to generate at your desired build target

***Default configuration:***

```json
"//": "CUSTOM CONFIGURATION",
"config": {
  "//": "Local Server Settings",
  "cssPreprocessor": "less",
  "port": "3000",
  "baseUrl": "./",
  "//": "Gulp Task Directories",
  "directories": {
    "source": "src",
    "destination": "dist",
    "//": "Directories relative to `source` directory",
    "modules": "_modules",
    "layouts": "_layouts",
    "images": "_images",
    "styles": "_styles",
    "scripts": "_scripts",
    "data": "_seeds"
  },
  "//": "Entry files",
  "entries": {
    "js": "main**.js",
    "css": "main**"
  }
}
```

You can replace config keys `images`, `styles` and `scripts` with object ie: `"styles": {"src":"_styles", "dist":"css"}` to change the destination location.

## Gulp Workflow

### `gulp build`
Builds out an optimized site through compilation of preprocessors (Pug, Less/Sass, etc), minification of CSS and HTML, uglification of Javascript, and optimization of images.

**Extra Task Option(s)**

|Tasks| Description
|---------|-------
|`gulp build --dev`| runs [`gulp build`](#gulp-build) without file optimization and minification.

### `gulp serve`
Starts up a development server that watches files and automatically reloads them to the browser when a change is detected.

**Extra Task Option(s)**

|Tasks| Description
|---------|-------
|`gulp serve --share`|  starts up a server and sets up a ngrok.io tunnel to serve it online
|`gulp serve --open`|  starts up a server and opens it within your default browser


### `gulp test`
Runs ESLint to lint all your JavaScript files.

### `gulp clean`
Cleans up build directory.

### `gulp imagemin`
Minifies images and copies them to build directory.

### `gulp browserify`
Compiles and minifies JavaScripts for production.

|Tasks| Description
|---------|-------
|`gulp browserify --dev`| Compiles JavaScript files without minification.

### `gulp styles`
Compiles and minifies CSS for production. If using `sass` preprocessor it will look for a `"main**.+(sass|scss)"` file in the styles source directory, otherwise it will load `"main**.less"` file.

|Tasks| Description
|---------|-------
|`gulp styles --dev`| Compiles LESS/SASS files without minification.

### `gulp pug`
Compiles Pug templates into HTML.


***Adding the `--debug` option to any gulp task displays extra debugging information (ex. data being loaded into your templates or css analysis using [Parker](https://github.com/katiefenn/parker))***

### Seed Files

If you want to load global data into your pug templates, you can add JSON/YAML files in `src/_seeds` folder.

For example, add menu.json in `src/_data` folder:

```json
{
  "name": "Home",
  "link": "/",
  "category": "Page",
  "status": "Development"
}
```

And it will be added to the `site.data` object so it can be used like so:

```pug
div
  h1= site.data.menu.name
```

Which outputs to:

```html
<div>
  <h1>Home</h1>
</div>
```
## Contributing
Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md) and [code of conduct](CONDUCT.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)

## Roadmap
- Prepare examples
- Add module generator
- Write tests
- Make a terminal help command
- Implement webpack as an alternative option
- Add React + JSX as an alternative to Pug
- Bump ES6 to ES2016+ and rewrite gulp tasks to run them over npm scripts

### Why ?
Because I couldn't find a tailormade generator and I needed something that suits my current workflow and helps me jump start a project. This template is heavily inspired by yeoman webapp and yeougurt generators.

### Credits
The demo image is from amazing [Unsplash](https://unsplash.com/).
Thanks to [DLMousey](https://github.com/DLMousey) for helping out with the hardest part - naming.

## Release History
See [Changelog](CHANGELOG.md)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information - &copy; Matej Svajger

Scffld, because it's 2016 fuck vowels!
