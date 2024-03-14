<script setup lang="ts" name="App">
import A from './components/A.vue'
import {reactive} from 'vue'
interface Tree{
  name:string,
  checked:boolean,
  children?:Tree[]
}


const data =reactive<Tree[]>([
  {
    name:'1',
    checked:false,
    children:[
      {
        name: '1-1',
        checked:false
      }
    ]
  },
  {
    name:'2',
    checked:true
  },
  {
    name:'3',
    checked:false,
    children:[
      {
        name:'3-1',
        checked:false,
        children:[
          {
            name:'3-1-1',
            checked:true
          },
          {
            name:'3-1-2',
            checked:true
          }
        ]
      }
    ]
  }
])
</script>

<template>
  <div>
    <h1 class="font-bold text-lg hover:bg-purple-600 hover:text-yellow-600">HelloWorld</h1>
    <A :data="data"></A>
  </div>
</template>

<style scoped>

</style>
