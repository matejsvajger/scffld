'use strict';

import path from 'path';
import del from 'del';

export default function(gulp, args, $, config) {
  let dirs = config.directories;

  // Clean
  gulp.task('clean', del.bind(null, [
    path.join(dirs.build)
  ]));
}
