var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-ruby-sass');
var serve = require('gulp-serve');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

var locals = require('./src/locals.json')



gulp.task('sass', function() {
    sass('src/sass/')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist', {
            read: false
        })
        .pipe(clean());
});

gulp.task('sass:watch', function() {
    gulp.watch('./src/sass/**/**.scss', ['sass']);
});

gulp.task('jade', function() {
    gulp.src('./src/jade/*.jade')
        .pipe(jade({
            pretty: true,
            locals: locals
        }))
        .pipe(gulp.dest('./exemple/'))
});


gulp.task('jade:watch', function() {
    gulp.watch('./src/jade/**/**.jade', ['jade']);
});

gulp.task('copy', function() {
    gulp.src('./bower_components/bootstrap-sass/assets/fonts/bootstrap/*')
        .pipe(gulp.dest('dist/fonts'));
    gulp.src('./bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('serve', serve(''));

gulp.task('default', runSequence('clean', ['copy', 'sass', 'jade', 'sass:watch', 'jade:watch', 'serve']));
