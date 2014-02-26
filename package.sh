COMMIT_MSG=$(git config --list | grep "user.name" | cut -d = -f 2) &&
COMMIT_MSG=$COMMIT_MSG": "                                         &&
COMMIT_MSG=$COMMIT_MSG$(git log -1 --oneline)                      &&
echo $COMMIT_MSG                                                   &&

grunt dist                        &&
WEBSITE="website"                 &&
cd $WEBSITE                       &&

git pull --rebase                 &&
rm -rf *                          &&
git rm *                          &&
cp -r ../dist/* ./                &&
git add .                         &&
git commit -am "$COMMIT_MSG"      &&
git push origin HEAD --force      &&
cd ..                             &&
git commit -o website -m "Update website with current changes" &&

echo "Successfully built package"
