<template>
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
          <!-- 如果菜单栏有二级菜单则显示 -->
          <div  v-for="item in this.$store.state.navList"  :key="item.id">
            <el-submenu  v-if="item.title2" :index="item.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.title}}</span>
              </template>
                <el-menu-item  v-for="line in item.title2" :key="line.id" :index="line.authName">
                  <span>{{line.fun}}</span>
                </el-menu-item>
            </el-submenu>
            <!-- 如果只有一级菜单则显示 -->
            <div v-else>
              <div class="line"></div>
              <el-menu-item :index="item.authName" :key="item.id"  class="oneMenu">
                <i class="el-icon-location"></i>
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
            </div>
          </div>
        </el-menu>
      </el-aside>

      <!-- 主体 -->
      <el-main>
       <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
// import { mapState } from 'vuex'
export default {
  data () {
    return {
      activeIndex: '144'
      // navList: [
      //   { id: '1', title: '我的桌面', authName: 'desk' },
      //   { id: '2', title: '组织架构管理', title2: [{ id: '100', fun: '行政机构管理', authName: 'administration' }, { id: '101', fun: '企业单位管理', authName: 'unit' }] },
      //   { id: '3', title: '设备管理', title2: [{ id: '103', fun: '车载设备管理', authName: 'car' }, { id: '104', fun: '小压站设备管理', authName: 'station' }] }
      // ]
    }
  },
  created () {
    console.log(this.$route.path.substring(1))
  },
  methods: {
    // 更改侧边栏数据
    changeNav () {
      this.$store.commit('changeNav')
      // this.navList = [
      //   { id: '6', title: '我的桌面', authName: 'desk' },
      //   { id: '7', title: '许可证管理', authName: 'vehicle' },
      //   { id: '8', title: '套餐管理', authName: 'sanitation' },
      //   { id: '9', title: '工作流管理', authName: 'personnel' },
      //   { id: '10', title: '任务提醒管理', authName: 'organization' }
      // ]
    },
    // 切换到基础信息
    toNormal () {
      this.$store.commit('toNormal')
      // this.navList = [
      //   { id: '1', title: '我的桌面', authName: 'desk' },
      //   { id: '2', title: '组织架构管理', title2: [{ id: '100', fun: '行政机构管理', authName: 'administration' }, { id: '101', fun: '企业单位管理', authName: 'unit' }] },
      //   { id: '3', title: '设备管理', title2: [{ id: '103', fun: '车载设备管理', authName: 'car' }, { id: '104', fun: '企业单位管理', authName: 'station' }] }

      // ]
    },
    handleOpen (key, keyPath) {
      console.log(key)
      if (key.indexOf('/') !== -1) {
        this.$router.push(key)
      }
    },
    // 头部导航默认选中
    handleSelect () {

    }
  },
  computed: {
    activeMenu () {
      return this.$route.path.substring(1)
    },
    navList () {
      return this.$store.state.navList
    }
  }
}
</script>

<style lang="less" scoped>
  // 整体布局样式
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
    text-align: center;
    display: flex;
    padding: 0 ;
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
  .oneMenu {
    background-color: rgb(51, 51, 51) !important;
    color: #fff !important;
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: #fff;
  }

</style>
