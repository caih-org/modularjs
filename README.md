modularjs: JavaScript Automatic Build System
============================================

See `modularjs.js` for instructions on how to use modularjs in your javascript source code.

To create a build execute:

```
modularjs build ModuleName
```

in the directory where your module is located.

[Test Suite](http://cdn.rawgit.com/cesarizu/modularjs/master/test/index.html)

Features
========

Divide your code in modules
---------------------------

Create a file and it's a module. Every javascript file is a module.

Include javascript modules from javascript
------------------------------------------

Easily import other modules from any module with just one function call.

Compile your javascript modules
-------------------------------

Create a compilation of all the modules used by your web application in a single file.

Compress your compilation
-------------------------

You can even compress the javascript in this file to save bandwidth and time.

Introduction
============

Modular js alows you to program your javascript code in modules and define dependencies between this modules. It contains a runtime syncrhonous ajax based dependency loader and a python based compiler.

Using javascript only
---------------------

First create an `index.html` file with the following content:

```
<html>
<head>
    <title>My website</title>
    <script type="text/javascript" src="include.js?myscript"></script>
</head>
<body>
<h1>My website</h1>
</body>
</html>
```

Copy the `include.js` to the same directory where you have `index.html`. Then create a file named `myscript.js` in the same directory.

```
alert("This is my script");
```

Open index.html on your favorite webbrowser. Include js then will load your js file and a alert dialog will show up.

Then create a file called `dependency.js` in the same directory.

```
alert("This is a dependency");
```

And edit your `myscript.js` file so it looks like this:

```
alert("This is my script");
include("dependency");
alert("Dependency included!");
```

Reload `index.html` in your web browser and you should get now 3 alert dialogs in this order: "This is my script", "This is a dependency", "Dependency included!"

Using the python build system
-----------------------------

If you install the python package, then you can do something like:

```
cd my_website
modularjs init
```

This will copy the include.js to the current directory. Then after you've built your application you can execute:

```
modularjs build myscript
```

This will output the following:

```
Module include loaded
Module dependency loaded
Module myscript loaded
Wrote myscript.build.js
Wrote myscript.build.compressed.js
```

`myscript.build.js` will contain all files already loaded. `myscript.build.compressed.js` is a compressed version using the yui compressor that you can find at http://developer.yahoo.com/yui/compressor/ .

Functions
---------
*`include(module)`*: Alias to `modularjs.include`. Loads and executes a javascript file inmediately. Paths are relative to where the `include.js` file is located. Examples:

```
include("moduleA"); //This will include a file name moduleA.js
include("package1.moduleB"); //This will include a file name package1/moduleB.js
```

