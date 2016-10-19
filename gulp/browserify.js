'use strict';

import path from 'path';
import glob from 'glob';
import watchify from 'watchify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import envify from 'envify';
import babel from 'babelify';


export default function(gulp, args, $, config, bs) {
  let dirs = config.directories;
  let entries = config.entries;
  let src = typeof(dirs.scripts) == 'string' ? dirs.scripts : dirs.scripts.src;

  let browserifyTask = (files) => {
    return files.map((entry) => {
      let dest = path.resolve(dirs.build);

      // Options
      let customOpts = {
        entries: [entry],
        debug: true,
        transform: [
          babel, // Enable ES6 features
          envify // Sets NODE_ENV for better optimization of npm packages
        ]
      };

      let bundler = browserify(customOpts);

      if (args.serve) {
        // Setup Watchify for faster builds
        let opts = Object.assign({}, watchify.args, customOpts);
        bundler = watchify(browserify(opts));
      }

      let rebundle = () => {
        let startTime = new Date().getTime();
        bundler.bundle()
          .on('error', (err) => {
            $.util.log(
              $.util.colors.red('Browserify compile error:'),
              '\n',
              err.stack,
              '\n'
            );
            this.emit('end');
          })
          .pipe(source(entry))
          .pipe(buffer())
          .pipe($.sourcemaps.init({loadMaps: true}))
          .pipe($.if((!args.serve && !args.dev), $.uglify()))
          .pipe($.rename((filepath) => {
            // Remove 'source' directory as well as prefixed folder underscores
            // Ex: 'src/_scripts' --> '/scripts'
            filepath.dirname = typeof(dirs.scripts) == 'string' ?
              filepath.dirname.replace(dirs.source, '').replace('_', ''):
              filepath.dirname.replace(dirs.source, '').replace(dirs.scripts.src, dirs.scripts.dist);
          }))
          .pipe($.sourcemaps.write('./'))
          .pipe(gulp.dest(dest))
          // Show which file was bundled and how long it took
          .on('end', () => {
            let time = (new Date().getTime() - startTime) / 1000;
            $.util.log(
              $.util.colors.cyan(entry)
              + ' was browserified: '
              + $.util.colors.magenta(time + 's'));
            return bs.reload('*.js');
          });
      };

      if (args.serve) {
        bundler.on('update', rebundle); // on any dep update, runs the bundler
        bundler.on('log', $.util.log); // output build logs to terminal
      }
      return rebundle();
    });
  };

  // Browserify Task
  gulp.task('browserify', (done) => {
    return glob('./' + path.join(dirs.source, src, entries.js), (err, files) => {
      if (err) {
        done(err);
      }
      return browserifyTask(files);
    });
  });
}
