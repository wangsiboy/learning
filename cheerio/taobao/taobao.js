
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
};

var cheerio = require("cheerio");

 
var url = "http://v.163.com/special/opencourse/englishs1.html"
 
download(url, function(data) {
  if (data) {
    //console.log(data);
 
    var $ = cheerio.load(data);
    $("a.downbtn").each(function(i, e) {
        console.log($(e).attr("href"));
    });
 
    console.log("done");
  } else {
      console.log("error");
  } 
});