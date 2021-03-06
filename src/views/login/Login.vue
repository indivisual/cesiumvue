<template lang="pug">
  section.login.bars
    header.login__header
      ods-logo(
        suite="suite"
        product="product"
        product-module="module")
      div.login__lang-selector
        ods-select.login__select--white(v-model="$i18n.locale")
          ods-option(
            v-for="lang in langs"
            :key="lang.value"
            :value="lang.value"
            :label="mobile ? lang.labelMobile : lang.label")
    main.login__main
      router-view(
        v-loading="loading && !mobile"
        v-loading.fullscreen.lock="loading && mobile"
        :loading-text="password ? $t('password.sending') : $t('login.logging')")
    login-footer
</template>

<script>
import LoginFooter from '@/components/login/LoginFooter'
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  components: {
    LoginFooter
  },
  data () {
    return {
      lang: 'es',
      langs: [
        {label: 'Español', labelMobile: 'ES', value: 'es'},
        {label: 'English', labelMobile: 'EN', value: 'en'}
      ]
    }
  },
  methods: {
    ...mapGetters([
      'getLoaderState',
      'getIsMobile',
      'getIsPasswordForm'
    ])
  },
  computed: {
    loading () {
      return this.getLoaderState()
    },
    mobile () {
      return this.getIsMobile()
    },
    password () {
      let pwd = this.getIsPasswordForm()
      return pwd
    }
  }
}

</script>

<style lang="scss" scoped>
  $--header-height: 125px;
  $--footer-height: 45px;

  .login {
    background: $--color-primary-light-9;

    &__lang-selector {
      width: 140px;
      align-self: flex-start;
      padding-top: rem(20);
    }

    &__header {
      box-sizing: border-box;
      padding: 0 rem(50) 0;
      height: $--header-height;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__main {
      min-height: calc(100vh - (#{$--header-height} + #{$--footer-height}));
      position: relative;
      z-index: 2;
      box-sizing: border-box;
      overflow: auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 9vh;
    }

    /deep/ &__footer {
      height: $--footer-height;
    }

    /deep/ .login__select--white {
      input {
        background-color: $--color-white;
        border-bottom: none;
      }
    }
  }

  .bars {
    position: relative;
    overflow: hidden;
    min-height: 100vh;
    &::after {
      content: '';
      height: 65vh;
      width: 395px;
      position: absolute;
      bottom: -2px;
      right: 0;
      background-image: url(../../assets/images/login/bars.svg);
      background-size: cover;
      background-repeat: no-repeat;
      z-index: 1;
    }
  }

  /* ipad landscape */
  @media only screen
  and (min-device-width : 768px)
  and (max-device-width : 1024px)
  and (orientation : landscape) {
    .login {
      &__main {
        padding-top: 4vh;
      }
    }
  }
  @media screen and (max-width:767px) {
    $--header-height: 75px;
    .login {
      background: $--color-white;
      &__header {
        height: 75px;
        margin-top: 0;
        padding: 20px;
        align-items: flex-start;
      }
      &__main {
        min-height: calc(100vh - (#{$--header-height} + #{$--footer-height}));
        padding-top: 4vh;
      }
    }
    .ods-logo {
      width: 150px;
    }
    /deep/ .ods-logo {
    svg {
        transform: scale(.75)!important;
      }
    }
    .bars {
      &::after {
        height: 170px;
        width: 100%;
        bottom: 0;
        left: 0;
        right: initial;
        background-image: url(../../assets/images/login/mobile-bars.svg);
        z-index: 1;
      }
    }
    .login__lang-selector {
      width: 60px;
      overflow: hidden;
      padding-top: 0;
      padding-left: rem(5);
      border: 1px solid;
      border-radius: 20px;
    }
  }
  @media screen and (max-width:321px) {
    /deep/ .ods-logo {
    svg {
        transform: scale(.65)!important;
      }
    }
    .bars {
      &::after {
        height: 105px;
      }
    }
  }
</style>
