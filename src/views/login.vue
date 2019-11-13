<template>
<!-- 登录组件 -->
  <div class="login"
            v-loading="loading"
            element-loading-text="正在登录中，请稍后.."
            element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- logo -->
    <div class="logo">
      <!-- ../assets/img/logo.png -->
      <img src="../assets/img/logo.png" alt="">
    </div>
    <!-- 右侧登录+二维码 -->
    <div class="box">
        <div class="loginBox">
          <h3>垃圾分类综合管理系统</h3>
           <!-- 登录表单 -->
           <el-form ref="form" :model="form"  :rules="rules">
              <el-form-item  prop="userName">
                  <el-input v-model="form.userName" placeholder="请输入用户名" class="first"></el-input>
              </el-form-item>
             <el-form-item  prop="password">
                  <el-input v-model="form.password" placeholder="请输入6-10位密码" type="password"></el-input>
              </el-form-item>
               <el-form-item>
                 <el-checkbox v-model="form.checked">记住密码</el-checkbox>
                 <span  @click="resetForm">清空</span>
              </el-form-item>
               <el-form-item>
                  <el-button type="primary" @click="login">登录</el-button>
              </el-form-item>
            </el-form>
            <!-- 提示文字 -->
            <div class="info">技术支持电话：<span class="orange">021-6228886</span></div>
        </div>
        <div class="code">
          <div class="app">
            <img src="../assets/img/erwei.png" alt="">
            <span>APP Store</span>
          <!-- 显示隐藏的app二维码框 -->
        <div class="show">
          <div class="img"></div>
        </div>
          </div>
          <div class="android">
            <img src="../assets/img/erwei.png" alt="">
            <span>Android</span>
        <!-- 显示隐藏的android二维码框 -->
        <div class="show2">
          <div class="img"></div>
        </div>
          </div>

        </div>

    </div>
    <div class="copyright">Copyright© 2017 - 2018 上海西弗瑞环境科技有限公司 版权所有</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      // index: '',
      loading: false,
      // index2: '',
      form: {
        userName: '',
        password: '',
        checked: false
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-z]{5,15}$/, message: '用户名最少5字符，最长15字符（仅包含字母及数字）' }
        ],
        password: [
          { required: true, message: '请输入6-10位密码', trigger: 'change' },
          { pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-z]{6,10}$/, message: '请输入6-10位密码' }
        ]
      }
    }
  },
  created () {
    // 在页面加载时从cookie获取登录信息
    let userName = JSON.parse(localStorage.getItem('userName'))
    // 如果存在赋值给表单，并且将记住密码勾选
    if (userName) {
      this.form.userName = userName.userName
      this.form.password = userName.password
      this.form.checked = userName.checked
    }
  },
  methods: {

    async  login () {
      try {
        await this.$refs.form.validate()
        // this.loading = true
        this.$message.success('登录成功')
        this.$router.push('/subsystem')
        // 如果点击记住密码把账号还有密码存入cookie
        if (this.form.checked) {
          localStorage.setItem('userName', JSON.stringify(this.form))
        } else {
          localStorage.setItem('userName', JSON.stringify([]))
        }
        // this.loading = false
      } catch (e) {
        console.log(e)
      }
    },
    resetForm () {
      this.form.userName = ''
      this.form.password = ''
      this.form.checked = false
    }
  }
}
</script>

<style lang="less" scoped>
.login {
width:1920px;
height:948px;
margin: 0px auto;
position: relative;
background:no-repeat url(../assets/img/photo.png) ;
background-size: 1920px 948px;
.logo {
  position: absolute;
  // top:232px;
  left:476px;
  animation: float 2s infinite linear;
  img {
    width: 364px;
    height: 448px;
  }
}
.box {
  width: 496px;
  height: 601px;
  // background-color: #f99;
  position: absolute;
  top:152px;
  left:986px;
  .loginBox {
      width:496px;
      height:535px;
      background:rgba(255,255,255,1);
      box-shadow:4px 7px 30px 0px rgba(53,70,91,0.09);
      border-radius:4px;
      margin-bottom: 2px;
      padding: 77px 86px 0 68px;
      box-sizing: border-box;
    background-color: #fff;
    h3 {
      width:339px;
      height:33px;
      font-size:32px;
      font-family:Source Han Sans CN;
      font-weight:bold;
      color:rgba(48,49,51,1);
      margin-bottom: 75px;
    }
    .el-form {
      .el-form-item {
       /deep/ .el-form-item__content {
          margin-left: 0;
        /deep/  .el-input {
            width: 100%;
            .el-input__inner {
             border-top:none;
             border-left:none;
             border-right:none;
             border-radius: 0px;
            }

          }
          //  .first {
          //   .el-input__inner::-webkit-input-placeholder {
          //        color: #666;
          //        }
          //   }
        }
        span {
          margin-left: 220px;
          cursor:pointer;
        }
        .el-button {
          width: 100%;
          height: 50px;
          margin-top: 20px;
        }

      }
    }
    .info {
      margin-top: 50px;
      width:214px;
      height:16px;
      font-size:16px;
      font-family:Source Han Sans CN;
      font-weight:400;
      color:rgba(168,181,194,1);
    }
  }
  .code {
    width:496px;
    height:64px;
    background:rgba(255,255,255,1);
    box-shadow:4px 7px 30px 0px rgba(53,70,91,0.09);
    border-radius:4px;
    display: flex;
    .app {
      flex: 1;
      padding: 20px 0 20px 0;
      box-sizing: border-box;
       cursor:pointer;
      border-right:1px solid rgba(224,228,232,1);
      img {
        width: 24px;
        margin-left: 64px;
        margin-right: 24px;
        vertical-align:middle;
      }
      span {
        font-size:12px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(48,49,51,1);
      }
   .show {
    width: 248px;
    height: 248px;
    padding: 16px;
    box-sizing: border-box;
    background:rgba(255,255,255,1);
    box-shadow:0px -4px 6px 0px rgba(0,54,106,0.17);
    border-radius:4px;
    display: none;
    position: absolute;
    top:287px;
    left:0;
    z-index: 999;
    .img{
      width: 216px;
      height: 216px;
      background-color: rgb(95, 16, 16);
    }
  }

    }
  .app:hover .show {
    display: block;
  }
    .android {
       flex: 1;
      padding: 20px 0 20px 0;
      box-sizing: border-box;
       cursor:pointer;
      border-right:1px solid rgba(224,228,232,1);
      img {
        width: 24px;
        margin-left: 64px;
        margin-right: 24px;
        vertical-align:middle;
      }
      span {
        font-size:12px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(48,49,51,1);
      }
        .show2 {
          width: 248px;
          height: 248px;
          padding: 16px;
          box-sizing: border-box;
          background:rgba(255,255,255,1);
          box-shadow:0px -4px 6px 0px rgba(0,54,106,0.17);
          border-radius:4px;
          position: absolute;
          display: none;
          top:287px;
          right:0;
          z-index: 999;
          .img{
            width: 216px;
            height: 216px;
            background-color: rgb(95, 16, 16);
          }
  }
    }
  .android:hover .show2 {
    display: block;
  }
  }

}
.copyright {
  position: absolute;
  top:881px;
  left:762px;
  font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(159,171,183,1);
}
.orange {
  color:orange ;
}
// 自定义一个动画
  @keyframes float{
    0%{
       top:190px;
    }
    50%{
      top:232px;
    }
    100% {
      top:190px;
    }
   }
}
</style>
