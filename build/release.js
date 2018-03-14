const fs = require('fs-extra');
let path = require('path');

try {
    fs.copySync(path.resolve(__dirname, '../dist'), "E:/ST_dev/dist/techno_union");
    console.log('release to E:/ST_dev/dist/techno_union success!')
} catch (err) {
    console.error(err)
}

