# Build static sites with gulp

This is how it works

	$ npm install gulp gulp-static-site

Then put this in your gulpfile

```js
var gulp = require('gulp');
var static_site = require('gulp-static-site');

var paths = {
	sources: ['content/**','templates/**'],
	stylesheets: ['css/**']
};

gulp.task('site', function () {
	return gulp.src('content/**/*.md')
		.pipe(static_site())
		.pipe(gulp.dest('build/'))
});

gulp.task('css', function () {
	return gulp.src('css/*.css')
		.pipe(gulp.dest('build/css'));
});

gulp.task('default', ['site','css'], function () {
	gulp.watch(paths.sources, ['site']);
	gulp.watch(paths.stylesheets, ['css']);
});
```

Example JADE template `templates/default.jade`:

```jade
doctype html
html
	head
		link(rel='stylesheet', href='http://yui.yahooapis.com/pure/0.4.2/pure-min.css')
		meta(http-equiv='content-type', content='text/html; charset=UTF-8')
	body
		div.pure-g-r#main
			div.pure-u-1-5
				p Menu
				ul
					each node in page.tree.nodes
						if node.leaf
							li
								a(href=node.leaf.href)= node.leaf.shortName
			div.pure-u-4-5
				!= page.contents
```

Now we need some markdown files

	mkdir contents/
	echo "hello from *foo*" >> contents/foo.md
	echo "bye from `bar`" >> contents/bar.md
	echo "welcome to my site" >> contents/index.md

Gulp that business:

	gulp

Open your file:
	
	open build/index.html      # OSX
	xdg-open build/index.html  # Linux
