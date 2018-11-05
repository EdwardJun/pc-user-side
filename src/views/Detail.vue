<style lang="sass">
    @import '../sass/views/detail.scss';
</style>
<template>
    <div id="detail-page">
        <!--PC端-->
        <div v-if="!navigatorStatus && type=='case'" class="pc">
            <!-- <div class="item-case-bg"></div> -->
            <div class="item-subhead">首页 > 案例 > 详情</div>
            <div class="item-case-detail">
                <div>
                    <div class="item-case-detail-top">
                        <div class="item-top">
                            <div>{{ data.title }}</div>
                            <div>{{ data.updatedAt }}&nbsp; <i class="item-circle"></i> &nbsp;&nbsp;&nbsp;案例 &nbsp;&nbsp;  浏览数：{{ data.viewCount }}</div>
                            <div><span>会所痛点</span> {{ data.painPoint }}</div>
                            <div><div><span>会所面积</span>&nbsp;&nbsp; {{ data.clubArea }}㎡</div> <div><span>会所类型</span> &nbsp;&nbsp;{{ data.clubType }}</div></div>
                        </div>
                    </div>
                    <div class="item-case-detail-bottom">
                        <div>会所成效</div>
                        <div><!--<img :src="data.imgUrl"/>--></div>
                        <div v-html="data.content"></div>
                        
                    </div>
                </div>
                <div>
                    <div class="item-title" >下篇文章</div>
                    <div class="item-content" @click="queryData(nextData.id)" v-if="nextData">
                        <div>{{ nextData.title }}</div>
                        <div>{{ nextData.updatedAt }}</div>
                    </div>
                    <div class="item-content-last" v-if="!nextData"><div>当前浏览最后一篇文章</div></div>
                    <router-link class="item-btn" tag="div" :to="{ name : 'case'}">查阅更多内容，点击这里</router-link>
                </div>
            </div>
        </div>
        <div v-if="!navigatorStatus && type=='news'" class="pc">
            <div class="item-subhead">首页 > 行业知识 > 详情</div>
            <div class="item-detail">
                <div>
                    <div>{{ data.title }}</div>
                    <div>{{ data.updatedAt }}&nbsp; <i class="item-circle"></i> &nbsp;&nbsp;&nbsp;行业知识 &nbsp;&nbsp; 浏览数：{{ data.viewCount }}</div>
                    <div><!--<img :src="data.imgUrl"/>--></div>
                    <div>{{ data.desc }}</div>
                    <div v-html="data.content"></div>
                </div>
                <div>
                    <div class="item-title" >下篇文章</div>
                    <div class="item-content" @click="queryData(nextData.id)" v-if="nextData">
                        <div>{{ nextData.title }}</div>
                        <div>{{ nextData.updatedAt }}</div>
                    </div>
                    <div class="item-content-last" v-if="!nextData"><div>当前浏览最后一篇文章</div></div>
                    <router-link class="item-btn" tag="div" :to="{ name : 'industryKnowledge'}">查阅更多内容，点击这里</router-link>
                </div>
            </div>
        </div>

        <!--移动端-->
        <div v-if="navigatorStatus && type=='news'" class="mobile">
            <div>
                <div class="m-item-title">{{ data.title }}</div>
                <div class="m-item-time">{{ data.updatedAt }}&nbsp; <i class="m-item-circle"></i> &nbsp;&nbsp;&nbsp;行业知识 &nbsp;&nbsp;  浏览数：{{ data.viewCount }}</div>
                <div class="m-item-img"><!--<img :src="data.imgUrl"/>--></div>
                <div class="m-item-content">{{ data.desc }}</div>
                <div class="m-item-content" v-html="data.content"></div>
            </div>
        </div>
        <div v-if="navigatorStatus && type=='case'" class="mobile">
            <div>
                <div class="m-item-title">{{ data.title }}</div>
                <div class="m-item-time">{{ data.updatedAt }}&nbsp; <i class="m-item-circle"></i>&nbsp;&nbsp;&nbsp;案例 &nbsp;&nbsp;  浏览数：{{ data.viewCount }}</div>
                <div class="m-item-desc">
                    <div>会所痛点：</div>
                    <p>{{ data.painPoint }}</p>
                </div>
                <div class="m-item-club">
                    <div>会所面积：<span>{{ data.clubArea }}㎡</span></div>
                    <div>会所类型：<span>{{ data.clubType }}</span></div>
                </div>
                <div class="m-item-img"><!--<img :src="data.imgUrl"/>--></div>
                <div class="m-item-title m-container"> 运营服务</div>
                <div class="m-item-case-content" v-html="data.content"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import fetch from '@/utils/fetch'
    import { formatTime } from '@/utils/helper'
    export default {
        name: 'Detail',
        data () {
            return {
                article: '',
                type: '',
                viewCount: 0,
                data: {},
                nextData: {}
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
            that.article = that.$route.query.id || ''
            that.type = that.$route.query.type || ''
            document.documentElement.scrollTop = 0
            that.queryData()
        },
        methods: {
            queryData (artId) {
                let that = this
                let url = ''
                let id = artId || that.article
                if (that.type == 'case') {
                    url = `https://d.apicloud.com/mcm/api/case/${id}`
                } else if (that.type == 'news') {
                    url = `https://d.apicloud.com/mcm/api/news/${id}`
                }
                fetch({
                    url: url
                }).then(res => {
                    res.updatedAt = formatTime(new Date(res.updatedAt), 'yyyy-MM-dd')
                    that.data = res
                    that.queryNext()
                })
                fetch({
                    url: url,
                    method: 'put',
                    data: {
                        '$inc': {
                            viewCount: 1
                        }
                    }
                })
            },
            queryNext () {
                const that = this
                let url = ''
                let filter = {
                    fields: {
                        content: false
                    },
                    limit: 1,
                    where: {
                        status: 'online',
                        createdAt: { lt: that.data.createdAt }
                    },
                    order: 'createdAt DESC'
                }
                if (this.type == 'case') {
                    url = 'https://d.apicloud.com/mcm/api/case'
                } else if (this.type == 'news') {
                    url = 'https://d.apicloud.com/mcm/api/news'
                }
                // 查询当页数据
                fetch({
                    url: url,
                    params: { filter: JSON.stringify(filter) }
                }).then(res => {
                    if (res[0]) {
                        res[0].updatedAt = res[0].updatedAt.split('T')[0]
                        that.nextData = res[0] || []
                        that.$router.replace({ name: 'detail', query: { id: that.nextData.id, type: that.type } })
                    } else {
                        that.nextData = null
                    }
                })
            }
        }
    }
</script>