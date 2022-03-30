<template>
  <el-popover placement="right" width="282" height="482" trigger="click" v-model="isShow">
    <div class="search-area">
      <el-input
        placeholder="请输入关键字"
        v-model="searchKeywords"
        size="small"
        style="width: 183px;margin-right: 10px;"
        suffix-icon="el-icon-search"
      ></el-input>
    </div>
    <div class="table-area">
      <el-table
        ref="table"
        :data="listData"
        style="width: 100%;"
        :highlight-current-row="!isCheckbox"
        @selection-change="handleSelectionChange"
        @current-change="handleCurrentChange"
        @row-click="singleClick"
        @row-dblclick="doubleClick"
        row-class-name="pop-table-row"
        :header-cell-style="tableHeaderStyle"
        height="500px"
        size="small"
      >
        <el-table-column v-if="isCheckbox" type="selection" width="50" align="center" />
        <el-table-column :label="label" align="center" :prop="filterParams.label" />
      </el-table>
      <div style="text-align: right; margin-top: 8px">
        <el-button size="small" @click="handleReset">重置</el-button>
        <el-button v-show="isCheckbox" size="small" @click="handleClose">取消</el-button>
        <el-button v-show="isCheckbox" type="primary" size="small" @click="handleSubmit">确定</el-button>
      </div>
    </div>
    <el-button slot="reference" type="text">
      <div class="text" :style="textStyle">
        <div class="content" :style="`width: ${contentWidth};`">
          <span v-if="!allowEmpty" style="color: #FD472F; margin-right: 3px;">*</span>
          <span>{{ popLabel === '' || popLabel == null ? label : popLabel }}</span>
        </div>
        <i v-if="!isShow" class="el-icon-caret-right"></i>
        <i v-if="isShow" class="el-icon-caret-left"></i>
      </div>
    </el-button>
  </el-popover>
</template>

<script>
export default {
  name: 'elTableHeaderFilter',
  props: {
    label: {
      type: String,
      default: '',
      required: true
    },
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    sourceSingleChange: {
      type: Object,
      default: () => { }
    },
    filterParams: {
      type: Object,
      required: true
    },
    isCheckbox: {
      type: Boolean,
      default: false
    },
    width: {
      type: String | Number,
      default: '150'
    },
    headerStyle: {
      type: Object,
    },
    popoverHeaderStyle: {
      type: Object,
    },
    allowEmpty: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    data(newVal) {
      if ((this.isCheckbox && this.multipleSelection.length === 0) || (!this.isCheckbox && this.isEmptyReactiveObject(this.singleSelection))) {
        this.handleData(newVal)
      }
    },
    sourceSingleChange(newVal) {
      if (newVal[this.filterParams.prop] && newVal[this.filterParams.label]) {
        const flag = this.tableList.some(item => {
          return item[this.filterParams.prop] = newVal[this.filterParams.prop]
        })
        if (!flag) {
          this.tableList.push(newVal)
        }
      }
    }
  },
  computed: {
    listData() {
      return this.tableList.filter(data => {
        return !this.searchKeywords || data[this.filterParams.label].toLowerCase().includes(this.searchKeywords.toLowerCase())
      })
    },

    contentWidth() {
      const width = parseInt(this.width)
      return `${width - 14 - 30}px`
    },

    textStyle() {
      let style = ''
      const headerStyle = this.headerStyle
      for (let key in headerStyle) {
        style += `${key}:${headerStyle[key]};`
      }
      return style
    }
  },
  mounted() {
    this.handleData(this.data)
  },
  data() {
    return {
      tableList: [],
      multipleSelection: [],
      singleSelection: {},
      searchKeywords: '',
      popLabel: '',//选择后展示文字
      isShow: false,
    }
  },
  methods: {
    //判断响应对象是空对象
    isEmptyReactiveObject(obj) {
      return toString.call(obj) === '[object Object]' && Reflect.ownKeys(obj).length === 1 && obj.hasOwnProperty('__ob__')
    },
    // 给表头增加样式
    tableHeaderStyle() {
      const defaultObj = {
        height: '44px',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        fontWeight: 500,
        background: '#FAFAFA',
        color: '#000'
      }
      const obj = toString.call(this.popoverHeaderStyle) === '[object Object]' ? Object.assign(defaultObj, this.popoverHeaderStyle) : defaultObj

      return obj
    },

    handleData(listData) {
      const arr = []
      const tableList = []
      const prop = this.filterParams.prop
      const label = this.filterParams.label

      listData.map(item => {
        if (arr.length === 0 && item[prop]) {
          arr.push(item[prop])
          tableList.push({
            [prop]: item[prop],
            [label]: item[label],
          })
        } else if (item[prop]) {
          let hasSame = false
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === item[prop]) {
              hasSame = true
              break
            }
          }
          if (!hasSame) {
            arr.push(item[prop])
            tableList.push({
              [prop]: item[prop],
              [label]: item[label],
            })
          }
        }
      })

      this.tableList = tableList
    },

    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //单选
    handleCurrentChange(val) {
      if (!this.isCheckbox) {
        this.singleSelection = val ? val : {}
        this.isShow = false
        this.popLabel = val && val[this.filterParams.label] ? val[this.filterParams.label] : ''
        this.$emit('submit', this.singleSelection)
      }
    },

    //单击
    singleClick(row) {
      if (this.isCheckbox) {
        this.$refs.table.toggleRowSelection(row)
      }
    },

    //双击
    doubleClick(row) {
      this.$refs.table.clearSelection();
      this.$refs.table.toggleRowSelection(row)
      this.handleSubmit()
    },

    //关闭
    handleClose() {
      this.isShow = false
    },

    //提交
    handleSubmit() {
      const tempNameArr = []
      this.multipleSelection.map(item => {
        tempNameArr.push(item[this.filterParams.label])
      })
      this.popLabel = tempNameArr.join('，')
      this.isShow = false
      this.$emit('submit', this.multipleSelection)
    },

    //重置
    handleReset() {
      this.isShow = false
      this.popLabel = ''
      this.$emit('submit', [])
      this.multipleSelection = []
      this.$refs.table.clearSelection();
      this.singleSelection = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.search-area {
  margin-bottom: 8px;
  ::v-deep .el-input {
    width: 100% !important;
  }
}
.el-popover {
  height: 482px;
  overflow: auto;
}

::v-deep .pop-table-row {
  height: 44px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;

  &:hover {
    cursor: pointer;
  }
}

.text {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>