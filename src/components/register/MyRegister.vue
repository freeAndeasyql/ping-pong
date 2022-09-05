<template>
  <div class="register-container">
    <!-- 动画区域 -->
    <div class="animation">
      <img
        src="../../assets/loginImages/ball.png"
        alt=""
      />
      <img
        src="../../assets/registerImg/paizi.png"
        alt=""
        class="paizi"
      />
    </div>
    <div class="circle"></div>

    <div class="circle-box">
      <div class="item out-front">
        <img
          src="../../assets/registerImg/xuxin.jpg"
          alt=""
        />
      </div>
      <div class="item out-back">
        <img
          src="../../assets/registerImg/jike-1.jpg"
          alt=""
        />
      </div>
      <div class="item out-right">
        <img
          src="../../assets/registerImg/zhangyining.jpg"
          alt=""
        />
      </div>
      <div class="item out-left">
        <img
          src="../../assets/registerImg/malong.gif"
          alt=""
        />
      </div>
      <div class="item out-top">
        <img
          src="../../assets/registerImg/xiao.jpg"
          alt=""
        />
      </div>
      <div class="item out-bottom">
        <img
          src="../../assets/registerImg/fan.jpg"
          alt=""
        />
      </div>
    </div>
    <!-- <img src="../../assets/registerImg/jike-1.jpg" alt="" class="img1" /> -->
    <!-- 动画区域 -->
    <div class="register-box animate__animated animate__bounceInDown">
      <!-- 返回登录 -->
      <div class="gotoLogin">
        <el-link
          :underline="false"
          href="/login"
        >返回登录</el-link>
      </div>

      <!-- 欢迎注册 -->
      <div class="welcome">欢迎注册乒乒乓乓</div>
      <!-- 表单信息收集区域 -->
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerRules"
        label-width="120px"
        class="register-Form"
        status-icon
      >
        <el-form-item
          label="用户头像"
          prop="avatarURL"
        >
          <!-- 使用上传组件 -->
          <avatar-upload
            name="avatar"
            ref="uploadAvatar"
            @avatarFile="getAvatarFile"
          ></avatar-upload>
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="registerForm.username" />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
        >
          <el-input v-model="registerForm.phone" />
        </el-form-item>
        <el-form-item
          label="性别"
          prop="gender"
        >
          <el-radio-group
            v-model="registerForm.gender"
            class="ml-4"
          >
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="球龄"
          prop="age"
        >
          <el-input v-model.number="registerForm.age" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          style="position: relative;"
        >
          <el-input
            v-model="registerForm.password"
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

        <el-form-item
          label="确认密码"
          prop="checkPsd"
        >
          <el-input
            v-model="registerForm.checkPsd"
            type="password"
            ref="psdCkRef"
          />
          <el-icon v-if="isckview">
            <View
              class="view"
              @click.self="isCkView"
            />
          </el-icon>
          <el-icon v-else>
            <Hide
              class="hide"
              @click.self="isCkView"
            />
          </el-icon>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="registerNow"
          >立即注册</el-button>
          <el-button @click="resetRegisterForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import AvatarUpload from "../upload/AvatarUpload.vue";
import { View, Hide } from '@element-plus/icons-vue';

