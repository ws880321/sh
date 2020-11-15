// vue.config.js
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    publicPath: "./",
    chainWebpack: (config) => {
        config.optimization.splitChunks({
            chunks: "all",
            minSize: 30000, // 模块的最小体积
            minChunks: 2, // 模块的最小被引用次数
            maxAsyncRequests: 5, // 按需加载的最大并行请求数
            maxInitialRequests: 3, // 一个入口最大并行请求数
            automaticNameDelimiter: "~", // 文件名的连接符
            name: true,
            cacheGroups: {
                // 缓存组
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/, //打包第三方库
                    chunks: "all",
                    priority: 10, // 优先级
                },
                common: {
                    // 打包其余的的公共代码
                    minChunks: 2, // 引入两次及以上被打包
                    name: "common", // 分离包的名字
                    chunks: "all",
                    priority: 5,
                },
            },
        });
    },
    configureWebpack: (config) => {
        if (isProduction) {
            config.plugins.push(
                new CompressionWebpackPlugin({
                    algorithm: "gzip",
                    test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
                    threshold: 10240,
                    minRatio: 0.8,
                })
            );
        }
    },
    devServer: {
        overlay: {
            warning: false,
            errors: false,
        },
        proxy: {
            "/qqbjx": {
                //这里最好有一个 /
                target: "http://222.128.56.122:8081", // 后台接口域名
                ws: true, //如果要代理 websockets，配置这个参数
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    "^/qqbjx": "qqbjx",
                },
            },
        },
    },
};