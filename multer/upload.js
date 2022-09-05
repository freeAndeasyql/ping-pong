const multerConfig = require('./multerConfig')

// 定义静态变量
const fileName = 'avatar' // 上传的filename名称
const updateBaseUrl = 'http://localhost:8080'  // 上传到服务器地址
const imaPath = '/img/images/' // 上传到服务器的虚拟目录

// 上传的接口
// fileName 后续前端上传文件的时候，定义的字段名需要和它一致，
// updateBaseUrl 对应后端服务的 ip 地址加端口
// imaPath 对应代理的公开静态资源地址
function upload(req, res) {
    return new Promise((resolve, reject) => {
        multerConfig.single(fileName)(req, res, function(err) {
            if(err) {
                reject(err)
            } else {
                resolve(updateBaseUrl + imaPath + req.file.filename)
            }
        })
    })
}
module.exports = upload