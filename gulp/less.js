'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';

export default function(gulp, args, plugins, config, target) {
  let dirs = config.directories;
  let entries = config.entries;
  let dest = path.join(target, dirs.styles.replace(/^_/, ''));

  gulp.task('less', () => {
    let autoprefixConf = {
      browsers: ['last 2 version', '> 5%', 'safari 5', 'ios 6', 'android 4']
    };

    return gulp.src( path.join(dirs.source, dirs.styles, entries.css) )
      .pipe(plugins.debug({title:'LESS:'}))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.less())
        .on('error', (err) => {
          plugins.util.log(err);
        })
      .pipe(plugins.postcss([autoprefixer(autoprefixConf)]))
      .pipe(plugins.if(!args.dev, plugins.cleanCss()))
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(dest));
  });
}