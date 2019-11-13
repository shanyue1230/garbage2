<template>
  <div class="dataPermission">
    <!-- 面包屑导航 -->
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item class="weight">功能权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 主体 -->
    <div class="main">
      <el-tabs style="height: 200px;">
        <el-tab-pane label="基础数据权限">
          <div class="dataType">
            <div class="description">
              <h3>说明</h3>
              <p>1. 私有：对象中所有数据遵循相关团队成员（包括负责人）及其上级对数据可见，且对这条数据具备同样的权限（只读、可编辑）；上级部门或企业的负责人可以看到下级部门或企业的所有数据。</p>
              <p>2. 公开只读：对象中所有数据对全公司公开。单条数据的负责人及其上级、以及相关团队具备编辑权限的成员可以编辑改数据。</p>
              <p>3. 公开读写：对象中所有数据对全公司公开，全员可编辑。</p>
            </div>
            <!-- 表格 -->
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="data" label="数据类型" width="400px"></el-table-column>
              <el-table-column label="权限">
                <template v-slot="scope">
                  <el-radio-group v-model="scope.row.radio">
                    <el-radio :label="3">私有</el-radio>
                    <el-radio :label="6">公开只读</el-radio>
                    <el-radio :label="9">公开读、写</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
            </el-table>
            <div class="btn">
              <el-button type="success">保存</el-button>
              <el-button type="danger">恢复默认</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据权限共享">
          <div class="dataSharing">
            <div class="left">
              <div class="all">全部数据共享</div>
              <div class="management">
                <div class="item">组织架构管理</div>
                <div class="item">员工管理</div>
                <div class="item">车辆管理</div>
                <div class="item">设备管理</div>
              </div>
            </div>
            <div class="right">
              <!-- 共享范围 -->
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="共享范围：">
                  <el-select
                    v-model="formInline.region"
                    placeholder="搜索或选择单位、部门、角色"
                    style="width: 250px"
                  >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">查询</el-button>
                  <el-button type="info">重置</el-button>
                </el-form-item>
              </el-form>
              <el-button type="success" @click="isShowDialog">新建共享规则</el-button>
              <!-- 多选表格 -->
              <el-table
                ref="multipleTable"
                :data="tableList"
                tooltip-effect="dark"
                style="width: 100%"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="data" label="共享数据"></el-table-column>
                <el-table-column prop="range" label="共享范围" show-overflow-tooltip></el-table-column>
                <el-table-column prop="permission" label="共享权限"></el-table-column>
                <el-table-column label="状态">
                   <template v-slot="{row}">
                  <div class="box" v-if="row.status">
                    <span class="state" style="background:green"></span>
                    使用中
                  </div>
                 <div class="box" v-if="!row.status">
                     <span class="state"  style="background:red"></span>
                     已停用
                   </div>
                   </template>
                </el-table-column>
                <el-table-column label="操作" width="250">
                       <template v-slot="{row}">
                  <el-button type="primary" size="small" round icon="el-icon-edit" plain>编辑</el-button>
                  <!-- 开关禁用启用 -->
                  <el-switch  v-model="row.value" active-color="#13ce66" inactive-color="#ff4949" @change="variety($event,row.id)"></el-switch>
                  <el-button type="danger" size="small" round icon="el-icon-delete" plain>删除</el-button>
                      </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 新建共享规则的对话框 -->
    <el-dialog
        title="新建共享规则"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
           <!-- 模态框选择器 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="数据来源于 :" prop="source">
            <el-select v-model="ruleForm.source" placeholder="请选择单位、部门或角色">
              <el-option label="上海西弗瑞环境科技有限公司" value="1"></el-option>
              <el-option label="上海西弗瑞环境科技有限公司" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="共享的数据 :" prop="shared">
            <el-select v-model="ruleForm.shared" placeholder="请选择共享的数据">
              <el-option label="无" value="1"></el-option>
              <el-option label="有" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据共享到 :" prop="toplace">
            <el-select v-model="ruleForm.toplace" placeholder="请选择单位、部门或角色">
              <el-option label="管理" value="1"></el-option>
              <el-option label="行政" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="共享后的权限 :" prop="radio">
              <el-radio v-model="ruleForm.radio" label="1">读写</el-radio>
                <el-radio v-model="ruleForm.radio" label="2">只读</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          data: '组织架构管理',
          radio: 3
        },
        {
          data: '员工管理',
          radio: 3
        },
        {
          data: '车辆管理',
          radio: 3
        },
        {
          data: '设备管理',
          radio: 3
        }
      ],
      formInline: {
        region: ''
      },
      tableList: [
        {
          id: 1,
          data: '员工管理',
          range: '上海西弗瑞环境科技有限公司',
          permission: '只读',
          status: true,
          value: false
        },
        {
          id: 2,
          data: '员工管理',
          range: '人事部、产品部、总经理办公室',
          permission: '只读',
          status: true,
          value: false
        },
        {
          id: 3,
          data: '车辆管理',
          range: '上海西弗瑞环境科技有限公司',
          permission: '只读',
          status: false,
          value: true
        },
        {
          id: 4,
          data: '车辆管理',
          range: '车管部、总经理办公室',
          permission: '只读',
          status: false,
          value: true
        }
      ],
      dialogVisible: false,
      ruleForm: {
        radio: '',
        source: '',
        shared: '',
        toplace: ''
      },
      rules: {
        source: [
          { required: true, message: '请选择单位、部门或角色', trigger: 'change' }
        ],
        shared: [
          { required: true, message: '请选择共享的数据', trigger: 'change' }
        ],
        toplace: [
          { required: true, message: '请选择单位、部门或角色', trigger: 'change' }
        ],
        radio: [
          { required: true, message: '请选择部门类型', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    variety (val, id) {
      this.tableList.filter(item => item.id === id)[0].status = !val
    },
    isShowDialog () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.dataPermission {
  width: 100%;
  .nav {
    height: 50px;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 0 20px;
    margin-top: 2px;
    line-height: 50px;
    box-sizing: border-box;
    padding-top: 18px;
  }
  /deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner {
    font-weight: 700;
  }
  /deep/.el-breadcrumb__inner {
    font-size: 12px;
  }
  .main {
    margin-top: 3px;
    height: 800px;
    .el-tabs {
      height: 100%;

      /deep/ .el-tabs__header {
        background-color: #fff;
        // padding-left: 20px;
        margin: 0;
        .el-tabs__nav-scroll {
          padding-left: 20px;
        }
      }

      .dataType {
        height: 100%;
        background-color: #fff;
        padding: 20px 20px 0 20px;
        .description {
          padding: 15px;
          background-color: #84d3dd;
          border-radius: 5px;
          h3 {
            color: #333;
            font-weight: 400;
            font-size: 24px;
          }
          p {
            height: 24px;
            font-size: 12px;
            line-height: 24px;
            color: #666;
          }
        }
        /deep/ .el-table {
          margin-top: 20px;
          margin-bottom: 20px;
          /deep/ .el-table__header-wrapper {
            /deep/ .el-table__header {
              /deep/ .has-gutter {
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
        .btn {
          float: right;
        }
      }
      .dataSharing {
        display: flex;
        height: 100%;
        .left {
          flex: 2;
          background-color: #fff;
          margin-right: 3px;
          height: 800px;
          .all {
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            border-bottom: 1px solid #ccc;
            box-sizing: border-box;
            font-size: 14px;
          }
          .management {
            .item {
              height: 45px;
              line-height: 45px;
              font-size: 14px;
              cursor: pointer;
              padding-left: 20px;
            }
            .item:hover {
              background-color: rgba(242, 242, 242, 2);
              border-right: 3px solid #333;
            }
          }
        }
        .right {
          flex: 12;
          background-color: #fff;
          // height: 300px;
          padding: 30px 20px 0 20px;
          box-sizing: border-box;
           overflow: hidden;
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
          /deep/ .el-table {
            margin-top: 5px;
            margin-bottom: 20px;
            /deep/ .el-table__header-wrapper {
              /deep/ .el-table__header {
                /deep/ .has-gutter {
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
        }
      }
    }
  }
 /deep/ .el-dialog {
    .el-dialog__body {
      padding: 30px 120px;
      .el-form {
        .el-form-item {
          .el-form-item__label {
            text-align: right;
          }
          .el-form-item__content {
            .el-select {
              width: 100%;
              .el-input {
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
