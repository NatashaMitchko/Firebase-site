# Personal Site with Firebase

HTML for cookbooks is rendered with `staticjinja build` at project root.
Templates are stored in the templates directory and rendered to `cookbook` (not checked in)

Create a new file in `templates/` to add a new recepie.

From project root
```
$ cp public/to-copy.html templates/public/cookbook/<category>/<new-recipe-name>.html
$ vim $_
$ vim public/cookbook/index.html
$ source env/bin/activate && staticjinja build
$ firebase deploy
```


I host my personal website [natashamitchko.com](https://www.natashamitchko.com) with firebase.
