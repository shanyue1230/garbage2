<template>
  <div class="contai">
    <!-- 面包屑导航 -->
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>基础配置</el-breadcrumb-item>
        <el-breadcrumb-item>组织架构管理</el-breadcrumb-item>
        <el-breadcrumb-item class="weight">行政机构管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 主体 -->
    <div class="major">

      <!-- 表单元素 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="机构名称:">
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

      <!-- 新增对话框 -->
      <el-dialog :title="title" :visible.sync="dialogFormVisible" width="45%">
        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" :rules="ruleForm" ref="Form">
          <el-form-item label="行政市区" prop="urban">
            <!-- <el-input v-model="formLabelAlign.urban"></el-input> -->
            <el-select v-model="formLabelAlign.urban" placeholder="请选择活动区域" style="width:100%">
              <el-option label="上海" value="shanghai"></el-option>
              <el-option label="北京" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构分类" prop="classify">
            <el-select v-model="formLabelAlign.classify" placeholder="请选择活动区域" style="width:100%">
              <el-option label="市级机构" value="shanghai"></el-option>
              <el-option label="区级机构" value="qu"></el-option>
              <el-option label="街道办" value="jiddao"></el-option>
              <el-option label="区房管局" value="qufang"></el-option>
              <el-option label="居委" value="juwei"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构名称" prop="naming">
            <el-input v-model="formLabelAlign.naming" @input="toInform"></el-input>
          </el-form-item>
          <el-form-item label="机构编码" prop="coding">
            <el-input v-model="formLabelAlign.coding"></el-input>
          </el-form-item>
          <el-form-item label="上级机构" prop="superior">
              <el-select v-model="formLabelAlign.superior" placeholder="请选择活动区域" style="width:100%">
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

      <!-- 编辑对话框 -->
      <!-- <el-dialog title="新建行政机构" :visible.sync="EditFormVisible" width="45%">
        <el-form :label-position="labelPosition" label-width="100px" :model="editFormList"   ref="Form">
          <el-form-item label="行政市区" prop="urban">
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
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="editFormList.name" @input="toInform"></el-input>
          </el-form-item>
          <el-form-item label="企业编码" prop="coding">
            <el-input v-model="editFormList.coding"></el-input>
          </el-form-item>
          <el-form-item label="上级机构" prop="superior">
              <el-select v-model="formLabelAlign.superior" placeholder="请选择活动区域" style="width:100%">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog> -->

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
          label="机构名称"
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
           <el-button icon="el-icon-search" size="mini" type="primary" plain round @click="showEditDialog(scope.row)">编辑</el-button>
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
        region: '',
        state: ''
      },
      // 对话框标题
      title: '',
      // 表格数据
      tableData: [{
        id: 2,
        agency: '上海市局',
        sort: '市级机构',
        number: '100',
        status: true,
        district: '上海市',
        coding: 121212121212,
        naming: '西弗瑞',
        children: [
          {
            id: 3,
            agency: '上海市局',
            sort: '市级机构',
            number: '100',
            status: false,
            district: '上海市',
            coding: 123456123456,
            naming: '西弗瑞2',
            children: [
              {
                id: 4,
                agency: '上海市局sdsdfsdfsd',
                sort: '市级机构',
                number: '100',
                status: true,
                district: '上海市',
                coding: 123456789123,
                naming: '西弗瑞3'
              }
            ]
          }
        ]
      }],
      // 增加对话框数据
      formLabelAlign: {
        urban: '上海',
        classify: '市级机构',
        naming: '',
        coding: '',
        superior: ''
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
    showEditDialog (row) {
      this.dialogFormVisible = true
      this.title = '编辑行政机构'
      this.formLabelAlign.coding = row.coding
      this.formLabelAlign.naming = row.naming
    },
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
    }
  }
}
</script>

<style lang="less" scoped>
  .contai {
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

</style>
