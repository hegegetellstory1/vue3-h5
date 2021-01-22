const configureWebpack = require("./configureWebpack");
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: "",
  runtimeCompiler: true,
  productionSourceMap: !isProduction,
  lintOnSave: true,
  // 如果开发环境，注释掉代理
  devServer: {
    host: "localhost",
    port: 8080,
    //如果访问local  再把代理打开
    proxy: {
      "/api": {
        // target: 'http://59.110.228.107:8020',
        target: "http://139.9.115.157:8020",
        // target:'https://m-admin-int.bmw-emall.cn/api',
        changeOrigin: true,
        pathRewrite: {
          "^/api": "" //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        }
      }
    }
  },
  css: {
    // 是否使用css分离插件，要不然release版css不单独生成文件
    extract: true
  },
  configureWebpack
};
