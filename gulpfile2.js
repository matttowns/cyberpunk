// Gulp.js configuration
'use strict';
''

const

  // source and build folders
  dir = {
    src         : 'src/',
    build       : ''
  },

  // Gulp and plugins
  gulp          = require('gulp'),
  gutil         = require('gulp-util'),
  newer         = require('gulp-newer'),
  imagemin      = require('gulp-imagemin'),
  sass          = require('gulp-sass'),
  cleancss      = require('gulp-clean-css'),
  postcss       = require('gulp-postcss'),
  deporder      = require('gulp-deporder'),
  concat        = require('gulp-concat'),
  stripdebug    = require('gulp-strip-debug'),
  babel         = require('gulp-babel'),
  uglify        = require('gulp-uglify'),
  wait          = require('gulp-wait')
;

// Browser-sync
var browsersync = false;


// PHP settings
const php = {
  src           : dir.src + 'template/**/*.php',
  build         : dir.build
};

// copy PHP files
gulp.task('php', () => {
  return gulp.src(php.src)
    .pipe(newer(php.build))
    .pipe(gulp.dest(php.build));
});

const html = {
  src           : dir.src + 'template/**/*.html',
  build         : dir.build
};

// copy HTML files
gulp.task('html', () => {
  return gulp.src(html.src)
    .pipe(newer(html.build))
    .pipe(gulp.dest(html.build));
});

// image settings
const images = {
    src         : dir.src + 'images/**/*',
    build       : dir.build + 'images/'
  };
  
  // image processing
  gulp.task('images', () => {
    return gulp.src(images.src)
      .pipe(newer(images.build))
      .pipe(imagemin())
      .pipe(gulp.dest(images.build));
  });

  const videos = {
    src         : dir.src + 'videos/**/*',
    build       : dir.build + 'videos/'
  };
  
  // image processing
  gulp.task('videos', () => {
    return gulp.src(videos.src)
      .pipe(newer(videos.build))
      .pipe(gulp.dest(videos.build));
  });


  // CSS settings
var css = {
    src         : dir.src + 'scss/main.scss',
    watch       : dir.src + 'scss/**/*',
    build       : dir.build + '/css',
    sassOpts: {
      outputStyle     : 'nested',
      imagePath       : images.build,
      precision       : 3,
      errLogToConsole : true
    },
    processors: [
      require('postcss-assets')({
        loadPaths: ['images/'],
        basePath: dir.build,
        baseUrl: ''
      }),
      require('autoprefixer')({
        browsers: ['last 2 versions', '> 2%']
      }),
      require('css-mqpacker'),
      require('cssnano')
    ]
  };
  
  // CSS processing
  gulp.task('css', ['images'], () => {
    return gulp.src(css.src)
      .pipe(wait(1500))
      .pipe(sass(css.sassOpts))
      .pipe(cleancss({compatibility: 'ie8'}))
      .pipe(gulp.dest(css.build))
      .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop());
  });


  // JavaScript settings
const js = {
    src         : dir.src + 'js/**/*',
    build       : dir.build + 'js/',
    filename    : 'scripts.js'
  };
  

  // JavaScript processing
  gulp.task('js', () => {
  
    return gulp.src(js.src)
      .pipe(deporder())
      .pipe(concat(js.filename))
      //.pipe(stripdebug())
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(uglify())
      .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })

      .pipe(gulp.dest(js.build))
      .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop());
  });

  // run all tasks
gulp.task('build', ['php', 'css', 'js', 'html', 'videos']);

// Browsersync options
const syncOpts = {
    proxy       : 'localhost:8080/',
    files       : dir.build + '**/*',
    open        : false,
    notify      : false,
    ghostMode   : false,
    tunnel      : true,
    ui: {
      port: 8080
    }
  };
  
  
  // browser-sync
  gulp.task('browsersync', () => {
    if (browsersync === false) {
      browsersync = require('browser-sync').create();
      
      browsersync.init(syncOpts);
    }
  });
// watch for file changes
gulp.task('watch', ['browsersync'], () => {
    
      // page changes
      gulp.watch(php.src, ['php'], browsersync ? browsersync.reload : {});
      gulp.watch(html.src, ['html'], browsersync ? browsersync.reload : {});

    
      // image changes
      gulp.watch(images.src, ['images']);
    
      gulp.watch(videos.src, ['videos']);

        // CSS changes
      gulp.watch(css.watch, ['css']);
    
      // JavaScript main changes
      gulp.watch(js.src, ['js']);
    
    }); 

// default task
gulp.task('default', ['build', 'watch']);