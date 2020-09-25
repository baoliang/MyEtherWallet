<template>
  <div id="app">
    <logout-warning-modal ref="logoutWarningModal" />
    <!-- <twitter-warning-modal ref="twitterWarningModal" /> -->
    <header-container
      v-show="
        $route.fullPath !== '/getting-started' &&
        !$route.fullPath.includes('/dapp-submission')
      "
    />
    <password-modal
      ref="passwordModal"
      v-if="isShow && !wallet"
      :hardware-wallet-open="hardwareWalletOpen"
    />

    <welcome-modal ref="welcome" />
    <router-view />
    <footer-container />
    <!-- <wallet-launched-footer-banner /> -->
  </div>
</template>

<script>
import PasswordModal from '@/layouts/AccessWalletLayout/components/PasswordModal';

import FooterContainer from '@/containers/FooterContainer';
import HeaderContainer from '@/containers/HeaderContainer';
import WelcomeModal from '@/components/WelcomeModal';
import store from 'store';
import { mapState, mapActions } from 'vuex';
import { Toast } from '@/helpers';
import LogoutWarningModal from '@/components/LogoutWarningModal';
// import WalletLaunchedBanner from '@/components/WalletLaunchedBanner';
// import TwitterWarningModal from '@/components/TwitterWarningModal';
import { MnemonicWallet } from '@/wallets';
import AES from 'crypto-js/aes';

const CryptoJS = require('crypto-js');

export default {
  name: 'App',
  components: {
    'header-container': HeaderContainer,
    'footer-container': FooterContainer,
    'logout-warning-modal': LogoutWarningModal,
    'welcome-modal': WelcomeModal,
    'password-modal': PasswordModal

    // 'wallet-launched-footer-banner': WalletLaunchedBanner,
    // 'twitter-warning-modal': TwitterWarningModal
  },
  data() {
    return {
      isShow: false,
      file: {}
    };
  },
  computed: {
    ...mapState('main', ['wallet', 'online'])
  },
  watch: {
    $route(to, from) {
      if (
        !from.meta.hasOwnProperty('requiresAuth') &&
        to.meta.hasOwnProperty('requiresAuth') &&
        this.wallet !== null
      ) {
        this.$refs.logoutWarningModal.$refs.logoutWarningModal.show();
      }
    }
  },
  created() {
    const succMsg = this.$t('common.updates.new');
    const errMsg = this.$t('common.updates.update-error');

    window.addEventListener('PWA_UPDATED', () => {
      Toast.responseHandler(succMsg, Toast.SUCCESS);
    });
    window.addEventListener('PWA_MOUNT_ERROR', () => {
      Toast.responseHandler(errMsg, Toast.WARN);
    });
    window.addEventListener('online', () => {
      this.checkIfOnline(true);
    });
    window.addEventListener('offline', () => {
      this.checkIfOnline(false);
    });
  },
  mounted() {
    this.checkIfOnline(navigator.onLine);
    //this.$refs.twitterWarningModal.$refs.twitterWarning.show();
    // if (!store.get('notFirstTimeVisit') && this.$route.fullPath === '/') {
    //   this.$refs.welcome.$refs.welcome.show();
    // }
    console.log(11123213)
    const ciphertext = localStorage.getItem('ciphertext');
    this.isShow = false;

    if (ciphertext && this.$route.path == '/' && !this.wallet) {
      this.isShow = true;
    }
    if (ciphertext && this.$route.path != '/' && !this.wallet) {
      this.isShow = true;

      this.$router.push({
        path: '/'
      });
    }

    this.$refs.welcome.$refs.welcome.$on('hidden', () => {
      store.set('notFirstTimeVisit', true);
    });

    this.$refs.logoutWarningModal.$refs.logoutWarningModal.$on('hidden', () => {
      window.scrollTo(0, 0);
    });
  },
  destroyed() {
    window.removeEventListener('PWA_UPDATED');
    window.removeEventListener('offline');
    window.removeEventListener('online');
  },

  methods: {
    ...mapActions('main', ['checkIfOnline', 'decryptWallet']),
    hardwareWalletOpen(password) {
      const that = this;
      const ciphertext = localStorage.getItem('ciphertext');

      const bytes = AES.decrypt(ciphertext, password);
      let  decryptedData = null;
      try {
        decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      } catch (error) {
        return Toast.responseHandler('Password wrong', Toast.ERROR);
      }
      decryptedData = "trigger settle found doll resemble patient pause diet cool angle cloth oyster"
      MnemonicWallet(decryptedData, password)
        .then(wallet => {
          if (wallet !== null) {
            //Toast.responseHandler('Error', Toast.ERROR);
          }
          that
            .decryptWallet([wallet.getAccount(1)])
            .then(() => {
              this.$router.push({
                path: 'interface'
              });
            })
            .catch(error => {
              Toast.responseHandler(error, Toast.ERROR);
            });
        })
        .catch(e => {
          //this.password = '';

          this.error = e;
          console.log(e, 'eee');
          Toast.responseHandler(e, Toast.ERROR);
        });
    }
  }
};
</script>

<style lang="scss">
@import '~@/scss/Global-desktop';
@import '~@/scss/Global-tablet';
@import '~@/scss/Global-mobile';

@import '~@/scss/CustomForms-desktop';
@import '~@/scss/CustomForms-tablet';
@import '~@/scss/CustomForms-mobile';

@import '~@/scss/CustomModal-desktop';
@import '~@/scss/CustomModal-tablet';
@import '~@/scss/CustomModal-mobile';
</style>
