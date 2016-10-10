'use strict';

import fs from 'fs';
import gulp from 'gulp';
import debug from 'gulp-debug';
import pjson from './package.json';
import minimist from 'minimist';

//- Import all gulp-* based plugins
import gulpLoadPlugins from 'gulp-load-plugins';
const plugins = gulpLoadPlugins();

//- Load config into variable
let args = minimist(process.argv.slice(2));
let config = Object.assign({}, pjson.config);
let target = args.dev ? config.directories.temporary : config.directories.build;

//- Load all gulp tasks
let tasks = fs.readdirSync('./gulp');
for (let file of tasks) {
  if ((/\.(js)$/i).test(file)) {
    plugins.util.log(
      'Requiring ' + plugins.util.colors.magenta(file.split('.').shift().toUpperCase()) + ' task module.'
    );
    require(`./gulp/${file}`)(gulp, args, plugins, config, target);
  }
}

gulp.task('default', ['clean'], () => {
   gulp.start('build');
});

// Build production-ready code
gulp.task('build', [
  'less'
]);

// serve, watch, share