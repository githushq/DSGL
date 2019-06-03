<template>
  <div class="myhome">
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <topHeader></topHeader>
      </el-header>
    <el-container>
        <!-- 侧栏区域 -->
        <!--
          el-menu: 管理栏的管理标签
          default-active: 默认激活的菜单
          open:菜单栏展开的事件
          close: 菜单栏关闭的事件
          background-color:背景颜色
          text-color:文本颜色
          active-text-color:激活文件的颜色
          unique-opened:是否展开子选项
          router:开启vue-router模式,允许将index作为跳转的路由
          el-submenu : 菜单栏的子选项
          twmplaate: 结构的模板
          index:当前子选项的下标
          slot:设置导航的一级菜单
          el-menu-item-group: 一级菜单下二级菜单的分组
          el-menu-item: 二级菜单
        -->
       
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>
        <!-- 内容区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Aside from './layout/aside/aside.vue'
import topHeader from './layout/topHeader/topHeader.vue'
export default {
  // 进入一个组件执行的代码
  meunted() {
    var token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
    }
  },
  components: {
    Aside,
    topHeader,
  }
};
</script>

<style scoped>
.myhome{
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  
}
.el-container {
    height: 100%;
  }

.el-main {
  background-color: #e9eef3;
  color: #333;
 
}
.mymenu {
    height: 100%;
  }

body > .el-container {
  height: 100%;
}

</style>
