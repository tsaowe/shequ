var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var gulpif = require('gulp-if');
//var sprite = require('css-sprite');
var sprity = require('sprity');



gulp.task('sass', function () {
    return gulp.src('./css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
			browsers: ['last 2 versions','last 4 iOS versions'],
			cascade: false
		}))
        //.pipe(cleanCSS())
        .pipe(gulp.dest('./css/'));
});

gulp.task('sprites',function(){
    sprity.src({
     src:'./images/note/*.png',
     name: 'note',                       //定义一个名称
     style: '_note.scss',                //这是生成的样式文件
     format: 'png',                      //png格式的图片
     orientation: 'vertical',          //雪碧图合并的方向，也可以设置成垂直或水平
     cssPath: '../images/sprite/',    //雪碧图的路径变量
     //template: './sprite-tpl.mustache',  //scss生成的模板
     processor: 'sass',                   //生成的样式文件的格式
     'style-type':'scss'})
     .pipe(gulpif('*.png',gulp.dest('./images/sprite/'),gulp.dest('./css/sprite/')))

    sprity.src( {
        src:'./images/red/*.png',
        name: 'red',
        style: '_red.scss',
        format: 'png',
        orientation: 'vertical',
        cssPath: '../images/sprite/',
        processor: 'sass',
        'style-type':'scss'})
    .pipe(gulpif('*.png',gulp.dest('./images/sprite/'),gulp.dest('./css/sprite/')))



});

gulp.task('sass:watch', function () {
    gulp.watch('./css/**/*.scss', ['sass']);
});