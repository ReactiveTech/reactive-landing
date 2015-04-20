'use strict';

var gulp 				= require('gulp');
var rename			= require('gulp-rename');
var concat			= require('gulp-concat');
var connect			= require('gulp-connect');
var uglify			= require('gulp-uglify');
var sass				= require('gulp-sass');
var jshint			= require('gulp-jshint');
var stylish			= require('jshint-stylish');
var runSequence	= require('run-sequence');
var minifyCSS 	= require('gulp-minify-css');
var jade				= require('gulp-jade');
var wiredep 		= require('wiredep').stream;

gulp.task('jshint', function () {
	return gulp.src('./app/scripts/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'))
});

gulp.task('templates', function () {
	var YOUR_LOCALS = {};
	gulp.src('./app/*.jade')
		.pipe(jade({
			locals: YOUR_LOCALS
		}))
		.pipe(gulp.dest('./app/'))
		.pipe(connect.reload())
});

gulp.task('sass', function () {
	gulp.src('./app/stylesheets/**/*.scss')
		.pipe(sass({
			indentedSyntax: true
		}))
		.on('error', console.error.bind(console))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./app/stylesheets'))
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('./app/stylesheets'));
});

gulp.task('wiredep', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
    	directory: './app/lib/'
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('serve', function () {
	connect.server({
		root: './app',
		hostname: '0.0.0.0',
		port: 8080,
		livereload: true 
	});
});

gulp.task('watch', function () {
	gulp.watch('./app/*.jade', ['templates']);
	gulp.watch('./app/stylesheets/**/*.scss', ['sass']);
	gulp.watch('./bower.json', ['wiredep']);
});

gulp.task('default', ['watch', 'serve', 'wiredep']);
