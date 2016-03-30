var gulp = require('gulp'),
    es = require('event-stream'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    templateCache = require('gulp-angular-templatecache'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css');

var source = {
    js: {
        wizard: 'src/ucWizard.js',
        decorators: [
            'src/ucDecorators.js',
            'src/ucFormLocator.js',
            'src/ucInclude.js'
        ]
    },
    css: 'src/wizard.css',
    tpl: 'src/wizard.tpl.html'
};

gulp.task('build', ['decorators', 'minifyCss'], function(){
    return es.merge(gulp.src(source.js.wizard),
                    gulp.src(source.tpl)
                        .pipe(templateCache({module: 'unicorn.wizard'}))
                    )
             .pipe(ngAnnotate())
             .pipe(uglify())
             .pipe(concat('unicorn-wizard.js'))
             .pipe(gulp.dest('dist'));
});

gulp.task('decorators', function(){
    return gulp.src(source.js.decorators)
               .pipe(ngAnnotate())
               .pipe(uglify())
               .pipe(concat('unicorn-decorators.js'))
               .pipe(gulp.dest('dist'));
});

gulp.task('minifyCss', function(){
    return gulp.src(source.css)
               .pipe(minifyCss())
               .pipe(gulp.dest('dist'));
});
