# Mostachito
![travis build](https://img.shields.io/travis/gbili/mostachito.svg?style=flat-square)
![code coverage](https://img.shields.io/codecov/c/github/gbili/mostachito.svg)
![version](https://img.shields.io/npm/v/mostachito.svg)
![downloads](https://img.shields.io/npm/dm/mostachito.svg)
![license](https://img.shields.io/npm/l/mostachito.svg)

> **Disclaimer**: a very simplistic templating engine.

## Usage
### Syntax
- Template references: 
  - Simple `{{ myVar }}`
  - Nested data `{{ my.var.is.nested }}`
  - Iterable
    ```
    {{posts as post
      The post with name: {{ post.title }}, was created on {{ post.date }}!
    posts}}
    ```
- Passing the template and data to the template engine
  ```javascript
  import Mostachito from 'mostachio';
  const te = new Mostachito();

  const myText = 'Hello {{ my.data.is.deep }}, how are you ?';
  const data = { my : { data : { is : { deep : 'Liz' } } } };

  const replacedText = te.replace(myText, data);
  console.log(replacedText);// "Hello Liz, how are you ?"
  ```

## Example

Create a view like so:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ siteTitle }}</title>
    <meta name="description" content="Simplest Blog in Nodejs">
    <meta name="author" content="George Mostachito">
    <link rel="stylesheet" href="css/styles.css?v=1.0">
    <link rel="stylesheet" href="css/highlight-js-github.css">
  </head>

  <body>
    <h1>{{ siteTitle }}</h1>
    <h2>{{ missingRef }}, {{ hey.missingRef }}, {{ hey.hoy.missingRef }}</h2>
    <ul>
      {{posts as post
      <li><a href="/{{ post.attributes.slug }}">{{ post.attributes.title }}</a><div class="post-preview">{{ post.body }}</div></li>
      posts}}
    </ul>
  </body>
</html>
```

Import the contents and replace:
```javascript
  import Mostachito from 'mostachio';

  function loadViewTemplate(viewData) {
    return new Promise(function(resolve, reject) {
      fs.readFile('path/to/my/template.html', 'utf-8', function(err, viewTemplate) {
        if (err) return reject(err);
        resolve({viewTemplate, viewData});
      });
    });
  }

  function hydrateView({viewTemplate, viewData}) {
    const configViewData = this.config.viewData || {};
    viewData = {...configViewData, ...viewData};
    const mostachito = new Mostachito(this.config.missingRefValueReplacement);
    const hydratedView = mostachito.hydrate(viewTemplate, viewData);
    this.response.code = 200;
    this.response.headers = {'content-type': 'text/html; charset=utf-8'};
    this.response.body = hydratedView;
    return this.response;
  }

  loadViewTemplate({my: 'viewData'}, that: 'I want to pass', arr: ['a', 'b', 'c', 'd'])
   .then(hydrateView)
   .catch(err => console.log(err));
```
