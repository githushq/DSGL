<template>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple-dark">
          <img src="../../../../assets/logo.png" alt>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-dark">
          <h1>电商管理系统</h1>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-dark logout">
          <a href="#" @click.prevent = "logOut">退出</a>
        </div>
      </el-col>
    </el-row>
</template>

<script>
export default {
  methods:{
    logOut(){
      this.$confirm('您确定要推出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功'
          });
          window.localStorage.removeItem("token")
          this.$router.push('login')
        })
    }
  }
};
</script>

<style scoped>
.logout {
  text-align: right;
}
.logout a {
  color: green;
}
</style>
