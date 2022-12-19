<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {init} from "./utils/initData"
const router = useRouter()


let obj = { count: 0 }
const iniData = ref(init)
const count = ref(0)
// let count1 = $ref(0)
const objectRef1 = reactive(obj)
const objectRef2 = reactive(obj)
const goToHome=()=>{
  router.push("/")
}
console.log(useRoute().name)

</script>

<template>
   <div>
    <div class="appHeader" >
      <el-row>
      <el-col :span="24">
        <div class="headerMain">
          <div class="headerLeft">
            <span>
              在线工具
            </span>
            <span @click="goToHome">
              首页
            </span>
            
          </div>
          <div class="headerRight">
            人员登录
          </div>
        </div>
      </el-col>
     </el-row>
    </div>
    

    <div class="appMain">
      <RouterView />
    </div>
  </div>

  
</template>

<style scoped>
.appHeader{
  height: 30px;
}
.appMain{
  height: calc(100vh - 30px);
  overflow: scroll;
}
.headerMain {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  background-color: #363636;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: white;
}
.cardMain{
  padding: 10px;
}
.cardHeader{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cardHeaderLeft{
  display: flex;
}
.cardHeaderTitle{
  color: #333;
  margin-left: 5px;
}
.cardDetail{
  color: #444;
  font: 80%/1.65 Verdana,"Geneva CE",lucida,'Microsoft YaHei',sans-serif;
}
.cardRoute{
  text-align: right;
}

.toolMain {
  width: 1190px;
  margin: 0 auto;
}

@media (max-width: 1200px) {
  .toolMain {
    width: 1190px;
  }
}

@media (max-width: 992px) {
  .toolMain {
    width: 970px;
  }
}

@media (max-width: 768px) {
  .toolMain {
    width: 750px;
  }
}
</style>
