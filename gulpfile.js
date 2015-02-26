var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var watch = require('gulp-watch');
var browserify = require('browserify');
var reactify = require('reactify');

var bundler = watchify(browserify('./client/app.js', watchify.args));
bundler.on('update', bundle);
bundler.on('log', gutil.log);

function bundle() {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(uglify())
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./public/js'));
}
gulp.task('watchify', bundle);


gulp.task('nodemon', function() {
  return nodemon({
    script: './bin/www',
    ext: 'js',
    ignore: ['/client/', '/public/']
  })
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
    .pipe(watch('client/stylus/**/*.styl'))
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css'));
});

// Run tests
gulp.task('test', function () {
  return gulp.src('test/**/*.js')
    .pipe(mocha());
});

// Default Task
gulp.task('default', ['watchify', 'stylus', 'nodemon']);