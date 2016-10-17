'use strict';

import path from 'path';

export default function(gulp, args, $, config, bs) {
  let dirs = config.directories;
  let dest = dirs.build;

  // Copy all changed files, not part of the tool
  gulp.task('copy', () => {
    return gulp.src([
      path.join(dirs.source, '**/*'),
      '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}'),
      '!' + path.join(dirs.source, '**/*.pug')
    ])
    .pipe($.changed(dest))
    .pipe(gulp.dest(dest));
  });
}
