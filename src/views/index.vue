<template>
  <div>
    <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">财务</template>
        <el-menu-item index="/financial/account-check"><template slot="title">对账</template></el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">运管</template>
        <el-menu-item index="/home">选项1</el-menu-item>
        <el-menu-item index="/home">选项2</el-menu-item>
        <el-menu-item index="/home">选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
          <template slot="title">审计</template>
          <el-menu-item index="/home">选项1</el-menu-item>
          <el-menu-item index="/home">选项2</el-menu-item>
          <el-menu-item index="/home">选项3</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="app-main">
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view :key="key" />
          </keep-alive>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    computed: {
      key() {
        return this.$route.path
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push(key)
      }
    }
  }
</script>
<style type="text/css">
  .app-main{
    background-color: #F7F7F7;
    height:auto!important;
    min-height:1000px;
    width: 100%;
    border: 1px solid #eee;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
</style>