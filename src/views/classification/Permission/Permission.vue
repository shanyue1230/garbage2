<template>
  <div class="permission">
    <!-- 面包屑导航 -->
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item class="weight">功能权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 主体 -->
    <div class="main">
      <!-- tab栏 -->
      <el-tabs style="height: 100%;">
        <!--  -->
        <el-tab-pane label="员工角色分配">
          <div class="left">
            <div class="character">
              <span>全部角色</span>
              <span class="num">5 / 100</span>
            </div>
            <!-- 角色列表 -->
            <div class="aside">
              <ul class="external">
                <li v-for=" item in asideList" :key="item.id">
                  <div class="al">
                    {{item.title}}
                    <i
                      class="el-icon-circle-plus"
                      v-if="item.id === 1"
                      @click="isShowDialog"
                    ></i>
                  </div>
                  <ul>
                    <li v-for="line in item.children" :key="line.id">
                      <div class="icon" v-if="show == line.id">
                        <i class="el-icon-edit-outline"></i>
                        <i class="el-icon-delete-solid"></i>
                      </div>
                      <a
                        href="#"
                        :class="{display: show == line.id}"
                        @click="show1(line.id)"
                      >{{line.title2}}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="right">
            <!-- 查询条件表单 -->
            <el-form :model="formInline" class="demo-form-inline" label-width="90px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="所属公司：">
                    <el-select v-model="formInline.user" placeholder="活动区域">
                      <el-option label="上海西弗瑞环境科技有限公司" value="1"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="所属部门：">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                      <el-option label="全部" value="1"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                    <el-button type="primary">查询</el-button>
                    <el-button type="success" @click="isShowRoleDialog">配置角色</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <!-- 多选表格 -->
            <el-table
              ref="multipleTable"
              :data="tableList"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column label="昵称（系统名）">
                <template slot-scope="scope">{{ scope.row.jobNumber }}</template>
              </el-table-column>
              <el-table-column prop="department" label="所属部门" show-overflow-tooltip></el-table-column>
              <el-table-column prop="position" label="职位"></el-table-column>
              <el-table-column prop="character" label="所属角色"></el-table-column>
              <el-table-column label="操作" width="200">
                <el-button type="primary" size="small" round icon="el-icon-edit" plain>编辑</el-button>
                <el-button type="danger" size="small" round icon="el-icon-delete" plain>删除</el-button>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="角色权限设置">
          <div class="left">
            <div class="left">
              <div class="character">
                <span>全部角色</span>
                <span class="num">5 / 100</span>
              </div>
              <div class="aside">
                <ul class="external">
                  <li v-for=" item in asideList" :key="item.id">
                    <div class="al">
                      {{item.title}}
                      <i
                        class="el-icon-circle-plus"
                        v-if="item.id === 1"
                        @click="isShowDialog"
                      ></i>
                    </div>
                    <ul>
                      <li v-for="line in item.children" :key="line.id">
                        <div class="icon" v-if="show == line.id">
                          <i class="el-icon-edit-outline"></i>
                          <i class="el-icon-delete-solid"></i>
                        </div>
                        <a
                          href="#"
                          :class="{display: show == line.id}"
                          @click="show1(line.id)"
                        >{{line.title2}}</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="right">
            <!-- 角色权限设置 -->
            <div class="super">
              <h3>超级管理员</h3>
              <p>预设对应角色的操作功能权限</p>
            </div>
            <!-- 折叠面板 -->
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="组织架构管理" name="1">
                <div class="setting" @click="isShowPermission">设置字段权限</div>
                <!-- 多选框 -->
                <el-checkbox-group v-model="checkList1">
                  <el-checkbox label="新增"></el-checkbox>
                  <el-checkbox label="编辑"></el-checkbox>
                  <el-checkbox label="删除"></el-checkbox>
                  <el-checkbox label="停用"></el-checkbox>
                  <el-checkbox label="启用"></el-checkbox>
                </el-checkbox-group>
              </el-collapse-item>
              <el-collapse-item title="人员管理" name="2">
                <div class="setting" @click="isShowPermission">设置字段权限</div>
                <!-- 多选框 -->
                <el-checkbox-group v-model="checkList2">
                  <el-checkbox label="新增"></el-checkbox>
                  <el-checkbox label="编辑"></el-checkbox>
                  <el-checkbox label="删除"></el-checkbox>
                  <el-checkbox label="停用"></el-checkbox>
                  <el-checkbox label="启用"></el-checkbox>
                </el-checkbox-group>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 新建角色的对话框 -->
    <el-dialog class="dialog" title="新建角色" :visible.sync="dialogVisible" width="40%">
      <!-- form表单 -->
      <!-- 模态框选择器 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色分类：" prop="roleClass">
          <el-select v-model="ruleForm.roleClass" placeholder="请选择单位、部门或角色">
            <el-option label="管理角色" value="1"></el-option>
            <el-option label="行政角色" value="2"></el-option>
            <el-option label="业务角色" value="3"></el-option>
            <el-option label="后勤角色" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色名称： " prop="roleName">
          <el-input v-model="ruleForm.roleName" placeholder="最多20个中文字符"></el-input>
        </el-form-item>
        <el-form-item label=" 角色描述：" prop="reason">
          <!-- 日期选择器 -->
          <el-input
            class="textarea"
            type="textarea"
            :rows="6"
            resize="none"
            placeholder="字数不能超过50个字符"
            maxlength="50"
            show-word-limit
            v-model="ruleForm.reason"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 配置角色的对话框 -->
    <el-dialog title="配置角色" :visible.sync="rolesDialog" width="40%" class="rolesDialog">
      <!-- 配置角色的表单 -->
      <el-form
        :model="rolesForm"
        ref="rolesForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <!-- ------------------- -->
        <div class="info">
          <div class="account">
            <el-form-item label="所属单位：" prop="unit">
              <el-select v-model="rolesForm.unit" placeholder="请选择所属单位">
                <el-option label="上海西弗瑞环境科技有限公司" value="1"></el-option>
                <el-option label="上海西弗瑞环境科技有限公司" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" 所属部门：" prop="department">
              <el-select v-model="rolesForm.department" placeholder="请选择所属部门">
                <el-option label="合同工" value="1"></el-option>
                <el-option label="上海西弗瑞环境科技有限公司" value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <!-- ---------------- -->
        <div class="info">
          <div class="account">
            <el-form-item label="姓名：" prop="name">
              <el-select v-model="rolesForm.name" placeholder="请输入或选择姓名" filterable>
                <el-option label="上海西弗瑞环境科技有限公司" value="1"></el-option>
                <el-option label="上海西弗瑞环境科技有限公司" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item></el-form-item>
          </div>
        </div>
        <!-- 员工角色配置 -->
        <div class="config">员工角色配置</div>
        <el-form-item label="管理角色：" prop="management">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="超级管理员"></el-checkbox>
            <el-checkbox label="部门经理"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="行政角色：" prop="management">
          <el-checkbox v-model="checked">人事职员</el-checkbox>
        </el-form-item>
        <el-form-item label="业务角色：" prop="management"></el-form-item>
        <el-form-item label="后勤角色：" prop="management"></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rolesDialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置字段权限的对话框 -->
    <el-dialog title="设置字段权限" :visible.sync="permissionDialog" width="40%" class="permissionDialog">
      <div class="info">
        <p>说明：如果角色对当前对象设置了“新建”或“编辑”权限，带*号的必填字段默认设置为“读写”，不可设置为“只读”或“不可见”，否则会造成新建 / 编辑不成功。</p>
      </div>
      <!-- 多选框组 -->
          <el-form
          :model="radioForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="全选" prop="radio" class="oneItem">
            <el-radio-group v-model="radioForm.radio" @change="changeRadio">
              <el-radio :label="1">读写</el-radio>
              <el-radio :label="2">只读</el-radio>
              <el-radio :label="3">不可见</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- --------------- -->
          <el-form-item label="所属单位：" prop="unit">
            <el-radio-group v-model="radioForm.unit">
                    <el-radio :label="1">读写</el-radio>
                    <el-radio :label="2">只读</el-radio>
                    <el-radio :label="3">不可见</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- ------------ -->
        <el-form-item label="上级部门：" prop="department">
            <el-radio-group v-model="radioForm.department">
                    <el-radio :label="1">读写</el-radio>
                    <el-radio :label="2">只读</el-radio>
                    <el-radio :label="3">不可见</el-radio>
            </el-radio-group>
          </el-form-item>
                    <!-- ------------ -->
        <el-form-item label="部门名称：" prop="departmentName">
            <el-radio-group v-model="radioForm.departmentName">
                    <el-radio :label="1">读写</el-radio>
                    <el-radio :label="2">只读</el-radio>
                    <el-radio :label="3">不可见</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="permissionDialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableList: [
        {
          jobNumber: 'XFR01',
          position: '测试员',
          department: '测试部',
          character: '超级管理员'
        },
        {
          jobNumber: 'XFR01',
          position: '测试员',
          department: '测试部',
          character: '超级管理员'
        },
        {
          jobNumber: 'XFR01',
          position: '测试员',
          department: '测试部',
          character: '超级管理员'
        },
        {
          jobNumber: 'XFR01',
          position: '测试员',
          department: '测试部',
          character: '超级管理员'
        },
        {
          jobNumber: 'XFR01',
          position: '测试员',
          department: '测试部',
          character: '超级管理员'
        },
        {
          jobNumber: 'XFR01',
          position: '测试员',
          department: '测试部',
          character: '超级管理员'
        }
      ],
      ruleForm: {
        roleClass: '',
        roleName: '',
        reason: ''
      },
      rules: {
        roleClass: [
          {
            required: true,
            message: '请选择角色分类',
            trigger: ['blur', 'change']
          }
        ],
        roleName: [
          {
            required: true,
            message: '角色名称不可为空',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^[\u4e00-\u9fa5]{1,20}$/,
            message: '角色名称不能超过20个中文文字'
          }
        ],
        unit: [
          {
            required: true,
            message: '请选择所属单位',
            trigger: ['blur', 'change']
          }
        ],
        department: [
          {
            required: true,
            message: '请选择所属部门',
            trigger: ['blur', 'change']
          }
        ],
        name: [
          {
            required: true,
            message: '请输入或选择姓名',
            trigger: ['blur', 'change']
          }
        ],
        departmentName: [
          {
            required: true,
            message: '请选择部门名称',
            trigger: ['blur', 'change']
          }
        ]
      },
      rolesForm: {
        unit: '',
        department: '',
        name: ''
      },
      asideList: [
        {
          id: 1,
          title: '管理角色',
          children: [
            { id: 11, title2: '超级管理员' },
            { id: 12, title2: '部门经理' }
          ]
        },
        {
          id: 2,
          title: '行政角色',
          children: [{ id: 13, title2: '人事职员' }]
        },
        {
          id: 3,
          title: '业务角色'
        },
        {
          id: 4,
          title: '后勤角色'
        }
      ],
      checkList: [],
      checkList1: [],
      checkList2: [],
      checked: false,
      dialogVisible: false,
      rolesDialog: false,
      activeNames: ['1', '2'],
      show: 11,
      permissionDialog: false,
      radioForm: {
        radio: '',
        unit: '',
        department: '',
        departmentName: ''
      }
    }
  },
  methods: {
    isShowDialog () {
      this.dialogVisible = true
    },
    isShowRoleDialog () {
      this.rolesDialog = true
    },
    show1 (id) {
      this.show = id
    },
    isShowPermission () {
      this.permissionDialog = true
    },
    changeRadio (val) {
      this.radioForm.unit = val
      this.radioForm.department = val
      this.radioForm.departmentName = val
    }
  }
}
</script>

