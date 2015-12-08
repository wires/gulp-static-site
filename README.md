[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![wercker status](https://app.wercker.com/status/486c7d44015fbc0b94868b5fdeaa5d1f/s "wercker status")](https://app.wercker.com/project/bykey/486c7d44015fbc0b94868b5fdeaa5d1f)


# Build static sites with gulp

This is how it works

	$ npm install gulp gulp-static-site

Then put this in your gulpfile

```js
var gulp = require('gulp');
var static_site = require('gulp-static-site');

var paths = {
	sources: ['contents/**','templates/**'],
	stylesheets: ['css/**']
};

gulp.task('site', function () {
	return gulp.src('contents/**/*.md')
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
	
	[12:32:28] Using gulpfile /tmp/test/gulpfile.js
	[12:32:28] Starting 'site'...
	[12:32:28] Starting 'css'...
	[12:32:28] Finished 'css' after 4.56 ms
	[12:32:28] File tree
	.
	├── bar.html
	├── foo.html
	└── index.html

	[12:32:28] loading template: templates/default.jade
	[12:32:28] loading template: templates/default.jade
	[12:32:28] loading template: templates/default.jade
	[12:32:28] compiled template: templates/default.jade
	[12:32:28] rendering [default] "bar.html"
	[12:32:28] compiled template: templates/default.jade
	[12:32:28] rendering [default] "foo.html"
	[12:32:28] compiled template: templates/default.jade
	[12:32:28] rendering [default] "index.html"
	[12:32:28] gulp-size: total 1.75 kB
	[12:32:28] Finished 'site' after 191 ms
	[12:32:28] Starting 'default'...
	[12:32:28] Finished 'default' after 12 ms

Open your file:
	
	open build/index.html      # OSX
	xdg-open build/index.html  # Linux

## More info

For now, have a look at the source for [`gulp-static-site`](https://github.com/0x01/gulp-static-site/blob/master/index.js) and the Tree object you are operating on [`gulp-filetree/tree.js`](https://github.com/0x01/gulp-filetree/blob/master/tree.js).

