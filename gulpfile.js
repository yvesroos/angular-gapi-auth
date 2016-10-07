var del = require('del');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('clean', function () {
    return del('dist/**.js');
});

gulp.task('build', ['clean'], function () {
    return gulp.src(['src/angular-gapi-auth.js'])
        .pipe(concat('angular-gapi-auth.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('run', ['clean', 'build', 'watch']);

gulp.task('watch', function () {
    gulp.watch('src/**.js', ['run']);
});

gulp.task('default', ['run']);