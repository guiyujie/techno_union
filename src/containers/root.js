/**
 * 统一入口文件
 */

let exported;

if (process.env.NODE_ENV === 'production') {
  exported = require('./root.prod');
} else {
  exported = require('./root.dev');
}

export default exported;
