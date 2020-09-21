<template>
  <div>
    <!-- <interface-balance-modal ref="balance" :balance="balance" /> -->
    <div class="info-block">
      <div class="block-image">
        <img alt class="icon" src="~@/assets/images/icons/wallet.svg" />
      </div>
      <div class="block-content">
        <div class="balance-contents">
          <div class="title-block">
            {{ $t('common.balance.string') }}
          </div>
          <div class="balance-text-container">
            <div v-show="balance !== undefined" class="balance-data">
              <div class="balance-value">
                {{ balance }}
              </div>
              <div class="currency">
                SKT
              </div>
            </div>
            <i v-show="balance === undefined" class="fa fa-spin fa-spinner" />
          </div>
        </div>
       
        <!-- .icon-container -->
      </div>
      <!-- .block-content -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  components: {
  },
  props: {
    balance: {
      type: String,
      default: '0'
    },
    getBalance: {
      type: Function,
      default: function () {}
    }
  },
  data() {
    return {
      fetchingBalance: false
    };
  },
  computed: {
    ...mapState('main', ['network'])
  },
  watch: {
    balance() {
      this.fetchingBalance = false;
    }
  },
  mounted() {
    this.fetchBalance();
  },
  methods: {
    balanceModalOpen() {
      this.$refs.balance.$refs.balance.show();
    },
    fetchBalance() {
      this.fetchingBalance = true;
      setTimeout(() => {
        this.getBalance();
        this.fetchingBalance = false;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'MobileInterfaceBalance.scss';
</style>
