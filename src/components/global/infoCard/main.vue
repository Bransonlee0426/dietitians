<template>
  <el-row>
    <el-col class="title" :span="24">{{title}}</el-col>
    <el-col :span="24">
      <el-card class="box-card" shadow="hover">
        <ul class="card-ul">
          <li class="card-li" v-for="item in data" :key="item">
              {{item}}
          </li>
        </ul>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'infoCard',
  props: {
    title: null,
    data: null,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 10px 0px;
}

.box-card {
  padding:0px;
  width: 100%;
  .card-ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .card-li {
      text-align: left;
      line-height: 1.5;
      width: 50%;
    }
  }
}
</style>
