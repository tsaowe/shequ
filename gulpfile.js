var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var gulpif = require('gulp-if');
//var sprite = require('css-sprite');
var sprity = require('sprity');
var server = require('gulp-webserver');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint'); //js格式检查
var cssmin = require('gulp-minify-css'); //css压缩
var imagemin = require('gulp-imagemin'); //图片压缩
var del = require('del'); //清除文件
var htmlhint = require('gulp-htmlhint'); //html代码规范检查
var htmlmin = require('gulp-htmlmin'); //html压缩文件
var cache = require('gulp-cache');//图片缓存
var rev = require('gulp-rev');                                  //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');              //- 路径替换
var zip = require('gulp-zip');//自动打包并按时间重命名

gulp.task('sprite-note',function(){
    return sprity.src({
     src:'./images/note/*.png',
     name: 'note',                       //定义一个名称
     style: '_note.scss',                //这是生成的样式文件
     format: 'png',                      //png格式的图片
     orientation: 'vertical',          //雪碧图合并的方向，也可以设置成垂直或水平
     cssPath: '../images/sprite/',    //雪碧图的路径变量
     //template: './sprite-tpl.mustache',  //scss生成的模板
     processor: 'sass',                   //生成的样式文件的格式
        'margin':0,    //图片间距
     'style-type':'scss'})
     .pipe(gulpif('*.png',gulp.dest('./images/sprite/'),gulp.dest('./css/sprite/')));
});

gulp.task('sprite-red',['sprite-note'],function(){
    return sprity.src({
        src:'./images/red/*.png',
        name: 'red',                       //定义一个名称
        style: '_red.scss',                //这是生成的样式文件
        format: 'png',                      //png格式的图片
        orientation: 'vertical',          //雪碧图合并的方向，也可以设置成垂直或水平
        cssPath: '../images/sprite/',    //雪碧图的路径变量
        //template: './sprite-tpl.mustache',  //scss生成的模板
        processor: 'sass',                   //生成的样式文件的格式
        'margin':0,
        'style-type':'scss'})
        .pipe(gulpif('*.png',gulp.dest('./images/sprite/'),gulp.dest('./css/sprite/')));

});

gulp.task('sprite-record',['sprite-red'],function(){
    return sprity.src({
        src:'./images/record/*.png',
        name: 'record',                       //定义一个名称
        style: '_record.scss',                //这是生成的样式文件
        format: 'png',                      //png格式的图片
        orientation: 'vertical',          //雪碧图合并的方向，也可以设置成垂直或水平
        cssPath: '../images/sprite/',    //雪碧图的路径变量
        //template: './sprite-tpl.mustache',  //scss生成的模板
        processor: 'sass',                   //生成的样式文件的格式
        'margin':0,
        'style-type':'scss'})
        .pipe(gulpif('*.png',gulp.dest('./images/sprite/'),gulp.dest('./css/sprite/')));

});

gulp.task('sprite-rank',['sprite-record'],function(){
    return sprity.src({
        src:'./images/rank/*.png',
        name: 'rank',                       //定义一个名称
        style: '_rank.scss',                //这是生成的样式文件
        format: 'png',                      //png格式的图片
        orientation: 'vertical',          //雪碧图合并的方向，也可以设置成垂直或水平
        cssPath: '../images/sprite/',    //雪碧图的路径变量
        //template: './sprite-tpl.mustache',  //scss生成的模板
        processor: 'sass',                   //生成的样式文件的格式
        'margin':0,
        'style-type':'scss'})
        .pipe(gulpif('*.png',gulp.dest('./images/sprite/'),gulp.dest('./css/sprite/')));

});

gulp.task('sprites', ['sprite-rank']);

gulp.task('sass', ['sprites'],function () {
    return gulp.src('./css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions','last 4 iOS versions'],
            cascade: false
        }))
        //.pipe(cleanCSS())
        .pipe(gulp.dest('./css/'));
});

//启动web服务，开启自动刷新功能，自动打开浏览器
gulp.task('server', ['sass'],function() {
    return gulp.src( './' ) // 服务器目录（./代表根目录）
        .pipe(server({
            host:'localhost',
            port:8080,
            //path:'html/notice.html',
            livereload: true, // 启用LiveReload
            open: true // 服务器启动时自动打开网页
        }))
        .pipe(notify({ message: 'server task complete' }));
});

gulp.task('watch',['server'], function () {
    gulp.watch('./css/**/*.scss', ['sass']);
    gulp.watch('./images/**/*.png', ['sass']);
});

gulp.task('test',['watch']);

