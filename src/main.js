import { createApp } from 'vue';
import App from './App.vue';
import 'animate.css';
import 'element-plus/dist/index.css';
import './index.css';

import {
	ElCard,
	ElInput,
	ElButton,
	ElLink,
	ElForm,
	ElFormItem,
	ElRadioGroup,
	ElRadio,
	ElUpload,
	ElMessage,
} from 'element-plus';

import axios from 'axios';
// 利用qs插件实现post传递参数
import qs from 'qs';
// 导入路由对象
import router from './router.js';
const app = createApp(App);

// 注册路由对象
app.use(router);
// app.use(qs);
axios.defaults.baseURL = 'http://localhost:3007/pingpong';
app.config.globalProperties.$http = axios;
app.config.globalProperties.$qs = qs;
app.use(ElCard);
app.use(ElInput);
app.use(ElButton);
app.use(ElLink);
app.use(ElForm);
app.use(ElFormItem);
app.use(ElRadioGroup);
app.use(ElRadio);
app.use(ElUpload);
app.use(ElMessage);

app.mount('#app');
