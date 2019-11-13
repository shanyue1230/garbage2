<template>
  <div class="employee">
    <!-- 面包屑导航 -->
     <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>基础信息</el-breadcrumb-item>
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item class="weight">员工管理</el-breadcrumb-item>
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
        <!-- 行内表单+入职时间 -->
        <div class="entryTime">
          <el-form :inline="true" :model="formDate" class="demo-form-inline">
               <el-row>
             <el-col :span="8">
            <el-form-item label="所属部门：">
              <el-select v-model="formDate.department" placeholder="请选择上级部门" style="width: 250px">
                <el-option label="全部" value="shanghai"></el-option>
                <el-option label="全部" value="beijing"></el-option>
              </el-select>
            </el-form-item>
             </el-col>
             <el-col :span="8">
            <el-form-item label="入职日期：">
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
          <el-button type="success" size="small" @click="isShowDialog">新增</el-button>
          <el-button type="danger" size="small" >禁止登录</el-button>
          <el-button type="info" size="small" >重置密码</el-button>
          <el-button type="success" size="small"  class="export">导出</el-button>
        </div>
        <!-- 多选表格 -->
        <el-table
          ref="multipleTable"
          :data="tableList"
          tooltip-effect="dark"
          style="width: 100%"
        >
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
    <!-- 新增员工的对话框 -->
