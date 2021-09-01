const { parallel } = require("gulp");
var gulp = require("gulp");
var sassdoc = require("sassdoc");
var browserSync = require("browser-sync").create();

gulp.task("sassdoc", function () {
  var options = {
    dest: "docs",
    verbrose: true,
  };
  return gulp.src("./scss/**/*.scss").pipe(sassdoc(options));
});

gulp.task("browserSync", function () {
  browserSync.init({
    server: {
      baseDir: "docs",
    },
  });
});

gulp.task("serve", function () {
  browserSync.init({
    server: "./docs",
  });
  gulp.watch("scss/**/*.scss", gulp.parallel("sassdoc"));
  gulp.watch("docs/*.html", gulp.parallel(browserSync.reload));
});
