var _ = require('lodash');
var through = require('through');
var fs = require('fs');
var File = require('vinyl');
var Q = require('kew');
var jade = require('jade');

module.exports = function(templateFn) {
	var index = {}

	// collect all files
	function write(data) {
		var fn = data.path.replace(data.base, '');
		index[fn] = data;
	}

	// once we receive all files, render them and re-emit
	function end () {
		Q.all(_.map(index, writeFile.bind(this)))
		 .then(function(){
			 // once we are done with that, close the stream
			 this.emit('end')
		 }.bind(this));
	}

	function writeFile(file, fn) {

		function menuEntry(vfs, currentFn){
			vfs.link = currentFn;
			vfs.shortName = currentFn.replace('.html','');
			vfs.isCurrent = (vfs.path === vfs.base + fn);
			return vfs;
		}

		// template variables
		//   'siteContents' { base filename => vfs }
		//   'fileContents' current file buffer
		var options = {
			siteContents: _.mapValues(index, menuEntry),
			fileContents: file.contents
		};
		jade.renderFile(templateFn, options, function (err, html) {
			if (err) throw err;

			var indexFile = new File({
			  cwd: file.cwd,
			  base: file.base,
			  path: file.path,
			  contents: new Buffer(html)
			});

			this.emit('data', indexFile)
		}.bind(this));
	}

	return through(write, end);
}
