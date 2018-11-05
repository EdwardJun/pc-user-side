<style lang="sass">
    @import './sass/common/common.scss';
    @import './sass/views/app.scss';
</style>

<template>
    <div id="app">
        <!--top header-->
        <header class="mobile-app-header" v-if="navigatorStatus">
            <div><i @click="doClickMenu()" :class="{active: showModel}"></i><i></i></div>
        </header>
        <header class="app-header" v-if="navStatus && !navigatorStatus" :class="{active: navigationScrollStatus || routeName=='detail'}">
            <div class="bann">
                <a class="logo" v-if="routeName=='detail'? (!navigationScrollStatus && !routeName=='detail') : !navigationScrollStatus"><img src="./assets/images/common/logo_1.png" alt="小摩豆"/></a>
                <a class="logo" v-if="navigationScrollStatus || routeName=='detail'"><img src="./assets/images/common/logo_active.png" alt="小摩豆"/></a>
                <div class="menu">
                    <ul>
                        <li v-for="(item, index) in tabMenu" :key="index" :class="{active: currTab==item.value || type == item.type}" @click="doMenu(item.value)">{{ item.name }}</li>
                    </ul>
                </div>
            </div>
        </header>

        <!--view content-->
        <transition name="app-page-fade">
            <router-view/>
        </transition>
        
        <footer class="app-footer" v-if="!navigatorStatus">
            <div class="item-footer">
                <div class="item-tel">
                    <div>400-829-9358</div>
                    <div>周一至周六 9:00-22:00</div>
                </div>
                <div class="item-choice">
                    <div @click="doClickLink('home')">关于我们</div>
                    <div @click="doClickLink('product')">产品</div>
                    <div @click="doClickLink('case')">案例</div>
                    <div @click="doClickLink('industryKnowledge')">行业知识</div>
                    <div @click="doClickLink('about')">联系我们</div>
                    <div @click="doClickLink('privacyPolicy')">隐私政策</div>
                </div>
                <div class="item-about-tav">
                    <div>联系我们</div>
                    <div class="item-phone">
                        <p>联系方式</p>
                        <div>400 - 829 - 9358</div>
                    </div>
                    <div class="item-phone">
                        <p>邮箱</p>
                        <div>shenkx@xiaomodo.com</div>
                    </div>
                    <div class="item-phone">
                        <p>地址</p>
                        <div>深圳市福强路3030号中国新媒体产业大厦16F</div>
                    </div>
                </div>
                <div class="item-attention">
                    <div>关注小摩豆</div>
                    <div><img src="./assets/images/home/icon06.png"/></div>
                </div>
            </div>
            <div class="item-bottom">© 2018 小摩豆 版权所有 粤ICP备15112271号-1</div>
        </footer>
        <footer class="mobile-app-footer" v-if="navigatorStatus">
            <div>
                <div>手机版 | <span>电脑版</span></div>
                <div>© 2018 小摩豆 版权所有 粤ICP备15112271号-1</div>
            </div>
        </footer>

        <!--右边菜单-->
        <div class="right-navigation" v-if="!navigatorStatus">
            <div><i></i></div>
            <div @click="doClickQQ"><i></i></div>
            <div><i></i></div>
            <div @click="doClickTop()"></div>
        </div>
        <!-- :class="{ active: loading }"-->
        <!--<Spinner></Spinner>-->

        <div class="mobile-nav-modal pop-modal" :class="{active: showModel}">
            <div v-for="(item, index) in tabMenu" :key="index" @click="doMenu(item.value)">{{ item.name }}</div>
        </div>

        <TipShow></TipShow>
    </div>
</template>

<script>
    import Spinner from './components/app/Spinner'
    import TipShow from './components/common/TipShow'
    export default {
        name: 'app',
        components: {
            Spinner,
            TipShow
        },
        data () {
            return {
                tabMenu: [
                    {name: '首页', value: 'home', type: ''},
                    {name: '产品', value: 'product', type: ''},
                    {name: '案例', value: 'case', type: 'case'},
                    {name: '行业知识', value: 'industryKnowledge', type: 'news'},
                    {name: '联系我们', value: 'about', type: ''}
                ],
                currTab: 'home',
                navigationScrollStatus: false,
                routeName: '',
                type: '',
                showModel: false
            }
        },
        created () {
            let that = this
            let store = that.$store
            if (!(/(android|iphone|ipad|PlayBook|BB10)/i).test(window.navigator.userAgent)) {
                store.state.navigatorStatus = false
                console.log('pc')
            }
            if ((/(android|iphone|ipad|PlayBook|BB10)/i).test(window.navigator.userAgent)) {
                store.state.navigatorStatus = true
                console.log('移动端')
            }
        },
        mounted () {
            let that = this
            window.addEventListener('scroll', that.handleScroll)
        },
        computed: {
            navStatus () {
                let that = this
                let store = that.$store
                that.routeName = this.$route.name
                that.type = this.$route.query.type
                that.currTab = that.routeName
                return store.state.navigationStatus
            },
            navigatorStatus () {
                let that = this
                let store = that.$store
                return store.state.navigatorStatus
            }
        },
        methods: {
            doClickMenu () {
                this.showModel = !this.showModel
            },
            doMenu (tab) {
                let that = this
                that.currTab = tab
                document.documentElement.scrollTop = 0
                if (tab == 'home') {
                    that.$router.push({name: 'home'})
                } else if (tab == 'product') {
                    that.$router.push({name: 'product'})
                } else if (tab == 'case') {
                    that.$router.push({name: 'case'})
                } else if (tab == 'industryKnowledge') {
                    that.$router.push({name: 'industryKnowledge'})
                } else {
                    that.$router.push({name: 'about'})
                }
                that.showModel = false
            },
            handleScroll () {
                this.scrollY()
            },
            scrollY () {
                if (window.scrollY > 0) {
                    this.navigationScrollStatus = window.scrollY > 0
                } else {
                    this.navigationScrollStatus = false
                }
            },
            doClickTop () {
                if (document.documentElement.scrollTop > 0) {
                    document.documentElement.scrollTop = 0
                }
            },
            doClickQQ () {
                location.href = 'tencent://message?uin=459436980&Site=http://vps.shuidazhe.com&Menu=yes"'
            },
            doClickLink (type) {
                if (type == 'home') {
                    window.open(location.origin + '/#/home')
                } else if (type == 'product') {
                    window.open(location.origin + '/#/product')
                } else if (type == 'case') {
                    window.open(location.origin + '/#/case')
                } else if (type == 'industryKnowledge') {
                    window.open(location.origin + '/#/industryKnowledge')
                } else if (type == 'about') {
                    window.open(location.origin + '/#/about')
                } else if (type == 'privacyPolicy') {
                    window.open(location.origin + '/#/privacyPolicy')
                }
            }
        }
    }
</script>
