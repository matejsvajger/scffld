'use strict';

import fs from 'fs';
import gulp from 'gulp';
import path from 'path';
import pjson from './package.json';
import minimist from 'minimist';
import browserSync from 'browser-sync';

//- Import all gulp-* based plugins
import LoadPlugins from 'gulp-load-plugins';
const plugins = LoadPlugins();
const bs = browserSync.create();

//- Load config into variable
let config = Object.assign({}, pjson.scffld);
let argv = process.argv.slice(2);
let args = minimist(argv);
    args.serve = (argv.shift() === 'serve');

//- Load all gulp tasks
let taskPath = './node_modules/scffld/gulp';

if (fs.existsSync(taskPath)) {
  require('babel-register')({
    only: /node_modules\/scffld/
  });
} else {
  taskPath = './gulp';
}

let tasks = fs.readdirSync(taskPath);
for (let file of tasks) {
  if ((/\.(js)$/i).test(file)) {
    let task = file.split('.').shift();
    plugins.util.log(
      'Requiring task module ' + plugins.util.colors.magenta(task)
    );
    var plugin = require('./' + path.join(taskPath, file));
        plugin(gulp, args, plugins, config, bs);
  }
}

// Default task cleans build dir and rebuilds.
gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

// Build production-ready code
gulp.task('build', ['imagemin', 'copy', 'pug', 'styles', 'browserify', 'fonts']);

// Build uncompressed code served via dev server
gulp.task('serve', ['build', 'browserSync', 'watch']);

// Testing
gulp.task('test', ['lint']);
