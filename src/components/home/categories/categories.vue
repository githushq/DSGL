<template>
   <el-card>
       <!-- 面包屑导航 -->
        <el-card>
        <Breadnav :navone="'商品管理'" :navtwo="'商品分类'"></Breadnav>
    </el-card>
    <!-- 按钮 -->
    <el-row class="myrow">
          <el-button type="success">添加商品</el-button>
    </el-row>
    <!-- 表格区域  row-key="id"  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"-->
      <el-table :data="pageList" style="width: 100%">
            <el-table-tree-column file-icon="icon icon-file" folder-icon="icon icon-folder" prop="cat_name" label="名称" treeKey="cat_id" parentKey="cat_pid" levelKey="cat_level">
            </el-table-tree-column>
            <el-table-column label="级别">
                <template slot-scope="scope">
                    {{ scope.row.cat_level === 0 ? '一级': scope.row.cat_level === 1 ? '二级' : '三级' }}
                </template>
            </el-table-column>
            <el-table-column label="是否有效">
                <template slot-scope="scope">
                    {{ scope.row.cat_deleted ? '无效': '有效'}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template>
                    <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
   </el-card>
</template>

<script>
import Breadnav from "../layout/breadnav/breanav.vue"
export default {
    data(){
        return{
           cateList:[], // 数据源
            pageList:[],
        }
    },
    methods:{
        // 获取所有分类的数据
        async getCateList(){
            let res = await this.$http.get(`categories?type=3`)
            console.log(res);
            
            let {meta,data} = res.data
            if(meta.status===200){
                this.cateList = data
            }else{
                this.$message.error(meta.msg)
            }
        }
    },
     mounted(){
        this.getCateList()
    },
    components:{
        Breadnav,
    },
  
}
</script>

<style>
    .myrow{
        margin-top: 10px
    }
</style>
