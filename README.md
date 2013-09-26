# TocJS

TocJS is a jQuery plugin for generating table of contents based on headings.

## Demo

* [Sample demo](https://rawgithub.com/nghuuphuoc/tocjs/master/demo/sample.html)
* [Style with Bootstrap](https://rawgithub.com/nghuuphuoc/tocjs/master/demo/style.html)
* [Scroll automatically](https://rawgithub.com/nghuuphuoc/tocjs/master/demo/scroll.html)

## Documentation

By default, TocJS generates a table of contents based on the headings (```h1``` to ```h6```) found on page.

In order to use this plugin:

* Insert ```toc.js``` to your page, ensure that it is placed after jQuery:

```html
<script type="text/javascript" src="../vendor/jquery/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="../src/toc.js"></script>
```

* Place the element on page for showing the table of content:

```html
<!DOCTYPE html>
<html>
<head>
    ...
</head>
<body>
    ...
    <div id="toc"></div>
    ...
</body>
</html>
```

* Call the plugin with default options when the document is ready:

```javascript
<script type="text/javascript">
$(document).ready(function() {
    $('element selector').toc();
});
</script>
```

The plugin provides the following options (in the format of ```name``` (type): ```default value```):

* ```selector``` (String): ```h1, h2, h3, h4, h5, h6```

This option indicates which elements will be found and included in the table of contents.

* ```elementClass``` (String): ```toc```

The CSS class which will be added to root element

* ```rootUlClass``` (String): ```toc-ul-root```

The CSS class which will be added to the root generated ```ul``` element

* ```ulClass``` (String): ```toc-ul```

The CSS class which will be added to all generated ```ul``` elements (including the root and sub ones)

* ```prefixLinkClass``` (String): ```toc-link-```

This option will be added as a prefix to CSS class of all generated ```a``` elements.
The suffix is level of associating heading (__1__ to __6__)

* ```heading``` (String): ```null```

The _Table of Contents_ heading label placed at the top. This heading is not shown by default.

## Author

TocJS is licensed under MIT license.

Copyright (c) 2013 Nguyen Huu Phuoc

* [phuoc@huuphuoc.me](mailto: phuoc@huuphuoc.me)
* [@nghuuphuoc](http://twitter.com/nghuuphuoc)
