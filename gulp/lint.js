/*eslint no-process-exit:0 */

'use strict';

import path from 'path';

export default function(gulp, args, $, config, bs) {
  let dirs = config.directories;

  // ESLint
  gulp.task('lint', () => {
    gulp.src([
      path.join(dirs.source, '**/*.js'),
      // Ignore all vendor folder files
      '!' + path.join('**/vendor/**', '*')
    ])
    .pipe(bs.reload({stream: true, once: true}))
    .pipe($.eslint({
      useEslintrc: true
    }))
    .pipe($.eslint.format())
    .pipe($.if(!bs.active, $.eslint.failAfterError()))
    .on('error', function() {
      if (!bs.active) {
        process.exit(1);
      }
    });
  });
}
