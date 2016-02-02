/// <binding BeforeBuild='dev-ms-visualStudio' />
var gulp = require('gulp');
var runSequence = require('run-sequence');
var taskListing = require('gulp-task-listing');

require('./gulpTasks/nw');
require('./gulpTasks/web');
require('./gulpTasks/cordova');
require('./gulpTasks/development');


gulp.task('default', ['help']);
gulp.task('help', taskListing.withFilters(/-/));

gulp.task('dev:build:nwjs', function (done) {
    runSequence('nwjs-build-dev', done);
});

gulp.task('prod:build:nwjs', function (done) {
    runSequence('nwjs-build-prod', done);
});

gulp.task('prod:build:web', function (done) {
    runSequence('web-build-prod', done);
});

gulp.task('prod:build:app', function (done) {
    runSequence('cordova-build-prod', done);
});

gulp.task('prod:build:all', function (done) {
    runSequence('web-build-prod',
        'nwjs-build-prod',
        'cordova-build-prod',
        done);
});

