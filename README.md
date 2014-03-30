# Build static sites with gulp

This is in early stages, but easy to adapt.

## Example

List some dependencies:

```javascript
{
  "name": "my-new-site",
  "version": "0.0.1",
  "devDependencies": {
    "gulp": "~3.5.6",
    "gulp-load-plugins": "~0.3.0",
    "gulp-clean": "~0.2.4",
    "gulp-marked": "git://github.com/lmtm/gulp-marked.git",
    "gulp-ruby-sass": "~0.4.1",
    "gulp-size": "~0.1.3",
    "gulp-static-site": "*"
  },
  "engines": {
    "node": ">=0.10.0"
  }
}
```

Then `npm install`.

Create a `gulpfile.js`:

```javascript
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// convert our markdown to html
gulp.task('markdown', function () {
	return gulp.src('*.md')
		.pipe($.marked())
		.pipe(gulp.dest('pre-build/'))
});

// include all HTML files from prebuild into our site menu
gulp.task('index', function () {
	return gulp.src('pre-build/*.html')
		.pipe(renderSite('template.jade'))
		.pipe(gulp.dest('build/'))
		.pipe($.size());
});

// process our stylesheet
gulp.task('sass', function(){
	return gulp.src('style.scss')
		.pipe($.rubySass())
		.pipe(gulp.dest('build/css/'));
});

// cleanup
gulp.task('clean', function () {
	return gulp.src(['build/', 'pre-build/'], {read: false})
		.pipe($.clean());
});

gulp.task('default', ['clean', 'sass', 'markdown'], function () {
	    gulp.start('index');
});
```

Example SASS file `style.scss`:

```sass
$margin: 16px;

#main {
	padding: $margin / 2;
	margin: $margin / 2;
}
```

Example JADE template `template.jade`:

```jade
doctype html
html
	head
		link(rel='stylesheet', href='http://yui.yahooapis.com/pure/0.4.2/pure-min.css')
		link(rel='stylesheet', href='css/style.css')
	body
		div.pure-g-r#main
			div.pure-u-1-5
				ul
					each file, fn in siteContents
						li
							if file.isCurrent
								= file.shortName
							else
								a(href=file.link)= file.shortName
			div.pure-u-4-5
				!= fileContents
```

Gulp that business:

	gulp && open build/index.html      # OSX
	gulp && xdg-open build/index.html  # Linux

