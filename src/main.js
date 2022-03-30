import Vue from 'vue'
import App from './App.vue'
import { Button, Input, Table, Popover, TableColumn } from 'element-ui';

Vue.use(Table)
Vue.use(Button)
Vue.use(Input)
Vue.use(Popover)
Vue.use(TableColumn)

new Vue({
  el: '#app',
  render: h => h(App)
})
