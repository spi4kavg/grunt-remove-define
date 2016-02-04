/*
 * grunt-remove-define
 * https://github.com/root/grunt_remove_define
 *
 * Copyright (c) 2016 spi4ka
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('remove_define', 'needed for migrating from reqiure-modules to old-style', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      wrap: false,
      separator: ',',
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // replace to old-style
      var firstIndex = src.indexOf("{"),
          lastIndex = src.lastIndexOf("}"),
          content = src.substring(firstIndex + 1, lastIndex);

      if (options.wrap) {
        content = "(function () {" + content + "})();";
      }

      src = content;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
