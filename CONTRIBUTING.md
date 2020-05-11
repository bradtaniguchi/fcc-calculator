# Contributing

This project follows the same Code of Conduct as the [FreeCodeCamp Code of Conduct](https://www.freecodecamp.org/news/code-of-conduct/).

## Contributing Process

- If you find a bug with this please create an issue under [issues](https://github.com/bradtaniguchi/fcc-calculator/issues)
- If you want to suggest an enhancement or feature, create an issue under [issues](https://github.com/bradtaniguchi/fcc-calculator/issues)
- If you want to fix/solve/add a feature yourself create an issue beforehand before starting on creating a PR. This way we can track and discuss any work being made.

## Developing locally

Your system must have the following prerequisites:

- node@12.x (LTS release)
  - you can also use `nvm` with just `nvm use`
- [@angular/cli](https://www.npmjs.com/package/@angular/cli)@9 installed globally to run/build/test
  - install globally with `npm install -g @angular/cli`
- run `npm install` to install all dependencies, this may take a few moments.

**note** you can get help from any npm script command by passing `-- --help`.
For example:

```bash
npm run start -- --help
```

will print out all the potential flags and features that can be activated.

### Run the app locally

To run the app locally just run:

```bash
npm run start
```

and go to `localhost:4200`.

### Running unit tests:

To run all unit tests, run:

```bash
npm run test
```

This will start up [jest](https://jestjs.io/), to keep jest open and watch for changes,
run:

```bash
npm run test -- --watch
```

### Running e2e tests:

To run all e2e testing run:

```bash
npm run e2e
```

This will open up a [cypress](https://www.cypress.io/) window and run all the e2e tests.

## Automated testing

This repo uses github actions to test code **once a PR is open**. This may change in the future, as
github action integration is still somewhat "experimental". (if you have any tips on improve it, please mention it by opening an issue ;D)
