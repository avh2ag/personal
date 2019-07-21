var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var $             = require('gulp-load-plugins')();
var autoprefixer  = require('autoprefixer');

var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

function sass() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] })
    ]))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
};

function serve() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("scss/*.scss", sass);
  gulp.watch("*.html").on('change', browserSync.reload);
}

gulp.task('sass', sass);
gulp.task('serve', gulp.series('sass', serve));
gulp.task('default', gulp.series('sass', serve));

/* Make our own little dist build */
gulp.task('copy-img', function() {
  return gulp.src('./img/*.*')
    .pipe(gulp.dest('./dist/img'));
});
gulp.task('copy-css', function() {
  return gulp.src('./css/*.*')
    .pipe(gulp.dest('./dist/css'));
});
gulp.task('copy-js', function() {
  return gulp.src('./js/*.*')
    .pipe(gulp.dest('./dist/js'));
});
gulp.task('copy-html', function() {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('bundle', gulp.series('copy-img', 'copy-css', 'copy-js', 'copy-html'));