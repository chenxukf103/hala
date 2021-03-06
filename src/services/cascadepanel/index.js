import Vue from 'vue'
import {createElement, timeout} from '../utils'
import CascadePanel from '../../components/cascade/cascadePanel.vue'

class CascadePanelService {
    constructor() {
        this._vm = undefined
    }

    show(title, options) {
        createElement('ha-cascade-panel');
        this._vm = new Vue(CascadePanel).$mount('[ha-cascade-panel]');
        return timeout(50).then(() => {
            return this._vm.show(title, options)
        })
    }

    hide() {
        this._vm.hide()
    }
}

window.$cascadePanel = new CascadePanelService();
