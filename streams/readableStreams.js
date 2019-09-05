const fs = require('fs');
const http = require('http');
//const stream = require('stream');

const radio1_url = 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio1_mf_p';
const dataType = 'audio/mpeg';


http.get(radio1_url, (res) => {
  var fileToSave = fs.createWriteStream('./downloadedRadio.mpeg');

  const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (contentType != dataType) {
      error = new Error('Invalid content-type.\n' +
                        `Expected audio/mpeg but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // consume response data to free up memory
      res.resume();
      return;
    }

    res.pipe(fileToSave);
    res.on('end',()=>{
      console.log("finihsed receiving data");
    });
});
