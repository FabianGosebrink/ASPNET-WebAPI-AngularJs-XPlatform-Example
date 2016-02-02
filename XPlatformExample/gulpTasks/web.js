var gulp = require('gulp');
var path = require('path');
var buildConfig = require('../gulp.config');
var runSequence = require('run-sequence');
var common = require('./common.js');

gulp.task('web-build-prod', function (done) {
    runSequence(
        'web-clean-temp',
        'web-copy-sources-to-temp',
        'web-createHtmlTemplates',
        'web-minifyAndUglifyAppJavascript',
        'web-minifyAndUglifyVendorJavascript',
        'web-minifyCss',
        'web-inject-prod',
        'web-copy-fonts',
        'web-copy-to-dist',
        done);
});

gulp.task('web-clean-temp', function (done) {
    common.cleanTemp(done);
});

gulp.task('web-copy-sources-to-temp', function () {
    return common.copySourcesTo(buildConfig.targets.tempFolder);
});

gulp.task('web-copy-fonts', function () {
   return common.copyFontsToProd();
});

gulp.task('web-createHtmlTemplates', function () {
    return common.createHtmlTemplates(buildConfig.targets.tempFolder);
});

gulp.task('web-minifyAndUglifyAppJavascript', function () {
    return common.minifyAndUglifyAppJavascript();
});

gulp.task('web-minifyAndUglifyVendorJavascript', function () {
    return common.minifyAndUglifyVendorJavascript();
});

gulp.task('web-minifyCss', function () {
    return common.minifyCss();
});

gulp.task('web-inject-prod', function () {
    return common.injectProd();
});

gulp.task('web-copy-to-dist', function () {
    var sourceFolder = path.join(buildConfig.targets.tempFolder, buildConfig.targets.prodFolder);
    var targetFolder = path.join(buildConfig.targets.distFolder, buildConfig.targets.webFolder);
    return common.copyFromTo(sourceFolder, targetFolder);
});