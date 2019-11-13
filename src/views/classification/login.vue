<template>
  <div class="login">

    <!-- 登录 -->
    <div class="loginModule">
       <h3>系统登录</h3>

       <!-- 表单 -->
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
      >
        <el-form-item label="用户名:" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="passWord">
          <el-input v-model="form.passWord"></el-input>
        </el-form-item>
          <el-form-item >
          <el-button class="btns" type="primary" @click="isLogin">登录</el-button>
          <el-button type="danger">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        userName: ''
      }
    }
  },
  methods: {
    isLogin () {
      this.$router.push('/module')
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  position: relative;
  background-color: #333;
  .loginModule {
    width: 400px;
    height: 300px;
    padding: 30px;
    box-sizing: border-box;
    position: absolute;
    border-radius: 8px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    h3 {
         text-align: center;
         margin-bottom: 20px;
    }
    .btns {
      margin-right: 30px;
    }
  }
}
</style>
