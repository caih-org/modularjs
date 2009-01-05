#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
modularjs: A modular javascript system

modularjs allows you to divide your javascript code into modules and import them from your webpages. You can also compile this modules in one, compressed, javascript file.
"""

from distutils.core import setup

try:
    # Just for development to be able to do sudo python setup.py develop
    import py2app
except ImportError:
    pass

_classifiers = """\
Development Status :: 4 - Beta
Intended Audience :: Developers
License :: OSI Approved :: GNU General Public License (GPL)
Programming Language :: Python
Operating System :: POSIX
"""

doclines = __doc__.strip().splitlines()

setup(name='modularjs',
      version='0.1',
      entry_points={'console_scripts': ['modularjs = modularjs:main']},
      maintainer='César Izurieta',
      maintainer_email='cesar@caih.org',
      url='http://modularjs.googlecode.com/',
      license='http://www.gnu.org/copyleft/gpl.html',
      platforms=['unix', 'linux', 'mac', 'win32'],
      description=doclines[0],
      classifiers=filter(None, _classifiers.splitlines()),
      long_description='\n'.join(doclines[2:])
)
