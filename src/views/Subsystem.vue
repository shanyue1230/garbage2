<template>
<!-- 子系统模块 -->
  <div class="subsystem">
    <div class="header">
      <div class="heading">
         垃圾分类管理平台
      </div>
      <div class="username">
        <img src="../assets/img/tools.png" alt="" class="fl" style="marginRight: 25px; marginTop: 22px">
        <i class="fl xian" style="marginRight: 25px; marginTop: 21px"></i>
        <img src="../assets/img/user.png" alt="" class="fl" style="marginRight: 25px; marginTop: 9px">
        <!-- 用户名 -->
        <div class="fl logout" style="marginRight: 25px">
          <el-dropdown>
            <span class="el-dropdown-link">
              username<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="main" v-bind:style="{backgroundImage: 'url(' + images[index] + ')'}">
      <div class="aside">
        <div class="content">
          <!-- 按钮图片 -->
          <div class="btn">
            <img src="../assets/img/button.png" alt="">
          </div>
          <div class="line"></div>
          <div class="title">{{mainList[index].title}}</div>
          <div class="cont">
            {{mainList[index].content}}
          </div>
          <div class="enter" @click="enterDone">
            <img src="../assets/img/enter.png" alt="">
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="footer">
      <div class="system" v-for="(item,index) in systemList" :key="index">
        <div :class="{'naming':true ,'select':  index === current}" @click="isSelect(index)">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 子系统内容数据
      mainList: [
        { title: '垃圾分类综合管理', content: '内容一' },
        { title: '环卫云服务监控指挥中心', content: '内容2' },
        { title: '合同收费管理', content: '内容3' },
        { title: '环卫资信等级', content: '内容4' },
        { title: '配置发布管理', content: '内容5' }
      ],
      index: 0,
      // 子系统选择数据
      systemList: [
        { title: '垃圾分类综合管理' },
        { title: '环卫云服务监控指挥中心' },
        { title: '合同收费管理' },
        { title: '环卫资信等级' },
        { title: '配置发布管理', authName: '/desk' }
      ],
      current: 0,
      images: [
        require('../assets/img/bgimg01.png'),
        require('../assets/img/bgimg02.png'),
        require('../assets/img/bgimg03.png'),
        require('../assets/img/bgimg04.png'),
        require('../assets/img/bgimg05.png')
      ]
    }
  },
  created () {
  },
  methods: {
    isSelect (index) {
      // 控制选中样式
      this.current = index
      this.index = index
    },
    // enterDone 跳转到子系统页面
    enterDone () {
      let path = this.systemList[this.index].authName
      this.$router.push(path)
    }
    // 用户名事件
    // handleCommand (command) {
    //   this.$message('click on item ' + command)
    // }
  }
}
</script>

<style lang="less" scoped>
  .subsystem {
    background-color: #c3c3c3;
    height: 100%;
    padding-bottom: 16px;
    box-sizing: border-box;
    .header {
      height: 60px;
      padding-left: 39px;
      line-height: 60px;
      font-size: 20px;
      font-family:Source Han Sans CN;
      font-weight:bold;
      color:rgba(48,49,51,1);
      background-color: #fff;
      .heading {
        float: left;
      }
      .username {
        float: right;
        i.xian {
          display: inline-block;
          width: 1px;
          height:18px;
          background:rgba(143,158,179,1);
        }
        .el-dropdown-link {
          font-size:14px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(96,98,102,1);
        }
      }
      // 用户名下拉样式
      // .el-dropdown-link {
      //   cursor: pointer;
      //   color: #409EFF;
      // }
      // .el-icon-arrow-down {
      //   font-size: 12px;
      // }
    }
    .main {
      margin-top: 16px;
      height: 776px;
      background: no-repeat;
      background-size: cover;
      display: flex;
      box-sizing: border-box;
      .aside {
        flex: 1;
        .content {
          width: 497px;
          height: 518px;
          margin: 121px auto 0;
          box-sizing: border-box;
          img {
            margin: 0;
            padding: 0;
          }
          .line {
            height: 2px;
            width: 128px;
            background:rgba(190,193,204,1);
            border-radius:1px;
            margin-left: 17px;
            margin-top: 18px;
          }
          .title {
            font-size:38px;
            font-family:Source Han Sans CN;
            font-weight:bold;
            color:rgba(74,79,108,1);
            line-height:46px;
            margin-left: 17px;
            margin-top: 65px;
          }
          .cont {
            height: 96px;
            width: 480px;
            font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(190,193,204,1);
            line-height:20px;
            margin-top: 50px;
            box-sizing: border-box;
            margin-left: 17px;
          }
          .enter {
            margin-left: 4px;
            margin-top: 76px;
          }
        }
      }
      .right {
        flex: 1;
      }
    }
    .footer {
      height: 60px;
      background:rgba(31,36,43,1);
      border-radius:4px;
      margin: 0 16px;
      display: flex;
      .system {
        flex: 1;
        box-sizing: border-box;
        .naming {
          margin: 0 auto;
          width:208px;
          height:30px;
          border-radius:4px;
          line-height: 28px;
          text-align: center;
          margin-top: 14px;
          cursor: pointer;
          font-size: 16px;
          color:rgba(255,255,255,1);
          font-family:Source Han Sans CN;
        }
        .select {
          background-color: #fff;
          color:rgba(31,36,43,1);
          font-family:Source Han Sans CN;
        }
      }
    }
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
</style>
