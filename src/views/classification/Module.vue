<template>
  <div class="module">
    <el-container>
        <el-header>
           <h2><i class="el-icon-delete"></i>垃圾分类综合管理系统</h2>
           <div class="dropOut">  欢迎，系统管理员<i class="el-icon-caret-bottom"></i></div>
        </el-header>
        <el-main>
          <div class="public" @click="garbage">垃圾分类综合管理</div>
          <div class="public">环卫云服务监控指挥中心</div>
          <div class="public">合同收费管理</div>
          <div class="public">环卫资信等级</div>
          <div class="configuration">配置发布管理</div>
        </el-main>
</el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    garbage () {
      this.$router.push('/garbage')
    }
  }
}
</script>

<style lang="less" scoped>
.module {
   height: 100%;
      .el-container {
         height: 100%;
        .el-header {
          height: 100px;
          background-color:  rgb(51,51,51);
          h2 {
            line-height: 50px;
            float: left;
            i {
              font-size: 40px;
            }
          }
          .dropOut {
            float: right;
            line-height: 50px;
            color: #333;
          }
        }
        .el-main {
          height: 100%;
          // background-color: skyblue;
          display: flex;
          padding-top:200px ;
          justify-content: space-between;
          flex-wrap: wrap;
          align-content:flex-start;
          // flex-direction:column;
          justify-content:center;
          .public {
            height: 120px;
            width: 33%;
            // flex: 1;
            cursor:pointer;
            margin-left: 30px;
            margin-bottom: 30px;
            background-color: rgb(51,51,51);
            border-radius: 8px;
            color: #fff;
            font-weight: 700;
            line-height: 120px;
            text-align: center
          }
          .configuration {
            height: 120px;
            width: 68%;
            // flex: 2;
            cursor:pointer;
             margin-left: 30px;
            background-color: rgb(51,51,51);
             color: #fff;
            font-weight: 700;
            line-height: 120px;
            text-align: center;
            border-radius: 8px;
          }
        }
      }
}

</style>
