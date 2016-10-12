'use strict';

import fs from 'fs';
import gulp from 'gulp';
import pjson from './package.json';
import minimist from 'minimist';
import bs from 'browser-sync';

//- Import all gulp-* based plugins
import gulpLoadPlugins from 'gulp-load-plugins';
const plugins = gulpLoadPlugins();
const browserSync = bs.create();

//- Load config into variable
let config = Object.assign({}, pjson.config);
let argv = process.argv.slice(2);
let args = minimist(argv);
    args.serve = (argv.shift() === 'serve');

//- Load all gulp tasks
let tasks = fs.readdirSync('./gulp');
for (let file of tasks) {
  if ((/\.(js)$/i).test(file)) {
    let task = file.split('.').shift();
    plugins.util.log(
      'Requiring task module ' + plugins.util.colors.magenta(task)
    );
    require(`./gulp/${file}`)(gulp, args, plugins, config, browserSync);
  }
}

// Default task cleans build dir and rebuilds.
gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

// Build production-ready code
gulp.task('build', ['copy', 'pug', 'less', 'browserify']);

// Build uncompressed code served via dev server
gulp.task('serve', ['build', 'browserSync', 'watch']);

// Testing
gulp.task('test', ['lint']);

//@TODO: imagemin, lint, sass, react, vue, webpack, tests, splash screen, help system
