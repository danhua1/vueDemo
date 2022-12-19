<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
document.title=useRoute().query.title as string


const lng1 = ref("")
const lat1 = ref("")
const lng2 = ref("")
const lat2 = ref("")
const resultInfo = ref("")

/**
 * 计算距离逻辑
 * @param lat1 
 * @param lng1 
 * @param lat2 
 * @param lng2 
 */
const GetDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    console.log(s)
    s = s * 6378.137; // EARTH_RADIUS;
    console.log(s)
    s = Math.round(s * 10000) / 10000;
    console.log(s)
    return s;
}
/**
 * 非空校验
 * @param val 
 * @param obj 
 * @param c 
 */
function checkNotEmpet(val: string, obj: any, c: string) {
    console.log()
    if ((val ?? "") == "") {
        ElMessage({
            message: `${obj[c]}不能为空`,
            type: 'warning',
        })
        return true
    }
}
/**
 * 计算距离
 */

function getTwoDistance() {
    let finallyLat1 = lat1.value.trim();
    let finallyLng1 = lng1.value.trim();
    let finallyLat2 = lat2.value.trim();
    let finallyLng2 = lng2.value.trim();
    let obj = {
        lat1: "第一个纬度坐标",
        lng1: "第一个经度坐标",
        lat2: "第二个纬度坐标",
        lng2: "第二个经度坐标"
    };
    if (checkNotEmpet(finallyLat1, obj, "lat1")) {
        return false
    }
    if (checkNotEmpet(finallyLng1, obj, "lng1")) {
        return false
    }
    if (checkNotEmpet(finallyLat2, obj, "lat2")) {
        return false
    }
    if (checkNotEmpet(finallyLng2, obj, "lng2")) {
        return false
    }
    let result = GetDistance(parseFloat(finallyLat1), parseFloat(finallyLng1), parseFloat(finallyLat2), parseFloat(finallyLng2))
    console.log(result)
    resultInfo.value = `最终计算距离为${result}KM`
}

</script>

<template>
    <div class="getTwoDistanceMain">
        <div class="getTokenInputInfo">
            <div class="getTwoDistanceMainInfo">
                <div class="getTwoDistanceMainBody">
                    <span style="width: 80px;">lng1:</span>
                    <el-input v-model="lng1" placeholder="请输入第一个坐标经度" />
                </div>

            </div>
            <div class="getTwoDistanceMainInfo">
                <div class="getTwoDistanceMainBody">
                    <span style="width: 80px;">lat1:</span>
                    <el-input v-model="lat1" placeholder="请输入第一个坐标纬度" />
                </div>

            </div>
            <div class="getTwoDistanceMainInfo">
                <div class="getTwoDistanceMainBody">
                    <span style="width: 80px;">lng2:</span>
                    <el-input v-model="lng2" placeholder="请输入第二个坐标经度" />
                </div>

            </div>
            <div class="getTwoDistanceMainInfo">
                <div class="getTwoDistanceMainBody">
                    <span style="width: 80px;">lat2:</span>
                    <el-input v-model="lat2" placeholder="请输入第二个坐标纬度" />
                </div>

            </div>

        </div>
        <div class="operate">
            <el-button @click="getTwoDistance">开始计算</el-button>
        </div>
        <div class="resultInfo">
            {{ resultInfo }}
        </div>
    </div>

</template>

<style scoped>
.getTwoDistanceMainInfo {
    display: flex;
    justify-content: center;
    padding-top: 15px;
}

.getTwoDistanceMainBody {
    display: flex;
    width: 50%;
    align-items: center;

}

.getTwoDistanceMain {
    width: 1190px;
    margin: 0 auto;
}

.operate {
    display: flex;
    justify-content: center;
    padding-top: 15px;
}

.resultInfo {
    text-align: center;
    font-size: 24px;
    padding-top: 15px
}




@media (max-width: 1200px) {
    .getTwoDistanceMain {
        width: 1190px;
    }
}

@media (max-width: 992px) {
    .getTwoDistanceMain {
        width: 970px;
    }
}

@media (max-width: 768px) {
    .getTwoDistanceMain {
        width: 750px;
    }
}
</style>
