<template>
  <el-row class="body">
    <el-col :span="12">
      <h1 class="h1">Whoops!</h1>
      <p class="p">Something went wrong</p>
    </el-col>
  </el-row>
</template>

<style scoped>
.body {
  display: inline-block;
  background: #00aff9 url(https://cbwconline.com/IMG/Codepen/Unplugged.png)
    center/cover no-repeat;
  height: 100vh;
  margin: 0;
  color: white;
  width: 100%;
}

.h1 {
  margin: 0.8em 3rem;
  font: 4em Roboto;
}

.p {
  display: inline-block;
  margin: 0.2em 3rem;
  font: 2em Roboto;
}
</style>
