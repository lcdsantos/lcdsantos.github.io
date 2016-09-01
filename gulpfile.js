var gulp         = require('gulp');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserify   = require('gulp-browserify');
var uglify       = require('gulp-uglify');
var svgmin       = require('gulp-svgmin');
var browserSync  = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src(['./src/scss/main.scss'])
    .pipe(sass({
      includePaths: './node_modules/',
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src('./src/js/main.js')
    .pipe(browserify())
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('svg', function () {
  return gulp.src('./src/img/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./assets/img/'));
});

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: './'
  });

  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js',     ['scripts']);
  gulp.watch('./src/img/**/*.svg',   ['svg']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'scripts', 'svg', 'serve']);