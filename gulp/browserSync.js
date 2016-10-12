'use strict';

import ngrok from 'ngrok';

export default function(gulp, args, $, config, bs) {
  let dirs = config.directories;

  // BrowserSync
  gulp.task('browserSync', () => {
    bs.init({
      open: args.open ? 'local' : false,
      startPath: config.baseUrl,
      port: config.port || 3000,
      server: {
        baseDir: dirs.build,
        routes: (() => {
          let routes = {};

          // Map base URL to routes
          routes[config.baseUrl] = dirs.build;

          return routes;
        })()
      }
    });
    if (args.share) {
      ngrok.connect((config.port || 3000), (err, url) => {
        let traffic = 'http://localhost:4040/';
        let msg  = '[' + $.util.colors.blue('ngrok') + '] ';
            msg += $.util.colors.bold('Tunnel URL:') + '\n';
            msg += ' ----------------------------------\n';
            msg += '  Secure: ' + $.util.colors.magenta(url) + '\n';
            msg += ' Traffic: ' + $.util.colors.magenta(traffic) + '\n';
            msg += ' ----------------------------------';
        console.log(msg);
      });
    }
  });
}
