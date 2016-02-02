'use strict';

module.exports = {
    general: {
        appName: 'XPlatformExample',
        appRoot: 'app/'
    },
    source: {
        folder: '.',
        index: 'index.html',
        packageJson: 'package.json',
        files: {
            app: {
                js: [
                    'app/*.js',
                    'app/*/*.module.js',
                    'app/*/*.routes.js',
                    'app/*/*/*.js'
                ],
                html: [
                    'app/**/*.html'
                ],
                css: [
                    'css/custom.css'
                ]
            },
            vendor: {
                js: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'js/bootstrap.min.js',
                    'js/metisMenu.min.js',
                    'js/raphael.min.js',
                    'js/startmin.js',
                    'bower_components/ngCordova/dist/ng-cordova.js',
                    'bower_components/angular-animate/angular-animate.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'bower_components/angular-loading-bar/build/loading-bar.js',
                    'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
                    'bower_components/lodash/lodash.js',
                    'bower_components/signalr/jquery.signalR.min.js'
                ],
                css: [
                    'css/bootstrap.min.css',
                    'bower_components/angular-toastr/dist/angular-toastr.min.css',
                    'bower_components/angular-loading-bar/src/loading-bar.css',
                    'css/bootstrap-theme.min.css',
                    'css/font-awesome.min.css',
                    'css/metisMenu.min.css',
                    'css/startmin.css'
                ],
                fonts: [
                    'fonts/*.*'
                ]
            }
        }
    },
    targets: {
        tempFolder: '.temp/',
        devFolder: 'dev/',
        prodFolder: 'prod/',
        distFolder: '.dist/',
        webFolder: 'Web',
        appFolder: 'App',
        nwjs: {
            allFilesButPackageJson: ['nwjs/**/*', '!nwjs/package.json'],
            nwjsFolder: 'nwjs/',
            outputFolder: 'Desktop'
        },
        buildFolder: '.build/',
        cordovaFolder: 'cordova/',
        minified: {
            appJs: 'app.js',
            vendorJs: 'vendor.js',
            appCss: 'app.css',
            vendorCss: 'vendor.css',
            templates: 'ng-templates.js'
        }
    }
};
