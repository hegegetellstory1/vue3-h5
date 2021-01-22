const CompressionWebpackPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";

/**
 * 问题描述：运行npm run serve编译完打包的时候报错
 * 问题原因：webpack的热加载插件不支持chunkhash和contenthash
 * 解决方案：非开发环境再增加contenthash
 */
let output = {};
if (process.env.NODE_ENV !== "development") {
  output = {
    chunkFilename: "./js/[name].[contenthash:8].js",
    filename: "./js/[name].[contenthash:8].js"
  };
}

const plugins = [];
if (isProduction) {
  // 生产环境再添加gzip压缩文件
  plugins.push(
    new CompressionWebpackPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp("\\.(" + ["html", "js", "css"].join("|") + ")$"),
      threshold: 10240, // 只有大小大于该值的资源会被处理 10240
      minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      deleteOriginalAssets: false // 删除原文件
    })
  );
} else {
  // 非生产环境打包需要处理版本号
  plugins.push(function() {
    // 修改version.json中的build号
    this.plugin("done", function() {
      // 如果是生产环境，不需要显示build，所以不对build号进行处理
      // 如果是开发环境，修改了package.json会自动重新编译(热加载)，又会执行这个方法，这样会陷入死循环
      if (isProduction || process.env.NODE_ENV === "development") {
        return;
      }

      const path = require("path");
      const fs = require("fs");

      let versionObj = {};
      const filePath = path.join(__dirname, "./version.json");
      if (fs.existsSync(filePath)) {
        versionObj = JSON.parse(fs.readFileSync(filePath));
      }
      // 是否存在build
      if (!versionObj.build) {
        versionObj.build = "";
      }
      const dataFormat = require("@zibu/common").dataFormat;
      let build = dataFormat.datetimeFormat(new Date().getTime(), "MMdd");
      let serial = "1";
      // 是否是相同日期，如果是相同日期，序号加1
      if (versionObj.build.startsWith(build)) {
        serial = Number(versionObj.build.replace(build, ""));
        serial = (++serial).toString();
      }
      versionObj.build = build + serial;
      fs.writeFileSync(filePath, JSON.stringify(versionObj, null, 2));
    });
  });
}

const rules = [
  {
    test: /\.(gif|png|jpe?g|svg)$/i,
    use: [
      // {
      //     loader: 'url-loader',
      //     options: {
      //         limit: 10000 /* 图片大小小于1000字节限制时会自动转成 base64 码引用*/,
      //         name: '[path][name].[ext]?[hash:6]!./dir/file.png'
      //     }
      // },
      // {
      //     loader: 'file-loader',
      //     options: {
      //         outputPath: 'img'
      //     }
      // },
      {
        loader: "image-webpack-loader",
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4
          },
          gifsicle: {
            interlaced: false
          }
        }
      }
    ]
  }
];

const optimization = {
  // minimize: isProduction,
  // 如果希望进一步混淆代码，则增加此plugin
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        warnings: false,
        compress: {
          drop_console: true,
          pure_funcs: ["console.log"]
        }
      },
      sourceMap: false,
      parallel: true
    })
  ],
  runtimeChunk: {
    name: "manifest"
  },
  splitChunks: {
    /**
     * splitChunks.chunks:
     *  all: 在async的基础上，对每一个js按照配置进行分割。
     *  async： 将异步加载的文件分离，如果一个文件被异步引入也被非异步引入，那它会被打包到非异步引入。当页面首次载入会加载非异步引入文件
     *  initial：将异步和非异步的文件分离，如果一个文件被异步引入也被非异步引入，那它会被打包两次（注意和async的区别），用于分离页面首次需要加载的包。
     */
    chunks: "all",
    /**
     * cacheGroups会继承和覆盖splitChunks的配置项，每项最好都要加上chunks参数，不然可能打包不出想要的东西
     */
    cacheGroups: {
      vendor: {
        test: /node_modules/,
        name(module) {
          // get the name. E.g. node_modules/packageName/not/this/part.js
          // or node_modules/packageName
          const packageName = module.context.match(
            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
          )[1];
          // npm package names are URL-safe, but some servers don't like @ symbols
          return `vendor.${packageName.replace("@", "")}`;
        }
        // minChunks: 1,
        // maxInitialRequests: 5,
        // priority: 100
      },
      common: {
        test: /src/,
        name: "common",
        chunks: "all"
      }
      // styles: {
      //     name: 'styles',
      //     test: /\.(sa|sc|c)ss$/,
      //     enforce: true
      // }
    }
  }
};

module.exports = {
  output,
  module: {
    rules
  },
  plugins,
  optimization
};
