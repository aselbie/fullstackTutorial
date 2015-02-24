var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var stylus = require('gulp-stylus');
var mocha = require('gulp-mocha');

gulp.task('nodemon', ['js', 'stylus', 'lint'], function() {
  return nodemon({
    script: './bin/www',
    ext: 'js html styl'
  })
  .on('change', ['js', 'stylus', 'lint'])
});

// Lint Task
gulp.task('lint', function() {
  return gulp.src([
    'server/**/*.js',
    'public/js/main.js'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Stylus
gulp.task('stylus', function() {
  return gulp.src('client/stylus/main.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('public/css'));
});

// Concatenate & Minify JS
gulp.task('js', function() {
  return gulp.src([])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

// Run tests
gulp.task('test-server', function () {
  return gulp.src('test/**/*.js')
    .pipe(mocha());
});

// Default Task
gulp.task('default', ['nodemon']);