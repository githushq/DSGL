<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo mymenu"
    background-color="#fff"
    text-color="#444"
    :unique-opened="true"
    :router="true" >
    <el-submenu v-for="(item1,index1) in menusList" :key="index1" :index="item1.path">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item1.authName}}</span>
      </template>
      <el-menu-item v-for="(item2,index2) in item1.children" :key="index2" :index="item2.path">
        <i class="el-icon-menu"></i>
        <span>{{item2.authName}}</span>
      </el-menu-item>
    </el-submenu>
    <!-- <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item index ="/roles">
        <i class="el-icon-menu"></i>
        <span>角色列表</span>
      </el-menu-item>
      <el-menu-item index="/rights">
        <i class="el-icon-menu"></i>
        <span>权限列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>商品管事</span>
      </template>
      <el-menu-item index>
        <i class="el-icon-menu"></i>
        <span>商品列表</span>
      </el-menu-item>
      <el-menu-item index>
        <i class="el-icon-menu"></i>
        <span>分类参数</span>
      </el-menu-item>
      <el-menu-item index>
        <i class="el-icon-menu"></i>
        <span>商品分类</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>订单管事</span>
      </template>
      <el-menu-item index>
        <i class="el-icon-menu"></i>
        <span>订单列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>数据统计</span>
      </template>
      <el-menu-item index>
        <i class="el-icon-menu"></i>
        <span>数据报表</span> -
       </el-menu-item>
    </el-submenu> -->
  </el-menu>
</template>

<script>
export default {
  data(){
    return{
      menusList:[]
    }
  },
  // 动态生成侧边栏
  methods:{
    async getMenusList(){
      let res = await this.$http.get('menus')
      // 解构
      let {meta,data}= res.data
      if(meta.status === 200){
        this.menusList = data
        console.log(this.munusList);
        
      }else{
        this.$message.error(meta.msg)
      }
    }
    
  },
  mounted(){
    this.getMenusList()
  }
};
</script>

<style>
</style>
