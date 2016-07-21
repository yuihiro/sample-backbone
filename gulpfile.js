var production = false;
var _ = require('underscore');
var bowerResolve = require('bower-resolve');
var nodeResolve = require('resolve');
var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css')
var copy = require('gulp-copy');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var csslint = require('gulp-csslint');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var remapify = require('remapify');
var browserify = require('browserify');
var hbsfy = require('hbsfy');
var connect = require('gulp-connect');
var config = require('./gulp.config.js');
gulp.task('clean', function () {
    gulp.src([config.path.dist + '/**/*'], {
            read: false
        })
        //.pipe(ignore.exclude('node_modules/**'))
        .pipe(rimraf({
            force: false
        }));
});
gulp.task('lint:js', function () {
    return gulp.src([config.file.js])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter("fail"))
});
gulp.task('lint:css', function () {
    return gulp.src([config.file.css])
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(csslint.reporter('fail'))
});
gulp.task('copy:html', function () {
    return gulp.src([config.file.html, config.file.jsp])
        .pipe(gulp.dest(config.path.dist))
        .pipe(connect.reload());
});
gulp.task('copy:img', function () {
    return gulp.src([config.file.png, config.file.jpg])
        .pipe(gulp.dest(config.path.dist_img))
        .pipe(connect.reload());
});
gulp.task('copy:lib', function () {
    return gulp.src(config.file.all)
        .pipe(gulp.dest(config.path.dist_lib))
        .pipe(connect.reload());
});
/*
 gulp.task('copy:template', function () {
 return gulp.src(config.file.template)
 .pipe(gulp.dest(config.path.dist_template))
 .pipe(connect.reload());
 });

 gulp.task('copy:partial', function () {
 return gulp.src(config.file.partial)
 .pipe(gulp.dest(config.path.dist_partial))
 .pipe(connect.reload());
 });
 */
gulp.task('copy:css', function () {
    return gulp.src(config.file.css)
        .pipe(gulp.dest(config.path.dist_css))
        .pipe(connect.reload());
});
gulp.task('compile:css', function () {
    return gulp.src(config.file.css)
        .pipe(concat(config.file.bundle_css))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.path.dist_css))
        .pipe(connect.reload());
});
gulp.task('compile:js', function () {
    var b = browserify({
        entries: [config.file.entry],
        extensions: ['.js'],
        debug: true,
        paths: ['./src/js/']
    });
    b.plugin(remapify, [{
        src: './src/js/**/*.js' // glob for the files to remap
        , expose: '' // this will expose `__dirname + /client/views/home.js` as `views/home.js`
        , cwd: __dirname // defaults to process.cwd()
        //, filter: function (alias, dirname, basename) { // customize file names
        //  return path.join(dirname, basename.replace('foo', 'bar'))
        //}
    }
    ]);
    b.on('error', function (err) {
        console.log(err);
        this.emit('end');
    });
    getNPMPackageIds().forEach(function (id) {
        b.external(id);
    });
    b.bundle()
        .pipe(source(config.file.bundle_js))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(gulpif(config.condition.build, uglify()))
        //.on('error', gutil.log)
        .pipe(sourcemaps.write("./"))
        //.pipe(uglify())
        //.pipe(rename({suffix:".min"}))
        .pipe(gulp.dest(config.path.dist_js))
    //.pipe(connect.reload());
});
gulp.task('compile:vendor', function () {
    var b = browserify({
        debug: !production
    });
    /*
     getBowerPackageIds().forEach(function (id) {
     var resolvedPath = bowerResolve.fastReadSync(id);
     b.require(resolvedPath, {
     expose: id
     });
     });
     */
    getNPMPackageIds().forEach(function (id) {
        b.require(nodeResolve.sync(id), {expose: id});
    });
    b.bundle()
        .on('error', function (err) {
            console.log(err.message);
            this.emit('end');
        })
        .pipe(source(config.file.vendor_js))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(config.path.dist_js));
    //stream.pipe(rename('vendor' + (production ? '.min' : '') + '.js'))
});
gulp.task('watch', function () {
    watch([config.file.html, config.file.jsp], function (event) {
        gulp.start('copy:html');
    });
    watch([config.file.png, config.file.jpg], function (event) {
        gulp.start('copy:img');
    });
    watch(config.file.css, function (event) {
        gulp.start('copy:css');
    });
    watch(config.file.js, function (event) {
        gulp.start('compile:js');
    });
    watch(config.file.template, function (event) {
        gulp.start('compile:js');
    });
    watch(config.file.partial, function (event) {
        gulp.start('compile:js');
    });
    watch("./package.json", function (event) {
        gulp.start('compile:vendor');
    });
});
gulp.task('server', function () {
    connect.server({
        root: 'dist',
        port: 8889,
        livereload: false
    });
});
gulp.task('copy', ['copy:html', 'copy:img', 'copy:css']);
gulp.task('compile', ['compile:css', 'compile:js']);
gulp.task('all', ['copy', 'compile', 'watch', 'server']);
gulp.task('default', ['lint:js', 'compile:js'], function () {
    return gulp.start("watch");
});
function getBowerPackageIds() {
    // read bower.json and get dependencies' package ids
    var bowerManifest = {};
    try {
        bowerManifest = require('./bower.json');
    } catch (e) {
        // does not have a bower.json manifest
    }
    return _.keys(bowerManifest.dependencies) || [];
}
function getNPMPackageIds() {
    // read package.json and get dependencies' package ids
    var packageManifest = {};
    try {
        packageManifest = require('./package.json');
    } catch (e) {
        // does not have a package.json manifest
    }
    return _.keys(packageManifest.dependencies) || [];
}
