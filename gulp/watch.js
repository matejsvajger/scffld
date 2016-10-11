'use strict';

import path from 'path';

export default function(gulp, args, plugins, config, target, bs) {
  let dirs = config.directories;

  // Watch task
  gulp.task('watch', () => {
    if (args.dev) {
      // Less files
      gulp.watch([
        path.join(dirs.source, dirs.styles, '**/*.less'),
        path.join(dirs.source, dirs.modules, '**/*.less'),
      ], ['less']);

      // Pug Templates
      gulp.watch([
        path.join(dirs.source, '**/*.pug'),
        path.join(dirs.source, dirs.data, '**/*.{json,yaml,yml}')
      ], ['pug']);

      // All other files
      gulp.watch([
        path.join(dirs.temporary, '**/*'),
        '!' + path.join(dirs.temporary, '**/*.{css,map,html,js}')
      ]).on('change', bs.reload);
    }
  });
}
