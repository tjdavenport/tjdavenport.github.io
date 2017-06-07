./node_modules/.bin/browserify dev/index.js -o bundle.js -t [ stringify --extensions [ .html ] ] -t [ babelify --presets [ es2015 ] ]
./node_modules/.bin/concat-cli -f node_modules/jquery/dist/jquery.js node_modules/underscore/underscore.js node_modules/backbone/backbone.js node_modules/backbone.radio/build/backbone.radio.js node_modules/backbone.marionette/lib/backbone.marionette.js bundle.js -o bundle.js
./node_modules/.bin/uglifyjs bundle.js --compress --mangle -o bundle.js
./node_modules/.bin/node-sass --output-style compressed dev/styles.scss styles.css
