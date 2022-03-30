<template>
  <div id="app">
    <el-table ref="table" :data="tableData" border size="mini" highlight-current-row>
      <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
      <el-table-column align="center" label="姓名" prop="userName" width="150" show-overflow-tooltip>
        <template slot="header" slot-scope="scope">
          <elTableHeaderFilter
            :data="tableData"
            label="姓名"
            :filterParams="{
              label: 'userName', prop: 'userId'
            }"
            @submit="handleSelectUser"
          ></elTableHeaderFilter>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="公司"
        width="150"
        prop="companyName"
        show-overflow-tooltip
      >
        <template slot="header" slot-scope="scope">
          <elTableHeaderFilter
            :data="tableData"
            label="公司"
            :filterParams="{
              label: 'companyName', prop: 'companyId'
            }"
            width="150"
            :isCheckbox="false"
            @submit="handleSelectCompany"
          ></elTableHeaderFilter>
        </template>
      </el-table-column>
      <el-table-column align="center" label="部门" width="150" prop="deptName" show-overflow-tooltip>
        <template slot="header" slot-scope="scope">
          <elTableHeaderFilter
            :data="tableData"
            label="部门"
            :filterParams="{
              label: 'deptName', prop: 'deptId'
            }"
            width="150"
            :isCheckbox="true"
            @submit="handleSelectDept"
          ></elTableHeaderFilter>
        </template>
      </el-table-column>

      <el-table-column align="center" label="年龄" width="80" prop="year" show-overflow-tooltip />
      <el-table-column align="center" label="性别" width="80" prop="sex" show-overflow-tooltip />
    </el-table>

    <el-button style="margin-top:10px;" type="primary" size="mini" @click="changeValue">改变数值</el-button>
  </div>
</template>

<script>
import elTableHeaderFilter from './plugins/elTableHeaderFilter/elTableHeaderFilter'
export default {
  name: 'app',
  data() {
    return {
      tableList: [
        {
          userId: '1',
          userName: '张三',
          companyName: 'aabb有限公司',
          companyId: 'A0001',
          deptName: '软件一部',
          deptId: 'D001',
          year: 30,
          sex: '男'
        },
        {
          userId: '2',
          userName: '李四',
          companyName: 'ccdd有限公司',
          companyId: 'A0002',
          deptName: '软件二部',
          deptId: 'D002',
          year: 38,
          sex: '男'
        },
        {
          userId: '3',
          userName: '王五',
          companyName: 'eeff有限公司',
          companyId: 'A0003',
          deptName: '软件三部',
          deptId: 'D003',
          year: 22,
          sex: '女'
        }
      ], //表数据

      companyFilter: [], //保存筛选公司id
      userNameFilter: [],//保存筛选姓名id
      deptFilter: [],//保存筛选部门id
    }
  },

  components: { elTableHeaderFilter },

  computed: {
    tableData() {
      return this.tableList.filter((data) => {
        return (
          (this.companyFilter.length === 0 ||
            this.companyFilter.includes(data.companyId)) &&
          (this.userNameFilter.length === 0 ||
            this.userNameFilter.includes(data.userId)) &&
          (this.deptFilter.length === 0 ||
            this.deptFilter.includes(data.deptId))
        )
      })
    },
  },

  methods: {
    //表头过滤选择公司
    handleSelectCompany(val) {
      if (val && val.length === 0) {
        this.companyFilter = []
        return
      }
      this.companyFilter = val && val.companyId ? [val.companyId] : []
    },
    //表头过滤选择姓名
    handleSelectUser(val) {
      if (val && val.length === 0) {
        this.userNameFilter = []
        return
      }
      this.userNameFilter = val && val.userId ? [val.userId] : []
    },
    // 表头过滤选择部门
    handleSelectDept(val) {
      if (val && val.length === 0) {
        this.deptFilter = []
        return
      }
      const arr = []
      val.map((item) => {
        arr.push(item.deptId)
      })
      this.deptFilter = arr
    },

    changeValue() {
      this.tableList[1].userName = 'a先生'
      this.tableList[1].userId = '44'
      this.$set(this.tableList, 1, this.tableList[1])
    }
  }
}
</script>
