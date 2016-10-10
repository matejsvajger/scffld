'use strict';

import path from 'path';

export default function(gulp, args, plugins, config, target) {
  let entries = config.entries;
  let dirs = config.directories;
  let dest = path.join(target, dirs.styles.replace(/^_/, ''));

  // Compiling Pug templates.
  gulp.task('pug', () => {
  });

}
