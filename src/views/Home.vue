<style lang="sass">
    @import '../sass/views/home.scss';
</style>
<template>
    <div id="home-page">
        <!--PC端-->
        <div v-if="!navigatorStatus" class="pc">
            <!--轮播图-->
            <div class="item-swiper">
                <swiper :options="swiperOption">
                    <swiper-slide><img src="../assets/images/home/banner01.png"/></swiper-slide>
                    <swiper-slide><img src="../assets/images/home/banner02.png"/></swiper-slide>
                    <swiper-slide><img src="../assets/images/home/banner03.png"/></swiper-slide>
                </swiper>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev swiper-button-white"></div>
                <div class="swiper-button-next swiper-button-white"></div>
            </div>
            <div class="item-fans">
                <div class="container">{{ scrollData.title }} <ScrollNumber :num = 'scrollData.num'></ScrollNumber>{{ scrollData.desc }}</div>
            </div>
            <!--营销-->
            <div class="item-product container">
                <ul>
                    <li @mouseenter="doMouseleave(item.value)" v-for="(item, index) in productTitle" :key="index" :class="{active: currTab == item.value}"><i></i><span>{{ item.name }}</span></li>
                </ul>
                <!-- 锁客 拓客 -->
                <div class="item-tkyl" v-if="currTab == 0">
                    <div class="item-content">
                        <div class="item-title"><span>收集粉</span>丝/活动营销/客服营销</div>
                        <p>轻松将所有到店客人转化为会所粉丝，牢牢锁住新客；</p>
                        <p>一键将上万活动信息发给客人，省时省成本；</p>
                        <p>会所技师可快速与客人线上互动，引导客人到店消费。</p>
                        <div @click="doClickProduct()" class="item-more">了解更多<i></i></div>
                    </div>
                    <div class="item-product-img"><img src="../assets/images/home/product01.png"/></div>
                </div>

                <!-- 管理 -->
                <div class="item-tkyl" v-if="currTab == 1">
                    <div class="item-content">
                        <div class="item-title"><span>CRM</span>/精准营销/会员系统/积分系统</div>
                        <p>帮助会所对不同客人进行标签划分，了解客人消费喜好；</p>
                        <p>智能大数据分析，方便会所针对不同的顾客提供个性化服务；</p>
                        <p>通过引导会员充值套餐，锁定客人的消费能力；</p>
                        <p>培养客人到店消费习惯，提升客人到店频率，增加客人粘性。</p>
                        <div @click="doClickProduct()" class="item-more">了解更多<i></i></div>
                    </div>
                    <div class="item-product02-img"><img src="../assets/images/home/product02.png"/></div>
                </div>

                <div class="item-tkyl" v-if="currTab == 2">
                    <div class="item-content">
                        <div class="item-title"><p>自动排钟/开钟记账/收银记账/</p><p><span>工资结算/</span>财务报表</p></div>
                        <p>智能化排钟，提升服务效率，减少人员工作压力；</p>
                        <p>自动生成各类数据报表，实现会所经营数据化，便于</p>
                        <p>会所调整经营策略，减少决策成本。</p>
                        <div @click="doClickProduct()" class="item-more">了解更多<i></i></div>
                    </div>
                    <div class="item-product02-img"><img src="../assets/images/home/product03.png"/></div>
                </div>

                <div class="item-tkyl" v-if="currTab == 3">
                    <div class="item-content">
                        <div class="item-title"><span>运营指</span>导/售后服务</div>
                        <p>托管式运营服务，经营数据定时推送，专业的运营方案，帮助会所</p>
                        <p>高效运营。</p>
                        <p>24小时客服在线，咨询专家到店/线上培训，从开通使用到售后维</p>
                        <p>护，一站式服务，确保售后无忧。</p>
                        <div @click="doClickProduct()" class="item-more">了解更多<i></i></div>
                    </div>
                    <div class="item-product04-img"><img src="../assets/images/home/product04.png"/></div>
                </div>
            </div>

            <!--行业案例-->
            <div class="item-business-case">
                <div class="item-title container">不同类型的会所都通过小摩豆 获得业绩提升</div>
                <div class="container item-business">
                    <swiper :options="businessSwiperOption" class="banner-swipe">
                        <swiper-slide v-for="caseItem in caseList" :key="caseItem.id">
                            <div class="item-content">
                                <div class="item-left" :style="{ 'background-image': 'url(' + caseItem.imgUrl +')' }"></div>
                                <div class="item-right">
                                    <div class="title">{{ caseItem.title }}</div>
                                    <div class="item-desc"><span>会所面积：</span><p>{{ caseItem.clubArea }}</p></div>
                                    <div class="item-desc"><span>会所类型：</span><p>{{ caseItem.clubType }}</p></div>
                                    <div class="item-desc"><span>会所痛点：</span><p>{{ caseItem.painPoint }}</p></div>
                                    <div class="item-desc"><span>获得成就：</span><p>{{ caseItem.effect }}</p></div>
                                </div>
                                <!--:to="{ name : 'detail', query: {id: caseItem.id, type: 'case'}}" -->
                                <div class="item-btn" @click="doClickDetail(caseItem.id, 'case')">查看详情<i></i></div>
                            </div>
                        </swiper-slide>
                    </swiper>
                    <div class="business-swiper-pagination" slot="pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
                <div class="item-btn" @click="doClickList('case')">更多案例</div>
            </div>

            <!-- 行业知识 -->
            <div class="item-case">
                <div class="item-title container">聚焦行业热点 让营销更容易</div>
                <div class="item-content container">
                    <div v-for="knowledge in knowledgeList" :key="knowledge.id" @click="doClickDetail(knowledge.id, 'news')">
                        <div>
                            <div class="item-img" :style="{ 'background-image': 'url(' + knowledge.imgUrl + ')' }"></div>
                            <div class="item-title">{{ knowledge.title }}</div>
                            <div class="item-text">{{ knowledge.desc }}</div>
                            <div class="item-btn"></div>
                        </div>
                    </div>
                </div>
                <div @click="doClickList('news')" :to="{ name: 'industryKnowledge' }" class="item-btn">更多行业知识</div>
            </div>
            <!--招商加盟-->
            <div class="item-join">
                <div class="item-title">全国各区代理 火热招募中</div>
                <div class="item-sub-title">代理加盟流程</div>
                <div class="item-img-join container"></div>
            </div>
        </div>

        <!--移动端-->
        <div v-if="navigatorStatus" class="mobile">
            <swiper :options="swiperOption">
                <swiper-slide><img src="../assets/images/home/m_banner_01.png"/></swiper-slide>
                <swiper-slide><img src="../assets/images/home/m_banner_02.png"/></swiper-slide>
                <swiper-slide><img src="../assets/images/home/m_banner_03.png"/></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>

            <div class="m-item-fans m-container">
                <div class="">{{ scrollData.title }} <ScrollNumber :num = 'scrollData.num'></ScrollNumber><span>{{ scrollData.desc }}</span></div>
            </div>

            <div class="m-item-product">
                <div class="m-item-title m-container"> 我们的产品</div>
                <div class="m-item-content" v-for="(item, index) in productData" :key="index">
                    <div class="m-container" @click="doClickPro(item)">{{ item.title }}<i :class="{active: item.status}"></i></div>
                    <div v-if="item.status">
                        <span>{{ item.subTitle }}</span>
                        <p>{{ item.desc }}</p>
                        <router-link tag="b" :to="{name: 'product'}" @click="doClickProduct()">了解更多</router-link>
                    </div>
                </div>
            </div>

            <div class="m-item-case">
                <div class="m-item-title m-container"> 客户案例</div>
                <div class="m-item-describe">不同类型的会所都通过小摩豆获<br>得业绩提升</div>
                <div class="m-item-list" v-for="(caseItem, index) in caseList" :key="index">
                    <div>
                        <div :style="{ 'background-image': 'url(' + caseItem.imgUrl + ')' }"></div>
                        <div>
                            <div>{{ caseItem.title }}</div>
                            <div><span>获得成效：</span>{{ caseItem.effect }}</div>
                            <router-link tag="div" :to="{ name : 'detail', query: {id: caseItem.id, type: 'case'}}">查看详情</router-link>
                        </div>
                    </div>
                </div>
                <router-link tag="div" :to="{ name: 'case' }" class="m-more-case">更多案例</router-link>
            </div>

            <div class="m-item-industry">
                <div class="m-item-title m-container"> 行业知识</div>
                <div class="m-item-describe">聚焦行业热点 让营销更容易</div>
                <div class="m-item-swiper">
                    <swiper :options="mSwiperOption">
                        <swiper-slide v-for="item in knowledgeList" :key="item.id">
                            <router-link tag="div" class="m-item-container" :to="{ name : 'detail', query: {id: item.id, type: 'news'}}">
                                <div>
                                    <div class="m-item-img" :style="{ 'background-image': 'url(' + item.imgUrl + ')' }"></div>
                                    <div class="m-title">{{ item.title }}</div>
                                    <div class="m-item-text">{{ item.desc }}</div>
                                    <div class="m-item-btn"></div>
                                </div>
                            </router-link>
                        </swiper-slide>
                    </swiper>
                </div>
                <router-link tag="div" :to="{ name : 'industryKnowledge' }" class="m-more-case">更多行业知识</router-link>
            </div>

            <div class="m-item-join">
                <div class="m-item-title m-container"> 加盟流程</div>
                <div class="m-item-describe">全国各区代理 火热招募中</div>
                <div class="m-item-img"><div></div></div>
                <div class="m-item-tel">咨询热线：<a href="tel:4008299358">400-829-9358</a></div>
            </div>
        </div>
    </div>