// 手机号的检验规则
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
let psw = "";
// 密码的校验规则
let validatePass = (rule, value, cb) => {
  // 至少8个字符，至少1个字母，1个数字和1个特殊字符
  const passReg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  if (!passReg.test(value)) {
    cb(new Error("至少8个字符，至少1个字母，1个数字和1个特殊字符"));
  } else {
    psw = value;
    cb();
  }
};
// 确认密码的校验规则
let valiadateCheckPass = (rule, value, cb) => {
  if (psw !== value) {
    cb(new Error("两次输入的密码不一致！"));
  } else {
    cb();
  }
};
export default {
  name: "MyRegister",
  components: {
    AvatarUpload,
    View,
    Hide
  },
  data () {
    return {
      // 控制密码是否可见
      isview: false,
      isckview: false,
      registerForm: {
        username: "",
        phone: "",
        gender: "",
        age: '',
        password: "",
        avatarURL: '',
        checkPsd: "",
      },
      //   校验规则
      registerRules: {
        avatarURL: [
          {
            required: true,
            message: "请上传头像",
            trigger: "change",
          },
        ],
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            validator: validatePhone,
            trigger: "blur",
          },
        ],
        gender: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change",
          },
        ],
        age: [
          {
            required: true,
            message: "请输入年龄",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
          },
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        checkPsd: [
          {
            required: true,
            message: "请输入确认密码！",
            trigger: "blur",
          },
          {
            validator: valiadateCheckPass,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // resetItem () {
    //   this.resetField();
    // },
    // 密码是否可见
    isView () {
      this.isview = !this.isview
      this.$refs.psdRef.input.type = this.isview ? 'text' : 'password'
    },
    isCkView () {
      this.isckview = !this.isckview
      this.$refs.psdCkRef.input.type = this.isckview ? 'text' : 'password'
    },
    getAvatarFile (avatar) {

      this.registerForm.avatarURL = avatar
    },
    // 重置表单信息
    resetRegisterForm () {

      this.$refs.uploadAvatar.handleRemove()
      this.$refs.registerFormRef.resetFields();
    },
    // async show () {

    // }

    // 注册
    // FormData 接口提供了一种表示表单数据的键值对
    // key/value 的构造方式，并且可以轻松的将数据通过
    //XMLHttpRequest.send() 方法发送出去
    registerNow () {
      this.$refs.registerFormRef.validate(async (valid) => {
        if (!valid) return;

        /* onst formData = new formData();

        const headerConfig = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        formData.append("avatarURL", this.registerForm.avatarURL);
        formData.append("username", this.registerForm.username);
        formData.append("phone", this.registerForm.phone);
        formData.append("gender", this.registerForm.gender);
        formData.append("age", this.registerForm.age);
        formData.append("password", this.registerForm.password);
        console.log(formData, "formData");
        console.log(formData) */

        const { data: res } = await this.$http.post(
          "/register",
          this.$qs.stringify(this.registerForm)
        );
        console.log(res)
        if (res.status !== 200) return this.$message.error("注册失败！");
        this.$message.success("注册成功！");
        // window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../../assets/loginImages/bgi.png);
  transform-style: preserve-3d;
  perspective: 1000;
  .animation {
    position: absolute;
    left: 200px;
    top: 18%;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    transform: translate3d(70px, 70px, 150px);
    img {
      width: 100%;
      height: 100%;
    }
    .paizi {
      width: 233px;
      height: 214px;
      transform: translate3d(-51px, -91px, 150px) rotateX(121deg) rotateZ(91deg);
    }
  }
  .circle {
    position: absolute;
    left: 200px;
    top: 100px;
    width: 300px;
    height: 300px;
    background-color: transparent;
    border-radius: 50%;
    transform: translateZ(150px) rotateX(75deg) rotateZ(150deg);
    border: 3px solid skyblue;
  }
  .circle-box {
    width: 100px;
    height: 100px;
    position: relative;
    left: 45%;
    top: 220px;
    transform-style: preserve-3d;
    animation: in-rotate 8s alternate infinite;
    animation-timing-function: linear;
    .item {
      position: absolute;
      width: 100px;
      height: 100px;
      transition: all 0.4s;
      img {
        width: 100%;
        height: 100%;
      }
    }

    @keyframes in-rotate {
      0%,
      5% {
        transform: rotateY(90deg);
      }
      20%,
      25% {
        transform: rotateY(180deg);
      }
      40%,
      45% {
        transform: rotateY(270deg);
      }
      60%,
      65% {
        transform: rotateX(-90deg);
      }
      80%,
      85% {
        transform: rotateX(0deg);
      }
      100% {
        transform: rotateX(90deg);
      }
    }
    .out-front {
      transform: translateZ(50px);
    }
    .out-back {
      transform: rotateY(180deg) translateZ(50px);
    }
    .out-left {
      transform: rotateY(-90deg) translateZ(50px);
    }
    .out-right {
      transform: rotateY(90deg) translateZ(50px);
    }
    .out-top {
      transform: rotateX(90deg) translateZ(50px);
    }
    .out-bottom {
      transform: rotateX(-90deg) translateZ(50px);
    }
  }
  .img1 {
    position: absolute;
    left: 300px;
    top: 200px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    transform: translateZ(150px) translateX(154px) rotateX(180deg)
      rotateZ(150deg);
    animation: circle 1s infinite alternate;
  }
  // 定义动画效果
  .register-box {
    position: absolute;
    right: 30px;
    top: 20px;
    width: 500px;
    height: 550px;
    background-color: #fff;
    border-radius: 5px;
    opacity: 0.9;
    .gotoLogin {
      padding: 15px;
      .el-link {
        font-size: 12px;
      }
    }
    .welcome {
      position: absolute;
      top: 15px;
      left: 50%;
      transform: translateX(-50%);
      font-weight: bold;
      font-size: 20px;
    }
    .el-form {
      padding: 13px 35px;

      .view,
      .hide {
        position: absolute;
        width: 15px;
        right: -17px;
        top: 50%;
        transform: translateY(-50%);
        color: rgb(127, 126, 126);
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>