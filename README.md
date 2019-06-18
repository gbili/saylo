# Nodess (Node Simplest Setup)

This is a skeleton for developing Nodejs projects with:
- testing (Mocha and Chai)
- ES6 support (babel)
- nodemon for automatic reloading

## Usage 
### "Installation"
First off get it on your machine:
- clone the repo, and edit `package.json`
- delete upstream reference or delete `.git` and re-init git repo
- change package name if you like

### Development
Start coding:
- start the `development` server
  ```
  npm run develop
  ```
- from there you can add your own files and strucutre in `src/`

### Testing
- Add your own tests in the `./tests/*`, and run them with:
  ```
  npm run tests
  ```
### Production
- Build your sourcecode to transpile ES6 into ES5:
  ```
  npm run build
  ```
- Upload it to your server and serve it:
  ```
  npm run serve
  ```

## Acknowledgements
Many thanks to these guys:
- https://dev.to/bnorbertjs/my-nodejs-setup-mocha--chai-babel7-es6-43ei
- http://karloespiritu.github.io/cheatsheets/babel/
- https://medium.com/@alberto.schiabel/nodejs-in-es6-es7-how-do-you-do-it-in-production-d897c51c729c
- https://codeburst.io/javascript-unit-testing-using-mocha-and-chai-1d97d9f18e71
- https://flaviocopes.com/node-difference-dev-prod/
