import gulp from 'gulp';

import cssnano from 'gulp-cssnano';
import rev from 'gulp-rev';
import uglify from 'gulp-uglify';
// import { uglify } from 'rollup-plugin-uglify';
// import uglify from 'rollup-plugin-uglify';
import imagemin from "gulp-imagemin";
// import babel from babel;
import {deleteAsync} from "del";


gulp.task('css', function(done){
    console.log('minifying css...');
    // gulp.src('./assets/sass/**/*.scss')
    // .pipe(sass())
    // .pipe(cssnano())
    // .pipe(gulp.dest('./assets.css'));

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(cssnano())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
})

//Minified javascript
gulp.task('js', function (done) {
  gulp.src('./assets/**/*.js')
 .pipe(uglify())
 .pipe(rev())
 .pipe(gulp.dest('./public/assets'))
 .pipe(rev.manifest({
     cwd:"public",
     merge:true
   }))
 .pipe(gulp.dest('./public/assets'))
 done();
});

// Minified images
gulp.task('images', function (done) {
  console.log('minifying css...');
  gulp.src('./assets/**/*.{png,jpg,svg,gif,jpeg}')
  // gulp.src('./assets/**/**/*.(png|jpg|svg|gif|jpeg)')
 .pipe(imagemin())
 .pipe(rev())
 .pipe(gulp.dest('./public/assets'))
 .pipe(rev.manifest({
     cwd:"public",
     merge:true
   }))
 .pipe(gulp.dest('./public/assets'))
 done();
});

//Whenever server will restart all old work done by gulp will be deleted and it will perform all the tasks and minificatin again
gulp.task("clean:assets" , async function(done){
  await deleteAsync("./public/assets");
  done();
});

//Run all the taks one by one 
gulp.task("build" , gulp.series("clean:assets" , "css" , "js" , "images" , function(done){
 done();
}));