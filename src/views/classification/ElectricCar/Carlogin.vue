<template>
  <div class="carlogin">
    <!-- 面包屑导航 -->
     <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>基础信息</el-breadcrumb-item>
        <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
        <el-breadcrumb-item class="weight">机动车信息登记</el-breadcrumb-item>
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
        <el-form :model="formInline" class="demo-form-inline" label-width="90px">
          <el-row>
             <el-col :span="8">
              <el-form-item label="搜 索：">
                <el-input v-model="formInline.user" placeholder="请输入车牌号或自编号" style="width: 250px"></el-input>
              </el-form-item>
             </el-col>
             <el-col :span="8">
                <el-form-item label="车辆状态：">
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
          <el-form :inline="true" :model="formDate" class="demo-form-inline" label-width="90px">
            <el-form-item label="回收类型：">
              <el-select v-model="formDate.department" placeholder="请选择上级部门" style="width: 250px">
                <el-option label="全部" value="shanghai"></el-option>
                <el-option label="全部" value="beijing"></el-option>
              </el-select>
            </el-form-item>
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
          <el-table-column label="操作" width="190">
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
    <!-- 新建机动车辆对话框 -->
    <el-dialog title="新建机动车辆" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <!-- 一排表单 -->
        <div class="item">
          <el-form-item label="所属单位：" prop="unit">
            <el-select v-model="ruleForm.unit" placeholder="请选择汇报对象">
              <el-option label="合同工" value="1"></el-option>
              <el-option label="上海西弗瑞环境科技有限公司" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车牌号：" prop="catNum">
            <el-input v-model="ruleForm.catNum" placeholder="请输入车牌号"></el-input>
          </el-form-item>
        </div>
        <!-- 一排表单 -->
        <div class="item">
          <el-form-item label="自编号：" prop="numberPlate">
               <el-input v-model="ruleForm.numberPlate" placeholder="请输入自编号"></el-input>
          </el-form-item>
          <el-form-item label="回收类型：" prop="recyclingType">
            <el-select v-model="ruleForm.recyclingType" placeholder="请选择回收类型">
              <el-option label="干垃圾" value="1"></el-option>
              <el-option label="湿垃圾" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- 一排表单 -->
        <div class="item">
          <el-form-item label=" 车辆状态：" prop="status">
            <el-select v-model="ruleForm.status" placeholder="请选择回收类型">
              <el-option label="使用中" value="1"></el-option>
              <el-option label="已报废" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车身装置：" prop="device">
                <el-select v-model="ruleForm.device" placeholder="请选择车身装置">
                    <el-option label="使用中" value="1"></el-option>
                    <el-option label="已报废" value="2"></el-option>
                  </el-select>
          </el-form-item>
        </div>
        <!-- 一排表单 -->
        <div class="item">
          <el-form-item label=" 加油类型：" prop="comeType">
            <el-select v-model="ruleForm.comeType" placeholder="请选择加油类型">
              <el-option label="汽油" value="1"></el-option>
              <el-option label="柴油" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车辆品牌：" prop="brands">
                <el-select v-model="ruleForm.brands" placeholder="请选择车辆品牌">
                    <el-option label="使用中" value="1"></el-option>
                    <el-option label="已报废" value="2"></el-option>
                  </el-select>
          </el-form-item>
        </div>
                <!-- 一排表单 -->
        <div class="item">
          <el-form-item label=" 车辆类型：" prop="catType">
            <el-select v-model="ruleForm.catType" placeholder="请选择加油类型">
              <el-option label="汽油" value="1"></el-option>
              <el-option label="柴油" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用日期：" prop="startTime">
                 <!-- 日期选择器 -->
                <el-date-picker  v-model="ruleForm.startTime"
                 type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptionsStart"
                 placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
                <!-- 一排表单 -->
        <div class="item">
          <el-form-item label=" 设备编号（主机）：" prop="deviceId">
            <el-input v-model="ruleForm.deviceId" placeholder="请输入设备编号"></el-input>
          </el-form-item>
          <el-form-item label="设备状态：" prop="deviceStatus">
                <el-select v-model="ruleForm.deviceStatus" placeholder="请选择设备状态">
                    <el-option label="使用中" value="1"></el-option>
                    <el-option label="已报废" value="2"></el-option>
                  </el-select>
          </el-form-item>
        </div>
        <!-- 一排表单 -->
        <div class="item">
          <el-form-item label=" 报废日期：" prop="endTime">
            <!-- 日期选择器 -->
                <el-date-picker  v-model="ruleForm.endTime"
                 type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptionsEnd"
                  placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
         <!-- 一排表单 -->
        <div class="item2">
          <el-form-item label=" 报废原因：" prop="reason">
            <!-- 日期选择器 -->
                  <el-input  class="textarea" type="textarea" :rows="6" resize="none" placeholder="请输入报废原因"  maxlength="200"  show-word-limit v-model="ruleForm.reason"></el-input>
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
        catNum: '',
        numberPlate: '',
        recyclingType: '',
        status: '',
        device: '',
        comeType: '',
        brands: '',
        catType: '',
        startTime: '',
        deviceId: '',
        endTime: '',
        reason: ''
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
        catNum: [
          { required: true, message: '车牌号不可为空', trigger: 'blur' },
          { pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/, message: '仅可输入7位字符，必需包含汉字、字母及数字' }
        ],
        numberPlate: [
          { required: true, message: '自编号不可为空', trigger: 'blur' }
        ],
        recyclingType: [
          { required: true, message: '请选择回收类型', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择车辆状态', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择启用日期', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择报废日期', trigger: 'blur' }
        ]
      },
      // 开始时间
      pickerOptionsStart: {
        disabledDate: time => {
          return (
            time.getTime() > new Date(this.ruleForm.endTime).getTime()
          )
        }
      },
      // 结束时间
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.ruleForm.startTime) {
            return (
              time.getTime() < new Date(this.ruleForm.startTime).getTime() // 加- 8.64e7则表示包当天
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
.carlogin {
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
    margin-top: 3px;
    display: flex;
    .left {
     flex:2;
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
      /deep/  .el-input__inner {
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
      flex: 12;
      padding: 10px 30px;
      box-sizing: border-box;
    background-color: #fff;
      margin-left: 2px;
      overflow: hidden;
      .inquire {
        .el-form {
          /deep/ .el-form-item {
            margin-right: 5px;
            .el-form-item__label {
              text-align: right;
              color: #333;
            }
          }
        }
      }
      .entryTime {
        .el-form {
          .el-form-item {
            margin-right: 60px;
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
              width: 100%;
              color: #000;
              font-size: 16px;
              text-align: left;
              }
              .el-form-item__content {
                .el-checkbox-group {
                  width: 60%;
                  .el-checkbox {
                    height: 20px;
                    line-height: 20px;
                  }
                }
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
      .show{
        background-color: rgba(242, 242, 242, 2);
        border-right: 3px solid #333;
      }
}
</style>
