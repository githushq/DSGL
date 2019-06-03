<template>
  <el-card>
    <!-- 面包屑 -->
    <el-card class="card-bgcolor">
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb> -->
       <Breadnav :navone="'权限管理'" :navtwo="'角色列表'" />
    </el-card>
    <el-button plain class="btn-ps">朴素按钮</el-button>
    <!-- 表格区域 -->
    <el-table :data="RightData" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 最外层 -->
          <el-row v-for="(item1,index1) in scope.row.children" :key="index1">
            <el-col :span="4">
              <el-tag type closable>{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right myIcon"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2,index2) in item1.children" :key="index2">
                <el-col :span="5">
                  <el-tag type="success" closable>{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right myIcon"></i>
                </el-col>
                <el-col :span="19">
                  <el-tag
                    type="warning"
                    class="mytag3"
                    closable
                    v-for="(item3,index3) in item2.children"
                    :key="index3"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
        <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>


<script>
 import Breadnav from "../../home/layout/breadnav/breanav.vue"

export default {
  data() {
    return {
      RightData: []
    }
  },
  methods: {
    async getAllRight() {
      let res = await this.$http.get(`roles`, {
        // headers: {
        //   Authorization: localStorage.getItem("token")
        // }
      });
      // 解构
      let { meta, data } = res.data;
      console.log(data);
      if (meta.status === 200) {
        this.RightData = data;
      } else {
        this.$message.error(meta.msg);
      }
    }
  },
  mounted() {
    this.getAllRight();
  },
  components:{
    Breadnav
  }
};
</script>

<style>
.myIcon {
  margin-left: 10px;
}
.mytag3 {
  margin-right: 10px;
  margin-bottom: 10px;
}
.myIcon {
  margin-left: 10px;
}
.btn-ps {
  margin: 5px 5px;
}
.card-bgcolor {
  background-color: rgb(248, 229, 229, 0.2);
}
</style>
