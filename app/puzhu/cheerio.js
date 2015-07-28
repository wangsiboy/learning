var http = require("http");
  
// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

var cheerio = require("cheerio");

var url  = "http://api.futu5.com/ad/get-ad/?user_id=198072&web_session_key=HBlXZZTMori4IjlUmDejitx+/kfYlZGZXE7NWKj/xGLSwLey9DxiMzwumdWXH4pfdoPVaEzHZqz6CB9HhZ5LSTvtIaCo4+4Eo/o9iiur9o027Mh9atlRmmKY7NgURVws&client_type=pc&lang=cn&client_token=A90129CA97EE3D5BCA2408FEE4DF41BE";

download(url, function(data) {
  if (data) {
    console.log(data);
  
    var $ = cheerio.load(data);
    $("a.downbtn").each(function(i, e) {
        console.log($(e).attr("href"));
    });
  
    console.log("done");
  } else {
      console.log("error");
  } 
});