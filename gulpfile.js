var gulp = require('gulp');
var pkg = require('./package.json');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var minifyCSS = require('gulp-minify-css');
var changed = require('gulp-changed');
var browserSync = require('browser-sync');
var jeet = require('jeet');
var koutoSwiss = require('kouto-swiss');
var rupture = require('rupture');
var autoprefixer = require('autoprefixer-stylus');

// Browser Sync
gulp.task('browser-sync', function() {
  // var reload = browserSync.reload;
    browserSync.init(["./css/*.css", "./js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});

// JS Lint
gulp.task('lint', function(){
  gulp.src('./src-js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});
gulp.task('css', function(){
  gulp.src('./plugin/*.css')
    .pipe(livereload());
});

// Concatenar e Minificar
gulp.task('minify', function(){
  gulp.src('./src-js/*.js')
    .pipe(concat('app.js'))

    .pipe(gulp.dest('./js'))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./js'))
    .pipe(livereload());
});

// Stylus
gulp.task('stylus', function () {
  gulp.src('./src-css/style.styl')
    .pipe(plumber())
    .pipe(stylus({
      use: [jeet(), rupture(), koutoSwiss(), autoprefixer()]
      }))
    .pipe(concat('style.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./css'))
    .pipe(livereload());
});

// Salvando arquivos html
gulp.task('html', function(){
  gulp.src('./*.html')
    .pipe(livereload());
});

// Salvando arquivos php
gulp.task('php', function(){
  gulp.src('*.php')
    .pipe(livereload());
});

// Watch
gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('./src-css/**/*.styl', ['stylus']);
  gulp.watch('./src-js/*.js', ['lint', 'minify']);
  gulp.watch('*.html', ['html']);
  gulp.watch('*.php', ['php']);
  gulp.watch('./images/*', ['images']);
});

gulp.task('default', ['watch', 'browser-sync']);
