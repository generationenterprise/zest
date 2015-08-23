heroku git:remote -a zest-services
git pull https://git.heroku.com/zest-services.git

## From Scratch

```
$ yo angular-fullstack:heroku
$ heroku addons:create mongolab:sandbox
$ heroku addons:create heroku-postgresql
```

TODO: create service for 'selected zone rate' or perhaps a Zone model