//js文件检查，压缩，合并，重命名，写入到build下
gulp.task('js',['css'],function(){
    gulp.src(['./js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('build/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/rev/js'));

    return gulp.src(['./lib/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('build/lib'))
        .pipe(notify({ message: 'js task complete' }));
});

//scss文件编译，压缩，重命名写入到build下
gulp.task('css',function(){
    return gulp.src('./css/*.scss')
        .pipe(sass())
        .pipe(cssmin())
        .pipe(rev())
        .pipe(gulp.dest('build/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/rev/css'))
        .pipe(notify({ message: 'css task complete' }));
});

//有更新的图片压缩，写入build
gulp.task('images',['html'],function(){
    var imgOpt =
    {
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    };
    return gulp.src('./images/sprite/*.png')
        .pipe(cache(imagemin(imgOpt)))
        .pipe(gulp.dest('build/images/sprite'))
        .pipe(notify({ message: 'images task complete' }));

});


//html文件检查，压缩，写入build
gulp.task('html',['js'],function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };

    return gulp.src('./html/*.html')
        .pipe(htmlhint())
        // .pipe(htmlhint.reporter("htmlhint-stylish"))
        //  .pipe(htmlhint.failReporter({ suppress: true })
        .pipe(htmlmin(options))
        .pipe(gulp.dest('build/html'))
        .pipe(notify({ message: 'html task complete' }));

});


//清除build下所有文件
gulp.task('clean', function(cb) {
    del(['build'], cb)
});

gulp.task('rev', ['images'],function() {
    return gulp.src(['build/rev/**/*.json', 'build/html/*.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector())                                   //- 执行文件内css名的替换
        .pipe(gulp.dest('build/html'));                     //- 替换后的文件输出的目录
});

//清除build下所有文件
gulp.task('del',['rev'], function(cb) {
    del(['build/rev'], cb)
});


//打包主体build 文件夹并按照时间重命名
gulp.task('zip',['del'],function(){
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        }
        return i
    }

    var d=new Date();
    var year=d.getFullYear();
    var month=checkTime(d.getMonth() + 1);
    var day=checkTime(d.getDate());
    var hour=checkTime(d.getHours());
    var minute=checkTime(d.getMinutes());

    return gulp.src('./build/**')
        .pipe(zip('shequ-'+year+month+day +hour+minute+'.zip'))
        .pipe(gulp.dest('./'));
});


//gulp build自动打包项目
gulp.task('publish',['zip']);

gulp.task('sprite-head',function(){
    return sprity.src({
        src:'./bus/image/head/*.png',
        name: 'head',                       //定义一个名称
        style: '_head.scss',                //这是生成的样式文件
        format: 'png',                      //png格式的图片
        //split: true, //多图分割
        prefix: 'head',
        orientation: 'binary-tree',          //雪碧图合并的方向，也可以设置成垂直或水平
        cssPath: '../image/sprite/',    //雪碧图的路径变量
        processor: 'sass',                   //生成的样式文件的格式
        'margin':0,    //图片间距
        template: './sprity-css.hbs',
        'style-type':'scss'})
        .pipe(gulpif('*.png',gulp.dest('./bus/image/sprite/'),gulp.dest('./bus/css/sprite/')));
});


gulp.task('sprite-main',function(){
    return sprity.src({
        src:'./bus/image/main/*.png',
        name: 'main',                       //定义一个名称
        style: '_main.scss',                //这是生成的样式文件
        format: 'png',                      //png格式的图片
        orientation: 'binary-tree',
        cssPath: '../image/sprite/',    //雪碧图的路径变量
        processor: 'sass',                   //生成的样式文件的格式
        'margin':0,    //图片间距
        prefix: 'main',
        'style-type':'scss'})
        .pipe(gulpif('*.png',gulp.dest('./bus/image/sprite/'),gulp.dest('./bus/css/sprite/')));
});

gulp.task('sprite-page1',function(){
    return sprity.src({
        src:'./bus/image/page1/*.png',
        name: 'page1',                       //定义一个名称
        style: '_page1.scss',                //这是生成的样式文件
        format: 'png',                      //png格式的图片
        orientation: 'binary-tree',
        cssPath: '../image/sprite/',    //雪碧图的路径变量
        processor: 'sass',                   //生成的样式文件的格式
        'margin':0,    //图片间距
        prefix: 'page1',
        'style-type':'scss'})
        .pipe(gulpif('*.png',gulp.dest('./bus/image/sprite/'),gulp.dest('./bus/css/sprite/')));
});

gulp.task('sprite-page2',function(){
    return sprity.src({
        src:'./bus/image/page2/*.png',
        name: 'page2',                       //定义一个名称
        style: '_page2.scss',                //这是生成的样式文件
        format: 'png',                      //png格式的图片
        orientation: 'binary-tree',
        cssPath: '../image/sprite/',    //雪碧图的路径变量
        processor: 'sass',                   //生成的样式文件的格式
        'margin':0,    //图片间距
        prefix: 'page2',
        'style-type':'scss'})
        .pipe(gulpif('*.png',gulp.dest('./bus/image/sprite/'),gulp.dest('./bus/css/sprite/')));
});

gulp.task('sprite-page3',function(){
    return sprity.src({
        src:'./bus/image/page3/*.png',
        name: 'page3',                       //定义一个名称
        style: '_page3.scss',                //这是生成的样式文件
        format: 'png',                      //png格式的图片
        orientation: 'binary-tree',
        cssPath: '../image/sprite/',    //雪碧图的路径变量
        processor: 'sass',                   //生成的样式文件的格式
        'margin':0,    //图片间距
        prefix: 'page3',
        'style-type':'scss'})
        .pipe(gulpif('*.png',gulp.dest('./bus/image/sprite/'),gulp.dest('./bus/css/sprite/')));
});

gulp.task('sprite-foot',function(){
    return sprity.src({
        src:'./bus/image/foot/*.png',
        name: 'foot',                       //定义一个名称
        style: '_foot.scss',                //这是生成的样式文件
        format: 'png',                      //png格式的图片
        orientation: 'binary-tree',
        cssPath: '../image/sprite/',    //雪碧图的路径变量
        processor: 'sass',                   //生成的样式文件的格式
        'margin':0,    //图片间距
        prefix: 'foot',
        'style-type':'scss'})
        .pipe(gulpif('*.png',gulp.dest('./bus/image/sprite/'),gulp.dest('./bus/css/sprite/')));
});

//有更新的图片压缩，写入build
gulp.task('bus-imgmin',function(){
    var imgOpt =
    {
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    };
    return gulp.src('./bus/image/sprite/*.png')
        .pipe(cache(imagemin(imgOpt)))
        .pipe(gulp.dest('bus/image/sprite'))
        .pipe(notify({ message: 'images task complete' }));

});

gulp.task('bus-sprite',['sprite-head','sprite-main','sprite-page1','sprite-page2','sprite-page3','sprite-foot']);