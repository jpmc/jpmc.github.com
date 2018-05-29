let gulp = require("gulp"),
  fs = require("fs"),
  svgo = require("gulp-svgo"),
  concat = require("gulp-concat"),
  minify = require("gulp-minify"),
  cleanCss = require("gulp-clean-css"),
  replace = require("gulp-string-replace");

// BEGIN LOGO COMPILATION TASKS
gulp.task("logo-css", function() {
  return gulp
    .src(["assets/logo/svg.css"])
    .pipe(cleanCss())
    .pipe(concat("svg.min.css"))
    .pipe(gulp.dest("assets/logo"));
});
gulp.task("logo-js", function() {
  return gulp
    .src(["assets/logo/svg.js"])
    .pipe(minify())
    .pipe(gulp.dest("assets/logo"));
});
gulp.task("logo-svg", function() {
  return gulp
    .src("assets/logo/logo.svg")
    .pipe(concat("logo.min.svg"))
    .pipe(
      svgo({
        plugins: [
          { convertShapeToPath: false },
          { collapseGroups: false },
          { convertPathData: false },
          { mergePaths: false },
          { convertColors: true }
        ]
      })
    )
    .pipe(gulp.dest("assets/logo"));
});
gulp.task("logo-merge", function() {
  let js_content = fs.readFileSync("assets/logo/svg-min.js", "utf-8");
  return gulp
	.src("assets/logo/logo.min.svg")
	.pipe(concat('logo.compiled.svg'))
    .pipe(replace("</svg>", `<script>${js_content}</script></svg>`))
    .pipe(gulp.dest("assets/logo"));
});

gulp.task("logo-build", ["logo-js", "logo-css", "logo-svg", "logo-merge"]);
// END LOGO COMPILATION TASKS

gulp.task("pack-css", function() {
  return gulp
    .src(["assets/css/*.css"])
    .pipe(concat("stylesheet.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest("build/css"));
});
gulp.task("default", ["pack-css", "logo-build"]);
