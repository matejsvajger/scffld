'use strict';

import ngrok from 'ngrok';

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
    if (args.share) {
      ngrok.connect((config.port || 3000), (err, url) => {
        let msg = plugins.util.colors.magenta(url);
        plugins.util.log(`Tunnel: ${msg}`);
      });
    }
  });
}
