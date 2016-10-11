'use strict';

export default function(gulp, args, plugins, config, target, bs) {
  // BrowserSync
  gulp.task('browserSync', () => {
    bs.init({
      open: args.open ? 'local' : false,
      startPath: config.baseUrl,
      port: config.port || 3000,
      server: {
        baseDir: target,
        routes: (() => {
          let routes = {};

          // Map base URL to routes
          routes[config.baseUrl] = target;

          return routes;
        })()
      }
    });
  });
}
