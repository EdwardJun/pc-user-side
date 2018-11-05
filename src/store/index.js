import Vue from 'vue'
import Vuex from 'vuex'
import types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        navigationStatus: true, // 顶部导航显示与隐藏
        navigatorStatus: false, // false pc端 / true 移动端
        appTip: '', // 全局的提示
        appTipStatus: 'ok', // tipShow状态
        appTipDelay: 1500, // tipShow延迟时间
        currRouter: {
            from: '',
            to: '',
            query: null,
            instance: null // 路由实例
        }
    },
    mutations: {
        setNavigationStatus (state, isShow) {
            state.navigationStatus = isShow
        },
        setCurrRouter (state, payload) {
        },
        // 设置全局的提示
        [types.SET_APP_TIP] (state, payload) {
            state.appTip = payload.tip
            state.appTipStatus = (payload.status ? 'ok' : 'error')
            state.appTipDelay = payload.delay || 2000
        }
    }
})
