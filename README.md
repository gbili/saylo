# Nomonichas
![travis build](https://img.shields.io/travis/gbili/nomonichas.svg?style=flat-square)
![code coverage](https://img.shields.io/codecov/c/github/gbili/nomonichas.svg)
![version](https://img.shields.io/npm/v/nomonichas.svg)
![downloads](https://img.shields.io/npm/dm/nomonichas.svg)
![license](https://img.shields.io/npm/l/nomonichas.svg)

> A working base setup in July 2019 using Nodejs, Mocha, Nyc, Istanbul, Chai, Semantic-Release, Travis-ci and Codecov.io

> **Note**: About Travis and Codecov.io, if you are developming a private project, it may make sense to switch to other services like CircleCi and something to replace codecov.io if you are on a tight budget.

> **Note 2**: About Codecov.io, you should not be putting the codecov tokens in `package.json` as in this repo. Here I'm exposing private tokens which is really dangerous. I should really change this to use `.env` file.

## Usage
Create a repo on github.com / bitbucket.com and use that name in place of `your-project-name`.
Clone this repo into your computer
```
$ git clone git@github.com:gbili/nomonichas your-project-name
$ git remote remove origin
$ git remote add origin git@github.com:your-name/your-project-name
```

Then change the name.
```
vim package.json
:.,$s/nomonichas/your-project-name/g <enter>
:.,$s/gbili/your-name/g <enter>
:wq
```

Adapt the code in `src/` and `test/`

Then initialize and build
```
npm init
npm install
npm run build
```

Finally make commit and push changes
```
git commit -Am "feat: setup base project"
git push origin master
```
