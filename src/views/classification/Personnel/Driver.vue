<template>
  <div class="driver">
    <!-- 面包屑导航 -->
     <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>基础信息</el-breadcrumb-item>
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item class="weight">驾驶员管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="body">
      <div class="left">
        <div class="unit">所属单位</div>
        <!-- 搜索框 -->
        <div class="inputBox">
          <el-input class="input" v-model="input" placeholder="请搜索"></el-input>
        </div>
        <!-- 单选框 -->
        <el-radio  :class="{ show: item.id === index}"  v-model="radio" v-for="item in radioList " :key="item.id" :label="item.id" @change="onShow(item.id)">{{item.txt}}</el-radio>
      </div>
      <div class="right">
        <div class="inquire">
              <!-- 查询条件表单 -->
        <el-form :model="formInline" class="demo-form-inline" label-width="80px">
          <el-row>
             <el-col :span="8">
              <el-form-item label="搜 索：">
                <el-input v-model="formInline.user" placeholder="请输入工号或姓名" style="width: 250px"></el-input>
              </el-form-item>
             </el-col>
             <el-col :span="8">
                <el-form-item label="状态：">
                <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="全部" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button type="primary" size="small">查询</el-button>
                <el-button type="success" size="small" >更多</el-button>
                <el-button type="info" size="small">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        </div>
        <!-- 行内表单+入职时间 -->
        <div class="entryTime">
          <el-form :inline="true" :model="formDate" class="demo-form-inline" label-width="80px">
              <el-row>
             <el-col :span="8">
            <el-form-item label="驾照号码 :">
              <el-input v-model="formInline.names" placeholder="请输入驾照号码" style="width: 250px"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="8">
            <el-form-item label="所属部门 :">
              <el-select v-model="formDate.department" placeholder="请选择上级部门">
                <el-option label="全部" value="shanghai"></el-option>
                <el-option label="全部" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="到期日期:" class="date">
              <!-- 日期选择器 -->
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
                   </el-col>
          </el-row>
          </el-form>
        </div>
        <!-- 各种按钮 -->
        <div class="btn">
          <el-button type="success" @click="isShowDialog">新增</el-button>
          <el-button type="primary" class="export">导出</el-button>
        </div>
        <!-- 多选表格 -->
        <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="工号">
            <template slot-scope="scope">{{ scope.row.jobNumber }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="department" label="所属部门" show-overflow-tooltip></el-table-column>
          <el-table-column prop="position" label="所属岗位"></el-table-column>
          <el-table-column prop="number" label="手机号码"></el-table-column>
          <el-table-column prop="time" label="入职时间"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column label="操作"  width="190">
            <el-button type="primary" size="small" round icon="el-icon-edit" plain >编辑</el-button>
          <el-button type="danger" size="small" round  icon="el-icon-delete" plain>删除</el-button>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :page-sizes="[5, 10, 15, 20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="40"
        ></el-pagination>
      </div>
    </div>
    <!-- 新建驾驶员对话框 -->
    <el-dialog title="新建驾驶员" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <!-- 一排表单 -->
        <div class="item">
          <el-form-item label="所属单位：" prop="unit">
            <el-select v-model="ruleForm.unit"  placeholder="请选择汇报对象">
              <el-option label="合同工" value="1"></el-option>
              <el-option label="上海西弗瑞环境科技有限公司" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工号（登录账号）：" prop="jobNum">
            <el-select v-model="ruleForm.jobNum" filterable placeholder="请选择或输入工号">
              <el-option label="合同工" value="1"></el-option>
              <el-option label="上海西弗瑞环境科技有限公司" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- 一排表单 -->
        <div class="item">
          <el-form-item label="姓名：" prop="name">
            <el-select v-model="ruleForm.name" filterable placeholder="请选择或输入姓名">
              <el-option label="合同工" value="1"></el-option>
              <el-option label="上海西弗瑞环境科技有限公司" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="驾照号码：" prop="driverNum">
            <el-select v-model="ruleForm.driverNum" placeholder="请输入驾照号码">
              <el-option label="合同工" value="1"></el-option>
              <el-option label="上海西弗瑞环境科技有限公司" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- 一排表单 -->
        <div class="item">
          <el-form-item label=" 准驾车型：" prop="drivingModel"  class="cartype">
            <!-- 驾照多选框 -->
            <el-checkbox-group v-model="checkList" >
              <el-checkbox label="A1"></el-checkbox>
              <el-checkbox label="A2"></el-checkbox>
              <el-checkbox label="B1"></el-checkbox>
              <el-checkbox label="B2"></el-checkbox>
              <el-checkbox label="C1"></el-checkbox>
              <el-checkbox label="C2"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="驾照档案号：" prop="file">
            <el-input v-model="ruleForm.file" placeholder="请输入驾照档案号"></el-input>
          </el-form-item>
        </div>
                <!-- 一排表单 -->
        <div class="item">
          <el-form-item label=" 领证日期：" prop="date">
            <!-- 日期选择器 -->
                <el-date-picker v-model="ruleForm.date" type="date"
                 format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
                :picker-options="pickerOptionsStart"
                placeholder="选择日期">
                </el-date-picker>
          </el-form-item>
          <el-form-item label="有效期：" prop="validityPeriod">
            <!-- 日期选择器 -->
                <el-date-picker v-model="ruleForm.validityPeriod" type="date"
                 format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptionsEnd"
                  placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      radio: 1,
      index: 1,
      dialogFormVisible: false,
      checkList: ['选中且禁用', '复选框 A'],
      formInline: {
        unit: '',
        names: '',
        superior: ''
      },
      formDate: {
        department: ''
      },
      ruleForm: {
        unit: '',
        jobNum: '',
        name: '',
        driverNum: '',
        drivingModel: '',
        file: '',
        date: '',
        validityPeriod: ''
      },
      tableList: [
        {
          jobNumber: 'XFR01',
          name: '测试员',
          department: '测试部',
          position: '运维测试',
          number: '15316027386',
          time: '2019.10.15',
          status: '在职'
        },
        {
          jobNumber: 'XFR01',
          name: '测试员',
          department: '测试部',
          position: '运维测试',
          number: '15316027386',
          time: '2019.10.15',
          status: '在职'
        },
        {
          jobNumber: 'XFR01',
          name: '测试员',
          department: '测试部',
          position: '运维测试',
          number: '15316027386',
          time: '2019.10.15',
          status: '在职'
        },
        {
          jobNumber: 'XFR01',
          name: '测试员',
          department: '测试部',
          position: '运维测试',
          number: '15316027386',
          time: '2019.10.15',
          status: '在职'
        },
        {
          jobNumber: 'XFR01',
          name: '测试员',
          department: '测试部',
          position: '运维测试',
          number: '15316027386',
          time: '2019.10.15',
          status: '在职'
        },
        {
          jobNumber: 'XFR01',
          name: '测试员',
          department: '测试部',
          position: '运维测试',
          number: '15316027386',
          time: '2019.10.15',
          status: '在职'
        }
      ],
      radioList: [
        {
          id: 1,
          txt: '上海西弗瑞环境科技有限公司'
        },
        {
          id: 2,
          txt: '上海虹腾环境保洁有限公司'
        },
        {
          id: 3,
          txt: '上海虹远环境保洁有限公司'
        },
        {
          id: 4,
          txt: '上海虹景环境保洁服务有限公司'
        },
        {
          id: 5,
          txt: '上海东虹环境保洁有限公司'
        }
      ],
      rules: {
        unit: [
          { required: true, message: '请选择所属单位', trigger: 'blur' }
        ],
        jobNum: [
          { required: true, message: '工号不可为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不可为空', trigger: 'blur' }
        ],
        driverNum: [
          { required: true, message: '姓名不可为空', trigger: 'blur' }
        ],
        drivingModel: [
          { required: true, message: '请选择准驾车型', trigger: 'blur' }
        ],
        file: [
          { min: 10, max: 12, message: '最少10字符，最多12字符', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择领证日期', trigger: 'blur' }
        ],
        validityPeriod: [
          { required: true, message: '请选择有效期', trigger: 'blur' }
        ]
      },
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.ruleForm.validityPeriod
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.ruleForm.date
          if (beginDateVal) {
            return (time.getTime() < new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            )
          }
        }
      }

    }
  },
  methods: {
    isShowDialog () {
      this.dialogFormVisible = true
    },
    onShow (id) {
      this.index = id
    }
  }
}
</script>

