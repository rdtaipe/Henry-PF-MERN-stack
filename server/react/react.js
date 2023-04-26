import axios from 'axios';
import fs from 'fs';
import cheerio from 'cheerio';
import path from 'path';

export default function React() {

    var root = fs.readFileSync(path.resolve('./react/App/App.js'), 'utf8');
    const HTML = fs.readFileSync(path.resolve('./react/index.html'), 'utf8');

    const $ = cheerio.load(HTML);

    // if root conatin return (jsx) then replace it with root
    if (root.includes('return')) {

        const init = root.indexOf("return")
        const end = root.indexOf("}", init);
        var ret = root.substring(init, end);
        ret = ret.replace('(', '(`')
        ret = ret.replace(')', '`)')
        ret = ret.replace('return', 'root = ')
        root = root.replace(root.substring(init, end), ret);
    }

    $('#root').empty();
    $('#root').append(root);

    fs.writeFileSync(path.resolve('./react/index.html'), $.html(), 'utf8');

    return "root";

}
