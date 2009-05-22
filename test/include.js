/**
 * modularjs: A modular javascript system 
 *
 * How to use:
 *
 * 1. Add to head:
 *      <script type="text/javascript"
 *              src="include.js?somepackage.SomeModule1,somepackage.SomeModule2">
 *      </script>
 *
 * 2. And anywhere in your js files:
 *      include("somepackage.SomeOtherModule");
 *
 * Modules are loaded from [package]/[subpackage]/[ModuleName].js files.
 *
 * See the README file to learn how to compile your modules into a single
 * compressed file.
 *
 * http://modularjs.googlecode.com
 */
var modularjs = {

    basePath: null,

    loaded: {},

    /**
     * Inits the modularjs system.
     */
    init: function () {
        /*globals ActiveXObject */

        if (typeof XMLHttpRequest != "undefined") {
            modularjs.xhr = new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined") {
            modularjs.xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            throw new Error("XMLHttpRequest not supported");
        }

        var head = document.getElementsByTagName("head")[0];
        var scripts = head.getElementsByTagName("script");

        for (var i = 0; i < scripts.length; i++) {
            var src = scripts[i].src;
            if (src.match(/.*include\.js.*/)) {
                var parts = src.split(/\?/);
                modularjs.basePath = parts[0].replace(/include\.js.*/, '');
                if (parts.length > 1) {
                    parts = parts[1].split(",");
                    for (var j = 0; j < parts.length; j++) {
                        modularjs.include(parts[j]);
                    }
                }
            }
        }
    },

    /**
     * Includes a module. Only absolute includes.
     * It's aliased to the global function 'include'.
     *
     * @param module {string} The module name
     */
    include: function (module) {
        if (!module) {
            throw new Error("Invalid module name: " + module);
        }

        if (modularjs.loaded[module]) return;

        var filename = modularjs.filename(module);

        modularjs.xhr.open("get", filename, false);
        modularjs.xhr.send(null);

        var contents = modularjs.xhr.responseText + "\r\n//@ sourceURL=" + filename;

        try {
            if (window.execScript) {
                window.execScript(contents);
            } else {
                with (window) {
                    window.eval(contents);
                }
            }
        } catch(e) {
            if (typeof console != "undefined") {
                console.log("Error importing module", module, e);
            }
        }

        modularjs.loaded[module] = true;
    },

    /**
     * Returns the best filename that corresponds to a module.
     *
     * @param module {string} The module name
     * @returns The module filename
     */
    filename: function (module) {
        var filename = null;

        filename = module + ".build.compressed.js";
        if (modularjs.fileExists(filename)) {
            return filename;
        }

        filename = module + ".build.js";
        if (modularjs.fileExists(filename)) {
            return filename;
        }

        filename = module.replace(/\./g, "/") + ".js";
        if (modularjs.fileExists(filename)) {
            return filename;
        }

        throw new Error("Module " + module + " not found.");
    },

    /**
     * Checks for file existence
     *
     * @param filename {string} With the filename
     * @returns The module filename
     */
    fileExists: function (filename) {
        try {
            modularjs.xhr.open("head", modularjs.basePath + filename, false);
            modularjs.xhr.send(null);
            return modularjs.xhr.status == 0;
        } catch(e) {
            return false;
        }
    }

};

var include = modularjs.include;

if (typeof __build__ == "undefined") {
	modularjs.init();
}

