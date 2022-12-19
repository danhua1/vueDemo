<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {init} from "../utils/initData"
const router = useRouter()

const iniData = ref(init)

// onMounted(() => {
//   console.log("test")
//   console.log(test?.value)
//   let {question,answer}=test?.value as any
//   console.log(question)
//   console.log(answer)
  
// })
const goTo=(url:string)=>{
  router.push(url)
}


</script>

<template>
  <div>
      <div class="toolMain">
      <el-row>
        <el-col :span="24">
          <div>
            在线工具
          </div>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="6" v-for="item in iniData" :key="item.id">
          <div class="cardMain">
            <el-card class="box-card" shadow="hover">
              <div class="cardHeader">
                <div class="cardHeaderLeft">
                  <div>
                    <el-avatar shape="square" size="large" :src="item.image" />
                  </div>
                  <div class="cardHeaderTitle">
                    {{item.title}}
                    <!-- 获取token -->
                  </div>
                </div>
                <div>
                  {{item.typeInfo}}                 
                </div>
              </div>

              <div class="cardDetail">
                {{item.detail}}
              </div>
              <div class="cardRoute">
                <div>
                  <!-- <router-link :to="item.url">进入11</router-link> -->
                  <el-link  @click="goTo(item.url)" >进入</el-link>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    </div>
</template>
<style scoped>
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
