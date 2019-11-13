<template>
  <div class="station">
    <!-- 面包屑导航 -->
     <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>基础配置</el-breadcrumb-item>
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
        <el-breadcrumb-item class="weight">小压站设备管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <div class="left">
        <div class="title">所属单位</div>
        <div class="line"></div>
        <!-- 公司 -->
        <div class="company">
          <el-input v-model="input" placeholder="请搜索"></el-input>
          <ul>
            <li>
              <el-radio v-model="radio" label="1">上海西弗瑞环境科技有限公司</el-radio>
            </li>
            <li>
              <el-radio v-model="radio" label="2">上海西弗瑞环境科技有限公司</el-radio>
            </li>
            <li>
              <el-radio v-model="radio" label="3">上海西弗瑞环境科技有限公司</el-radio>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <!-- 查询条件表单 -->
        <el-form :model="formInline" class="demo-form-inline" label-width="100px">
          <el-row>
             <el-col :span="8">
              <el-form-item label="所属小压站:" label-width="100px">
                <el-select v-model="formInline.region" placeholder="全部" style="width: 250px">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>

              </el-form-item>
             </el-col>
             <el-col :span="8">
                <el-form-item label="设备编号:">
                 <el-input v-model="formInline.device" placeholder="请输入设备编号" style="width: 250px"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button type="primary" size="small">查询</el-button>
                <el-button type="success" size="small" @click="showMore">更多</el-button>
                <el-button type="info" size="small">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <!-- 更多查询筛选 -->
        <el-form label-width="100px" v-show="more">
          <el-row>
             <el-col :span="8">
              <el-form-item label="状态:">
                 <el-select v-model="formInline.state" placeholder="全部" style="width: 250px">
                  <el-option label="使用中" value="shanghai"></el-option>
                  <el-option label="维修中" value="beijing"></el-option>
                  <el-option label="已停用" value="tingyong"></el-option>
                 </el-select>
              </el-form-item>
             </el-col>
             <el-col :span="8">
                <el-form-item label="项目编号:">
                  <el-input v-model="formInline.number" style="width: 250px"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属单位:">
                 <el-select v-model="formInline.unit" placeholder="全部" style="width: 250px">
                  <el-option label="1" value="shanghai"></el-option>
                  <el-option label="2" value="beijing"></el-option>
                  <el-option label="3" value="tingyong"></el-option>
                 </el-select>
              </el-form-item>
             </el-col>
          </el-row>
          <!-- 上线日期和维护到期日期 -->
          <el-row>
             <el-col :span="12">
               <el-form-item label="上线日期:">
                  <el-date-picker
                  v-model="formInline.online"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 250px">
                </el-date-picker>
              </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="维保到期日:">
                  <el-date-picker
                  v-model="formInline.mature"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 250px">
                </el-date-picker>
              </el-form-item>
             </el-col>
          </el-row>
        </el-form>
        <div class="operate">
          <el-button type="primary" size="small" @click="showAddDialog">新增</el-button>
          <el-button type="danger" size="small">全部删除</el-button>
          <el-button type="success" size="small">导出excel</el-button>
        </div>

         <!-- 新建小压站设备对话框 -->
        <el-dialog title="新建小压站设备" :visible.sync="dialogFormVisible" width="40%">
          <el-form :inline="true" label-width="100px" :model="formCarList" ref="Form" label-position="left" :rules="rules">
            <div class="aside">
              <!-- 所属单位 -->
              <el-form-item label="所属单位:" prop="unit">
                <el-select v-model="formCarList.unit" placeholder="请选择所属单位" style="width:100%">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 设备编号 -->
              <el-form-item label="设备编号:" prop="device">
              <el-input v-model="formCarList.device" placeholder="请输入设备编号"></el-input>
              </el-form-item>
              <!-- 所属车辆 -->
              <el-form-item label="所属小压站:" prop="vehicle">
                <el-select v-model="formCarList.vehicle" filterable placeholder="请选择所属车辆" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 启用日期 -->
              <el-form-item  label="启用日期:" prop="enable">
                <el-date-picker
                  v-model="formCarList.enable"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <!-- 摄像通道 -->
              <el-form-item  label="摄像通道:" class="aisle">
                <div>
                  <el-checkbox v-model="formCarList.checked2">CH2</el-checkbox>
                  <el-checkbox v-model="formCarList.checked1">CH1</el-checkbox>
                  <el-checkbox v-model="formCarList.checked3">CH3</el-checkbox>
                </div>
                <div>
                  <el-checkbox v-model="formCarList.checked4">CH4</el-checkbox>
                  <el-checkbox v-model="formCarList.checked5">CH5</el-checkbox>
                  <el-checkbox v-model="formCarList.checked6">CH6</el-checkbox>
                </div>
              </el-form-item>
              <!-- SD卡容量 -->
              <el-form-item label="SD卡容量:" prop="sd">
                <el-select v-model="formCarList.sd" placeholder="" style="width:100%">
                  <el-option label="64G" value="shanghai"></el-option>
                  <el-option label="128G" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 流量卡号 -->
              <el-form-item label="流量卡号:" prop="cardNumber">
              <el-input v-model="formCarList.cardNumber" placeholder="请输入流量卡号"></el-input>
              </el-form-item>
              <!-- 流量卡到期日期 -->
              <el-form-item  label="流量卡到期日期:" prop="maturity">
                <el-date-picker
                  v-model="formCarList.maturity"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="other">
              <!-- 项目编号 -->
              <el-form-item label="项目编号:" prop="project">
              <el-input v-model="formCarList.project" placeholder="请输入项目编号"></el-input>
              </el-form-item>
              <!-- 设备类型 -->
              <el-form-item label="设备类型:" prop="type">
                <el-select v-model="formCarList.type" placeholder="" style="width:100%">
                  <el-option label="主机" value="shanghai"></el-option>
                  <el-option label="传感器" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 设备状态 -->
              <el-form-item label="设备状态:" prop="state">
                <el-select v-model="formCarList.state" placeholder="" style="width:100%">
                  <el-option label="使用中" value="shanghai"></el-option>
                  <el-option label="已停用" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 维保到期日 -->
              <el-form-item  label="维保到期日:" prop="maintenance">
                <el-date-picker
                  v-model="formCarList.maintenance"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <!-- 设备品牌 -->
              <el-form-item label="设备品牌:" prop="brand">
              <el-input v-model="formCarList.brand" placeholder="请输入设备品牌"></el-input>
              </el-form-item>
              <!-- 流量卡运营商 -->
              <el-form-item label="流量卡运营商:" prop="operator">
                <el-select v-model="formCarList.operator" placeholder="请选择流量卡运营商" style="width:100%">
                  <el-option label="电信" value="dianxin"></el-option>
                  <el-option label="移动" value="yidong"></el-option>
                  <el-option label="联通" value="liantong"></el-option>
                </el-select>
              </el-form-item>
              <!-- 流量卡容量： -->
              <el-form-item label="流量卡容量:" prop="capacity">
              <el-input v-model="formCarList.capacity" placeholder="请输入流量卡容量"></el-input>
              </el-form-item>
              <!-- 安装人员 -->
              <el-form-item label="安装人员:" prop="personnel">
              <el-input v-model="formCarList.personnel" placeholder="请输入安装人员"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false" size="mini" style="marginRight: 10px">取 消</el-button>
            <el-button type="primary" size="mini">确 定</el-button>
          </div>
        </el-dialog>

         <!-- 编辑小压站设备对话框 -->
        <el-dialog title="编辑小压站设备" :visible.sync="editDialogFormVisible" width="40%">
          <el-form :inline="true" label-width="100px" :model="editFormCarList" ref="editForm" label-position="left" :rules="rules">
            <div class="aside">
              <!-- 所属单位 -->
              <el-form-item label="所属单位:" prop="unit">
                <el-select v-model="editFormCarList.unit" placeholder="请选择所属单位" style="width:100%">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 设备编号 -->
              <el-form-item label="设备编号:" prop="device">
              <el-input v-model="editFormCarList.device" placeholder="请输入设备编号"></el-input>
              </el-form-item>
              <!-- 所属车辆 -->
              <el-form-item label="所属小压站:" prop="vehicle">
                <el-select v-model="editFormCarList.vehicle" filterable placeholder="请选择所属车辆" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 启用日期 -->
              <el-form-item  label="启用日期:" prop="enable">
                <el-date-picker
                  v-model="editFormCarList.enable"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <!-- 摄像通道 -->
              <el-form-item  label="摄像通道:" class="aisle">
                <div class="check-item">
                  <el-checkbox v-model="editFormCarList.checked1">CH1</el-checkbox>
                  <el-checkbox v-model="editFormCarList.checked2">CH2</el-checkbox>
                  <el-checkbox v-model="editFormCarList.checked3">CH3</el-checkbox>
                </div>
                <div>
                  <el-checkbox v-model="editFormCarList.checked4">CH4</el-checkbox>
                  <el-checkbox v-model="editFormCarList.checked5">CH5</el-checkbox>
                  <el-checkbox v-model="editFormCarList.checked6">CH6</el-checkbox>
                </div>
              </el-form-item>
              <!-- SD卡容量 -->
              <el-form-item label="SD卡容量:" prop="sd">
                <el-select v-model="editFormCarList.sd" placeholder="" style="width:100%">
                  <el-option label="64G" value="shanghai"></el-option>
                  <el-option label="128G" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 流量卡号 -->
              <el-form-item label="流量卡号:" prop="cardNumber">
              <el-input v-model="editFormCarList.cardNumber" placeholder="请输入流量卡号"></el-input>
              </el-form-item>
               <!-- 安装人员 -->
              <el-form-item label="安装人员:" prop="personnel">
              <el-input v-model="editFormCarList.personnel" placeholder="请输入安装人员"></el-input>
              </el-form-item>
            </div>
            <div class="other">
              <!-- 项目编号 -->
              <el-form-item label="项目编号:" prop="project">
              <el-input v-model="editFormCarList.project" placeholder="请输入项目编号"></el-input>
              </el-form-item>
              <!-- 设备类型 -->
              <el-form-item label="设备类型:" prop="type">
                <el-select v-model="editFormCarList.type" placeholder="" style="width:100%">
                  <el-option label="主机" value="shanghai"></el-option>
                  <el-option label="传感器" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 设备状态 -->
              <el-form-item label="设备状态:" prop="state">
                <el-select v-model="editFormCarList.state" placeholder="" style="width:100%">
                  <el-option label="使用中" value="shanghai"></el-option>
                  <el-option label="已停用" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 维保到期日 -->
              <el-form-item  label="维保到期日:" prop="maintenance">
                <el-date-picker
                  v-model="editFormCarList.maintenance"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <!-- 设备品牌 -->
              <el-form-item label="设备品牌:" prop="brand">
              <el-input v-model="editFormCarList.brand" placeholder="请输入设备品牌"></el-input>
              </el-form-item>
              <!-- 流量卡运营商 -->
              <el-form-item label="流量卡运营商:" prop="operator">
                <el-select v-model="editFormCarList.operator" placeholder="请选择流量卡运营商" style="width:100%">
                  <el-option label="电信" value="dianxin"></el-option>
                  <el-option label="移动" value="yidong"></el-option>
                  <el-option label="联通" value="liantong"></el-option>
                </el-select>
              </el-form-item>
              <!-- 流量卡容量： -->
              <el-form-item label="流量卡容量:" prop="capacity">
              <el-input v-model="editFormCarList.capacity" placeholder="请输入流量卡容量"></el-input>
              </el-form-item>

            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false" size="mini" style="marginRight: 10px">取 消</el-button>
            <el-button type="primary" size="mini" >确 定</el-button>
          </div>
        </el-dialog>

        <!-- 表格 -->
         <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="{background:'rgba(229, 233, 242, 1)',color:'#000',fontWeight:'400'}"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            >
          </el-table-column>
          <el-table-column
            prop="number"
            label="设备编号"
            >
          </el-table-column>
          <el-table-column
            prop="license"
            label="所属车辆"
            >
          </el-table-column>
          <el-table-column
            prop="type"
            label="设备类型"
            >
          </el-table-column>
           <el-table-column
            prop="instal"
            label="安装日期"
            >
          </el-table-column>
           <el-table-column
            prop="protect"
            label="维保日期"
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
              <el-button type="primary" plain round size="mini" icon="el-icon-edit" @click="showEdit">编辑</el-button>
              <el-button type="danger" plain round size="mini" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      radio: '1',
      // 查询表单数据
      formInline: {
        device: '',
        region: '',
        state: '',
        number: '',
        unit: '',
        online: '',
        mature: ''
      },
      more: false,
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
      multipleSelection: [],
      dialogFormVisible: false,
      editDialogFormVisible: false,
      // 新建小压站设备数据
      formCarList: {
        unit: '',
        device: '',
        vehicle: '',
        enable: '',
        sd: '64G',
        cardNumber: '',
        maturity: '',
        project: '',
        type: '主机',
        state: '使用中',
        maintenance: '',
        brand: '',
        operator: '',
        capacity: '',
        personnel: '',
        checked1: '',
        checked2: '',
        checked3: '',
        checked4: '',
        checked5: '',
        checked6: ''
      },
      // 编辑小压站设备数据
      editFormCarList: {
        unit: '',
        device: '',
        vehicle: '',
        enable: '',
        sd: '64G',
        cardNumber: '',
        maturity: '',
        project: '',
        type: '主机',
        state: '使用中',
        maintenance: '',
        brand: '',
        operator: '',
        capacity: '',
        personnel: '',
        checked1: '',
        checked2: '',
        checked3: '',
        checked4: '',
        checked5: '',
        checked6: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      // 新建小压站设备数据表单校验
      rules: {
        unit: [
          { required: true, message: '请选择所属单位', trigger: ['blur', 'change'] }
        ],
        device: [
          { required: true, message: '请选择所属单位', trigger: ['blur', 'change'] },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: ['blur', 'change'] }
        ],
        vehicle: [
          { required: true, message: '所属小压站不能为空', trigger: ['blur', 'change'] }
        ],
        enable: [
          { required: true, message: '启用日期不能为空', trigger: ['blur', 'change'] }
        ],
        cardNumber: [
          { min: 5, max: 30, message: '流量卡号不能小于5位大于位30位', trigger: ['blur', 'change'] }
        ],
        project: [
          { required: true, message: '项目编号不能为空', trigger: ['blur', 'change'] },
          { min: 5, max: 20, message: '项目编号不能小于5位大于位20位', trigger: ['blur', 'change'] }
        ],
        type: [
          { required: true, message: '设备类型不能为空', trigger: ['blur', 'change'] }
        ],
        state: [
          { required: true, message: '设备状态不能为空', trigger: ['blur', 'change'] }
        ],
        maintenance: [
          { required: true, message: '维保日期不能为空', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  components: {
  },
  methods: {
    // 给公司选择添加样式
    addStyle () {

    },
    // 展示更多查询条件
    showMore () {
      this.more = !this.more
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 显示新增对话框
    showAddDialog () {
      this.dialogFormVisible = true
    },
    // 显示编辑对话框
    showEdit () {
      this.editDialogFormVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
  .station {
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
  .main {
    margin-top: 3px;
    display: flex;
    height: 100%;
    width: 100%;
    // box-sizing: border-box;
    .left {
      flex: 2;
      background-color: #fff;
      height: 100%;
      box-sizing: border-box;
      .title {
        line-height: 36px;
        font-size: 13px;
        text-align: left;
        padding-left: 10px;
        background-color: #fff;
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
        li {
          text-align: left;
          padding: 10px;
          font-size: 13px;
          /deep/.el-radio__label {
            font-size: 12px;
            font-family: 'Arial Normal', 'Arial';
          }
        }
      }
    }
    // 公司选择
    .right {
      flex: 12;
      background-color: #fff;
      margin-left: 2px;
      padding: 10px;
      text-align: left;
      box-sizing: border-box;
      overflow: hidden;
      .el-form {
        // display: flex;
        font-size: 12px;
      }
      /deep/.el-range-editor.el-input__inner {
        width: 280px;
      }
      .operate {
        overflow: hidden;
        .el-button {
          float: left;
        }
        .el-button:nth-child(3) {
          float: right;
        }
      }
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

    }
  }
  .el-table {
    margin-top: 5px;
  }

  // 新增对话框样式
    /deep/.el-dialog__body {
      padding: 10px 30px;
    }
    /deep/.el-dialog__header {
      padding: 10px 30px;
    }
  .el-dialog {
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
        /deep/.el-input__inner {
          height: 30px;
          line-height: 30px;
        }
        /deep/.el-input__inner {
          padding-right: 30px;
          padding-left: 30px;
        }
        /deep/.el-form-item__label {
          width: 120px!important;
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
      }
    }
  }

</style>
