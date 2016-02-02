// Utility functions
'use strict';

var gulp = require('gulp');
var path = require('path');
var buildConfig = require('../gulp.config');
var htmlmin = require('gulp-htmlmin');
var templateCache = require('gulp-angular-templatecache');
var del = require('del');
var concat = require('gulp-concat');
var cssMinifier = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');

function copySourcesTo(targetFolder) {
    return gulp.src(getSourceFiles(buildConfig.source.folder), {
        base: buildConfig.source.folder
    })
        .pipe(gulp.dest(targetFolder));
}

function copyFromTo(sourceFolder, targetFolder) {
    return gulp.src(path.join(sourceFolder, '**', '*.*'))
        .pipe(gulp.dest(targetFolder));
}

function cleanTemp(done) {
    del(buildConfig.targets.tempFolder).then(function () {
        done();
    });
}

function createHtmlTemplates(folder) {
    return gulp.src(folder + buildConfig.source.files.app.html).
        pipe(htmlmin(
            {
                collapseWhitespace: true
            }))
        .pipe(templateCache(buildConfig.targets.minified.templates, {
            root: buildConfig.general.appRoot,
            standAlone: false,
            module: buildConfig.general.appName
        }))
        .pipe(gulp.dest(folder));
}

function minifyAndUglifyAppJavascript() {
    var sources = buildConfig.source.files.app.js;
    sources.push(buildConfig.targets.minified.templates);

    return minifyAndUglifyJavascript(sources, buildConfig.targets.minified.appJs);
}

function minifyAndUglifyVendorJavascript() {
    return minifyAndUglifyJavascript(buildConfig.source.files.vendor.js,
        buildConfig.targets.minified.vendorJs);
}

function minifyAndUglifyJavascript(javascriptFilesArray, targetFileName) {
    var prodFolder = path.join(buildConfig.targets.tempFolder, buildConfig.targets.prodFolder);

    var allSources = getMappedSourceFiles(javascriptFilesArray, buildConfig.targets.tempFolder);

    return gulp.src(allSources)
        .pipe(concat(targetFileName))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(prodFolder, 'js')));
}

function copyFontsToProd() {
    var prodFolder = path.join(buildConfig.targets.tempFolder, buildConfig.targets.prodFolder);

    var source = [].concat(
        getMappedSourceFiles(buildConfig.source.files.vendor.fonts, buildConfig.targets.tempFolder)
        );
    return gulp.src(source)
        .pipe(gulp.dest(path.join(prodFolder, 'fonts')));
}

function minifyCss() {
    var prodFolder = path.join(buildConfig.targets.tempFolder, buildConfig.targets.prodFolder);
    var allSources =
        [].concat(getMappedSourceFiles(buildConfig.source.files.vendor.css, buildConfig.targets.tempFolder),
            getMappedSourceFiles(buildConfig.source.files.app.css, buildConfig.targets.tempFolder));


    return gulp.src(allSources)
        .pipe(concat(buildConfig.targets.minified.vendorCss))
        .pipe(cssMinifier())
        .pipe(gulp.dest(path.join(prodFolder, 'css')));
}

function injectProd() {
    var prodFolder = path.join(buildConfig.targets.tempFolder, buildConfig.targets.prodFolder);

    var target = gulp.src(path.join(buildConfig.targets.tempFolder, buildConfig.source.index));

    var sources = gulp.src([
        path.join(prodFolder, 'js', buildConfig.targets.minified.vendorJs),
        path.join(prodFolder, 'js', buildConfig.targets.minified.appJs),
        path.join(prodFolder, 'css', buildConfig.targets.minified.vendorCss),
        path.join(prodFolder, 'css', buildConfig.targets.minified.appCss)], {
            read: false
        });

    return target.pipe(inject(sources, {
        ignorePath: prodFolder,
        addRootSlash: false
    })).pipe(gulp.dest(prodFolder));
}

function injectDev() {
    var target = gulp.src(path.join(buildConfig.targets.tempFolder, buildConfig.source.index));

    var allSources = [].concat(
        getMappedSourceFiles(buildConfig.source.files.vendor.js, buildConfig.targets.tempFolder),
        getMappedSourceFiles(buildConfig.source.files.vendor.css, buildConfig.targets.tempFolder),
        getMappedSourceFiles(buildConfig.source.files.app.js, buildConfig.targets.tempFolder),
        getMappedSourceFiles(buildConfig.source.files.app.css, buildConfig.targets.tempFolder)
        );

    var sources = gulp.src(allSources, { read: false });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.targets.tempFolder,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.targets.tempFolder));
}

function getSourceFiles(baseFolder) {
    var allSourceFiles = [].concat(
        getMappedSourceFiles(buildConfig.source.files.app.js, baseFolder),
        getMappedSourceFiles(buildConfig.source.files.app.html, baseFolder),
        getMappedSourceFiles(buildConfig.source.files.app.css, baseFolder),
        getMappedSourceFiles(buildConfig.source.files.vendor.js, baseFolder),
        getMappedSourceFiles(buildConfig.source.files.vendor.css, baseFolder),
        getMappedSourceFiles(buildConfig.source.files.vendor.fonts, baseFolder)
        );

    allSourceFiles.push(buildConfig.source.index);
    return allSourceFiles;
}

function getMappedSourceFiles(files, baseFolder) {
    return files.map(function (file) {
        return path.join(baseFolder, file);
    });
}

module.exports = {
    getMappedSourceFiles: getMappedSourceFiles,
    copySourcesTo: copySourcesTo,
    createHtmlTemplates: createHtmlTemplates,
    cleanTemp: cleanTemp,
    copyFromTo: copyFromTo,
    minifyAndUglifyAppJavascript: minifyAndUglifyAppJavascript,
    minifyAndUglifyVendorJavascript: minifyAndUglifyVendorJavascript,
    minifyCss: minifyCss,
    injectDev: injectDev,
    injectProd: injectProd,
    copyFontsToProd: copyFontsToProd
};