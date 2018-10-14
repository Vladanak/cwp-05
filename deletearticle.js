const log = require("./log.js")
const file = require("fs").createWriteStream("log.txt");
let articles = require("./article.json");
const valid = require("./valid.js")
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.deleteArticle = function deleteArticle(req, res, payload, cb) {
    if (valid.valid(req.url, payload) == true) {
        let ind = articles.findIndex(i => i.id == payload.id);
        if (ind != -1) {
            let delArt = articles[ind];
            articles.splice(ind, 1);
            //log.log(file, req.url, payload);
            cb(null, delArt);
        } else {
            cb(ErrorObject);
        }
    } else {
        cb(ErrorObject);
    }
}