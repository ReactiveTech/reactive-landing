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
var jade				= require('gulp-jade');