const log = require("./log.js");
const file = require("fs").createWriteStream("log.txt");
const valid = require("./valid.js");
let articles = require("./article.json");

const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.read = function(req, res, payload, cb)
{
    //log.log(file, req.url, JSON.stringify(payload));
    if (valid.valid(req.url, payload) === true)
    {
        let id = payload.id;
        let article = {};
        articles.forEach(element =>
        {
            if (element.id === id) { article = element; }
        });
        cb(null, article);
    }
    else { cb(ErrorObject); }
};