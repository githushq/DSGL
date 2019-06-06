<template>
  <el-card>
    <el-card>
      <Breadnav :navone="'商品管理'" :navtwo="'商品列表'"></Breadnav>
    </el-card>
    <!-- 搜索区域 -->
    <el-row class="myrow">
      <el-col :span="8">
        <el-input v-model="search" placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
        </el-input>
      </el-col>
      <el-col :span="16">
        <el-button class="mybtn" type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格区域 -->
    <el-table :data="dataList" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="400px"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)"></el-table-column>
      <el-table-column prop="goods_number" label="商品重量"></el-table-column>
      <el-table-column label="创建时间" width="200px">
        <template slot-scope="scope">{{scope.row.add_time | myfilter("YYYY-MM-DD hh:mm:ss")}}</template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <!-- slot-scope: 可以用来获取当前行的数据 -->
          <!-- 两个按钮 -->
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>
    
<script>
import Breadnav from "../home/layout/breadnav/breanav.vue";
export default {
  data() {
    return {
      dataList: [],
      currentPage: 1, // 当前页
      pageSize: 10, //页容量
      total: 0, // 数据总条数
      search: "",
      pageSizes: [10, 20, 30]
    };
  },
  methods: {
    // 得到所有的商品列表
    async getAlldata() {
      let res = await this.$http.get(
        `/goods?pagenum=${this.currentPage}&pagesize=${this.pageSize}&query=${
          this.search
        }`
      );
      let { meta, data } = res.data;
      if (meta.status === 200) {
        //   获取数据的总条数
        this.total = data.total
        this.dataList = data.goods;
      } else {
        this.$message.error(meta.msg);
      }
    },
    searchData() {
      this.getALLdata();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAlldata();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAlldata();
    }
  },

  components: {
    Breadnav
  },
  mounted() {
    this.getAlldata();
  }
};
</script>

<style>
.mybtn {
  margin-left: 10px;
}
</style>
