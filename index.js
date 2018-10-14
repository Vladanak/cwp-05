const http = require("http");
const fs = require("fs");
const log = require("./log.js")
const readall = require("./readall.js");
const read = require("./read.js");
const updateArticle = require("./updatearticle.js");
const createArticle = require("./createarticle.js");
const deleteArticle = require(".//deletearticle.js")
const createComment = require("./createcomment");
const deleteComment = require("./deletecomments");
const f = require("fs").createWriteStream("log.txt");
const articles = require("./article.json");
const hostname = "localhost";
const port = 3000;

const handlers =
    {
    '/sum': sum,
    '/api/articles/readall': readall.readAll,
    '/api/articles/read': read.read,
    '/api/articles/update': updateArticle.updateArticle,
    '/api/articles/create': createArticle.createArticle,
    '/api/articles/delete': deleteArticle.deleteArticle,
    '/api/comments/create': createComment.createComment,
    '/api/comments/delete': deleteComment.deleteComment
    };

const server = http.createServer((req, res) =>
{
    parseBodyJson(req, (err, payload) =>
    {
        const handler = getHandler(req.url);

        handler(req, res, payload, (err, result) =>
        {
            if (err)
            {
                res.statusCode = err.code;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(err));
                log.log(f, req.url, JSON.stringify(err));
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            log.log(f, req.url, JSON.stringify(payload));
            changeArticles();
            res.end(JSON.stringify(result));
        })
    });
});

server.listen(port, hostname, () => { console.log(`Server running at http://${hostname}:${port}/`); });

function changeArticles()
{
    const file = fs.createWriteStream('article.json');
    file.write(JSON.stringify(articles));
}

function sum(req, res, payload, cb)
{
    const result = { c: payload.a + payload.b };
    cb(null, result);
}

function getHandler(url) { return handlers[url] || notFound }

function notFound(req, res, payload, cb) { cb({ code: 404, message: 'Not found' }); }

function parseBodyJson(req, cb)
{
    let body = [];
    req.on('data', function(chunk)
    {
        body.push(chunk);
    }).on('end', function()
    {
        body = Buffer.concat(body).toString();
        let params;
        if (body !== "") { params = JSON.parse(body); }
        cb(null, params);
    });
}