<el-dialog title="新建员工" :visible.sync="newEmployeeDialog" >
<!-- 表单 -->
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" status-icon>
  <!-- 账号信息模块 -->
  <div class="info">
    <div class="title">账号信息</div>
    <div class="account">
          <el-form-item label="工号（登录账号）：" prop="jobNum">
            <el-input v-model="ruleForm.jobNum" placeholder="工号是员工在单位中的唯一标识，请勿重复"></el-input>
          </el-form-item>
            <el-form-item label=" 初始密码：" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入初始密码" type="password"></el-input>
          </el-form-item>
    </div>
  </div>
  <!--组织信息模块  -->
  <div class="info">
    <div class="title">组织信息</div>
    <div class="account">
      <!-- 选择器 -->
         <el-form-item label="所属单位 :" prop="unit">
            <el-select v-model="ruleForm.unit" placeholder="请选择">
              <el-option label="上海西弗瑞环境科技有限公司" value="1"></el-option>
              <el-option label="行政机构列表" value="2"></el-option>
              <el-option label=" 企业单位列表" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" 所属部门：" prop="departments">
           <el-select v-model="ruleForm.departments" placeholder="请选择所属部门">
              <el-option label="上海西弗瑞环境科技有限公司" value="1"></el-option>
              <el-option label="行政机构列表" value="2"></el-option>
              <el-option label=" 企业单位列表" value="3"></el-option>
            </el-select>
          </el-form-item>
    </div>
  </div>
    <div class="info">
       <div class="account">
      <!-- 选择器 -->
         <el-form-item label="所属岗位 :" prop="position">
                <el-select v-model="ruleForm.position" placeholder="请输入所属岗位">
                      <el-option label="上海西弗瑞环境科技有限公司" value="1"></el-option>
                      <el-option label="上海东虹环境保洁有限公司" value="2"></el-option>
                </el-select>
          </el-form-item>
          <el-form-item label=" 岗位类型：" prop="jobType">
                <el-input v-model="ruleForm.jobType"></el-input>
          </el-form-item>
    </div>
  </div>
  <div class="info">
    <div class="account">
      <!-- 选择器 -->
         <el-form-item label="员工性质 :" prop="nature">
            <el-select v-model="ruleForm.nature" placeholder="请输入员工性质">
                  <el-option label="合同工" value="1"></el-option>
                  <el-option label="劳务工" value="2"></el-option>
                  <el-option label="派遣工" value="3"></el-option>
                  <el-option label="事转企" value="4"></el-option>
                  <el-option label="返聘" value="5"></el-option>
                  <el-option label="集体" value="6"></el-option>
                  <el-option label="退休返聘" value="7"></el-option>
                  <el-option label="协保人员" value="8"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="汇报对象 :" prop="reporting">
            <el-select v-model="ruleForm.reporting" placeholder="请选择汇报对象">
                  <el-option label="合同工" value="1"></el-option>
                  <el-option label="上海西弗瑞环境科技有限公司" value="2"></el-option>
            </el-select>
        </el-form-item>
    </div>
  </div>
  <div class="info">
    <div class="account">
      <!-- 选择器 -->
         <el-form-item label="入职日期:" prop="date">
           <!-- 日期选择器 -->
                <el-date-picker  v-model="ruleForm.date" type="date"  placeholder="选择日期"></el-date-picker>
          </el-form-item>
        <el-form-item label="员工状态 :" prop="status">
            <el-select v-model="ruleForm.status" placeholder="请输入所属岗位" @change="isShow">
                  <el-option label="在职" value="1"></el-option>
                  <el-option label="离职" value="2"></el-option>
                  <el-option label="离休" value="3"></el-option>
                  <el-option label="退休" value="4"></el-option>
                  <el-option label="离岗" value="5"></el-option>
                  <el-option label="待退" value="6"></el-option>
                  <el-option label="长病假" value="7"></el-option>
                  <el-option label="外借" value="8"></el-option>
                  <el-option label="其他" value="9"></el-option>
            </el-select>
        </el-form-item>
    </div>
  </div>
  <!-- 选中外借显示的字段 -->
    <div class="info" :style="display">
    <div class="account">
      <!-- 选择器 -->
         <el-form-item label="外借公司 :" prop="nature">
            <el-select v-model="ruleForm.nature" placeholder="请输入员工性质">
                  <el-option label="合同工" value="1"></el-option>
                  <el-option label="劳务工" value="2"></el-option>
                  <el-option label="派遣工" value="3"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="外借部门 :" prop="reporting">
            <el-select v-model="ruleForm.reporting" placeholder="请选择汇报对象">
                  <el-option label="合同工" value="1"></el-option>
                  <el-option label="上海西弗瑞环境科技有限公司" value="2"></el-option>
            </el-select>
        </el-form-item>
    </div>
  </div>
      <div class="info" :style="display">
    <div class="account">
      <!-- 选择器 -->
         <el-form-item label="外借岗位 :" prop="nature" class="loan">
            <el-select v-model="ruleForm.nature" placeholder="请输入员工性质">
                  <el-option label="合同工" value="1"></el-option>
                  <el-option label="劳务工" value="2"></el-option>
                  <el-option label="派遣工" value="3"></el-option>
            </el-select>
          </el-form-item>
    </div>
  </div>
  <!-- 个人信息模块 -->
  <div class="info">
    <div class="title">个人信息</div>
       <div class="account">
      <!-- 选择器 -->
         <el-form-item label="姓名 :" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
       <el-form-item label=" 手机号码：" prop="number">
               <el-input v-model="ruleForm.number" placeholder="请输入手机号码"></el-input>
       </el-form-item>
    </div>
  </div>
  <div class="info">
      <div class="account">
      <!-- 选择器 -->
         <el-form-item label="身份证号码:" prop="idNum">
              <el-input v-model="ruleForm.idNum" placeholder="请输入身份证号码"></el-input>
          </el-form-item>
          <el-form-item label="固定电话 :" prop="telephone">
             <el-input v-model="ruleForm.telephone" placeholder="请输入固定电话"></el-input>
          </el-form-item>
      </div>
  </div>
  <div class="info">
    <div class="account">
      <!-- 选择器 -->
         <el-form-item label="家庭地址:" prop="address">
                <el-input v-model="ruleForm.address" placeholder="请输入家庭地址"></el-input>
          </el-form-item>
          <el-form-item label="邮编 :" prop="zipCode">
               <el-input v-model="ruleForm.zipCode" placeholder="请输入邮编"></el-input>
          </el-form-item>
    </div>
  </div>
  <div class="info">
    <div class="account">
      <!-- 选择器 -->
          <el-form-item label="紧急联系人1:" prop="contact1">
                <el-input v-model="ruleForm.contact1" placeholder="请输入紧急联系人1"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人2 :" prop="contact2">
              <el-input v-model="ruleForm.contact2" placeholder="请输入紧急联系人2"></el-input>
          </el-form-item>
    </div>
  </div>
  <!-- 上传照片模块 -->
  <div class="info">
      <div class="account">
      <!-- 选择器 -->
          <el-form-item  label="用户照片:" prop="userPhoto" class="imgs">
               <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :on-remove="handleRemove"
                      :on-preview="handlePictureCardPreview"
                      :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                   <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
    </div>
  </div>
