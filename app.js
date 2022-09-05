const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/router');
const app = express();

// 跨域请求处理
app.all('*', (req, res, next) => {
	//允许所有来源访问
	res.header('Access-Control-Allow-Origin', '*');
	//用于判断request来自ajax还是传统请求
	res.header('Access-Control-Allow-Headers', ' Origin, X-Requested-With, Content-Type, Accept');
	// 请求方式
	res.header('Access-Control-Methods', 'PUT, POST, GET, DELET, OPTIONS');
	// 允许接收的请求头上加上一个Authorization,这样才能把数据发送过去
	res.header('X-Powered-By', '3.2.1');
	//内容类型：如果是post请求必须指定这个属性
	res.header('Content-Type', 'application/json;charset=utf-8');

	if (req.method === 'OPTIONS') {
		res.send(200);
	} else {
		// 让options请求快速返回
		next();
	}
});
// 托管静态资源, 挂载路径前缀
app.use('/img', express.static('public'));

// 挂载处理 post 请求的插件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 挂载路由
app.use(router);

app.listen(8080, () => {
	console.log('Server is running at 8080');
});