<style lang="less" scoped>
.driver {
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
    padding-top:18px;
  }
  /deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner{
      font-weight: 700;
  }
  /deep/.el-breadcrumb__inner {
    font-size: 12px;
  }
  .body {
    // background-color: #ccc;
    margin-top: 3px !important;
    display: flex;
    .left {
      flex: 2;
      // border-right: 1px solid #ccc;
       background-color: #fff;
      .unit {
        height: 35px;
        border-bottom: 1px solid #ccc;
        padding-left: 20px;
        line-height: 35px;
        font-size: 13px;
        color: #333;
      }
      .inputBox {
        height: 50px;
        padding: 10px;
        box-sizing: border-box;
       /deep/ .el-input__inner {
          height: 30px;
        }
      }
      .el-radio {
        display: block;
        height: 50px;
        line-height: 50px;
        padding-left: 10px;
        color: #333;
        text-overflow: ellipsis;
        overflow: hidden;
        margin: 0;
      }
    }
    .right {
      flex:12;
      margin-left: 2px;
       background-color: #fff;
      text-align: left;
      padding: 10px 30px;
      box-sizing: border-box;
      overflow: hidden;
      .inquire {
        .el-form {
          /deep/ .el-form-item {
            margin-right: 0 !important;
            .el-form-item__label {
              color: #333;
            }
            .el-button {
              margin-right: 0px !important ;
            }
          }
        }
      }
      .entryTime {
        .el-form {
          .el-form-item {
            margin-right: 60px;
          }
          .date {
            margin-right: 0px;
          }
        }
      }
      .btn {
        padding-right: 25px;
        box-sizing: border-box;
        .export {
          float: right;
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
      .el-pagination {
        width: 50%;
        margin: 0 auto;
        margin-top: 10px;
      }
    }
  }
  .el-dialog__wrapper {
    .el-dialog {
      border-radius: 5px;
      .el-dialog__body {
        padding: 10px 20px;
        .el-form {
          .item {
            display: flex;
            .el-form-item {
              width: 50%;
              padding: 0 15px;
              .el-select {
                width: 100%;
              }
              .el-form-item__label {
              color: #000;
              font-size: 16px;
              text-align: left;
              }
              .el-form-item__content {
                .el-input {
                  width: 100%;
                }
              }
            }
            .cartype {

            /deep/ .el-form-item__label {
             float: none ;

             }
             .el-checkbox-group {
               width: 60%;
             }
            }
          }
        }
      }
    }
  }
      .show{
        background-color: rgba(242, 242, 242, 2);
        border-right: 3px solid #333;
      }
}
</style>
