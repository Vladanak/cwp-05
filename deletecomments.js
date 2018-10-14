const log = require("./log.js");
const file = require("fs").createWriteStream("log.txt");
const valid = require("./valid.js");
let articles = require("./article.json");

const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.deleteComment = function(req, res, payload, cb)
{
    if (valid.valid(req.url, payload) === true)
    {
        let index, indexOfComment;
        if ((index = articles.findIndex(i => i.id == payload.articleId)) != -1 &&
            (indexOfComment = articles[index].comments.findIndex(i => i.id == payload.id)) != -1)
        {
            let delComm = articles[index].comments[indexOfComment];
            articles[index].comments.splice(indexOfComment, 1);
            //log.log(file, req.url, payload);
            cb(null, delComm);
        }
        else { cb(ErrorObject); }
    }
    else { cb(ErrorObject); }
};