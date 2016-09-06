const fs = require('fs');
const browserify = require('browserify')();
const sass = require('node-sass');

// IO
const jsInput = './res/js/main.js';
const jsOutput = './res/bundle.js';
const sassInput = './res/sass/main.scss';
const sassOutput = './res/bundle.css';

// Js bundling
const compileJs = function(input, output) {
  const bundle = fs.createWriteStream(output);

  browserify.add(input);
  browserify.bundle(function(err) {
    if(err){
      throw new Error(err);
    }

    console.log('Javascript bundling succeeded.');
  }).pipe(bundle);
};

// Sass -> CSS
const compileSass = function(input, output) {
  sass.render({
    file: input,
    outputStyle: 'compressed'
  }, function(err, render) {
    if(err){
      throw new Error(err);
    }

    const stream = fs.createWriteStream(output);
    stream.write(render.css, function(err) {
      if(err){
        throw new Error(err);
      }

      console.log('Stylesheet compilation succeeded');
    })
  });
};

compileJs(jsInput, jsOutput);
compileSass(sassInput, sassOutput);
