## How to Use el-table-header-filter
  
  ### 1.安装el-table-header-filter
    npm i el-table-header-filter -S

  ### 2.安装element-ui
    npm i element-ui -S 

  ### 3.在main.js文件中添加
    全局引入：
    import elTableHeaderFilter from 'el-table-header-filter'
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'

    Vue.use(ElementUI)
    Vue.use(elTableHeaderFilter)

    按需引入：
    import elTableHeaderFilter from 'el-table-header-filter'
    import { Button, Input, Table, Popover, TableColumn } from 'element-ui'

    Vue.use(elTableHeaderFilter)
    Vue.use(Table)
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(TableColumn)
    Vue.use(Popover)
    注意：element-ui如要按需引入配置请参考element-ui官方文档，以上只提供了按需引入需要的相关组件，具体参考：https://element.eleme.cn/#/zh-CN/component/quickstart

  ## Attributes

| 参数               | 说明                                              |                类型                 |                                                         默认值                                                         | 是否必填 |
| ------------------ | ------------------------------------------------- | :---------------------------------: | :--------------------------------------------------------------------------------------------------------------------: | :------: |
| label              | 表头显示初始值                                    |               String                |                                                           ''                                                           |    是    |
| data               | 与表格绑定modal保持一致,用法参考App.vue的demo     |                Array                |                                                           [ ]                                                           |    是    |
| filterParams       | 需要过滤的字段在数据源中所对应的label字段和id字段 | Object<{label:String, prop:String}> |                                                                                                                        |    是    |
| isCheckbox         | 单/多选                                           |               Boolean               |                                                         false                                                          |    否    |
| width              | 宽度                                              |            String/Number            |                                                          150                                                           |    否    |
| headerStyle        | 表头显示样式                                    |               Object                | { fontSize: '12px',fontFamily: 'PingFangSC-Medium, PingFang SC', fontWeight: 500,background: '#FAFAFA', color: '#000'} |    否    |
| popoverHeaderStyle | popover筛选表头显示样式                               |               Object                |                                                          同上                                                          |    否    |
| allowEmpty         | 是否该字段必填，设置必填后为在文字前加上红色*       |               Boolean               |                                                         false                                                          |    否    |


  ## Attention

    若table中某一使用该组件的字段需要被修改，由于Vue2响应式对数组的特殊处理，对数组中对象值的变化需要使用$set才可以使得computed重新计算，从而将新的值加入表头筛选列表，具体可参考App.vue中的改变值的用例。

    

  


