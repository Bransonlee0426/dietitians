<template>
  <div>
    <h2
      class="title"
      :style="[errorMsgContent? {color : '#eb6050'} : {color : '#daa270'}]">
      {{title}}
    </h2>
    <input
      class="input"
      :value="value"
      :placeholder="placeholder"
      :type="inputType"
      @input="$emit('input',$event.target.value)"
      @blur="onBlur"
    >
    <i
      v-if="isEyes"
      :class="[eyeClass.basic , isPswVisible ? eyeClass.eyeSlash : eyeClass.eye]"
      @click="visiblePsw">
    </i>
    <transition name="el-fade-in-linear">
      <p v-if="errorMsgContent" class="error-msg">{{errorMsgContent}}</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'promptIntput',
  props: {
    type: String,
    title: String,
    placeholder: String,
    errorMsg: Object,
    value: String,
  },
  data() {
    return {
      eyeClass: {
        basic: 'eye',
        eye: 'far fa-eye',
        eyeSlash: 'far fa-eye-slash',
      },
      isPswVisible: false,
      inputType: this.type,
      errorMsgContent: this.errorMsg ? this.errorMsg.message : '',
    };
  },
  computed: {
    isEyes() {
      const vm = this;
      return (vm.type === 'password');
    },
  },
  methods: {
    visiblePsw() {
      const vm = this;
      vm.isPswVisible = !vm.isPswVisible;
      if (vm.isPswVisible) {
        vm.inputType = 'text';
      } else {
        vm.inputType = 'password';
      }
    },
    onBlur() {
      const vm = this;
      function checkEmailFormat() {
        if (!vm.$_formatCheck('email', vm.value)) {
          vm.errorMsgContent = vm.$_msgContent('emailFormat');
          vm.$bus.$emit('isEmailValid', false);
        } else {
          vm.errorMsgContent = '';
          vm.$bus.$emit('isEmailValid', true);
        }
      }
      if (vm.type === 'mail') {
        checkEmailFormat();
      }
    },
  },
  watch: {
    errorMsg: {
      deep: true,
      handler(val) {
        const vm = this;
        vm.errorMsgContent = val.message;
      },
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  font-size: 12px;
  font-family: $HEL;
}

.input {
  @extend %myInput;
  width: 100%;
  z-index: 0;
}

.eye {
  float: right;
  margin-top: -32px;
  margin-right: -8px;
  z-index: 100;
  cursor: pointer;
  position: relative;
}

.error-msg {
  font-size: 12px;
  line-height: 1;
  color: $danger;
  padding: 5px;
  font-family: $PFTC;
}

input::-webkit-contacts-auto-fill-button {
  visibility: hidden;
  display: none !important;
  pointer-events: none;
  position: absolute;
  right: 0;
}
</style>
