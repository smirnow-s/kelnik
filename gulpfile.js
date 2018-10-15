'use strict';

var gulp = require('gulp'),
    npmDist = require('gulp-npm-dist'),
    rigger = require('gulp-rigger'),
    rimraf = require('rimraf'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    runTimestamp = Math.round(Date.now()/1000),
	browserSync = require('browser-sync').create();


// Copy dependencies to ./libs/
gulp.task('lib', function() {
  gulp.src(npmDist(), {base:'./node_modules'})
    .pipe(gulp.dest('./app/lib'))
    .pipe(gulp.dest('./dist/lib'));
});


// HTML
gulp.task('html', function () {
    gulp.src('app/*.html') // Выберем файлы по нужному пути
        .pipe(rigger()) // Прогоним через rigger
        .pipe(gulp.dest('dist/')) // Выплюнем их в папку dist
        .pipe(browserSync.reload({ stream: true })); // И перезагрузим наш сервер для обновлений
});


//JS
gulp.task('js', function () {
    gulp.src('app/js/*.js') // Найдем наши script файлы
        .pipe(gulp.dest('dist/js/')) // Выплюнем несжатые файлы в build
        .pipe(browserSync.reload({ stream: true })); // И перезагрузим сервер
});


// SCSS
gulp.task('scss', function () {
    gulp.src('app/scss/style.scss') // Выберем наш style.scss
        .pipe(sass()) // Скомпилируем
        .pipe(prefixer({ remove: false, browsers: ['last 2 versions'] })) // Добавим вендорные префиксы
        .pipe(gulp.dest('dist/css')) // Выплюнем несжатый файл в build
        .pipe(browserSync.reload({ stream: true }));
});


// Image
gulp.task('image', function () {
    gulp.src('app/img/**/*.*') // Выберем наши картинки
        .pipe(imagemin([ // Сожмем их
        	imagemin.gifsicle({interlaced: true}),
        	imagemin.jpegtran({progressive: true}),
        	imagemin.optipng({optimizationLevel: 5})
    	]))
        .pipe(gulp.dest('dist/img')) // И бросим в dist
        .pipe(browserSync.reload({ stream: true }));
});


// Favicon
gulp.task('favicon', function () {
    gulp.src('app/favicon/**/*.*') // Выберем наши картинки
        .pipe(imagemin([ // Сожмем их
        	imagemin.gifsicle({interlaced: true}),
        	imagemin.jpegtran({progressive: true}),
        	imagemin.optipng({optimizationLevel: 5})
    	]))
        .pipe(gulp.dest('dist/favicon')) // И бросим в dist
        .pipe(browserSync.reload({ stream: true }));
});


// SVG
gulp.task('svg', function () {
    gulp.src('app/svg/**/*.svg') // Выберем наши картинки
        .pipe(imagemin([ // Сожмем их
        	imagemin.svgo({
        		plugins: [
	        		{ removeViewBox: true },
	        		{ cleanupIDs: true }
        		]
        	})
    	]))
        .pipe(gulp.dest('dist/svg')) // И бросим в dist
        .pipe(browserSync.reload({ stream: true }));
});


// Watch
gulp.task('watch', function(){
    gulp.watch('package.json', ['lib']);
	gulp.watch('app/**/*.html', ['html']);
	gulp.watch('app/js/*.js', ['js']);
	gulp.watch('app/scss/**/*.scss', ['scss']);
	gulp.watch('app/img/**/*.*', ['image']);
	gulp.watch('app/favicon/*.*', ['favicon']);
	gulp.watch('app/svg/*.svg', ['svg']);
});


// Clean 'dist'
gulp.task('clean', function (cb) {
    rimraf('dist/', cb);
});


// Build task (with clean)
gulp.task('build', [
    'lib',
    'html',
    'js',
    'scss',
    'image',
    'favicon',
    'svg'
]);


// Server
gulp.task('server', function() {

    browserSync.init({
        server: './',
        //proxy: "yourlocal.dev"
        //startPath: 'dist/',
        browser: 'Google Chrome',
        directory: true,
        notify: false,
        //tunnel: true,
        open: false
    });

});

// Default task
gulp.task('default', ['server', 'watch']);

