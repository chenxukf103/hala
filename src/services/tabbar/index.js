import Vue from 'vue'
import Tabbar from './tabbar'
import channel from './channel'

import {createElement} from '../utils'

let _vm = undefined;

Vue.directive('tabbar', {
    inserted:function(el, binding) {
    setTimeout(() => {
        let props = {}
        let data = binding.value
        if (data.menuColor) props.menuColor = data.menuColor
        if (data.activeMenuColor) props.activeMenuColor = data.activeMenuColor
        if (data.onMenuClick) props.onMenuClick = data.onMenuClick

        createElement('ha-tabbar')
        _vm = new Vue(Object.assign({}, Tabbar, {
            data: {
                menus: data.menus,
                menuIndex: 0,
                state: 0
            },
            propsData: props
        })).$mount('[ha-tabbar]')
    })
    }
})

const vmReady = () =>{
    let cnt = 0;
    return new Promise((resolve, reject) => {
    let timer = setInterval(() => {
        if (cnt > 100) {
            reject('Tabbar _vm undefined.')
            return
        }
        cnt++
        if (_vm) {
            clearInterval(timer)
            resolve()
        }
    }, 10)
    })
}

Vue.directive('tabbar-menu-index', {
    inserted: function (el, binding) {
        vmReady().then(() => {
            _vm.activate(binding.value)
        })
    }
})

channel.$on('hideTabbar', () => {
    if (_vm) {
        _vm.$destroy()
        document.body.removeChild(_vm.$el)
    }
})

window.$tabbar = window.$tabbarEmmiter = channel
