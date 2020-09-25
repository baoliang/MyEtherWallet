<template>
  <div class="drop-down-address-selector">
    <div class="dropdown--title">
      <h4>{{ title }}</h4>
      <div class="top-button-block">
        <button
          v-show="!hideCopy"
          v-if="isValidAddress"
          :class="['save-addr-txt', !selectedAddress ? 'disabled-txt' : '']"
          @click="openAddrModal()"
        >
          {{ $t('interface.address-book.save-addr') }}
        </button>
        <button
          v-show="!hideCopy"
          class="title-button prevent-user-select"
          @click="copyToClipboard($refs.addressInput)"
        >
          {{ $t('common.copy') }}
        </button>
      </div>
    </div>
    <div class="dropdown--content">
      <div
        :class="dropdownOpen ? 'dropdown-open' : ''"
        class="dropdown-input-box"
      >
        <div>
          <input
            ref="addressInput"
            :placeholder="$t('common.enter-addr')"
            type="text"
            autocomplete="off"
            @focus="dropdownOpen = false"
            @input="debouncedInput"
          />
        </div>

        <div v-if="!isValidAddress" class="blockie-place-holder-image" />
        <div v-if="isValidAddress" class="selected-address-blockie">
          <blockie
            v-if="avatar === ''"
            :address="hexAddress"
            width="30px"
            height="30px"
          />
          <div v-if="avatar !== ''" class="avatar-container">
            <img :src="avatar" />
          </div>
        </div>
        <div class="dropdown-open-button" @click="dropdownOpen = !dropdownOpen">
          <i
            v-if="!dropdownOpen"
            class="fa fa-chevron-down"
            aria-hidden="true"
          />
          <i v-if="dropdownOpen" class="fa fa-chevron-up" aria-hidden="true" />
        </div>
      </div>
      <div v-if="dropdownOpen" class="dropdown-list-box">
        <ul>
          <li
            v-for="addr in addresses"
            :key="addr.key"
            @click="listedAddressClick(addr.address)"
          >
            <div class="list-blockie">
              <blockie
                :address="addr.resolverAddr"
                width="30px"
                height="30px"
              />
              <img
                :alt="$t('common.currency.ethereum')"
                class="currency-icon"
                src="@/assets/images/currency/eth.svg"
              />
            </div>
            <div class="address-block">
              <p class="listed-address">
                {{ addr.address }}
                <span
                  v-if="
                    addr.address !== currentAddress &&
                    addr.currency !== 'ETH' &&
                    addr.currency
                  "
                  class="address-note"
                  >{{ addr.currency }} {{ $t('interface.addr') }}</span
                >
              </p>
            </div>
            <p v-if="addr.address === currentAddress" class="address-note">
              {{ $t('common.my-addr') }}
            </p>
            <p v-if="addr.address !== currentAddress" class="address-note">
              {{ addr.nickname }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <address-book-modal
      ref="addressBook"
      :selected-address="selectedAddress"
      :title="'interface.address-book.add-new'"
      :modal-action="'add'"
    />
  </div>
</template>

<script>
import '@/assets/images/currency/coins/asFont/cryptocoins.css';
import '@/assets/images/currency/coins/asFont/cryptocoins-colors.css';
import Blockie from '@/components/Blockie';
import { mapState, mapActions } from 'vuex';
import { Toast } from '@/helpers';
import AddressBookModal from '@/components/AddressBookModal';

export default {
  components: {
    blockie: Blockie,
    'address-book-modal': AddressBookModal
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    currency: {
      type: String,
      default: 'ETH'
    },
    clearAddress: {
      type: Boolean,
      default: false
    },
    hideCopy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedAddress: '',
      isValidAddress: false,
      dropdownOpen: false,
      toAddressCheckMark: false,
      hexAddress: '',
      currentAddress: '',
      avatar: ''
    };
  },
  computed: {
    ...mapState('main', ['addressBook', 'account']),
 
    sortedAddressBook() {
      const addrBk = this.addressBook;
      return addrBk.sort((a, b) => {
        a = a.nickname.toString().toLowerCase();
        b = b.nickname.toString().toLowerCase();

        return a < b ? -1 : a > b ? 1 : 0;
      });
    }
  },
  watch: {
    clearAddress() {
      this.selectedAddress = '';
      this.isValidAddress = false;
      this.hexAddress = '';
      this.$refs.addressInput.value = '';
    },
    hexAddress() {
      this.validateAddress(this.selectedAddress);
    },
    currency() {
      this.validateAddress(this.selectedAddress);
    },
    dropdownOpen(val) {
      const resolverTxtElem =
        document.querySelector('.resolver-error') ||
        document.querySelector('.resolver-addr');
      if (resolverTxtElem) {
        val === true
          ? resolverTxtElem.classList.add('hidden')
          : resolverTxtElem.classList.remove('hidden');
      }
    }
  },
  mounted() {
    this.currentAddress = this.account.address;
  },
  methods: {
    ...mapActions('main', ['setAddressBook']),
    openAddrModal() {
      this.$refs.addressBook.$refs.addressBookModal.show();
    },
    debouncedInput: function (e) {
     
     this.selectedAddress = e.target.value;
        if(this.selectedAddress.indexOf('ms')  == 0) {
          this.isValidAddress = true;
                        this.validateAddress(true);

        } else {
                        this.validateAddress(false);

        }

     //this.isValidAddress=  true;
    },
    copyToClipboard(ref) {
      ref.select();
      document.execCommand('copy');
      Toast.responseHandler(this.$t('common.copied'), Toast.INFO);
    },

    listedAddressClick(address) {
      this.toAddressCheckMark = true;
      this.dropdownOpen = !this.dropdownOpen;
      this.selectedAddress = address;
      this.$refs.addressInput.value = address;
    },
    validateAddress(v) {
      
        this.$emit('toAddress', { address: this.selectedAddress, valid: v });
        this.$emit('validAddress', v);
      
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'DropDownAddressSelector';
</style>
