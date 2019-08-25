<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload,
      closeSelectedTag: this.closeSelectedTag
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    // 刷新Dom树
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
    // 关闭当前选中的快捷导航标签
    closeSelectedTag() {
      const route = this.$route
      this.$store.dispatch('tagsView/delView', route).then(({ visitedViews }) => {
        if (route.path === this.$route.path) {
          const latestView = visitedViews.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            // now the default is to redirect to the home page if there is no tags-view,
            // you can adjust it according to your needs.
            if (route.name === 'Dashboard') {
              // to reload home page
              this.$router.replace({ path: '/redirect' + route.fullPath })
            } else {
              this.$router.push('/')
            }
          }
        }
      })
    }
  }
}
</script>
