var gulp = require('gulp');
var path = require('path');
var del = require('del');
var buildConfig = require('../gulp.config');
var runSequence = require('run-sequence');
var inject = require('gulp-inject');
var debug = require('gulp-debug');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var NwBuilder = require('nw-builder');
var templateCache = require('gulp-angular-templatecache');
var common = require('./common.js');

gulp.task('nwjs-build-dev', function (done) {
    runSequence(
        'nwjs-clean-nwjs', // clean dist/nwjs
        'nwjs-clean-temp', // clean temp
        'nwjs-copy-sources-to-temp', // copy sources to temp
        'nwjs-inject-dev', // inject everything 
        'nwjs-copy-to-nwjs-dev',
        'nwjs-build-node-webkit', // build it to output folder
        done);
});

gulp.task('nwjs-build-prod', function (done) {
    runSequence(
        'nwjs-clean-nwjs',
        'nwjs-clean-temp',
        'nwjs-copy-sources-to-temp',
        'nwjs-create-Html-Templates',
        'nwjs-minify-And-Uglify-App-Javascript',
        'nwjs-minify-And-Uglify-Vendor-Javascript',
        'nwjs-minify-Css',
        'nwjs-copy-Index-To-Prod',
        'nwjs-copy-Fonts-To-Prod',
        'nwjs-inject-prod',
        'nwjs-copy-to-nwjs-prod',
        'nwjs-build-node-webkit',
        done);
});

gulp.task('nwjs-clean-nwjs', function (done) {
    del(buildConfig.targets.nwjs.allFilesButPackageJson)
        .then(function () {
            done();
        });
});


gulp.task('nwjs-clean-temp', function (done) {
    common.cleanTemp(done);
});

gulp.task('nwjs-build-node-webkit', function () {

    var sourcefiles = path.join(buildConfig.targets.nwjs.nwjsFolder, '**/**');
    var targetpath = path.join(buildConfig.targets.distFolder, buildConfig.targets.nwjs.outputFolder);

    var nw = new NwBuilder({
        version: '0.12.3',
        files: sourcefiles, // use the glob format
        buildDir: targetpath,
        //platforms: ['win32']
        platforms: ['osx32', 'osx64', 'win32', 'win64', 'linux32','linux64']
    });

    nw.on('log', console.log);
 
    // Build returns a promise
    nw.build().then(function () {
        console.log('all done!');
    }).catch(function (error) {
        console.error(error);
    });

});

gulp.task('nwjs-create-Html-Templates', function () {
    return common.createHtmlTemplates(buildConfig.targets.tempFolder);
});

gulp.task('nwjs-copy-Fonts-To-Prod', function () {
    return common.copyFontsToProd();
});

gulp.task('nwjs-copy-Index-To-Prod', function () {
    var prodFolder = path.join(buildConfig.targets.tempFolder, buildConfig.targets.prodFolder);
    return gulp.src(path.join(buildConfig.targets.tempFolder, buildConfig.source.index))
        .pipe(gulp.dest(prodFolder));
});

gulp.task('nwjs-minify-And-Uglify-App-Javascript', function () {
    return common.minifyAndUglifyAppJavascript();
});

gulp.task('nwjs-minify-And-Uglify-Vendor-Javascript', function () {
    return common.minifyAndUglifyVendorJavascript();
});

gulp.task('nwjs-minify-Css', function () {
    return common.minifyCss();
});

gulp.task('nwjs-inject-prod', function () {
    return common.injectProd();
});

gulp.task('nwjs-inject-dev', function () {
    return common.injectDev();
});

gulp.task('nwjs-copy-sources-to-temp', function () {
    return common.copySourcesTo(buildConfig.targets.tempFolder);
});

gulp.task('nwjs-copy-to-nwjs-dev', function () {
    return common.copyFromTo(buildConfig.targets.tempFolder,
        buildConfig.targets.nwjs.nwjsFolder);
});

gulp.task('nwjs-copy-to-nwjs-prod', function () {
    var sourceFolder = path.join(buildConfig.targets.tempFolder, buildConfig.targets.prodFolder);
    return common.copyFromTo(sourceFolder,
        buildConfig.targets.nwjs.nwjsFolder);
});