var gulp = require('gulp')
var static_site = require('./index')

// This is how it works:

var paths = {
  sources: ['content/**', 'templates/**'],
  stylesheets: ['css/**']
}

gulp.task('site', function () {
  return gulp.src('content/**/*.md')
    .pipe(static_site())
    //		.pipe(require('gulp-debug')())
    .pipe(gulp.dest('build/'))
})

// option.templates -- specify glob for templates, meta.layout == basename
// static_site({templates: 'templates/*.md'})

gulp.task('css', function () {
  return gulp.src('css/*.css')
    .pipe(gulp.dest('build/css'))
})

gulp.task('default', ['site', 'css'], function () {
  gulp.watch(paths.sources, ['site'])
  gulp.watch(paths.stylesheets, ['css'])
})
