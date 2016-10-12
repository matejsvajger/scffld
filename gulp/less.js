'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';

export default function(gulp, args, $, config, bs) {
  let dirs = config.directories;
  let entries = config.entries;
  let dest = path.join(dirs.build, dirs.styles.replace(/^_/, ''));

  gulp.task('less', () => {
    let autoprefixConf = {
      browsers: ['last 2 version', '> 5%', 'safari 5', 'ios 6', 'android 4']
    };

    return gulp.src( path.join(dirs.source, dirs.styles, entries.css) )
      .pipe($.debug({title:'LESS:'}))
      .pipe($.sourcemaps.init())
      .pipe($.less())
        .on('error', (err) => {
          $.util.log(err);
        })
      .pipe($.postcss([autoprefixer(autoprefixConf)]))
      .pipe($.if((!args.serve && !args.dev), $.cleanCss()))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(dest))
      .pipe(bs.stream({match: '**/*.css'}));
  });
}
