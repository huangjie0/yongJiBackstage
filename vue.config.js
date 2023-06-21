const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  lintOnSave: false,//关闭语法检查
  devServer: {
    allowedHosts: [
      '.cpolar.top', // 允许访问的域名地址，即花生壳内网穿透的地址
      '.cpolar.top'   // .是二级域名的通配符   
    ],
  },
  //配置以@为根目录
  chainWebpack: config => {
    config.resolve.alias
        .set('@', resolve('src'))
}
})
