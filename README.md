# Kirby

_Good things come in pairs_

The backend uses `express`/`sequelize` and the frontend uses
`react`/`redux`.

## Setup

* Create two postgres databases

```
createdb kirby
createdb kirby-test
```

* run databases

```
npm run seed
```

Running `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

From there, just follow your bliss.
