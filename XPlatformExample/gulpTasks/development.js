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

gulp.task('dev-ms-visualStudio', function (done) {
    runSequence(
        'dev-ms-inject-vs',
        done);
});

gulp.task('dev-ms-inject-vs', function (done) {
    var target = gulp.src(buildConfig.source.index);

    var allSources = [].concat(
        buildConfig.source.files.vendor.js,
        buildConfig.source.files.vendor.css,
        buildConfig.source.files.app.js,
        buildConfig.source.files.app.css
        );

    var sources = gulp.src(allSources, { read: false });

    return target.pipe(inject(sources, {
        addRootSlash: false
    })).pipe(gulp.dest(buildConfig.source.folder));
});

function getMappedSourceFiles(files, baseFolder) {
    return files.map(function (file) {
        return path.join(baseFolder, file);
    });
}