'use strict';

import path from 'path';

export default function(gulp, args, $, config) {
  let dirs = config.directories;

  // Copy fonts from vendors
  gulp.task('fonts', function() {
      return gulp
        .src(config.fonts)
        .pipe(gulp.dest('./' + path.join(dirs.build, 'fonts')));
  });
}
