#!/usr/bin/env python

import sys
import os
import os.path
import subprocess
import shutil
import re
from optparse import OptionParser


LOADED = {}


def main():
    name = sys.argv[0]
    usage = """\t%s init
\t%s build MODULE_NAME_1 [MODULE_NAME_1 ...] [-o OUTPUT_BASE_NAME]""" % (name, name)
    parser = OptionParser(usage=usage, version="%prog 0.1")
    parser.add_option("-o", "--output", dest="output",
                      help="Save output to OUTPUT_BASE_NAME", metavar="OUTPUT_BASE_NAME")
    options, input_modules = parser.parse_args()

    argc = len(sys.argv)

    if argc < 3:
        print parser.format_help()
        exit(1)

    command = input_modules[0]
    input_modules = input_modules[1:]

    dirname = os.path.dirname(__file__)

    if options.output:
        output_basename = options.output
    else:
        output_basename = '%s.build' % input_modules[0]

    output = open('%s.js' % output_basename, 'w');
    include("modularjs", output)
    for input_module in input_modules:
        include(input_module, output)
    output.close()

    jar = os.path.join(dirname, 'lib', 'yuicompressor-2.4.2.jar')
    output = open('%s.compressed.js' % output_basename, 'w');
    p = subprocess.Popen(['java', '-jar', jar, '%s.js' % output_basename],
                         stdout=output)
    output.close()


_INCLUDE_REGEX = re.compile(r"""^(\s*)include\(['"](.*)['"]\);$""")

def include(module, output, indent=""):
    """ Process one module and writes to output """

    if module in LOADED:
        return

    for line in open(filename(module)).readlines():
        include_module = _INCLUDE_REGEX.match(line)

        if include_module:
            include(include_module.group(2), output, indent + include_module.group(1))
        else:
            output.write(indent + line)

    output.write('\nmodularjs.loaded["%s"] = true;\n\n' % module)
    LOADED[module] = True
    print "Module %s loaded" % module


def filename(module):
    """
    This function should be equivalent to the javascript function modularjs.filename
    """

    return module.replace('.', os.sep) + '.js'


if __name__ == '__main__':
    try:
        import psyco
        psyco.full()
    except ImportError:
        pass

    main();
