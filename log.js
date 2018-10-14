module.exports.log = function(file, url, data) {
    const curDate = new Date();
    file.write(`\nDate: ${curDate.getDay()}.${curDate.getMonth() + 1}.${curDate.getFullYear()} ${curDate.getHours()}:${curDate.getMinutes()}:${curDate.getSeconds()}
    \tUrl: ${url}
    \tData: ${data}\n`);
}