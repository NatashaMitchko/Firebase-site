# [natashamitchko.com](https://natashamitchko.com/)

HTML for the cookbook is rendered with `staticjinja build` at project root.
Templates are stored in the templates directory and rendered to `cookbook` (not checked in)

## Add a new recipe
```console
$ cp recipe_base.html templates/public/cookbook/<category>/<new-recipe-name>.html
$ vim $_
$ vim public/cookbook/index.html
```

## Add a new *versioned* recipe
```console
$ cp recipe_base_versioned.html templates/public/cookbook/<category>/<new-recipe-name>.html
$ vim $_
$ vim public/cookbook/index.html
$ source env/bin/activate && staticjinja build
$ firebase deploy
```

## Build static pages
``` console
$ source env/bin/activate
$ staticjinja build
```

## Local Development
```console
$ firebase emulators:start
```

## Deploy
```console
$ firebase deploy
```