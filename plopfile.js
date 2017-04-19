var path = require('path');

module.exports = function (plop) {
    var dest  =  plop.getPlopfilePath().includes('node_modules') ? '../../' : './'
    console.log(dest);
    // controller generator
    plop.setGenerator('install', {
        description: 'Install scffld into root of your project',
        prompts: [{
            type: 'input',
            name: 'buildDir',
            message:
                "Hello! Welcome to: \n\n\n" +
                "███████╗ ██████╗███████╗███████╗██╗     ██████╗ \n" +
                "██╔════╝██╔════╝██╔════╝██╔════╝██║     ██╔══██╗\n" +
                "███████╗██║     █████╗  █████╗  ██║     ██║  ██║\n" +
                "╚════██║██║     ██╔══╝  ██╔══╝  ██║     ██║  ██║\n" +
                "███████║╚██████╗██║     ██║     ███████╗██████╔╝\n" +
                "╚══════╝ ╚═════╝╚═╝     ╚═╝     ╚══════╝╚═════╝ \n\n" +
                "Please specifiy your build directory or press enter for default:",
            default: 'dist'
        }, {
                type: 'list',
                name: 'cssPreprocessor',
                message: 'What CSS Preprocessor would you like to use?',
                choices: [
                    {name: 'SASS/SCSS', value: 'sass', checked: true},
                    {name: 'LESS', value: 'less'}
                ]
        }],
        actions: [{
            type: 'add',
            path: './' + path.join(dest, '.babelrc'),
            templateFile: __dirname + '/templates/.babelrc',
            abortOnFail: false
        },{
            type: 'add',
            path: './' + path.join(dest, '.eslintrc'),
            templateFile: __dirname + '/templates/.eslintrc',
            abortOnFail: false
        },{
            type: 'add',
            path: './' + path.join(dest, '.editorconfig'),
            templateFile: __dirname + '/templates/.editorconfig',
            abortOnFail: false
        },{
            type: 'add',
            path: './' + path.join(dest, '.gitignore'),
            templateFile: __dirname + '/templates/.gitignore.hbs',
            abortOnFail: false
        },{
            type: 'add',
            path: './' + path.join(dest, 'gulpfile.babel.js'),
            templateFile: __dirname + '/templates/gulpfile.babel.js'
        },
        function addConfigToPackageJson(answers) {
            var fs = require('fs');
            var configFilePath = __dirname + '/templates/config.json';
            var pjson;

            try {
                pjson = require('./' + path.join(dest, 'package.json'));
            } catch (e) {
                if (e.code !== 'MODULE_NOT_FOUND') {
                    throw e;
                }
                pjson = {};
            }

            if (fs.existsSync(configFilePath)) {

                //- Parse Scffld Config
                var config = JSON.parse(plop.renderString(
                    fs.readFileSync(configFilePath, "utf8"),
                    answers
                ));

                //- Add it to project package.json
                pjson.scffld = config.scffld;

                //- Update devDependencies if not present.
                pjson.devDependencies = pjson.devDependencies || {};
                for (var key in config.devDependencies) {
                    if (!pjson.devDependencies.hasOwnProperty(key)) {
                        pjson.devDependencies[key] = config.devDependencies[key];
                    }
                }

                //- Save changes.
                fs.writeFile('./' + path.join(dest, 'package.json'), JSON.stringify(pjson, null, 2), function (err) {
                  if (err) return console.log(err);
                });

                // console.log(config);
                return 'Added scffld config to package.json';
            } else {
                return 'Config template not found!';
            }

        }]
    });
};
