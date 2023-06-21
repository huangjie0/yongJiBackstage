<template>
    <div>
        <el-row :gutter="15">
            <el-col :span="8">
                <el-card>
                    <div class="newTotal">
                        <div class="newNumber">总新闻数量统计</div>
                        <div class="newNumberLogo">
                            <i class="el-icon-s-data" style="color:rgb(37, 234, 175)"></i>
                            <div><span style="font-size:20px;font-weight: 550;">
                                    <CountTo :vaule="total" />
                                </span> 条</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div class="newTotal">
                        <div class="newNumber">今日发表数</div>
                        <div class="newNumberLogo">
                            <i class="el-icon-document-add" style="color:rgb(113, 113, 252)"></i>
                            <div><span style="font-size:20px;font-weight: 550;">
                                    <CountTo :vaule="nowListitem.length" />
                                </span>条</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div class="newTotal">
                        <div class="newNumber">今日发表率</div>
                        <div class="newNumberLogo">
                            <i class="el-icon-finished" style="color:rgb(255, 106, 106)"></i>
                            <div><span style="font-size:20px;font-weight: 550;">
                                    <CountTo :vaule="PublicationRate()" />%
                                </span></div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import CountTo from "@/components/Management/CountTo.vue";
export default {
    components: {
        CountTo
    },
    props: {
        total: {
            typeof: Number,
            default: 0
        },
        newList: {
            typeof: Number,
            default: []
        }
    },
    data() {
        return {
            nowListitem: []
        }
    },
    watch: {
        newList(newValue) {
            let nowListitem = []
            newValue.map((item) => {
                if (this.todayJudge(item.createTime, 'datetime')) {
                    nowListitem.push(item)
                }
            })
            this.nowListitem = nowListitem
        }
    },
    methods: {
        PublicationRate() {
            // ((this.nowListitem.length) / (this.total - 0) * 100) == NaN ? 0 : (this.nowListitem.length) / (this.total - 0) * 100
            return (this.nowListitem.length) / (this.total - 0) * 100
        },
        todayJudge(param, type = 'timestamp') {
            // 如果传入的时间戳是字符串，需要进行类型转换
            if ((typeof param === 'string') && type == 'timestamp') {
                param = Number(param)
            }
            if (type == 'datetime') {	// ios日期时间兼容
                param = param.replace(/-/g, "/")
            }
            var currentStamp = new Date().setHours(0, 0, 0, 0)		// 当天日期，转换为时间部分为0的时间戳
            var paramStamp = new Date(param).setHours(0, 0, 0, 0)	// 传入时间戳，将时间部分转换为0
            // 若两个时间戳相等，说明传入的时间戳即今天
            if (currentStamp == paramStamp) {
                return true
            }
            return false
        },
    }
}
</script>
<style scoped lang="less">
.newNumber {
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: rgb(158, 158, 158);
}

.newTotal {
    width: 100%;
    height: 10.625rem;
    position: relative;
}

.newNumberLogo {
    width: 70%;
    height: 70%;
    position: absolute;
    left: 15%;
    top: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    i {
        font-size: 60px;
    }
}</style>