const path = require('node:path')

const createViewPage = (page) => {
    return path.resolve(__dirname, "../views",  `${page}.hbs`);
}
 
module.exports = {createViewPage}