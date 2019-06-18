# Nodess (Node Simplest Setup)

This is a skeleton for developing Nodejs projects with:
- testing (Mocha and Chai)
- ES6 support (babel)
- nodemon for automatic reloading

## Usage 
### "Installation"
First off get it on your machine:
1. clone the repo and replace `my-project-name` with yours:
   ```bash
   git clone git@github.com:gbili/nodess my-project-name
   ```
2. `cd my-project-name` and edit `package.json`, mainly the `"name":` and `author`
   - Optionally and add your own dependencies
   - Update `package-lock.json` by init and accepting defaults:
     ```
     npm init
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Make sure everything works (following command should say 1 fail an 1 sucess:
     ```
     npm test
     ```
3. change the git `remote` to point to your own repo (that you have created in advance):
   ```
   git remote remove origin
   git remote add origin git@github.com:myname/my-project-name
   ```
4. commit and upload those inital changes
   ```
   git commit -am "build: change project purpose"
   ```
### Development
Start coding:
- start the `development` server
  ```
  npm develop
  ```
- from there you can add your own files and strucutre in `src/`

### Testing
- Add your own tests in the `./tests/*`, and run them with:
  ```
  npm tests
  ```
### Production
- Build your sourcecode to transpile ES6 into ES5:
  ```
  npm build
  ```
- Upload it to your server and serve it:
  ```
  npm serve
  ```

## Acknowledgements
Many thanks to these guys:
- https://dev.to/bnorbertjs/my-nodejs-setup-mocha--chai-babel7-es6-43ei
- http://karloespiritu.github.io/cheatsheets/babel/
- https://medium.com/@alberto.schiabel/nodejs-in-es6-es7-how-do-you-do-it-in-production-d897c51c729c
- https://codeburst.io/javascript-unit-testing-using-mocha-and-chai-1d97d9f18e71
- https://flaviocopes.com/node-difference-dev-prod/
