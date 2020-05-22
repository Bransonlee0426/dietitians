<template>
  <el-row class="container" type="flex" justify="end" align="middle">
    <el-col class="container-col" :span="10" :pull="3">
      <el-row class="login-row" type="flex">
        <el-col class="logo" :span="12" :xs="{span: 24,offset:3}">
          <element-image :imageURL="logo"></element-image>
        </el-col>
        <el-col :span="24" class="input-form">
          <router-view :userInfo="userInfo" v-model="userInfo" :errorMsg="errMsg"></router-view>
        </el-col>
        <el-col>
          <div class="forget-Password">
            <router-link
              v-show="isLoginForm"
              @click="forgetPassword"
              class="forget-Password-router"
              :to="{name:'confirmEmail'}">忘記密碼？</router-link>
          </div>
        </el-col>
        <el-col class="btn" :span="14">
          <element-button
            @click="submitBtn()"
            :btn_text="routeData"
            :isDisabled="isdisabled"
            :custClass="btn_class"></element-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      logo: 'logo',
      btn_class: 'orange',
      isLoginForm: Boolean,
      userInfo: {},
      errMsg: {
        count: 0,
        message: '',
      },
      isdisabled: true,
      isEmailValid: Boolean,
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitBtn() {
      const vm = this;
      switch (vm.$route.name) {
        case 'confirmEmail':
          vm.confirmEmailAPI();
          break;
        case 'resetPassword':
          vm.resetPasswordAPI();
          break;
        default:
          vm.loginAPI();
          break;
      }
    },
    forgetPassword() {
      const vm = this;
      vm.isLoginForm = false;
    },
    loginAPI() {
      const vm = this;
      const userInfoForm = {
        email: vm.userInfo.account,
        password: vm.userInfo.password,
      };
      vm.$auth.login(
        userInfoForm,
        () => {
          vm.$store.dispatch('userInfo/login', {
            account: vm.userInfo.account,
          });
          vm.$router.push('/nutrition/restaurants');
        },
        (err) => {
          vm.showErrMsg('errorPassword');
          console.log('err', err);
        },
      );
    },
    confirmEmailAPI() {
      const vm = this;
      vm.$forgotPassword.confirmEmailAPI(
        vm.userInfo,
        () => {
          vm.dataReset();
          vm.$_messageBox('mail');
        },
        (err) => {
          vm.showErrMsg('accountNoExist');
          console.log('err', err);
        },
      );
    },
    resetPasswordAPI() {
      const vm = this;
      const { email } = vm.$route.params;
      const { headers } = vm.$route.params;
      if (vm.userInfo.newPassword !== vm.userInfo.newPasswordConfirm) {
        vm.showErrMsg('passwordConfirm');
      } else {
        const emailForm = {
          email,
          password: vm.userInfo.newPasswordConfirm,
        };
        vm.$forgotPassword.resetPassword(
          emailForm,
          () => {
            vm.dataReset();
            vm.$_messageBox('password-update-ok')
              .then(() => {})
              .catch(() => {
                vm.$router.push('/login');
              });
          },
          (err) => {
            vm.showErrMsg('errEmail');
            console.log('err', err);
          },
          headers,
        );
      }
    },
    dataReset() {
      const vm = this;
      vm.userInfo = {};
      vm.errMsg = {
        count: 0,
        message: '',
      };
    },
    showErrMsg(msg) {
      const vm = this;
      vm.errMsg.count += 1;
      vm.errMsg.message = vm.$_msgContent(msg);
    },
  },
  computed: {
    routeData() {
      const vm = this;
      switch (vm.$route.name) {
        case 'confirmEmail':
          vm.isLoginForm = false;
          vm.userInfo = {
            email: '',
          };
          return '送出';
        case 'resetPassword':
          vm.isLoginForm = false;
          vm.userInfo = {
            newPassword: '',
            newPasswordConfirm: '',
          };
          return '重設密碼';
        default:
          vm.isLoginForm = true;
          vm.userInfo = {
            account: '',
            password: '',
          };
          return '登入';
      }
    },
  },
  watch: {
    userInfo: {
      deep: true,
      immediate: true,
      handler(val) {
        const vm = this;
        function confirmEmailCheck() {
          if (val.email !== '' && vm.$_formatCheck('email', val.email)) {
            vm.isdisabled = false;
          } else {
            vm.isdisabled = true;
          }
        }
        function resetPasswordCheck() {
          if (val.newPassword !== '' && val.newPasswordConfirm !== '') {
            vm.isdisabled = false;
          } else {
            vm.isdisabled = true;
          }
        }
        function loginFormCheck() {
          if (
            val.account !== ''
            && val.password !== ''
            && vm.$_formatCheck('email', val.account)
          ) {
            vm.isdisabled = false;
          } else {
            vm.isdisabled = true;
          }
        }
        switch (vm.$route.name) {
          case 'confirmEmail':
            confirmEmailCheck();
            break;
          case 'resetPassword':
            resetPasswordCheck();
            break;
          default:
            loginFormCheck();
            break;
        }
      },
    },
  },
  beforeRouteUpdate(to, from, next) {
    const vm = this;
    vm.dataReset();
    next();
  },
};
</script>

<style scoped lang="scss">
.container {
  background-image: url("../assets/png/login/background.png");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  height: 100vh;
  .container-col {
    margin-top: -10%;
    padding-top: 100px;
    .login-row {
      flex-direction: column;
      align-items: center;
      .logo {
        margin-bottom: 20px;
      }
      .input-form {
        line-height: 3;
        margin-bottom: 40px;
        width: 80%;
        @include mobile() {
          width: 100%;
        }
      }
      .forget-Password {
        text-align: right;
        height: 40px;
        .forget-Password-router {
          font-family: $PFTC;
          color: $info;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
        }
      }
      .btn {
        margin-top: 40px;
      }
    }
  }
}
</style>
