// Main module
import gulp from 'gulp';
// Import our path
import { path } from './gulp/config/path.js';
// Import common plugins
//import { plugins } from './gulp/config/plugins.js';

// Pass values to global variable
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    //plugins: plugins,
}

// Import tasks
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';

// 1) setup watcher
// Observe changes in files
function watcher(){
    gulp.watch(path.watch.files, copy);
}

// 2) setup sequence of stepecs for dev mode task pipeline 
// SERIES - SERIAL MODE for our steps
// 1 step - delete all data from dist folder
// 2 step - copy all files from source folder
// 3 step - watch for changes in files
const dev = gulp.series(
    reset, //clean dist folder
    copy, // copy all files from source 'files' folder to 'dist' folder
    watcher //observe changes in files
);

//Run default task by default
gulp.task('default', dev);