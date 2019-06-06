<template>
  <el-card>
    <!-- 面包屑 -->
    <el-card class="card-bgcolor">
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>-->
      <Breadnav :navone="'权限管理'" :navtwo="'角色列表'"/>
    </el-card>
    <el-button plain class="btn-ps">添加角色</el-button>
    <!-- 表格区域 -->
    <el-table :data="RightData" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 最外层 -->
          <el-row v-for="(item1,index1) in scope.row.children" :key="index1">
            <el-col :span="4">
              <el-tag type closable @close="myclose(scope.row.id,item1.id,scope)">{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right myIcon"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2,index2) in item1.children" :key="index2">
                <el-col :span="5">
                  <el-tag
                    type="success"
                    @close="myclose(scope.row.id,item2.id,scope)"
                    closable
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right myIcon"></i>
                </el-col>
                <el-col :span="19">
                  <el-tag
                    @close="myclose(scope.row.id,item3.id,scope)"
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
        <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
        <el-button type="success" icon="el-icon-check" plain size="mini" @click="openroleDialog(scope)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 打开对话框 -->
    <!-- props: 用来指定数据源中显示在文本属性&子选项在属性
    show-checkbox: 显示多选框
    data:绑定数据源
    defaults-expand-all:展开所有项
    default-checked-keys: 设置默认选中
    node-key: 设置当前节点的唯一标识 -->
    <!--配置选项  :props="props" :load="loadNode" show-checkbox @check-change="handleCheckChange"-->
    <el-dialog title="权限分配"  :visible.sync="roleDialog">
      <el-tree :data="rightsList" :props="props" ref="tree" node-key="id" :default-checked-keys="defaultcheck" show-checkbox default-expand-all></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialog = false">取 消</el-button>
        <el-button type="primary" @click="setRigth">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>


<script>
import Breadnav from "../../home/layout/breadnav/breanav.vue";

export default {
  data() {
    return {
      RightData: [],// 角色数据源
      roleDialog:false,// 分配角色对话框
      props:{
        label:"authName",
        children:"children"
      },
      rightsList:[], // 所有的权限数据
     defaultcheck: [],// 默认选中的数组
      rid:""// 保存分配权限的角色id
    };
  },
  methods: {
    // 获取所有角色数据
    async getAllRight() {
      let res = await this.$http.get(`roles`, {
        // headers: {
        //   Authorization: localStorage.getItem("token")
        // }
      });
      // 解构
      let { meta, data } = res.data;
      if (meta.status === 200) {
        this.RightData = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 根据id删除角色权限
    async myclose(roleId, rightId, scope) {
      let res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`);
      // 结构
      let { meta, data } = res.data;
      if (meta.status === 200) {
        //this.getAllRight();用这个有个小bug
        scope.row.children = data;
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 弹出对话框
async openroleDialog(scope){
    // 打开对话框时,要将角色的id保存起来,
    this.rid = scope.row.id,
   console.log(this.rid);
   
    
    // 每次打开分配权限时对话框都要清空默认选中
     this.defaultcheck = []
    this.roleDialog = true
   // 以树形结构来获取权限数据
    let res = await this.$http.get(`rights/tree`)
    // 解构
    let {meta,data}=res.data
    // 判断
    if(meta.status===200){
      this.rightsList=data
      // 设置默认选中的权限
      // 得到所有的三级权限
      // 第一级权限
      scope.row.children.forEach(item1 => {
        // 第二级权限
        item1.children.forEach(item2=>{
          item2.children.forEach(item3=>{
            // 得到所有的三级权限的id
            console.log(item3.id);
            
             this.defaultcheck.push(item3.id)
          })
        })
        
      });
     }else{
       this.$message.error(meta.msg)
     }
    },
  async setRigth(){
    // 获取当前树形结构中已经被选中的一级权限 二级权限 三级权限

    //getCheckeDkey: 得到全选节点的key
    let allcheck =this.$refs.tree.getCheckedKeys()
    // getHalfCheckedKeys 得到半节点
    let  half =this.$refs.tree.getHalfCheckedKeys()
    // 合并
    let arr = [...allcheck,...half] 
    // 将数组转为字符串
    let rids = arr.join(",")
    // 发送请求到服务器
    let res = await this.$http.post(`roles/${this.rid}/rights`,{
      rids:rids
    })
    // 解析
    let {meta,data} = res.data
    
    if(meta.status === 200){
      this.$message({
        type:"success",
        message:meta.msg
      })
        this.getAllRight()
      // 重新获取数据
    }else{
      this.$message.error(meta.msg)
    }
    // 关闭角色授权面板
    this.roleDialog = false
    // 重新获取数据
  
    }
    
  },
  // 
  mounted() {
    this.getAllRight();
  },
  components: {
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
