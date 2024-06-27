import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
//import pug from "gulp-pug";

// html
export const html = () => {
    return global.app.gulp.src(global.app.path.src.html)
        .pipe(app.plugins.plumber(//catch errors and show them in the browser
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fileInclude())//build html file from small parts to one file
        .pipe(global.app.plugins.replace(/@img\//g, 'img/'))// replace @img/ to img/
        .pipe(webpHtmlNosvg())//converting common <img src=...> to <picture> with additional using webp format
        .pipe(
            versionNumber({
                'value': '%DT%',
                'append': {
                    'key': '_v',
                    'cover': 0,
                    'to': [
                        'css',
                        'js',
                    ]
                },
                'output': {
                    'file': 'gulp/version.json'
                }
            })
        )       
        .pipe(global.app.gulp.dest(global.app.path.build.html));
}