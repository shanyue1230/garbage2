<template>
  <div class="unit">

  <!-- 面包屑导航 -->
    <!-- <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>基础配置</el-breadcrumb-item>
        <el-breadcrumb-item>组织架构管理</el-breadcrumb-item>
        <el-breadcrumb-item class="weight">企业单位管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
   <Nav :management="management"></Nav>
  <!-- 主体 -->
    <div class="major">

      <!-- 表单元素 -->
      <el-form :inline="true" :model="formInline"   class="demo-form-inline">
        <el-form-item label="企业名称:">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="formInline.state" placeholder="全部">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="正常" value="正常"></el-option>
            <el-option label="停用" value="停用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行政区:">
          <el-select v-model="formInline.region" placeholder="全部">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="success" @click="showAddDialog">新增</el-button>

      <!-- 表格 -->
      <el-table
        :data="tableData"
        :header-cell-style="{background:'rgba(229, 233, 242, 1)',color:'#000',fontWeight:'400'}"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        fit
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="agency"
          min-width="100%"
          :show-overflow-tooltip='true'
          label="企业名称"
        >
        </el-table-column>
        <el-table-column
          prop="sort"
          label="分类"
          min-width="100%"
         >
        </el-table-column>
        <el-table-column
          prop="number"
          min-width="100%"
          label="人数">
        </el-table-column>
          <el-table-column
          prop="status"
          min-width="100%"
          label="状态">
            <template v-slot="scope">
              <div v-if="scope.row.status == false" class="box">
                 <span class="state" style="background:red"></span>
                 已停用
              </div>
              <div v-else-if="scope.row.status == true" class="box">
                 <span class="state" style="background:green"></span>
                 使用中
              </div>
            </template>
        </el-table-column>
         <el-table-column
          prop="district"
          min-width="100%"
          label="行政区">
        </el-table-column>
         <el-table-column
          prop="operate"
          min-width="100%"
          label="操作">
          <template v-slot="scope">
            <!-- 编辑 -->
           <el-button icon="el-icon-search" size="mini" type="primary" plain round @click="editDone(scope.row)">编辑</el-button>
           <!-- 停用 -->
           <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              style="marginLeft:10px">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑企业单位对话框 -->
       <el-dialog title="编辑企业单位" :visible.sync="editFormVisible" width="45%">
        <el-form :label-position="labelPosition" label-width="100px" :model="editFormList" :rules="ruleForm" ref="Form">
          <el-form-item label="行政市区" prop="urban">
            <!-- <el-input v-model="formLabelAlign.urban"></el-input> -->
            <el-select v-model="editFormList.urban" placeholder="请选择活动区域" style="width:100%">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业分类" prop="classify">
            <el-select v-model="editFormList.classify" placeholder="请选择活动区域" style="width:100%">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业名称" prop="naming">
            <el-input v-model="editFormList.naming"></el-input>
          </el-form-item>
          <el-form-item label="企业编码" prop="coding">
            <el-input v-model="editFormList.coding"></el-input>
          </el-form-item>
          <el-form-item label="上级机构类型" prop="type">
              <el-select v-model="editFormList.type" placeholder="请选择活动区域" style="width:100%">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上级机构" prop="superior">
              <el-select v-model="editFormList.superior" placeholder="请选择活动区域" style="width:100%">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import Nav from '../../../../components/nav'
export default {
  data () {
    return {
      formInline: {
        user: '',
        region: '',
        state: ''
      },
      tableData: [{
        id: 2,
        agency: '上海市局',
        sort: '市级机构',
        number: '100',
        status: true,
        district: '上海市',
        children: [
          {
            id: 3,
            agency: '上海市局',
            sort: '市级机构',
            number: '100',
            status: false,
            district: '上海市',
            remark: '哈哈哈'
          },
          {
            id: 4,
            agency: '上海市局',
            sort: '市级机构',
            number: '100',
            status: true,
            district: '上海市',
            remark: '哈哈哈'
          }
        ]
      }],
      editFormVisible: false,
      labelPosition: 'right',
      editFormList: {
        urban: '',
        classify: '',
        naming: '',
        coding: '',
        superior: '',
        type: ''
      },
      management: '企业单位管理',
      // 表单验证
      ruleForm: {
        urban: [
          { required: true, message: '请选择行政市区', trigger: 'blur' }
        ],
        classify: [
          { required: true, message: '请选择企业分类', trigger: 'blur' }
        ],
        naming: [
          { required: true, message: '请输入企业名称', trigger: ['blur', 'change'] },
          { min: 2, message: '至少输入2位字符', trigger: ['blur', 'change'] },
          { validator: this.validcodeName, trigger: ['blur', 'change'] }
        ],
        coding: [
          { pattern: /^\d{12}$/, message: '必须输入12位数字', trigger: ['blur', 'change'] }
        ]
      }

    }
  },
  components: {
    Nav
  },
  methods: {
    onSubmit () {

    },
    // 确定编辑
    submitForm () {

    },
    // 编辑企业单位
    editDone (row) {
      this.editFormVisible = true
      console.log(row)
    },
    // 显示新增对话框
    showAddDialog () {
      this.editFormVisible = true
    }

  }
}
</script>

<style lang="less" scoped>
  .unit {
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
    box-sizing: border-box;
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

</style>
