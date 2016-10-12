'use strict';

import path from 'path';
import pngquant from 'imagemin-pngquant';

export default function(gulp, args, $, config, bs) {
  let dirs = config.directories;
  let dest = typeof(dirs.images) == 'string' ? dirs.images.replace(/^_/, '') : dirs.images.dist;
      dest = path.join(dirs.build, dest);

  // Imagemin
  gulp.task('imagemin', () => {
    return gulp.src(path.join(dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}'))
      .pipe($.changed(dest))
      .pipe($.if((!args.serve && !args.dev), $.imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant({speed: 10})]
      })))
      .pipe(gulp.dest(dest));
  });
}
