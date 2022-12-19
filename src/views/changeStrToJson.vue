<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ClipboardJS from  "clipboard"
document.title=useRoute().query.title as string

const jsonStr = ref("")
const jsonCommon = ref("")

new ClipboardJS('.btn');

const change=()=>{
    let str= jsonStr.value
	let obj=JSON.parse(str)
    jsonCommon.value=obj
}




</script>

<template>
    <div class="changeStrToJson">       
        <div class="jsonInfo">
            <div class="jsonInfoLeft">
                <p style="margin-bottom: 10px;color: brown;">
                    字符串型json
                </p>
                <div class="jsonInfoLeftInfo">
                    <el-input
                    v-model="jsonStr"
                    :rows="20"
                    type="textarea"
                    placeholder="请输入字符串型json"
                    />
                </div>
                <div class="operate">
                    <el-button @click="change">转换</el-button>
                </div>
            </div>
            <div class="jsonInfoRight">
                <p style="margin-bottom: 10px;color: brown;">
                    标准json
                </p>
                <div>
                    <el-input
                    v-model="jsonCommon"
                    :rows="20"
                    type="textarea"
                    disabled="true"
                    placeholder="输出正常json"
                    class="commonJson"
                    />
                </div>
                <div class="operate">
                    <el-button class="btn" data-clipboard-target=".commonJson">复制</el-button>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>


.jsonInfo {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 0 20px;
}

.jsonInfoLeft {
    padding: 10px;
    width: 50%;
    overflow: auto;
}


.jsonInfoRight {
    padding: 10px;
    width: 50%;
    overflow: auto;
    word-break: break-all;
}
.operate{
    margin-top: 10px;
    text-align: right;
}


@media (max-width: 1200px) {
    .getTokenInputInfo {
        width: 1190px;
    }
}

@media (max-width: 992px) {
    .getTokenInputInfo {
        width: 970px;
    }
}

@media (max-width: 768px) {
    .getTokenInputInfo {
        width: 750px;
    }
}
</style>
