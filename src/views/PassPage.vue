<template>
  <div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    const vm = this;
    const { token } = vm.$route.query;
    const headers = {
      Authorization: `bearer ${token}`,
    };
    if (token !== undefined) {
      vm.$forgotPassword.resetCheckin(
        (res) => {
          const { email } = res.data;
          vm.$router.push({
            name: 'resetPassword',
            params: {
              email,
              headers,
            },
          });
        },
        (err) => {
          vm.$router.push('/verifyExpired');
          // eslint-disable-next-line no-console
          console.log('err', err);
        },
        headers,
      );
    } else {
      vm.$router.push('/confirmEmail');
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
