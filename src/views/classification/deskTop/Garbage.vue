<template>
<div class="garbage">
  <el-container>

    <!-- 头部 -->
    <el-header>
      <div class="title">后台管理</div>
      <div class="deploy">

        <!-- 头部导航 -->
        <div class="grid-content bg-purple-light nav">
          <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          text-color="#666"
          >
            <el-menu-item index="144" @click="toNormal">基础信息</el-menu-item>
            <el-menu-item index="245" @click="changeNav">系统管理</el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="user">
        环卫操作员xxx
        <el-button type="info" size="mini">退出登录</el-button>
      </div>
    </el-header>
    <el-container>

      <!-- 侧边导航 -->
      <el-aside width="200px">
        <!--  :default-active="activeMenu" -->
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
          background-color="rgba(51, 51, 51, 1)"
          text-color="#fff"
          router
          unique-opened
          @open="handleOpen"
          active-text-color="#ffd04b"
          >
          <el-submenu  v-for="item in navList" :index="item.id" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.title}}</span>
            </template>
            <!-- <div v-for="line in item.title2" :key="line.id"> -->
              <el-menu-item  v-for="line in item.title2" :key="line.id" :index="line.autName">
                <span>{{line.fun}}</span>
              </el-menu-item>
            <!-- </div> -->
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 主体 -->
      <el-main>
       <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '144',
      navList: [
        { id: '1', title: '我的桌面', autName: 'basic', title2: [] },
        {
          id: '2',
          title: '组织架构管理',
          title2: [{ id: '101', fun: '部门管理', autName: 'department' }, { id: '102', fun: '岗位管理', autName: 'post' }]
        },
        {
          id: '3',
          title: '人员管理',
          title2: [{ id: '103', fun: '员工管理', autName: 'employee' }, { id: '104', fun: '驾驶员管理', autName: 'driver' }]
        },
        {
          id: '4',
          title: '车辆管理',
          title2: [
            { id: '105', fun: '机动车信息登陆', autName: 'carlogin' },
            { id: '106', fun: '电瓶车信息登陆', autName: 'carlnfo' }
          ]
        },
        {
          id: '5',
          title: '环卫作业点管理',
          title2: [{ id: '107', fun: '小压站', autName: 'smallStation' }, { id: '108', fun: '道班房', autName: 'roadRoom' }]
        }
      ]
    }
  },
  methods: {
    // 更改侧边栏数据
    changeNav () {
      this.navList = [
        { id: '1', title: '我的桌面', autName: 'basic', title2: [] },
        {
          id: '2',
          title: '权限管理',
          title2: [
            { id: '101', fun: '功能权限管理', autName: 'permission' },
            { id: '102', fun: '数据权限管理', autName: 'dataPermission' }
          ]
        },
        { id: '3', title: '许可信息', title2: [] },
        { id: '4', title: '通知公告', title2: [] },
        {
          id: '5',
          title: '日志管理',
          title2: [{ id: '103', fun: '登录日志', autName: 'loginLog' }, { id: '104', fun: '异常登陆', autName: 'loginException' }]
        }
      ]
    },
    // 切换到基础信息
    toNormal () {
      this.navList = [
        { id: '1', title: '我的桌面', autName: 'basic', title2: [] },
        {
          id: '2',
          title: '组织架构管理',
          title2: [{ id: '101', fun: '部门管理', autName: 'department' }, { id: '102', fun: '岗位管理', autName: 'post' }]
        },
        {
          id: '3',
          title: '人员管理',
          title2: [{ id: '103', fun: '员工管理', autName: 'employee' }, { id: '104', fun: '驾驶员管理', autName: 'driver' }]
        },
        {
          id: '4',
          title: '车辆管理',
          title2: [
            { id: '105', fun: '机动车信息登陆', autName: 'carlogin' },
            { id: '106', fun: '电瓶车信息登陆', autName: 'carlnfo' }
          ]
        },
        {
          id: '5',
          title: '环卫作业点管理',
          title2: [{ id: '107', fun: '小压站', autName: 'smallStation' }, { id: '108', fun: '道班房', autName: 'roadRoom' }]
        }
      ]
    },
    handleOpen (key, keyPath) {
      if (key === '1') {
        this.$router.push('/basic')
      }
    }
  },
  computed: {
    activeMenu () {
      return this.$route.path.substring(1)
    }
  }
}
</script>

<style lang="less" scoped>
.garbage {
// 整体布局样式
height: 100%;
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
    color: #fff;
    display: flex;
    .title {
      width: 200px;
      height: 100%;
      background-color:rgba(51, 51, 51, 1);
      font-size: 20px;
      font-weight: 700px;
      font-family: 'Arial Negreta', 'Arial';
    }
    .user {
      width: 200px;
      height: 100%;
      background-color: #fff;
      color: #000;
      font-size: 12px;
      padding-bottom: 1px;
    }
    .deploy {
      flex: 1;
      background-color: #fff;
      padding: 0 20px;
    }

  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
    box-sizing: border-box;
    .el-menu {
      height: 100%;
      box-sizing: border-box;
      border: none;
    }
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    // text-align: center;
    display: flex;
    padding: 0 ;
    width: 100%;
  }
  .el-menu--horizontal>.el-menu-item.is-active {
    font-weight: 700px;
    border-bottom: 3px solid #000;
  }
  .el-menu--horizontal>.el-menu-item.is-active {
    font-weight: 700;
    font-size: 16px;
    font-family: 'Arial Negreta', 'Arial';
  }
  /deep/.el-submenu__title:hover {
    background-color: #000 !important;
  }
  .el-submenu {
    background-color: #fff;
    padding-top: 1px;
  }
  .el-menu-item {
    background-color: #fff !important;
    color: #000 !important;
  }
  /deep/.el-menu-item.is-active {
    font-weight: 700;
  }
}

</style>
