
alert("This is the main file. Before include");

include("Dependency");
include("somepackage.Dependency");
include("somepackage.Dependency");

alert("This is the main file. After include");
