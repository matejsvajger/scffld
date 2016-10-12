'use strict';

import path from 'path';

export default function(gulp, args, $, config, bs) {
  let dirs = config.directories;

  // Watch task
  gulp.task('watch', () => {
    if (args.serve) {
      // Less files
      gulp.watch([
        path.join(dirs.source, (typeof(dirs.styles) == 'string' ? dirs.styles : dirs.styles.src), '**/*.less'),
        path.join(dirs.source, dirs.modules, '**/*.less'),
      ], ['less']);

      // Pug Templates
      gulp.watch([
        path.join(dirs.source, '**/*.pug'),
        path.join(dirs.source, dirs.data, '**/*.{json,yaml,yml}')
      ], ['pug']);

      // All other files
      gulp.watch([
        path.join(dirs.build, '**/*'),
        '!' + path.join(dirs.build, '**/*.{css,map,html,js}')
      ]).on('change', bs.reload);
    }
  });
}
