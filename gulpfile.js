var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');


gulp.task('sass', function () {
    return gulp.src('./css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
			browsers: ['last 2 versions','last 4 iOS versions'],
			cascade: false
		}))
        //.pipe(cleanCSS())
        .pipe(gulp.dest('./css/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./css/**/*.scss', ['sass']);
});