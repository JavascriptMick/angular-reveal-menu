angular-reveal-menu
===================

Angular directive that allows you to create a dynamic and customised menu for your reveal.js presentation


###dependencies:
```
jquery
angularjs
reveal.js
```

###Usage
* Include the module file in your index.html file:
```html
<!-- dependencies -->
<script src="js/reveal.min.js"></script>
<script src="js/jquery.min.js"></script>
<script src="js/angular.js"></script>

<!-- angular-reveal-menu -->
<script src="js/RevealMenuModule.js"></script>

<!-- Your own app -->
<script src="js/myApp.js"></script>
```

* Build your slides as normal but add data- attributes to the slides (these will become available on the section for binding):
```html
<section id="relearn" data-majortitle="This is my major title" data-subtitle="I would like to put additional info here">
    <img src="img/mybigpicture.jpg"/>
    <p>
        I don't need a heading in the slide body because the menu can handle that for me.
    </p>
</section>
```

* Add RevealMenuModule module as a dependency to you main app module:
```javascript
var app = angular.module('myapp', ['RevealMenuModule']);
```

* Build your menu
```html
<div ng-app="myapp" revealmenu>
    <div ng-repeat="section in sections" ng-class="{highlight: section.isActive}">
        <a ng-href="#/{{section.id}}">{{section.majortitle}}</a>
    </div>
    <h3>{{currentSection.majortitle}} {{currentSection.subtitle}}</h3>
</div>

```

###Author
---
####Michael Dausmann

- [https://github.com/mdausmann](https://github.com/mdausmann)
- [https://twitter.com/MichaelDausmann](https://twitter.com/MichaelDausmann)