</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import fetch from '@/utils/fetch'
    import ScrollNumber from '@/components/common/ScrollNumber'

    export default {
        name: 'home',
        components: {
            swiper, swiperSlide, ScrollNumber
        },
        data () {
            return {
                scrollData: {
                    title: '',
                    num: 0,
                    desc: ''
                },
                productData: [
                    {title: '拓客引流', subTitle: '收集粉丝/活动营销/客服营销', desc: '轻松将所有到店客人转化为会所粉丝，牢牢锁住新客；一键将上万活动信息发给客人，省时省成本；会所技师可快速与客人线上互动，引导客人到店消费。', status: true},
                    {title: '留住顾客', subTitle: 'CRM/精准营销/会员系统/积分系统', desc: '帮助会所对不同客人进行标签划分，了解客人消费喜好；智能大数据分析，方便会所针对不同的顾客提供个性化服务；通过引导会员充值套餐，锁定客人的消费能力；培养客人到店消费习惯，提升客人到店频率，增加客人粘性。', status: false},
                    {title: '无忧管理', subTitle: '自动排钟/开钟记账/收银记账/工资结算/财务报表', desc: '智能化排钟，提升服务效率，减少人员工作压力；自动生成各类数据报表，实现会所经营数据化，便于会所调整经营策略，减少决策成本。', status: false},
                    {title: '运营服务', subTitle: '运营指导/售后服务', desc: '托管式运营服务，经营数据定时推送，专业的运营方案，帮助会所高效运营。24小时客服在线，咨询专家到店/线上培训，从开通使用到售后维护，一站式服务，确保售后无忧。', status: false}
                ],
                scrollTimer: null,
                scrollCount: 0,
                scrollDataList: [
                    { title: '小摩豆已帮会所增加新顾客', num: 486048, desc: '人' },
                    { title: '小摩豆已帮会所提升老客到店率', num: 95, desc: '%' },
                    { title: '小摩豆已帮会所推送营销信息', num: 875395, desc: '条' }
                ],
                swiperOption: {
                    autoplay: {
                        loop: true,
                        stopOnLastSlide: false,
                        delay: 3000
                    },
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                businessSwiperOption: {
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    pagination: {
                        el: '.business-swiper-pagination'
                    }
                },
                mSwiperOption: {},
                productTitle: [{name: '锁客 拓客', value: 0}, {name: '管理客人 留住客人', value: 1}, {name: '内部智能管理', value: 2}, {name: '运营服务', value: 3}],
                currTab: 1,
                scrolled: false,
                caseList: [], // 行业案例
                knowledgeList: [] // 行业知识
            }
        },
        computed: {
            navigatorStatus () {
                let that = this
                let store = that.$store
                return store.state.navigatorStatus
            }
        },
        created () {
            let that = this
            that.initSwiper()
            that.startScrollData()
            that.queryCaseList()
            that.queryKnowledgeList()
        },
        methods: {
            startScrollData () {
                const that = this
                const scrollData = that.scrollData
                const scrollDataList = that.scrollDataList
                scrollData.title = scrollDataList[0].title
                scrollData.num = scrollDataList[0].num
                scrollData.desc = scrollDataList[0].desc
                let index = 0
                that.scrollTimer = setInterval(() => {
                    index = (that.scrollCount ++) % 3
                    scrollData.title = scrollDataList[index].title
                    scrollData.num = scrollDataList[index].num
                    scrollData.desc = scrollDataList[index].desc
                }, 3000)
            },
            initSwiper () {
                var that = this
                that.mSwiperOption = {
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    initialSlide: 1,
                    spaceBetween: 30
                }
            },
            doMouseleave (tab) {
                this.currTab = tab
            },
            queryKnowledgeList () {
                const that = this
                let filter = {
                    fields: {
                        content: false
                    },
                    limit: 3,
                    where: { status: 'online' },
                    order: 'createdAt DESC'
                }
                fetch({
                    url: 'https://d.apicloud.com/mcm/api/news',
                    params: { filter: JSON.stringify(filter) }
                }).then(res => {
                    that.knowledgeList = res || []
                })
            },
            queryCaseList () {
                const that = this
                let filter = {
                    fields: {
                        content: false
                    },
                    limit: 3,
                    where: { status: 'online' },
                    order: 'createdAt DESC'
                }
                fetch({
                    url: 'https://d.apicloud.com/mcm/api/case',
                    params: { filter: JSON.stringify(filter) }
                }).then(res => {
                    that.caseList = res || []
                })
            },
            doClickPro (item) {
                item.status = !item.status
            },
            doClickDetail (id, type) {
                window.open(location.origin + '/#/detail?id=' + id + '&type=' + type)
            },
            doClickList (type) {
                if (type == 'case') {
                    window.open(location.origin + '/#/case')
                } else {
                    window.open(location.origin + '/#/industryKnowledge')
                }
            },
            doClickProduct () {
                window.open(location.origin + '/#/product')
            }
        },
        beforeDestroy () {
            const that = this
            if (that.scrollTimer) {
                clearInterval(that.scrollTimer)
            }
        }
    }
</script>
