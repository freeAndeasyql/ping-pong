<template>
  <div class="login-container">
    <div class="login-area animate__animated animate__backInRight">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="66px"
        class="login-Form"
      >
        <el-form-item
          label="手机号"
          prop="phone"
        >
          <el-input v-model="loginForm.phone" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="loginForm.password"
            type="password"
            ref="psdRef"
          />
          <el-icon v-if="isview">
            <View
              class="view"
              @click.self="isView"
            />
          </el-icon>
          <el-icon v-else>
            <Hide
              class="hide"
              @click.self="isView"
            />
          </el-icon>
        </el-form-item>
        <el-form-item class="btn">
          <el-button
            type="primary"
            @click="loginNow"
          >登录</el-button>
          <el-button
            type="info"
            @click="toRegister"
          >注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 插入乒乓球图片 -->
    <div class="ball animate__animated animate__fadeInDownBig">
      <img
        src="../../assets/loginImages/ball.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { View, Hide } from '@element-plus/icons-vue';

// 手机校验规则
let validatePhone = (rule, value, callback) => {
  var phone = value.replace(/\s/g, ""); //去除空格
  //校验手机号，号段主要有(不包括上网卡)：130~139、150~153，155~159，180~189、170~171、176~178。14号段为上网卡专属号段
  let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
  if (value.length != 0) {
    if (!regs.test(phone)) {
      callback([new Error("手机号输入不合法")]);
    } else {
      callback();
    }
  }
};

export default {
  name: "MyLogin",
  components: {
    View,
    Hide
  },
  data () {
    return {
      isview: false,
      loginForm: {
        phone: '',
        password: ''
      },
      // 校验规则
      loginRules: {
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            validator: validatePhone,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]

      }
    }
  },
  methods: {
    isView () {
      this.isview = !this.isview
      this.$refs.psdRef.input.type = this.isview ? 'text' : 'password'
    },

    // 登录
    loginNow () {

      this.$refs.loginFormRef.validate(async valid => {
        // 预验证
        if (!valid) return;
        const { data: res } = await this.$http.post('/login', this.$qs.stringify(this.loginForm))
        console.log(res)
        if (res.status !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
        window.sessionStorage.setItem('token', res.token)
        this.$router.push('/home')
      })
    },
    // 跳转到注册界面
    toRegister () {
      this.$router.push('/register')
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  position: relative;
  transform-style: preserve-3d;
  width: 100%;
  height: 100%;
  background: url(../../assets/loginImages/bgi.png);
  .login-area {
    position: absolute;
    width: 350px;
    height: 180px;
    right: 20px;
    top: 50%;
    padding: 40px 15px 0;
    margin-top: -125px;
    background-color: #fff;
    opacity: 0.87 !important;
    border-radius: 5px;
    .login-Form {
      width: 100%;
      height: 100%;
      .btn {
        margin-left: 55px;
      }
      .view,
      .hide {
        position: absolute;
        width: 15px;
        right: 3px;
        top: 50%;
        transform: translateY(-50%);
        color: rgb(127, 126, 126);
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .ball {
    position: absolute;
    width: 70px;
    height: 70px;
    left: 50%;
    top: 252px;
    margin-left: -389px;
  }
  .ball img {
    width: 100%;
    height: 100%;
    animation: ball 2.5s infinite alternate ease-in;
  }
  // 定义动画
  @keyframes ball {
    75% {
      transform: translate(360px, -160px);
    }
    100% {
      transform: translate(600px, -20px);
    }
  }
}
</style>