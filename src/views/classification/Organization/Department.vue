<template>
  <div class="department">
    <!-- 面包屑导航 -->
     <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>基础信息</el-breadcrumb-item>
        <el-breadcrumb-item>组织架构管理</el-breadcrumb-item>
        <el-breadcrumb-item class="weight">部门管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <div class="select">
        <!-- 行内表单 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="所属单位:">
            <el-select v-model="formInline.unit" placeholder="全部">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门名称 :">
            <el-input v-model="formInline.names" placeholder="请输入部门名称"></el-input>
          </el-form-item>
          <el-form-item label="上级部门:">
            <el-select v-model="formInline.superior" placeholder="请选择上级部门">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button type="info">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="increase">
        <el-button class="leftBtn" type="success" @click="isShowDialog">新增</el-button>
        <el-button class="rightBtn" type="primary">导出</el-button>
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        lazy
        :tree-props="{children: 'children', hasChildren: 'Children'}"
      >
        <el-table-column prop="departname" label="部门名称" width="180"></el-table-column>
        <el-table-column prop="higher" label="上级部门"></el-table-column>
        <el-table-column prop="departType" label="部门类型"></el-table-column>
        <el-table-column prop="num" label="人数"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope" >
          <el-button type="primary" size="small" round icon="el-icon-edit" plain @click="isShowEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" round  icon="el-icon-delete" plain>删除</el-button>
           </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40"
      ></el-pagination>
      <!-- 模态框 -->
      <el-dialog ref="Dialog" :title="title" :visible.sync="newDialog" width="30%" @close="resetForm('ruleForm')">
        <!-- 模态框选择器 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="所属单位 :" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择">
              <el-option label="上海西弗瑞环境科技有限公司" value="1"></el-option>
              <el-option label="上海西弗瑞环境科技有限公司" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上级部门 :" prop="superior">
            <el-select v-model="ruleForm.superior" placeholder="请选择">
              <el-option label="无" value="1"></el-option>
              <el-option label="有" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门类型 :" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择">
              <el-option label="管理" value="1"></el-option>
              <el-option label="行政" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门名称 :" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请选择部门名称"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          id: 1,
          departname: '总经理室',
          higher: '无',
          departType: '管理',
          num: '1',
          children: [
            {
              id: 2,
              departname: '行政部',
              higher: '总经理室',
              departType: '行政',
              num: '12'
            },
            {
              id: 3,
              departname: 'IT事业部',
              higher: '无',
              departType: '业务',
              num: '22'
            },
            {
              id: 4,
              departname: '技术部',
              higher: '无',
              departType: '业务',
              num: '10'
            },
            {
              id: 5,
              departname: '后勤部',
              higher: '无',
              departType: '后勤',
              num: '4'
            }
          ]
        }
      ],
      newDialog: false,
      ruleForm: {
        name: '',
        region: '',
        superior: '',
        type: ''
      },
      formInline: {
        unit: '',
        names: '',
        superior: ''
      },
      value1: '',
      title: '新建部门',
      row: '',
      form: '',
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择所属单位', trigger: 'change' }
        ],
        superior: [
          { required: true, message: '请选择上级部门', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择部门类型', trigger: 'change' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    isShowDialog () {
      this.newDialog = true
      this.title = '新建部门'
      this.ruleForm.region = ''
      this.ruleForm.superior = ''
      this.ruleForm.type = ''
      this.ruleForm.name = ''
    },
    isShowEdit (row) {
      this.newDialog = true
      this.title = '编辑部门'
      console.log(row)
      this.row = row
      this.ruleForm.region = row.id.toString()
      this.ruleForm.superior = row.id.toString()
      this.ruleForm.type = row.id.toString()
      this.ruleForm.name = row.departname
    },
    submitForm (formName) {
      if (this.title === '新建部门') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.tableData[0].children.push({
              id: new Date(),
              departname: this.ruleForm.name,
              departType: this.ruleForm.type,
              higher: this.ruleForm.superior
            })
            this.newDialog = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        // this.tableData = this.tableData.map((v, i) => {
        //   console.log(v, i)
        // })
        console.log(this.row)
        if (this.row.children) {
          this.tableData[0].departname = this.ruleForm.name
          this.tableData[0].higher = this.ruleForm.superior
          this.tableData[0].departType = this.ruleForm.type
          this.newDialog = false
        } else {
          this.tableData[0].children.forEach(v => {
            if (v.id === this.row.id) {
              this.tableData[0].children.departname = this.ruleForm.name
              this.tableData[0].children.higher = this.ruleForm.superior
              this.tableData[0].children.departType = this.ruleForm.type
              this.newDialog = false
            }
          })
        }
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.newDialog = false
    }
  }
}
</script>

<style lang="less" scoped>
.department {
  width: 100%;
  height: 100%;
     .nav {
    height: 50px;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 0 20px;
    margin-top: 2px;
    line-height: 50px;
    box-sizing: border-box;
    padding-top:18px;
  }
  /deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner{
      font-weight: 700;
  }
  /deep/.el-breadcrumb__inner {
    font-size: 12px;
  }
  .main {
    background-color: #fff;
    padding: 10px 20px;
    margin-top: 10px;
    .select {
      height: 60px;
      text-align: left;
      .el-form {
        .el-form-item {
          margin-right: 10px;
          margin-bottom: 22px;
        }
      }
    }
    .increase {
      height: 40px;
      .leftBtn {
        float: left;
      }
      .rightBtn {
        float: right;
      }
    }
  /deep/ .el-table {
      margin-top: 5px;
      margin-bottom: 20px;
     /deep/ .el-table__header-wrapper {
  /deep/ .el-table__header {

       /deep/  .has-gutter {
         tr {
           th {
             background-color: rgba(229, 233, 242, 1) !important;
               color: #333 !important;
           }

         }

         }

       }

      }
    }
    .el-pagination {
     text-align: center;
      // margin-top: 10px;
    }
    .el-dialog {
      border-radius: 5px;
      text-align: left;
      .el-dialog__body {
        padding: 30px 80px 30px 80px;
        .el-form {
          .el-form-item {
            .el-form-item__content {
              .el-select {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
