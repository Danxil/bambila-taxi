var mkdirps = require("mkdirps");
var directories = require("../config/directories");

module.exports = {
    //createDirectory: createDirectory,
    createInMediaDirectory : createInMediaDirectory
};

function createDirectory( dirs, callback ){
    mkdirps( dirs, function (err) {
        callback( err );
    });
}


function createInMediaDirectory( type, uploadedFiles, index, callback ){
    var oldName =       uploadedFiles[ index ].fd;
    var oldNameSplit =  oldName.split("/");
    var newName =       oldNameSplit[ oldNameSplit.length - 1 ];
    var newNameLength = newName.split("-").length;
    var dirs =          [ directories.rootDir, directories[type + "s"]() ];//photos or documents

    for( var j = 0; j < 1; j++ ){//dir level  1 <= 4
        if ( j !== newNameLength - 1 ){
            dirs.push( dirs[dirs.length - 1] + "/" + newName.split("-")[j] );
        }
    }

    newName = dirs[ dirs.length - 1 ] + "/" +  newName;

    createDirectory( dirs, function( err ){
        return callback( err, oldName, newName );
    });
}