/**
 * Created by majun on 2017/5/11.
 */
import Vue from 'vue'
import libs from './lib'
import cps from './component'
import plugins from './plugin'
import filters from '~filter'
import directives from '~directive'

/**
 * 把一些全局对象和一些全局方法，注册到Vue原型上
 */
Vue.use({
  install(Vue) {
    // Vue.mixin()

    // 注册第三方库
    Object.keys(libs).forEach(key => {
      Vue.prototype[ '$' + key ] = libs[ key ]
    })

    // 注册全局方法，如常用的接口方法，工具方法等。
    Object.keys(plugins).forEach(key => {
      Vue.prototype[ '$' + key ] = plugins[ key ]
    })
  }
})

// 自定义组件
Object.keys(cps).forEach(key => {
  let cp_name = key.replace(/([A-Z])/g, '-$1').toLowerCase()
  if (cp_name && cp_name[ 0 ] === '-') {
    cp_name = cp_name.replace('-', '')
  }
  Vue.component(cp_name, cps[ key ])
})

// 自定义过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[ key ])
})

// 自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[ key ])
})

