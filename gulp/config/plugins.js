import replace from 'gulp-replace';// find and replace text in file
import plumber from 'gulp-plumber';// error handling
import notify from 'gulp-notify';// messages and tips
import browsersync from 'browser-sync';// local server
import newer from 'gulp-newer';// check for new files 
import ifPlugin from 'gulp-if';// conditional execution of tasks

export const plugins = {
  replace,
  plumber,
  notify,
  browsersync,
  newer,
  if: ifPlugin
};