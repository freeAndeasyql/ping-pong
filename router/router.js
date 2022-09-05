const express = require('express');
const query = require('../db/db.js');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const upload = require('../multer/upload.js');
const router = express.Router();

// 上传图片接口
router.post('/uploadImage', (req, res) => {
	// 上传成功，存储文件路径，到数据库中
	upload(req, res)
		.then((imgsrc) => {
			let sql = `insert into accounts (username, imgsrc) values('ql', '${imgsrc}')`;
			query(sql, ['ql', imgsrc], (err, results) => {
				if (err) {
					console.log(err);
					formatErrorMessage(res, err);
				} else {
					res.send({
						status: 200,
						message: '上传成功',
						data: {
							url: imgsrc,
						},
					});
				}
			});
		})
		.catch((err) => {
			console.log(err);
			formatErrorMessage(res, err.error);
		});
});
// 用户注册接口
router.post('/register', (req, res, next) => {});
const screctKey = 'que ^-^ lian come on';
// 登录成功后生成JWT字符串，调用jsonwebtoken包提供的sign()方法
router.post('/login', (req, res) => {
	const userInfo = req.body;
	if (userInfo.phone !== '' || userInfo.password !== '') {
		return res.send({
			status: 400,
			message: '登录失败！',
		});
	}
	res.send({
		status: 200,
		message: '登录成功！',
		token: jwt.sign({ phone: userInfo.phone }, screctKey, { expiresIn: '30s' }),
	});
});
// 格式化错误消息
function formatErrorMessage(res, message) {
	res.send({
		status: 500,
		message: message || '',
	});
}
module.exports = router;
