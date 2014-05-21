#!/bin/bash

VERSION=$1

if [ "$#" -ne 1 ]; then
  echo "please specify a version number (i.e. 0.1.0)"
  exit 1
fi

# update bower.json
sed -i -r 's/^  "version": "[0-9]+\.[0-9]+\.[0-9]+",/  "version": "'$VERSION'",/g' bower.json

# update lib file
sed -i -r 's/^Ember.libraries.register\("EmberUI", "[0-9]+\.[0-9]+\.[0-9]+"\);/Ember.libraries.register("EmberUI", "'$VERSION'");/g' lib/main.js

rm -rf dist && broccoli build dist
git commit -a -m "Version bump $VERSION"
git tag -a "v$VERSION" -m "v$VERSION"
#git push origin master
#git push --tags
