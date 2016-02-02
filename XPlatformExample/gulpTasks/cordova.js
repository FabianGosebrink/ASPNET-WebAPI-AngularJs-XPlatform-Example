var gulp = require('gulp');
var path = require('path');
var sh = require('shelljs');
var runSequence = require('run-sequence');
var common = require('./common.js');
var buildConfig = require('../gulp.config');

gulp.task('cordova-build-prod', function (done) {
    runSequence(
        'cordova-clean-temp',
        'cordova-copy-sources-to-temp',
        'cordova-create-Html-Templates',
        'cordova-minify-And-Uglify-App-Javascript',
        'cordova-minify-And-Uglify-Vendor-Javascript',
        'cordova-minify-Css',
        'cordova-inject-prod',
        'cordova-copy-fonts',
        'cordova-copy-to-cordova',
        'cordova-add-plugins',
        'cordova-build-wp8',
        'cordova-build-android',
        //add more here if you want
        'cordova-copy-to-dist',
        done);
});

gulp.task('cordova-add-plugins', function (done) {
    sh.cd(buildConfig.targets.cordovaFolder);
    sh.exec('cordova plugin add org.apache.cordova.camera');
    sh.cd('..');
    done();
});

gulp.task('cordova-build-wp8', function (done) {
    sh.cd(buildConfig.targets.cordovaFolder);
    sh.exec('cordova platform add wp8');
    sh.exec('cordova build wp8');
    sh.cd('..');
    done();
});

gulp.task('cordova-build-android', function (done) {
    sh.cd(buildConfig.targets.cordovaFolder);
    sh.exec('cordova platform add android');
    sh.exec('cordova build android');
    sh.cd('..');
    done();
});

gulp.task('cordova-copy-to-dist', function () {
    var sourceFolder = path.join(buildConfig.targets.cordovaFolder, 'platforms');
    var targetFolder = path.join(buildConfig.targets.distFolder);
    return common.copyFromTo(sourceFolder, targetFolder);
});

gulp.task('cordova-copy-to-cordova', function () {
    var sourceFolder = path.join(buildConfig.targets.tempFolder, buildConfig.targets.prodFolder);
    var targetFolder = path.join(buildConfig.targets.cordovaFolder, 'www');
    return common.copyFromTo(sourceFolder, targetFolder);
});

gulp.task('cordova-clean-temp', function (done) {
    common.cleanTemp(done);
});

gulp.task('cordova-copy-fonts', function () {
   return common.copyFontsToProd();
});

gulp.task('cordova-copy-sources-to-temp', function () {
    return common.copySourcesTo(buildConfig.targets.tempFolder);
});

gulp.task('cordova-create-Html-Templates', function () {
    return common.createHtmlTemplates(buildConfig.targets.tempFolder);
});

gulp.task('cordova-minify-And-Uglify-App-Javascript', function () {
    return common.minifyAndUglifyAppJavascript();
});

gulp.task('cordova-minify-And-Uglify-Vendor-Javascript', function () {
    return common.minifyAndUglifyVendorJavascript();
});

gulp.task('cordova-minify-Css', function () {
    return common.minifyCss();
});

gulp.task('cordova-inject-prod', function () {
    return common.injectProd();
});