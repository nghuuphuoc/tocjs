# TocJS

TocJS is a jQuery plugin for generating table of contents based on headings.

## Demo

* [Sample demo](https://rawgithub.com/nghuuphuoc/tocjs/master/demo/sample.html)
* [Style with Bootstrap](https://rawgithub.com/nghuuphuoc/tocjs/master/demo/style.html)
* [Scroll automatically](https://rawgithub.com/nghuuphuoc/tocjs/master/demo/scroll.html)

## Features

* Generate anchor link for heading
* Automatically scroll to with the help of [Bootstrap ScrollSpy](http://getbootstrap.com/javascript/#scrollspy) plugin
* Easy to customize look and feel

## Documentation

By default, TocJS generates a table of contents based on the headings (```h1``` to ```h6```) found on page.

In order to use this plugin:

* Insert ```toc.js``` to your page, ensure that it is placed after jQuery:

```html
<script type="text/javascript" src="path/to/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="path/to/toc.js"></script>
```

* Call the plugin when the document is ready:

```javascript
<script type="text/javascript">
$(document).ready(function() {
    $('element selector').toc();
});
</script>
```

The plugin provides the following options (in the format of ```name``` (type): ```default value```):

Name            | Type   | Default                | Description
----------------|--------|------------------------|------------
selector        | string | h1, h2, h3, h4, h5, h6 | Indicates which elements will be found and included in the table of contents
elementClass    | string | toc                    | The CSS class which will be added to root element
rootUlClass     | string | toc-ul-root            | The CSS class which will be added to the root generated ```ul``` element
ulClass         | string | toc-ul                 | The CSS class which will be added to all generated ```ul``` elements (including the root and sub ones)
prefixLinkClass | string | toc-link-              | This option will be added as a prefix to CSS class of all generated ```a``` elements. The suffix is level of associating heading (1 to 6)
heading         | string | null                   | The _Table of Contents_ heading label placed at the top. This heading is not shown by default.

## Author

* [phuoc@huuphuoc.me](mailto: phuoc@huuphuoc.me)
* [@nghuuphuoc](http://twitter.com/nghuuphuoc)

## License

Copyright (c) 2013 Nguyen Huu Phuoc

TocJS is licensed under the MIT license.
