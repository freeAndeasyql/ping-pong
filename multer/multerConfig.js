// 引入依赖
const multer = require('multer')
const md5 = require('md5')
const path = require('path')

const resolve = dir => path.join(__dirname, './', dir)

// multer 的配置对象
let storage = multer.diskStorage({
    // 存储路径
    // destination用于确定上传的文件应存储在哪个文件夹中
    destination: function (req, file, cb) {
        // 允许图片上传
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, resolve('../public/images'))
        } else {
            cb({ error: 'Mime type not supported' })
        }
    },
    // 存储名称
    // filename用于确定文件夹内的文件应命名为什么
    // originalname 用户计算机上的文件名
    filename: function(req, file, cb) {
        let fileFormat = (file.originalname).split('.')
        // md5(需要加密的信息)
        cb(null, md5(+new Date()) + '.' + fileFormat[fileFormat.length - 1])
    }
})

// 添加配置
const multerConfig = multer({
    storage: storage
})

module.exports = multerConfig