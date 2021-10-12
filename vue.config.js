module.exports = {
    devServer: {
        port: 8080,
        host: 'localhost',
        open: true, //配置浏览器自动访问
        proxy: {
            // 配置多个代理
            "/api": {
                target: "http://localhost:8079/api/v1", //这里改成你自己的后端api端口地址，记得每次修改，都需要重新build
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    // 路径重写，
                    "^/api": "" // 替换target中的请求地址
                }
            }
        }
    }
}