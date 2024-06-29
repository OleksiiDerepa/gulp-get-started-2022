import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import pug from "gulp-pug";

// html
export const html = () => {
    return global.app.gulp.src(global.app.path.src.html)
        .pipe(app.plugins.plumber(//catch errors and show them in the browser
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))
        /*
                .pipe(pug(//process PUG files for building html files
                    {
                        // squeezing html file
                        pretty: true,//beautify html
                        // show in the terminal wich file was processed
                        verbose: true,//show errors
                    }
                ))
        */
        .pipe(fileInclude())//build html file from small parts to one file
        .pipe(global.app.plugins.replace(/@img\//g, 'img/'))// replace @img/ to img/
        .pipe(
            global.app.plugins.if(
                global.app.isBuild,
                webpHtmlNosvg()//converting common <img src=...> to <picture> with additional using webp format
            )
        )
        .pipe(
            global.app.plugins.if(
                global.app.isBuild,
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
        )
        .pipe(global.app.gulp.dest(global.app.path.build.html))
        .pipe(global.app.plugins.browsersync.stream());
}