<template>
  <el-card>
    <el-card class="card-bgcolor">
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb> -->
      <Breadnav :navone="'权限管理'" :navtwo="'权限列表'"></Breadnav>
    </el-card>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName"  label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级">
         <template slot-scope="scope">
             {{scope.row.level==="0"?"一级":scope.row==="1"?"二级":"三级"}}
         </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import Breadnav from "../../home/layout/breadnav/breanav.vue"
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    async getAllright() {
      let res = await this.$http.get(`rights/list`, {
        // headers: {
        //   Authorization: localStorage.getItem("token")
        // }
      });
      // 解构
      
      
     let {data,meta}=res.data
     console.log(data);
     if(meta.status===200){
         this.tableData=data
     }
    }
  },
  mounted() {
    this.getAllright();
  },
  components:{
    Breadnav
  }
};
</script>

<style>
.card-bgcolor{
  background-color:rgb(248, 229, 229,.2);
}
</style>
