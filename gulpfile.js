var gulp = require('gulp'),
    server = require('gulp-webserver'),
    less = require('gulp-less'),
    gls = require('gulp-live-server'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    buffer = require('gulp-buffer'),
    browserify = require('browserify'),
    fs = require('fs'),
    tap = require('gulp-tap');

// Notes: Run a Local Server Setup - 
// gulp.task('server', function() {
//   gulp.src('src')
//     .pipe(server({
//       livereload: true
//     }));
// });

//Run the Local Server
gulp.task('server', function () {
    var server = gls('./src/app.js', {
        env: {}
    });
    server.start();

    // Reload Server / Change
    gulp.watch(['./gulpfile.js', './src/app.js'], function () {
        server.start.bind(server)()
    });
});
