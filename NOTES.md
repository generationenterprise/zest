heroku git:remote -a zest-services
git pull https://git.heroku.com/zest-services.git

## Fromn Scratch

```
$ yo angular-fullstack:heroku
$ heroku addons:create mongolab:sandbox
$ heroku addons:create heroku-postgresql
```