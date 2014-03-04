# Generate the commit message for the website/ submodule
# it is based off of the latest commit
COMMIT_MSG=$(git config --list | grep "user.name" | cut -d = -f 2) &&
COMMIT_MSG=$COMMIT_MSG": "                                         &&
COMMIT_MSG=$COMMIT_MSG$(git log -1 --oneline)                      &&
echo "About to attempt to package website with this commit:"       &&
echo $COMMIT_MSG                                                   &&

# Generate the new website
grunt dist                        &&
WEBSITE="website"                 &&
cd $WEBSITE                       &&

git checkout gh-pages             &&

# Update the repo before packaging incase someone 
# added something to emberui -> master
git pull                          &&

# Copy the builds folder to tmp
rm -rf /tmp/builds*               &&
cp -r builds /tmp/builds          &&

# TODOS:
  # Determine the build number based on last build number
  # Update package.json with the new build number
  # Generate the latest build 
  # Tarball the latest build
  # Add the Tarball to /tmp/builds
  # Publish the build to npm

# CNAME isn't generated, save it in /tmp/ for later.
cp CNAME /tmp/CNAME               &&

# Destroy all non-hidden folders (everything 
# except website/.git/) in website/
rm -rf *                          &&

# Remove them from git (don't worry, most will be 
# re-added later.
git rm *                          &&

# Re-add our CNAME (it shouldn't change, but just 
# in case it does, that change would be in CNAME)
cp /tmp/CNAME CNAME               &&
git add CNAME                     &&

# Re-add our builds
cp -r /tmp/builds builds          &&

# Recursibely add the generated website build
cp -r ../dist/* ./                &&

# Since our 404 page is just an ember app, we can
# just copy index.html
cp index.html 404.html            &&

# Add all the generated files from the ember repo
git add .                         &&
git commit -am "$COMMIT_MSG"      &&

# Push the repo to github
git push origin gh-pages          &&

# leave website/
cd ..                             &&

# Commit the changes to the website submodule (only 
# occurs if there are any changes).
git commit -o website -m "Update website with current changes" &&

# TODO: commit the changes to package.json

echo "Successfully built package"
