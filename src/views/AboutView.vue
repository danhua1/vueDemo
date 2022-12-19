<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps({
  foo: String
})
console.log(props)



const question = ref('')
const input = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')
const width1 = ref('100px')

watch(question, async (newQuestion) => {
  console.log(input)
      console.log(input.value)
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Thinking...'
    try {
      width1.value='200px'
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    }
  }
})

</script>

<template>
  <div class="about">
    <h1 :aria-disabled="true">This is an about page</h1>
    <h1>上面的元素被隐藏了</h1>

    <p>
    Ask a yes/no question:
    <input v-model="question" :style="{width:`${width1}`}"  ref="input" />
    
  </p>
  <p>{{ answer }}</p>
  </div>
 
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
