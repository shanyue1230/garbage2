import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 侧边栏导航数据
    navList: [
      { id: '1', title: '我的桌面', authName: 'desk' },
      { id: '2', title: '组织架构管理', title2: [{ id: '100', fun: '行政机构管理', authName: 'administration' }, { id: '101', fun: '企业单位管理', authName: 'unit' }] },
      { id: '3', title: '设备管理', title2: [{ id: '103', fun: '车载设备管理', authName: 'car' }, { id: '104', fun: '小压站设备管理', authName: 'station' }] }
    ]
  },
  mutations: {
    // 更改侧边栏数据
    changeNav (state) {
      state.navList = [
        { id: '6', title: '我的桌面', authName: 'desk' },
        { id: '7', title: '许可证管理', authName: 'vehicle' },
        { id: '8', title: '套餐管理', authName: 'sanitation' },
        { id: '9', title: '工作流管理', authName: 'personnel' },
        { id: '10', title: '任务提醒管理', authName: 'organization' }
      ]
    },
    // 侧边栏切换到基础信息
    toNormal (state) {
      state.navList = [
        { id: '1', title: '我的桌面', authName: 'desk' },
        { id: '2', title: '组织架构管理', title2: [{ id: '100', fun: '行政机构管理', authName: 'administration' }, { id: '101', fun: '企业单位管理', authName: 'unit' }] },
        { id: '3', title: '设备管理', title2: [{ id: '103', fun: '车载设备管理', authName: 'car' }, { id: '104', fun: '小压站设备管理', authName: 'station' }] }
      ]
    }
  },
  actions: {
  },
  modules: {
  }
})
