// Main module
import gulp from 'gulp';
// Import our path
import { path } from './gulp/config/path.js';
// Import common plugins
import { plugins } from './gulp/config/plugins.js';

// Pass values to global variable
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins,
}

// Import tasks
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';

// 1) setup watcher
// Observe changes in files
function watcher(){
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

// 2) setup paralel steps for dev mode task pipeline
// any task can execute in any sequence
// PARALLEL - ASYNC MODE for our steps
const mainTasks = gulp.parallel(
    copy, // copy all files from source 'files' folder to 'dist/files' folder
    html,
    scss,
    js,
    images
);

const finalTasks = gulp.parallel(
    watcher, //observe changes in files
    server  //run server, run index.html page and refresh page in case of changes in files
);

// 3) setup sequence of steps for dev mode task pipeline 
// SERIES - SERIAL MODE for our steps
// 1 step - delete all data from dist folder
// 2 step - copy all files from source folder
// 3 step - watch for changes in files
const dev = gulp.series(
    reset,      // execute clean dist folder
    mainTasks,  // execute all main tasks in parallel mode
    finalTasks  // execute all final tasks in parallel mode
);

//Run default task by default
gulp.task('default', dev);