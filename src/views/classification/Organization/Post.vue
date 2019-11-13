<template>
  <div class="post">
    <!-- 面包屑导航 -->
     <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>基础信息</el-breadcrumb-item>
        <el-breadcrumb-item>组织架构管理</el-breadcrumb-item>
        <el-breadcrumb-item class="weight">岗位管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <!-- 选择器 -->
      <div class="select">
        <!-- 行内表单 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="所属单位:">
            <el-select v-model="formInline.unit" placeholder="全部">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位名称 :">
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
      <el-table :data="postList"  style="width: 100%">
        <el-table-column prop="postName" label="岗位名称"></el-table-column>
        <el-table-column prop="department" label="所属部门"></el-table-column>
        <el-table-column prop="jobType" label="岗位类型"></el-table-column>
        <el-table-column prop="num" label="人数"></el-table-column>
        <el-table-column  label="操作">
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
</template>

<script>
export default {
  data () {
    return {
      formInline: {
        unit: '',
        names: '',
        superior: ''
      },
      postList: [{
        postName: '总经理',
        department: '总经理室',
        jobType: '管理',
        num: '1'
      },
      {
        postName: '行政科员',
        department: '行政部',
        jobType: '行政',
        num: '12'
      },
      {
        postName: '业务员',
        department: '销售部',
        jobType: '业务',
        num: '22'
      },
      {
        postName: '技术开发',
        department: 'IT事业部',
        jobType: '业务',
        num: '10'
      },
      {
        postName: '产品经理',
        department: 'IT事业部',
        jobType: '业务',
        num: '4'
      }

      ]
    }
  }
}
</script>

<style lang="less" scoped>
.post {
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
    margin-top: 10px;
    padding: 10px 20px;
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
      width: 50%;
      margin: 0 auto;
      margin-top: 10px;
    }
  }
}
</style>
