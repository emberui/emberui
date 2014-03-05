var fs = require('fs');

// Get author information from STDIN
var author_number = parseInt(process.argv[2],10);
var author_count = parseInt(process.argv[3],10);

// Load the package JSON
var package_path = "../package.json";
var package_config = require(package_path);
var former_version = package_config["version"];

// Update the package information to the next 
var version_array = former_version.split(".");
var point_version = parseInt(version_array[version_array.length-1], 10);
var new_point_version = point_version +(author_count - (point_version % author_count)) + (author_number - 1);
process.stdout.write(new_point_version.toString());
version_array[version_array.length-1] = new_point_version;
package_config["version"] = version_array.join(".");

// Save the package information for the upcoming version to file
fs.writeFile(package_path, JSON.stringify(package_config, null, 2), function(err) {
    if(err) {
      process.stdout.write(err);
    } else {
      process.stdout.write("JSON saved to " + package_path);
    }
}); 