<style lang="less" scoped>
.permission {
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
    width: 100%;
    // tab栏
    .el-tabs {
      width: 100%;

      /deep/ .el-tabs__header {
        margin: 0;
        padding-left: 20px;
        background-color: #fff;
      }
      /deep/ .el-tabs__content {
        width: 100%;

        .el-tab-pane {
          width: 100%;
          display: flex;
          overflow: hidden;
          .left {
            flex: 1;
            height: 100%;
            background-color: #fff;
            margin-right: 3px;
            .character {
              height: 40px;
              padding: 10px 20px;
              box-sizing: border-box;
              border-bottom: 1px solid #ccc;
              span {
                font-size: 14px;
              }
              .num {
                color: #ccc;
                margin-left: 80px;
              }
            }
            .aside {
              .external {
                list-style: none;

                li {
                  .al {
                    height: 50px;
                    line-height: 50px;
                    margin-left: 20px;
                    color: #ccc;
                    position: relative;
                    i {
                      position: absolute;
                      top: 18px;
                      right: 15px;
                      color: #000;
                      cursor: pointer;
                    }
                  }
                  ul {
                    list-style: none;

                    li {
                      position: relative;
                      .icon {
                        position: absolute;
                        top: 13px;
                        right: 15px;
                        cursor: pointer;
                        // display: none;
                      }
                      a {
                        display: block;
                        height: 50px;
                        line-height: 50px;
                        padding-left: 40px;
                        text-decoration: none;
                        color: #000;
                      }
                    }
                  }
                }
              }
            }
          }
          .right {
            flex: 6;
            height: 800px;
            padding: 0 20px;
            box-sizing: border-box;
            background-color: #fff;
            overflow: hidden;
            .el-form {
              margin-top: 30px;
              /deep/ .el-form-item {
                .el-form-item__label {
                  text-align: left;
                }
                .el-form-item__content {
                  .el-select {
                    .el-input__inner {
                      text-overflow: ellipsis;
                      overflow: hidden;
                    }
                  }
                }
              }
            }
            // 表格样式
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
            // 角色权限设置
            .super {
              margin-top: 30px;
              margin-bottom: 30px;
              h3 {
                font-weight: 400;
                margin-bottom: 8px;
                color: #000;
              }
              p {
                font-size: 12px;
              }
            }
            // 折叠面板样式
            /deep/ .el-collapse {
              border-bottom: none;
              border-top: none;
              .el-collapse-item {
                position: relative;
                .el-collapse-item__header {
                  width: 30%;
                  border-bottom: 1px solid #ccc;
                  font-size: 18px;
                }
                /deep/ .el-collapse-item__wrap {
                  border-bottom: none;
                }
                .setting {
                  color: #409eff;
                  font-size: 12px;
                  cursor: pointer;
                  margin-left: 150px;
                  position: absolute;
                  top: 15px;
                  left: 0;
                }
                .setting:hover {
                  color: #333;
                }
                .el-checkbox-group {
                  margin-top: 30px;
                  margin-bottom: 30px;
                  .el-checkbox {
                    margin-right: 100px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // 新增对话框的样式
  .dialog {
    /deep/ .el-dialog__body {
      padding: 30px 120px;
      .el-form-item {
        width: 100%;
        .el-form-item__content {
          .el-select {
            width: 100%;
          }
          /deep/ .el-input {
            width: 100%;
            .el-input__inner {
              width: 100%;
            }
          }
        }
      }
    }
  }
  // 配置角色的对话框的样式
  .rolesDialog {
    /deep/.el-dialog__body {
      padding: 15px;
      .info {
        .account {
          display: flex;
          .el-form-item {
            flex: 1;
            margin: 0;
            /deep/ .el-form-item__label {
              margin-left: 20px;
              text-align: left;
            }
            /deep/ .el-form-item__content {
              height: 62px;
              margin-left: 0px;
              margin: 18px !important;
              .el-input {
                .el-input__inner {
                  width: 100%;
                }
              }
              .el-select {
                width: 100%;
                .el-input {
                  width: 100%;
                  .el-input__inner {
                    width: 100%;
                  }
                }
              }
            }
          }
        }
      }
      .config {
        height: 40px;
        line-height: 40px;
        margin: 0 20px;
        color: #ccc;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
      }
    }
  }
  .display {
    background-color: #b4bbc5;
    border-right: 4px solid #333;
  }
  // 设置字段权限的对话框样式
  .permissionDialog {
   /deep/ .el-dialog__body {
      padding: 15px;
  .info {
      // height: 80px;
      padding: 20px;
      background-color: rgb(149, 195, 216);
      border: 1px solid rgb(87, 162, 224);
      border-radius: 5px;
      p {
        color: #666;
      }
    }
    }

  }
  .el-form {
   /deep/ .el-form-item__label {
      text-align: left;
    }
  }
  .oneItem {
    margin-top: 20px;
    padding-bottom: 10px;
    border-bottom:1px solid #ccc;
    .el-radio {
      margin-right: 40px;
    }
  }
  .el-form-item {
        .el-radio {
      margin-right: 40px;
    }
  }
}
</style>
