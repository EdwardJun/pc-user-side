<style lang="sass">
    @import '../sass/views/case.scss';
</style>
<template>
    <div id="case-page">
        <!--轮播图-->
        <div v-if="!navigatorStatus" class="pc">
            <div class="item-banner">
                <div class="item-img"></div>
            </div>
            <div class="item-case">
                <div class="item-container container" v-for="(item, index) in dataList">
                    <div class="item-content">
                        <div class="item-left">
                            <img v-if="index%2==0" :src="item.imgUrl"/>
                            <div v-else>
                                <div><span></span> 获得成效</div>
                                <div>{{ item.effect }}</div>
                            </div>
                        </div>
                        <div class="item-center">
                            <div class="title">{{ item.title }}</div>
                            <div class="describe"><span>会所痛点 </span>{{ item.painPoint }}</div>
                            <div>
                                <div><span>会所面积</span><div>{{ item.clubArea }}㎡</div></div>
                                <div><span>会所类型</span><div>{{ item.clubType }}</div></div>
                            </div>
                        </div>
                        <div class="item-right">
                            <div v-if="index%2==0">
                                <div><span></span> 获得成效</div>
                                <div>{{ item.effect }}</div>
                            </div>
                            <img v-else :src="item.imgUrl"/>
                        </div>
                    </div>
                    <div @click="doClickDetail(item.id, 'case')" tag="div" class="item-detail">查看详情</div>
                </div>
                <Pagination class="container" :curr="page" :total="totalPage" @switch="doSwitchPage"></Pagination>
            </div>
        </div>

        <div v-if="navigatorStatus" class="mobile">
            <div class="m-item-banner">
                <div class="m-item-img"></div>
            </div>
            <div class="m-item-case">
                <div class="m-item-title m-container"> 案例</div>
                <div class="m-item-list" v-for="(item, index) in dataList">
                    <div>
                        <div :style="{ 'background-image': 'url(' + item.imgUrl + ')' }"></div>
                        <div>
                            <div>{{ item.title }}</div>
                            <div><span>获得成效：</span>{{ item.painPoint }}</div>
                             <router-link tag="div" :to="{ name : 'detail', query: {id: item.id, type: 'case'}}">查看详情</router-link>
                        </div>
                    </div>
                </div>
                <div class="m-more-case" v-if="page < totalPage" @click="loadMore">加载更多</div>
            </div>
        </div>
    </div>
</template>
<script>
    import Pagination from '../components/common/Pagination'
    import fetch from '@/utils/fetch'
    export default {
        name: 'case',
        data () {
            return {
                page: 1,
                pageSize: 5,
                totalPage: 0,
                dataList: []
            }
        },
        components: {
            Pagination
        },
        computed: {
            navigatorStatus () {
                let that = this
                let store = that.$store
                return store.state.navigatorStatus
            }
        },
        created () {
            const that = this
            // that.page = (that.$route.query.page || 1) - 0
            document.documentElement.scrollTop = 0
            that.queryData()
        },
        methods: {
            loadMore () {
                this.page++
                this.queryData(this.page)
            },
            doSwitchPage (page) {
                this.page = page
                this.queryData(page)
            },
            queryData (page) {
                const that = this
                page = page || that.page
                let filter = {
                    fields: {
                        content: false
                    },
                    limit: that.pageSize,
                    where: { status: 'online' },
                    skip: (page - 1) * that.pageSize,
                    order: 'createdAt DESC'
                }
                that.$router.replace({ name: 'case', query: { page: page } })
                that.queryTotalPage()
                // 查询当页数据
                fetch({
                    url: 'https://d.apicloud.com/mcm/api/case',
                    params: { filter: JSON.stringify(filter) }
                }).then(res => {
                    if (that.navigatorStatus) {
                        res.forEach(item => {
                            that.dataList.push(item)
                        })
                    } else {
                        that.dataList = res || []
                    }
                    that.page = page
                })
            },
            queryTotalPage () {
                let that = this
                // 求总的页数的请求filter
                let totalPageFilter = {
                    fields: {
                        id: true
                    },
                    where: { status: 'online' }
                }
                // 查询总页数
                fetch({
                    url: 'https://d.apicloud.com/mcm/api/case',
                    params: { filter: JSON.stringify(totalPageFilter) }
                }).then(data => {
                    that.totalPage = Math.ceil(data.length / that.pageSize)
                })
            },
            doClickDetail (id, type) {
                window.open(location.origin + '/#/detail?id=' + id + '&type=' + type)
            }
        }
    }
</script>
