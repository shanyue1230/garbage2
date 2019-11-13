<template>
  <div class="sanitation">
     <!-- 面包屑导航 -->
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>业务配置</el-breadcrumb-item>
        <el-breadcrumb-item class="weight">套餐管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 主体 -->
    <div class="major">
      <div class="left">
        <div class="title">套餐列表
          <i class="el-icon-plus" @click="addPackage"></i>
        </div>
        <div class="line"></div>
        <!-- 公司 -->
        <div class="company">
          <el-input v-model="input" placeholder="请搜索"></el-input>
          <ul>
            <li v-for="(item, index) in companyList" :key="index" @click="isSelected(index)" :class="{componypackage:index==current}">
              <div ref="radioLine" :class="{radioLine:index==current}"></div>
              <div class="package-list"> {{item.title}} </div>
              <div class="operate">
                <i :class="{'el-icon-edit-outline':index == current}"></i>
                <i :class="{'el-icon-delete-solid':index == current}"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="title">
          <div class="title-top">虹口 - 环卫综合管理平台</div>
          <div class="dec">预设所有对象的操作功能权限</div>
        </div>
        <!-- 套餐权限表 -->
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="组织架构管理" name="1">
            <!-- 设置字段权限 -->
            <div class="setting" @click="showPermissions">设置字段权限</div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="新增"></el-checkbox>
              <el-checkbox label="编辑"></el-checkbox>
              <el-checkbox label="删除"></el-checkbox>
              <el-checkbox label="停用"></el-checkbox>
              <el-checkbox label="启用"></el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item title="人员管理" name="2">
            <!-- 设置字段权限 -->
            <div class="setting">设置字段权限</div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="新增"></el-checkbox>
              <el-checkbox label="编辑"></el-checkbox>
              <el-checkbox label="删除"></el-checkbox>
              <el-checkbox label="停用"></el-checkbox>
              <el-checkbox label="启用"></el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
        </el-collapse>

      <!-- 新增套餐对话框 -->
      <el-dialog title="新增套餐" :visible.sync="dialogFormVisible" width="40%">
          <el-form :inline="true" label-width="100px" ref="Form" :model="formCarList" :rules="rules">
            <div class="boxing">
              <div class="aside">
                  <!-- 所属单位 -->
                  <el-form-item label="所属单位" prop="unit">
                    <el-select v-model="formCarList.unit" placeholder="请选择所属单位" style="width:100%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- 系统选择 -->
                  <el-form-item label="系统选择" prop="system">
                    <el-select v-model="formCarList.system" placeholder="请选择活动区域" style="width:100%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
              </div>
              <div class="other">
                <!-- 套餐名称 -->
                <el-form-item label="套餐名称" prop="appellation">
                    <el-input type="text" v-model="formCarList.appellation" placeholder="请输入套餐名称" style="width:100%">
                    </el-input>
                </el-form-item>
              </div>
            </div>
            <!-- 选择菜单 -->
            <div class="selectMenu">选择菜单</div>
            <!-- 套餐树 -->
            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[3,5]"
              >
            </el-tree>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false" style="marginRight: 10px">取 消</el-button>
            <el-button type="primary" >保 存</el-button>
          </div>
      </el-dialog>

      <!-- 设置字段权限对话框 -->
       <el-dialog title="设置字段权限" :visible.sync="dialogFieldVisible" width="40%">
          <el-form :inline="true" label-width="100px" :model="formFieldList" label-position="left" :rules="fieldRules">
            <!-- 描述 -->
            <div class="desc">
              说明：如果角色对当前对象设置了“新建”或“编辑”权限，
              带*号的必填字段默认设置为“读写”，不可设置为“只读”或“不可见”，
              否则会造成新建 / 编辑不成功。
            </div>
            <!-- 全选 -->
                <div class="selectAll">
              <el-form-item  >
                  <span style="margin-Right:65px">全选</span>
                  <el-radio-group v-model="formFieldList.selectAll">
                    <el-radio :label="3">读写</el-radio>
                    <el-radio :label="6">只读</el-radio>
                    <el-radio :label="9">不可见</el-radio>
                  </el-radio-group>
              </el-form-item>
                  <el-divider></el-divider>
                </div>
              <!-- 所属单位 -->
              <el-form-item label="所属单位" prop="unit" style="width:100%">
                 <el-radio-group v-model="formFieldList.unit">
                    <el-radio :label="3">读写</el-radio>
                    <el-radio :label="6">只读</el-radio>
                    <el-radio :label="9">不可见</el-radio>
                  </el-radio-group>
              </el-form-item>
              <!-- 上级部门 -->
              <el-form-item label="上级部门" prop="superior" style="width:100%">
                 <el-radio-group v-model="formFieldList.superior">
                    <el-radio :label="3">读写</el-radio>
                    <el-radio :label="6">只读</el-radio>
                    <el-radio :label="9">不可见</el-radio>
                  </el-radio-group>
              </el-form-item>
              <!-- 部门名称 -->
              <el-form-item label="部门名称" prop="appellation" style="width:100%">
                 <el-radio-group v-model="formFieldList.appellation">
                    <el-radio :label="3">读写</el-radio>
                    <el-radio :label="6">只读</el-radio>
                    <el-radio :label="9">不可见</el-radio>
                </el-radio-group>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFieldVisible = false" style="marginRight: 10px">取 消</el-button>
            <el-button type="primary" >保 存</el-button>
          </div>
      </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 搜索框数据
      input: '',
      radio: '',
      // 折叠面板展开数据
      activeNames: ['1', '2'],
      // 公司展示数据列表
      companyList: [
        { title: '上海西弗瑞环境科技有限公司' },
        { title: '上海西弗瑞环境科技有限公司' },
        { title: '上海西弗瑞环境科技有限公司' }
      ],
      // 套餐权限表选项数据
      checkList: [],
      dialogFormVisible: false,
      dialogFieldVisible: false,
      // 新增套餐数据列表
      formCarList: {
        unit: '',
        system: '',
        appellation: ''
      },
      // 选择菜单数据
      data: [{
        id: 2,
        label: '基础管理',
        children: [{
          id: 5,
          label: '组织架构管理',
          children: [
            {
              id: 6,
              label: '部门管理'
            },
            {
              id: 7,
              label: '岗位管理'
            }
          ]
        }, {
          id: 3,
          label: '人员管理',
          children: [
            {
              id: 8,
              label: '员工管理'
            },
            {
              id: 9,
              label: '驾驶员管理'
            }]
        }]
      }],
      // defaultProps: {
      //   children: 'children',
      //   label: 'label'
      // },
      // 新增套餐表单验证
      rules: {
        // 所属单位
        unit: [
          { required: true, message: '请选择所属单位', trigger: ['blur', 'change'] }
        ],
        // 系统选择
        system: [
          { required: true, message: '请选择系统', trigger: ['blur', 'change'] }
        ],
        // 套餐名称
        appellation: [
          { required: true, message: '套餐名称不能为空', trigger: ['blur', 'change'] },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ]
      },
      // 设置字段权限表单校验
      fieldRules: {
        unit: [
          { required: true, trigger: ['blur', 'change'] }
        ],
        superior: [
          { required: true, trigger: ['blur', 'change'] }
        ],
        appellation: [
          { required: true, trigger: ['blur', 'change'] }
        ]
      },
      // 设置字段权限数据
      formFieldList: {
        selectAll: '',
        unit: 3,
        superior: 3,
        appellation: 3
      },
      // 判断左侧公司样式类名是否添加
      current: 0
    }
  },
  methods: {
    // 套餐被选中
    isSelected (index) {
      this.current = index
    },
    // 套餐权限表展开事件
    handleChange (val) {
      console.log(val)
    },
    // 显示新增套餐对话框
    addPackage () {
      this.dialogFormVisible = true
    },
    // 显示设置字段权限对话框
    showPermissions () {
      this.dialogFieldVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
 .sanitation {
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
    margin-top: 3px;
    display: flex;
    height: 100%;
    width: 100%;
    .left {
       flex: 3;
      background-color: #fff;
      height: 100%;
      box-sizing: border-box;
       .title {
        line-height: 36px;
        font-size: 13px;
        text-align: left;
        padding-left: 10px;
        background-color: #fff;
        position: relative;
        .el-icon-plus {
          position: absolute;
          top: 50%;
          right: 15px;
          transform: translateY(-50%);
          font-weight: 900;
          cursor: pointer;
        }
      }
      .line {
        height: 1px;
        background-color: #ccc;
      }
      // 搜索框
      .el-input {
        padding: 5px 10px;
        box-sizing: border-box;
        /deep/.el-input__inner {
          height: 30px;
        }
      }
     ul {
        padding:0;
        margin: 0;
        width: 100%;
        // .el-radio-group {
        //   width: 100%;
        // }
        li {
          position: relative;
          text-align: left;
          box-sizing: border-box;
          padding: 15px;
          width: 100%;
          font-size: 13px;
          .operate {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 15px;
            .el-icon-delete-solid {
              margin-left: 10px;
              font-size: 15px;
            }
            .el-icon-edit-outline {
              font-weight: 700;
              font-size: 15px;
            }
          }
        }
        .componypackage {
          background: #ccc;
          .radioLine {
            height: 100%;
            position: absolute;
            width: 3px;
            background-color: black;
            right: 0;
            top:0;
          }
        }
      }
      }
    .right {
      flex: 12;
      background-color: #fff;
      margin-left: 2px;
      padding: 20px;
      text-align: left;
      box-sizing: border-box;
      overflow: hidden;
      .title {
        .title-top {
          font-size: 18px;
          padding-bottom: 8px;
        }
        .dec {
          font-size: 12px;
          padding-bottom: 15px;
        }
      }
      // 套餐权限表样式
      .el-collapse {
        border-top: none;
        border-bottom: none;
        .el-collapse-item {
          position: relative;
          .setting {
            position: absolute;
            top: 14px;
            left: 140px;
            color: #3399FF;
            font-size: 12px;
            cursor: pointer;
          }
          .setting:hover {
            color: #333;
          }
        }
        /deep/.el-collapse-item__header.is-active {
          border-bottom: 1px solid #EBEEF5;
          width: 360px;
        }
        /deep/.el-collapse-item__wrap {
          border-bottom: none;
        }
        /deep/.el-collapse-item__header {
          width: 360px;
          font-size: 16px;
        }
        .el-checkbox {
          padding: 40px 50px 20px 0;
        }
      }
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
          }
        }
        // 选择菜单样式
        .selectMenu {
          background-color: #333;
          height: 40px;
          line-height: 40px;
          color: #fff;
          font-size: 13px;
          padding-left: 20px;
        }
        .el-tree {
          // 一级菜单背景颜色
          background-color: #fff;
          /deep/.el-tree-node__content {
            height: 50px;
            background: #ccc;
          }
          // 二级菜单背景颜色
          /deep/.el-tree-node>.el-tree-node__children {
            /deep/.el-tree-node__content {
              background: #f2f2f2;
            }
            // 三级菜单背景色
            /deep/.el-tree-node .is-focusable {
                /deep/.el-tree-node__content {
              background-color: #fff;
            }

            }
          }
        }

        // 设置字段权限对话框样式
        .desc {
          background-color: #f2f2f2;
          border-radius: 10px;
          height: 70px;
          padding: 10px;
          box-sizing: border-box;
          font-family: "PingFang SC Regular", "PingFang SC";
          color: rgb(153, 153, 153);
          font-size: 12px;
          line-height: 22px;
        }
        // 全选
        .selectAll {
          padding-top: 20px;
        }
        .el-divider {
          margin: 0;
          margin-bottom: 15px;
        }
        .el-form-item {
          margin-bottom: 12px;
        }
    }
}
</style>
