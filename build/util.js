const path = require('path');
const copy = require('copy-concurrently');
// 项目工程根目录
const ROOT = path.join(__dirname, '../');
copy(path.join(ROOT, '/utils'), path.join(ROOT, '/lib/utils'));
copy(path.join(ROOT, '/theme'), path.join(ROOT, '/lib/theme'));
copy(path.join(ROOT, '/packages'), path.join(ROOT, '/lib/packages'));
