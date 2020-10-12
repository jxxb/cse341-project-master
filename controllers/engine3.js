const response = require('express');
const http = require('https');
let jsTest;
function json(req,res) {
let url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';

http.get(url, function(response) {
   let body = "";

response.on("data",function (responseData) {
   body += responseData;
});
 response.on("end", function () {
   let jsonRes = JSON.parse(body);
   items = {data: jsTest,
      path: 'team/ta03',
      title: 'Week 3 Team Activity',
      searchedValue: ''
   }
   res.render('pages/team/ta03', items);
 });
})
.on('error',function(err){
   console.log ("Error: ", err);
});

}

module.exports = { json: json, jsonRes: jsTest};