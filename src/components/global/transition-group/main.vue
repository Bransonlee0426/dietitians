<template>
  <transition-group
    name="staggered-fade"
    :tag="tag" :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    appear>
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  name: 'transGroup',
  props: {
    tag: {
      type: String,
      default: '',
    },
  },
  methods: {
    beforeEnter(el) {
      // eslint-disable-next-line no-param-reassign
      el.style.opacity = 0;
    },
    enter(el, done) {
      // eslint-disable-next-line no-undef
      Velocity(el, { opacity: 1 }, { complete: done });
    },
    leave(el, done) {
      // eslint-disable-next-line no-undef
      Velocity(el, { opacity: 0, height: 0 }, { complete: done });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
