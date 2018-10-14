const log = require("./log.js");
const file = require("fs").createWriteStream("log.txt");
const valid = require("./valid.js");
let articles = require("./article.json");

const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.createArticle = function(req, res, payload, cb)
{
    if (valid.valid(req.url, payload) === true)
    {
        payload.id = articles[articles.length - 1].id + 1;
        articles.push(payload);
        //log.log(file, req.url, JSON.stringify(payload));
        cb(null, payload);
    }
    else { cb(ErrorObject); }
};