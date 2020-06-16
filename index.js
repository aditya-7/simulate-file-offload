var FormData = require('form-data');
var fs = require('fs');
const md5File = require('md5-file')
const path = require("path");

function upload(filepath) {
    md5File(filepath).then((hash) => {
        var form = new FormData();
        form.append('chunk_checksum', hash);
        form.append('file_checksum', hash);
        form.append('current_part', 1);
        form.append('total_parts', 1);
        form.append('offload_type', 'MANUAL');
        form.append('file', fs.createReadStream(filepath));
        form.submit('http://20.40.0.142/gas-file-offload/gas/v1/logs/', function (err, res) {
            console.log("error", err);
            console.log("result", res.statusCode);
        });
    });
}

upload("./files/DECEMBER/2/MANUAL_OFFLOAD_2019-12-02T04_30_00.tgz");