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


