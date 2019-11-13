<template>
  <div class="organization">
      <!-- 面包屑导航 -->
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>业务配置</el-breadcrumb-item>
        <el-breadcrumb-item class="weight">任务提醒管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 主体 -->
    <div class="major">

      <!-- 表单元素 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <!-- 所属单位 -->
        <el-form-item label="所属单位:">
          <el-input v-model="formInline.unit" placeholder="审批人"></el-input>
        </el-form-item>
        <!-- 事件类型 -->
        <el-form-item label="事件类型:" label-width="100px">
          <el-select v-model="formInline.type" placeholder="全部">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="正常" value="正常"></el-option>
            <el-option label="停用" value="停用"></el-option>
          </el-select>
        </el-form-item>
        <!-- 绑定事件 -->
        <el-form-item label="绑定事件:" label-width="100px">
          <el-select v-model="formInline.binding" placeholder="全部">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="正常" value="正常"></el-option>
            <el-option label="停用" value="停用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="success" @click="showAddTask">新增</el-button>
      <el-button type="danger">全部删除</el-button>

       <!-- 表格 -->
      <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="{background:'rgba(229, 233, 242, 1)',color:'#000',fontWeight:'400'}"
          >
          <el-table-column
            type="selection"
            >
          </el-table-column>
          <el-table-column
            prop="number"
            label="所属单位"
            >
          </el-table-column>
          <el-table-column
            prop="license"
            label="事件类型"
            >
          </el-table-column>
          <el-table-column
            prop="type"
            label="绑定事件"
            >
          </el-table-column>
           <el-table-column
            prop="instal"
            label="对象类型"
            >
          </el-table-column>
           <el-table-column
            prop="protect"
            label="所属业务"
            >
          </el-table-column>
           <el-table-column
            prop="operate"
            label="操作"
            width="220"
            >
            <template>
              <el-button type="primary" plain round size="mini" icon="el-icon-edit">编辑</el-button>
              <el-button type="danger" plain round size="mini" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
      </el-table>

      <!-- 新增任务提醒对话框 -->
      <el-dialog title="新增任务提醒" :visible.sync="dialogFormVisible" width="40%">
          <el-form :inline="true" label-width="100px" ref="Form" :model="formTaskList"  label-position="left">
            <div class="boxing">
              <div class="aside">
                  <!-- 所属单位 -->
                  <el-form-item label="所属单位:" prop="unit">
                    <el-select v-model="formTaskList.unit" placeholder="请选择所属单位" style="width:100%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- 绑定事件 -->
                  <el-form-item label="绑定事件:" prop="system">
                    <el-select v-model="formTaskList.system" placeholder="请选择活动区域" style="width:100%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- 发布对象类型 -->
                  <el-form-item label="发布对象类型:" prop="type">
                    <el-input type="text" v-model="formTaskList.type"></el-input>
                  </el-form-item>
              </div>
              <div class="other">
                <!-- 事件类型 -->
                <el-form-item label="事件类型:" prop="appellation">
                    <el-select v-model="formTaskList.appellation" placeholder="请选择活动区域" style="width:100%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 预设事件(天) -->
                <el-form-item label="预设事件(天):">
                  <el-input-number v-model="formTaskList.num" controls-position="right" :min="1" :max="356" style="width:100%"></el-input-number>
                </el-form-item>
              </div>
            </div>
            <!-- 发布对象 -->
            <el-form-item label="发布对象:" label-width="100%">
              <el-transfer
                v-model="formTaskList.value"
                :props="{
                  key: 'value',
                  label: 'desc'
                }"
                :data="data"
                :button-texts="['到左边', '到右边']"
                :titles="['角色', '角色']">
              </el-transfer>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false" style="marginRight: 10px">取 消</el-button>
            <el-button type="primary" >保 存</el-button>
          </div>
      </el-dialog>

      <!-- 分页 -->
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[20, 40, 60, 80]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
  // 发布对象数据
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 3; i++) {
        data.push({
          value: i,
          desc: `备选项 ${i}`
        })
      }
      return data
    }
    return {
      currentPage4: 1,
      formInline: {
        unit: '',
        type: '',
        binding: ''
      },
      // 对话框标题
      title: '',
      labelPosition: 'right',
      // 表格数据
      tableData: [{
        number: '0032949',
        license: '沪EL0093',
        type: '主机',
        instal: '2019.09.18',
        protect: '2022.09.17'
      },
      {
        number: '0032949',
        license: '沪EL0093',
        type: '主机',
        instal: '2019.09.18',
        protect: '2022.09.17'
      },
      {
        number: '0032949',
        license: '沪EL0093',
        type: '主机',
        instal: '2019.09.18',
        protect: '2022.09.17'
      }
      ],
      dialogFormVisible: false,
      // 新增任务提醒对话框数据
      formTaskList: {
        unit: '',
        system: '',
        appellation: '',
        type: '',
        num: '',
        value: []
      },
      // 发布对象数据
      data: generateData()

      // value: [1]
      // value4: [1]
    }
  },
  methods: {
    onSubmit () {

    },
    // 显示新增任务提醒对话框
    showAddTask () {
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
 .organization {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .nav {
    height: 50px;
    box-sizing: border-box;
    background-color: #fff;
    padding: 0 20px;
    margin-top: 2px;
    line-height: 50px;
    padding-top:18px;

  }
  /deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner{
      font-weight: 700;
  }
  /deep/.el-breadcrumb__inner {
    font-size: 12px;
  }
  .major {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px 20px;
    text-align: left;
    .el-form {
      text-align: left;
    }
  }
  .el-table {
    margin-top: 5px;
  }
  /deep/.cell {
    max-height: 30px!important;
  }
  .el-pagination {
    text-align: center;
  }

  // 新增对话框样式
  /deep/.el-dialog__body {
     padding: 10px 30px;
  }
  /deep/.el-dialog__header {
     padding: 10px 30px;
  }
  .el-dialog {
    text-align: left;
  /deep/.el-form-item__label {
    line-height: 25px;
    font-size: 13px;

  }
  /deep/.el-select>.el-input {
    height: 30px;
  }
  /deep/.el-input__icon {
    line-height: 30px;
    height: 30px;
  }
  .dialog-footer {
    text-align: center;
  }

  .el-form {
    .boxing {
      display: flex;
      /deep/.el-input__inner {
        padding-right: 30px;
        padding-left: 30px;
      }
      /deep/.el-form-item__label {
        width: 120px!important;
        text-align: left;
      }
      .el-input {
        width: 100%;
      }
      .el-form-item {
        margin-bottom: 10px;
      }
      /deep/.el-form-item__content {
        width: 100%;
      }
      .el-checkbox {
        height: 25px;
      }
      .aisle {
        height: 80px;
        /deep/.el-form-item__content {
          height: 80px;
          line-height: 20px;
        }
      }
      .aside {
        flex: 1;
      }
      .other {
        flex: 1;
        margin-left: 5px;
        .Package {
          height: 40px;
          line-height: 40px;
          width: 100%;
          background-color: rgba(51, 51, 51, 1);
          margin-top: 20px;
          color: #fff;
          padding-left: 15px;
        }
        .Package-item {
          padding: 15px;
        }
      }
    }
  }
}
// 修改穿梭框内容列表空格问题
.el-transfer {
  /deep/.el-transfer-panel__list {
    line-height: 0;
  }
  /deep/.el-transfer-panel .el-transfer-panel__header {
    background-color: rgba(51, 51, 51, 1);
  }
  /deep/.el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label {
    color: #fff;
  }
}
</style>
