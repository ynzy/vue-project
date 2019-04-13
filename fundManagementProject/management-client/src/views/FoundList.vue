<!--  -->
<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true" ref="search_data" :model="search_data">
        <el-form-item label="投标时间筛选:">
          <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
          <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="onScreeoutMoney()">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" 
          v-if="user.identity=='manager'"
          @click="onAddMoney()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="800"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column prop="date" label="创建时间" align="center" width="250" sortable>
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date | date-format }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
        <el-table-column prop="describe" label="收支描述" align="center" width="180"></el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#00d053">+ {{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#f56767">- {{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="220"></el-table-column>
        <el-table-column prop="operation" align="center" label="操作" fixed="right" width="180" v-if="user.identity=='manager'">
          <template slot-scope="scope">
            <el-button type="warning" icon="edit" size="small" @click="onEditMoney(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="onDeleteMoney(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 弹框页面，关闭显示弹框、添加表单数据通过父组件传输，添加完成立即执行获取表单数据ajax -->
    <DialogFound :dialog="dialog" :form="form" @update="getProfile"></DialogFound>
  </div>
</template>

<script>
import DialogFound from "../components/DialogFound";
export default {
  name: "fundlist",
  data() {
    return {
      tableData: [],
      allTableData: [],
      filterTableData: [],//筛选数据
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      search_data: {
        startTime: "",
        endTime: ""
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },

  methods: {
    getProfile() {
      //获取表格数据
      // 获取表格数据
      this.$axios("/api/profiles").then(res => {
        // console.log(res);
        // this.tableData = res.data;
        this.allTableData = res.data
        this.filterTableData = res.data;
         // 设置分页数据
        this.setPaginations();
      });
    },
    onAddMoney() {
      // 添加
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.form = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    onDeleteMoney(row, index) {
      // 删除
      // console.log(row._id)
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    onEditMoney(row) {
      //编辑
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      this.form = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    onScreeoutMoney() {
      //筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfile();
        return;
      }
      const stime = this.search_data.startTime.getTime();
      const etime = this.search_data.endTime.getTime();
      this.allTableData = this.filterTableData.filter(item => {
        // console.log(item)
        //筛选大于等于开始时间，小于等于结束时间
        let date = new Date(item.date); //格式化时间
        let time = date.getTime(); //获取数据的时间
        return time >= stime && time <= etime;
      });
      // 重新分页数据
      this.setPaginations();
    },
    setPaginations(page) {
      //总页数

      //分页属性设置
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      //设置默认的分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index <this.paginations.page_size;
      })
    },
    handleCurrentChange(page) {
      //获取当前页
      //  console.log(page)
      let sortnum = this.paginations.page_size * (page - 1);  //当前页的下标
      // console.log(sortnum)
      // //数据的总数
      // let nums = this.paginations.page_size * page
      // //容器
      // let tables = [];
      // for (let i=sortnum; i< nums; i++) {
      //   if (this.allTableData[i]) {
      //     tables.push(this.allTableData[i])
      //   }
      //   this.tableData = tables
      // }
      //过滤出的数据要大于等于当前页
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据，过滤显示的数据要小于显示的条数
      this.tableData = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      // console.log(page_size)
      //切换显示的条数,重置当前页为第一页
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    }
  },
  created() {
    this.getProfile();
  },
  components: {
    DialogFound
  }
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>