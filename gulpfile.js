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

// Transpiling - LESS to CSS
gulp.task('less', function () {
    return gulp.src('./src/public/less/style.less')
        .pipe(less())
        .pipe(gulp.dest('./src/public/css'));
});

// Compile - JSX Files
gulp.task('react', function () {
    return gulp.src('./src/public/jsx/**/*.js', {
            read: false
        })
        .pipe(tap(function (file) {
            gutil.log('bundling ' + file.path);

            file.contents = browserify(file.path).transform('babelify', {
                presets: ['es2015', 'react']
            }).bundle()
        }))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./src/public/js/components'));
});

// Watch Changes / Run Defined Tasks
gulp.task('watch', function () {
    gulp.watch(['./src/public/less/**/*.less'], ['less']);
    gulp.watch(['./src/public/jsx/*.js'], ['react']);
});

gulp.task('default', ['watch', 'server']);
