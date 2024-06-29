import zipPlugin from 'gulp-zip';
import { deleteAsync } from "del";


export const zip = async () => {
    await deleteAsync(global.app.path.zip.archiveFile);
    return global.app.gulp.src(global.app.path.zip.targetSrc, {})
        .pipe(app.plugins.plumber(//catch errors and show them in the browser
            app.plugins.notify.onError({
                title: "ZIP",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(zipPlugin(global.app.path.zip.archiveFile))
        .pipe(global.app.gulp.dest(global.app.path.rootFolder));
}