<template>
  <el-card>
    <!-- 添加一个面包屑导航 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb> -->
    <breadnav :navone="'用户管理'" :navtwo="'用户列表'"></breadnav>
    <!-- 添加一个搜索框 -->
    <el-row class="myrow">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
        </el-input>
      </el-col>
      <el-col :span="16">
        &nbsp;
        <el-button type="success" plain @click="showAdd">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 添加表格 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <!-- {{ scope.row }} -->
          <el-switch
            v-model="scope.row.mg_state"
            @change="changeStu(scope.row.id,scope.row.mg_state)"
            active-color="#0f0"
            inactive-color="#f00"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 两个按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
            @click="showEdit(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="deleteData(scope.row.id)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            plain
            size="mini"
            @click="check(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addDialog">
      <el-form :model="form" :rules="rules" ref="addForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="postAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog title="修改用户" :visible.sync="EditDialog" :rules="rules" ref="ruleForm">
      <el-form v-model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditDialog = false">取 消</el-button>
        <el-button type="primary" @click="postEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色-->

    <el-dialog title="分配角色" :visible.sync="rolesDialog" :rules="rules" ref="ruleForm">
      <el-form v-model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">{{form.username}}</el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.rid" placeholder="请选择">
            <el-option :value="-1" label="请选择"></el-option>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesDialog = false">取 消</el-button>
        <el-button type="primary" @click="postCheck">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import Breadnav from "../../layout/breadnav/breanav.vue"
export default {
  data() {
    return {
      search: "",
      //   因为请求的时候要带users,要带上参数当前页,和页容量
      pagenum: 1, // 当前页
      pagesize: 20,
      tableData: [],
      addDialog: false, //添加用户弹窗
      EditDialog: false, //修改用户弹窗
      rolesDialog: false, //分配角色
      formLabelWidth: "100px",
      search: "",
      options: [],
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    async getUserList() {
      let token = localStorage.getItem("token");
      let res = await this.$http.get("users", {
        // headers: {
        //   Authorization: token
        // },
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          query: this.search
        }
      });
      let { data, meta } = res.data;
      if (meta.status === 200) {
        this.tableData = data.users;
      }
    },
    showAdd() {
      this.addDialog = true;
    },
    postAdd() {
      // 1.0 验证数据是否合法
      this.$refs.addForm.validate(async vali => {
        if (vali) {
          // 2.0 将数据提交到服务器
          let res = await this.$http.post("users", this.form, {
            // token
            // headers: {
            //   Authorization: window.localStorage.getItem("token")
            // }
          });

          // 3.0 接收结果，重新渲染
          let { meta } = res.data;
          if (meta.status === 201) {
            this.$message({
              type: "success",
              message: meta.msg
            });
            this.getUserList();
            // 关闭面板
            this.addDialog = false;
            // 清空数据
            this.form.username = "";
            this.form.password = "";
            this.form.email = "";
            this.formObj.mobile = "";
          } else {
            this.$message.error(meta.msg);
          }
        } else {
          this.$message.error("参数不合法");
        }
      });
    },
    searchData() {
      this.getUserList();
    },
    async showEdit(id) {
      this.EditDialog = true;
      // 根据id去获取数据然后渲染页面
      let res = this.$http.get(`users/${id}`, {
        // headers: {
        //   Authorization: localStorage.getItem("token")
        // }
      });

      let { meta, data } = res.data;
      if (meta.status === 200) {
        this.form = data;
      }
    },
    async postEdit() {
      let res = await this.$http.put(
        `users/${this.form.id}`,
        {
          email: this.form.email,
          mobile: this.form.mobile
        },
        {
          // headers: {
          //   Authorization: localStorage.getItem("token")
          // }
        }
      );
      let { data, meta } = res.data;
      if (meta.status === 200) {
        this.EditDialog = false;
        this.$message({
          message: "修改成功",
          type: "success"
        });
        this.getUserList();
      } else {
        this.$message.error("出错啦");
      }
    },
    async deleteData(id) {
      let res = this.$http.delete(`users/${id}`, {
        // headers: {
        //   Authorization: localStorage.getItem("token")
        // }
      });

      let { data, meta } = res.data;
      if (meta.status === 200) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getUserList();
      } else {
        this.$message.error("出错了");
      }
    },
    async changeStu(id, state) {
      let res = await this.$http.put(
        `users/${id}/state/${state}`,
        {},
        {
          // headers: {
          //   Authorization: localStorage.getItem("token")
          // }
        }
      );
      let { meta } = res.data;
      if (meta.status === 200) {
        this.$message({
          type: "success",
          message: meta.msg
        });
      }
    },
    //分配角色
    async check(id) {
      this.rolesDialog = true;
      let res = await this.$http.get(`users/${id}`, {
        // headers: {
        //   Authorization: localStorage.getItem("token")
        // }
      });
      let { data, meta } = res.data;
      if (meta.status === 200) {
        this.form = data;
      }
    },
    //获取下拉框中的数据
    async getOpetions() {
      let res = await this.$http.get("roles", {
        // headers: {
        //   authorization: localStorage.getItem("token")
        // }
      });
      // 解构
      let { data, meta } = res.data;
      if (meta.status === 200) {
        this.options = data;
      }
    },
    // 提交分配角色
    async postCheck() {
      // 因为data中这时候有formobj.id
      let res = await this.$http.put(
        `users/${this.form.id}/role`,
        {
          rid: this.form.rid
        },
        {
          // headers: {
          //   authorization: localStorage.getItem("token")
          // }
        }
      );
      let { data, meta } = res.data;
      if (meta.status === 200) {
        this.$message({
          type: "success",
          message: meta.msg
        });
        this.options = [];
        this.form.rid = "";
        this.rolesDialog = false;
      } else {
        this.$message.error("出错了");
      }
    }
  },
  mounted() {
    this.getUserList();
    this.getOpetions();
  },
  components:{
    Breadnav
  }
};
</script>

<style scoped>
.myrow {
  margin-top: 20px;
}
</style>