</el-form>

   <div slot="footer" class="dialog-footer">
            <el-button @click="newEmployeeDialog = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
    </div>
    </el-dialog>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      radio: 1,
      imageUrl: '',
      display: 'display:none',
      index: 1,
      value1: '',
      newEmployeeDialog: false,
      formInline: {
        unit: '',
        names: '',
        superior: ''
      },
      formDate: {
        department: ''
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
      ruleForm: {
        jobNum: '',
        password: '',
        unit: '1',
        departments: '',
        position: '1',
        jobType: '',
        nature: '1',
        reporting: '',
        date: '',
        status: '1',
        name: '',
        number: '',
        idNum: '',
        telephone: '',
        address: '',
        zipCode: '',
        contact1: '',
        contact2: '',
        userPhoto: ''
      },
      rules: {
        jobNum: [
          { required: true, message: '工号不能为空', trigger: ['blur', 'change'] },
          { min: 2, max: 10, message: '工号不能小于2位大于10字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '初始密码不能为空', trigger: ['blur', 'change'] },
          { min: 6, max: 20, message: '初始密码为6-20位字母、数字组合', trigger: ['blur', 'change'] },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '初始密码需为6 - 20位字母、数字组合' }
        ],
        unit: [
          { required: true, message: '所属单位不能为空', trigger: ['blur', 'change'] }
        ],
        departments: [
          { required: true, message: '请选择所属部门', trigger: ['blur', 'change'] }
        ],
        position: [
          { required: true, message: '请选择所属岗位', trigger: ['blur', 'change'] }
        ],
        jobType: [
          { required: true, message: '岗位类型不能为空', trigger: ['blur', 'change'] }
        ],
        nature: [
          { required: true, message: '请选择员工性质', trigger: ['blur', 'change'] }
        ],
        reporting: [
          { required: true, message: '请选择员工性质', trigger: ['blur', 'change'] }
        ],
        date: [
          { required: true, message: '入职时间不能为空', trigger: ['blur', 'change'] }
        ],
        status: [
          { required: true, message: '请选择员工状态', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: ['blur', 'change'] }
        ],
        number: [
          { pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, message: '请输入正确的手机号码' }
        ],
        idNum: [
          { pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的身份证号码' }
        ]
      },
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
      ]
    }
  },
  methods: {
    isShowDialog () {
      this.newEmployeeDialog = true
    },
    isShow () {
      if (this.ruleForm.status === '8') {
        this.display = 'display:block'
      } else {
        this.display = 'display:none'
      }
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onShow (id) {
      // console.log(id)
      this.index = id
    }
  }
}
</script>

<style lang="less"  scoped>
.employee {
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
  .body {
    // height: 500px;
    // background-color: #ccc;
    margin-top: 3px;
    height: 100%;
    display: flex;
    .left {
      flex:2;
      background-color: #fff;
      // border-right: 1px solid #ccc;

      .unit {
        height: 36px;
        border-bottom: 1px solid #ccc;
        padding-left: 20px;
        line-height: 36px;
        font-size: 13px;
        color: #333;
      }
     /deep/ .inputBox {
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
      flex: 12;
      text-align: left;
      padding: 10px 30px;
      box-sizing: border-box;
       background-color: #fff;
      overflow: hidden;
      margin-left: 2px;
      //  background-color:#456;
      .inquire {
        .demo-form-inline {
          /deep/ .el-form-item {
            margin-right: 10px;
            margin-bottom: 22px;
            .el-form-item__label {
              color: #333;
            }
            // .el-form-item__content {
            //   margin-left: 50px;
            //       width: 90%;
            //   .el-input__inner {
            //     // width: 100%;
            //   }
            // }
            // .el-button {
            //   // margin-right: 20px;
            // }
          }
        }
      }
      .entryTime {
        .el-form {
          .el-form-item {
            margin-right: 30px;
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
      }
    }
  }
  .el-dialog {
    height: 600px;
      overflow-x: hidden;
        overflow-y: scroll;
        // line-height: 30px;
        // text-align: center;

    .el-dialog__body {
      padding: 10px 20px;
   .demo-ruleForm {
      .info {
         .title{
          color: #333;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 20px;
         }
         .account {
           display: flex;
           .el-form-item {
             flex: 1;
            /deep/ .el-form-item__label {
             width: 150px !important;
             margin-left: 20px;
             text-align: left;
             }
           /deep/  .el-form-item__content {
               height: 62px;
               margin-left: 0px;
               margin: 18px !important;
               .el-input {
                 .el-input__inner {
                   width: 100%  ;
                 }
               }
               .el-select {
                  width:100% ;
                 .el-input {
                    width:100% ;
                   .el-input__inner {
                     width:100% ;
                   }
                 }
               }
               .el-date-editor {
                  width: 100%;
                 .el-input__inner {
                   width: 100%;
                 }
               }
             }
           }
           .imgs {
                   height: 200px !important;
           }
           .loan {
             width: 47%;
            /deep/ .el-form-item__content {
                   width: 47%;
              /deep/ .el-input {
                     width: 47%;
          /deep/  .el-input__inner {
                   width: 47%;
                 }
               }

             }

           }
         }
      }
    }
    }

  }

        //  用户照片的样式
        /deep/ .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;

          }
         /deep/ .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
          }
         /deep/ .avatar-uploader-icon {
            font-size: 28px;
            color: #333;
            width: 150px;
            height: 150px;
            line-height: 150px;
            text-align: center;
          }
         /deep/ .avatar {
            width: 150px;
            height: 150px;
            display: block;
          }
         /deep/ .avatar-uploader {
          /deep/  .el-upload {
                position: absolute;
                left: 0;
                top:20px;
            }
          /deep/  .el-upload__tip {
                 position: absolute;
                left: 0;
                top:165px;
            }
          }
    .show{
        background-color: rgba(242, 242, 242, 2);
        border-right: 3px solid #333;
      }
}
</style>
