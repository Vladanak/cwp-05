const log = require("./log.js")
const file = require("fs").createWriteStream("log.txt");
const valid = require("./valid.js")
let articles = require("./article.json");
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.createComment = function(req, res, payload, cb) {
    if (valid.valid(req.url, payload) == true) {
        let ind = articles.findIndex(i => i.id == payload.articleId);
        if (ind != -1) {
            if (articles[ind].comments.length != 0) {
                payload.id = articles[ind].comments[articles[ind].comments.length - 1].id + 1
            } else {
                payload.id = 0;
            }
            articles[ind].comments.push(payload);
            //log.log(file, req.url, payload);
            cb(null, payload);
        } else {
            cb(ErrorObject);
        }
    } else {
        cb(ErrorObject);
    }
}