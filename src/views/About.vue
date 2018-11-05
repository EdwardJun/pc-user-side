<style lang="sass">
    @import '../sass/views/about.scss';
</style>
<template>
    <div id="about-page">
        <div v-if="!navigatorStatus" class="pc">
            <div class="item-banner">
                <div class="item-img"></div>
            </div>
            <div class="item-info">
                <div>
                    <p><span>联系</span>我们</P>
                    <p>Contact Us</P>
                </div>
                <div>
                    <div>
                        <div>公司地址</div>
                        <p>深圳市福田区福强路3030号新媒体广告产业园16楼</p>
                    </div>
                    <div>
                        <div>联系方式</div>
                        <p>400-829-9358</p>
                    </div>
                    <div>
                        <div>电子邮箱</div>
                        <p>shenkx@xiaomodo.com</p>
                    </div>
                </div>
                <div>
                    <div>姓名NAME：<input type="text" maxlength="25" v-model="name"/></div>
                    <div>电话TEL：<input type="tel" maxlength="11" v-model="tel"/></div>
                    <div>邮箱EMAIL：<input type="email" v-model="email"/></div>
                </div>
                <div>留言内容MASSAGE：<input type="text" maxlength="500" v-model="massage"/></div>
                <div @click="doClickSubmite()">提交</div>
            </div>
            <div class="item-map">
                <img src="../assets/images/about/map.png"/>
            </div>
        </div>

        <div v-if="navigatorStatus" class="mobile">
            <div class="m-item-banner">
                <div class="m-item-img"></div>
            </div>

            <div class="m-item-nav">
                <div v-for="(item, index) in mNavData" :key="index" :class="{active: currTab == item.value}" @click="doClickMenu(item.value)">{{ item.name}}</div>
            </div>

            <div class="m-item-map" v-if="currTab==2">
                <div class="m-item-title m-container"> 路线指引</div>
                <div>
                    <img src="../assets/images/about/m_map.png">
                </div>
            </div>

            <div class="m-item-advisory" v-if="currTab==1">
                <div class="m-item-title m-container"> 咨询我们</div>
                <div class="m-item-form">
                    <div><input type="text" placeholder="姓名NAME" maxlength="25" v-model="name"/></div>
                    <div><input type="tel" placeholder="电话TEL" maxlength="11" v-model="tel"/></div>
                    <div><input type="email" placeholder="邮箱EMAIL" v-model="email"/></div>
                    <div><textarea placeholder="留言内容MASSAGE" maxlength="500" v-model="massage"></textarea></div>
                </div>
                <div class="m-item-btn" @click="doClickSubmite()">提交</div>
            </div>

            <div class="m-item-about" v-if="currTab==0">
                <div class="m-item-title m-container"> 联系我们</div>
                <div class="m-item-info">
                    <div></div>
                    <div>小摩豆网络科技有限公司</div>
                    <div>全国免费咨询电话：</div>
                    <div><span style="white-space:pre"></span><a href="tel:4008299358">400-829-9358</a></div>
                    <div>小摩豆平台公众号</div>
                    <div><img src="static/img/code.png"></div>
                    <div>长按二维码加入我们</div>
                    <p>电话：<span style="white-space:pre"></span><a href="tel:4008299358">400-829-9358</a></p>
                    <p>邮箱：shenkx@xiaomodo.com</p>
                    <p>地址：<span>深圳市福田区福强路3030号新媒体广告产业园16楼</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import fetch from '@/utils/fetch'
    import tipShow from '@/utils/tipShow'
    export default {
        name: 'about',
        data () {
            return {
                data: [],
                name: '',
                tel: '',
                email: '',
                massage: '',
                currTab: 0,
                mNavData: [{name: '联系我们', value: 0}, {name: '咨询我们', value: 1}, {name: '路线指引', value: 2}]
            }
        },
        computed: {
            navigatorStatus () {
                let that = this
                let store = that.$store
                return store.state.navigatorStatus
            },
            isTelValid: function () {
                return /^1[3456789]\d{9}$/.test(this.tel)
            }
        },
        created () {
        },
        methods: {
            doClickSubmite () {
                let that = this
                if (!that.name) {
                    return tipShow('请输入姓名！')
                } else if (!that.tel) {
                    return tipShow('请输入电话号码！')
                } else if (!that.isTelValid) {
                    return tipShow('请输入正确的手机号码！')
                }
                fetch({
                    url: 'https://d.apicloud.com/mcm/api/customer',
                    method: 'post',
                    data: {
                        name: that.name,
                        tel: that.tel,
                        email: that.email,
                        massage: that.massage
                    }
                }).then(res => {
                    tipShow('提交成功！')
                    // console.log('res', res)
                })
            },
            doClickMenu (value) {
                let that = this
                that.currTab = value
            }
        }
    }
</script>