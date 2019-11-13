<template>
  <div class="vehicle">
     <!-- 面包屑导航 -->
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>业务配置</el-breadcrumb-item>
        <el-breadcrumb-item class="weight">许可证管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 主体 -->
    <div class="major">

      <!-- 表单元素 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="许可证名称:">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="所属单位:">
          <el-select v-model="formInline.state" placeholder="全部">
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
      <el-button type="success" @click="showAddDialog">新增</el-button>
      <el-button type="danger">全部删除</el-button>

      <!-- 新增对话框 -->
      <el-dialog title="新建许可证" :visible.sync="dialogFormVisible" width="40%">
          <el-form :inline="true" label-width="100px" ref="Form" :model="formCarList">
            <div class="aside">
              <!-- 所属单位 -->
              <el-form-item label="所属单位:" prop="unit">
                <el-select v-model="formCarList.unit" placeholder="请选择所属单位" style="width:100%">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 有效期 -->
              <el-form-item  label="有效期至:" prop="maintenance" class="validity">
                  <el-date-picker
                    v-model="formCarList.maintenance"
                    type="date"
                    placeholder="选择日期"
                    style="width: 75%; marginRight: 3px"
                    >
                  </el-date-picker>
                  <el-button type="success">续期</el-button>
              </el-form-item>
              <!-- 用户数上限 -->
              <el-form-item  label="用户数上限:" prop="maintenance">
                <el-input-number v-model="formCarList.num" controls-position="right" @change="handleChange" :min="1" :max="10" style="width:100%"></el-input-number>
              </el-form-item>
              <!-- IP地址 -->
               <el-form-item  label="IP地址:" prop="maintenance">
                <el-input v-model="formCarList.num" style="width:100%"></el-input>
              </el-form-item>
            </div>
            <div class="other">
              <!-- 产品套餐 -->
              <div class="Package">产品套餐</div>
              <el-checkbox-group v-model="formCarList.checkList">
                <div class="Package-item">
                 <el-checkbox label="复选框 A">虹口-环卫综合管理平台</el-checkbox>
                </div>
                <div class="Package-item">
                 <el-checkbox label="复选框 B">虹口-监控指挥中心</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false" style="marginRight: 10px">取 消</el-button>
            <el-button type="primary" >保 存</el-button>
          </div>
      </el-dialog>

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
            label="许可证名称"
            >
          </el-table-column>
          <el-table-column
            prop="type"
            label="许可套餐"
            >
          </el-table-column>
           <el-table-column
            prop="instal"
            label="人数上限"
            >
          </el-table-column>
           <el-table-column
            prop="protect"
            label="到期日"
            >
          </el-table-column>
           <el-table-column
            prop="state"
            label="状态"
            >
            <template v-slot="scope">
              <div v-if="scope.row.state == '已停用'" class="box">
                 <span class="state" style="background:red"></span>
                 已停用
              </div>
              <div v-else-if="scope.row.state == '使用中'" class="box">
                 <span class="state" style="background:green"></span>
                 使用中
              </div>
              <div v-else class="box">
                 <span class="state" style="background:orange"></span>
                 维修中
              </div>
              <!-- {{scope}} -->
            </template>
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
    return {
      // value: '',
      currentPage4: 1,
      formInline: {
        user: '',
        state: ''
      },
      // 对话框标题
      title: '',
      // 表格数据
      tableData: [{
        number: '0032949',
        license: '沪EL0093',
        type: '主机',
        instal: '2019.09.18',
        protect: '2022.09.17',
        state: '已停用'
      },
      {
        number: '0032949',
        license: '沪EL0093',
        type: '主机',
        instal: '2019.09.18',
        protect: '2022.09.17',
        state: '使用中'
      },
      {
        number: '0032949',
        license: '沪EL0093',
        type: '主机',
        instal: '2019.09.18',
        protect: '2022.09.17',
        state: '维修中'
      }
      ],
      // 增加对话框数据
      formCarList: {
        checkList: []
      },
      // 编辑对话框数据
      // editFormList: {
      // },
      dialogFormVisible: false,
      // EditFormVisible: false,
      labelPosition: 'right',

      // 表单验证
      ruleForm: {
        urban: [
          { required: true, message: '请选择行政市区', trigger: 'blur' }
        ],
        classify: [
          { required: true, message: '请选择机构分类', trigger: 'blur' }
        ],
        naming: [
          { required: true, message: '请输入机构名称', trigger: ['blur', 'change'] },
          { min: 2, message: '至少输入2位字符', trigger: ['blur', 'change'] },
          { validator: this.validcodeName, trigger: ['blur', 'change'] }
        ],
        coding: [
          { pattern: /^\d{3}/, message: '至少输入3位数字', trigger: ['blur', 'change'] }
        ]
      }

    }
  },
  methods: {
    onSubmit () {

    },
    // 展示新增对话框
    showAddDialog () {
      this.dialogFormVisible = true
      this.title = '新建行政机构'
      // 重置表单
      this.$nextTick(() => {
        this.$refs.Form.resetFields()
      })
    },
    // 展示编辑对话框

    // 自定义表单校验
    validcodeName (rule, value, callback) {
      // console.log(value)
      // let reg = /\w{2}/
      // if (!reg.test(value)) {
      //   return callback(new Error('请输入2位以上字符'))
      // } else
      // 验证机构名称是否已存在
      if (value === '111') {
        return callback(new Error('名称已存在'))
      }
      callback()
    },
    // 提交表单功能
    async submitForm () {
      console.log(this.$refs.Form)
      // 表单校验
      try {
        const valid = await this.$refs.Form.validate()
        console.log(valid)
      } catch (err) {
        return console.log(err)
      }
    },
    // 校验机构名称
    toInform () {
    },
    // 用户上限
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="less" scoped >
   .vehicle {
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
    padding: 10px 60px;
  }
  // 状态显示样式
   .box {
        vertical-align: center;
        position: relative;
        padding-left: 10px;
        .state {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%)
        }
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
        display: flex;
          // /deep/.el-input__inner {
          //   height: 30px;
          //   line-height: 30px;
          // }
          /deep/.el-input__inner {
            padding-right: 30px;
            padding-left: 30px;
          }
          /deep/.el-form-item__label {
            width: 120px!important;
            text-align: left;
          }
          // /deep/.el-input-number__decrease, .el-input-number__increase {
          //   height: 14px;
          //   box-sizing: border-box;
          //   top: 19px;
          // }
          // /deep/.el-input-number.is-controls-right .el-input-number__increase {
          //   height: 14px;
          //   top: 5px;
          //   box-sizing: border-box;
          // }
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
          // .maintenance {
          //   /deep/.el-form--inline .el-form-item__content {
          //     display: flex!important;
          //   }
          // }
          // /deep/.renewal {
          //   flex: 4;
          // }
          // /deep/.data {
          //   flex: 10;
          // }
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
</style>
