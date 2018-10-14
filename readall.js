const log = require("./log.js");
const file = require("fs").createWriteStream("log.txt");
let articles = require("./article.json");

module.exports.readAll = function(req, res, payload, cb)
{
    log.log(file, req.url, JSON.stringify(payload));
    cb(null, articles);
}