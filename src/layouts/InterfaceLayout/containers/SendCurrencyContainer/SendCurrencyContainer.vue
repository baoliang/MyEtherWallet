<template>
  <div class="send-currency-container">
    <interface-container-title :title="$t('sendTx.send-tx')" />
    <div class="send-form">
      <div class="form-block amount-to-address">
        <div class="amount">
          <div class="single-input-block">
            <div class="title">
              <h4>{{ $t('sendTx.amount') }}</h4>
              <p
                class="title-button prevent-user-select"
                @click="sendEntireBalance"
              >
                {{ $t('sendTx.button-entire') }}
              </p>
            </div>
            <div class="the-form amount-number">
              <input
                v-model="toValue"
                :placeholder="$t('sendTx.amount')"
                type="number"
                min="0"
                name="value"
                step="any"
              />
              <i
                :class="[
                  !isValidAmount.valid || errors.has('value') ? 'not-good' : '',
                  'fa fa-check-circle good-button'
                ]"
                aria-hidden="true"
              />
            </div>
            <div
              v-if="!isValidAmount.valid || errors.has('value')"
              class="error-message-container"
            >
              <p>{{ isValidAmount.msg }}</p>
            </div>
          </div>
        </div>
        <div class="to-address">
          <dropdown-address-selector
            :clear-address="clearAddress"
            :title="$t('sendTx.to-addr')"
            @toAddress="getToAddress($event)"
          />
        </div>
      </div>
    </div>

    <div class="submit-button-container">
      <div
        :class="[
          validInputs ? '' : 'disabled',
          'submit-button large-round-button-green-filled'
        ]"
        @click="submitTransaction"
      >
        {{ $t('sendTx.send-tx') }}
      </div>
      <div class="clear-all-btn" @click="clear()">
        {{ $t('common.clear-all') }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import InterfaceContainerTitle from '../../components/InterfaceContainerTitle';
// import { Transaction } from 'ethereumjs-tx';
import { Misc, Toast } from '@/helpers';
import BigNumber from 'bignumber.js';
import ethUnit from 'ethjs-unit';
// import utils from 'web3-utils';
import fetch from 'node-fetch';
import DropDownAddressSelector from '@/components/DropDownAddressSelector';
const bitcore = require("bitcore-lib");
const Buffer = require('buffer/').Buffer;  // note: the trailing slash is important!

export default {
  components: {
    'interface-container-title': InterfaceContainerTitle,
    'dropdown-address-selector': DropDownAddressSelector
  },
  props: {
    checkPrefilled: {
      type: Function,
      default: () => {}
    },
    clearPrefilled: {
      type: Function,
      default: () => {}
    },
    isPrefilled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: '0'
    },
    data: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    gaslimit: {
      type: String,
      default: ''
    },
    gas: {
      type: Number,
      default: 0
    },
    tokensymbol: {
      type: String,
      default: ''
    },
    tokensWithBalance: {
      type: Array,
      default: function () {
        return [];
      }
    },
    getBalance: {
      type: Function,
      default: function () {}
    },
    highestGas: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      advancedExpand: false,
      isValidAddress: false,
      hexAddress: '',
      address: '',
      toValue: '0',
      utxos: [],
      gasLimit: '21000',
      toData: '',
      selectedCurrency: '',
      ethPrice: 0,
      clearAddress: false
    };
  },

  computed: {
    ...mapState('main', [
      'account',
      'gasPrice',
      'web3',
      'network',
      'linkQuery',
      'online',
      'gasLimitWarning'
    ]),
    showGasWarning() {
      return this.gasPrice >= this.gasLimitWarning;
    },
    txFee() {
      return new BigNumber(ethUnit.toWei(this.gasPrice, 'gwei')).times(
        this.gasLimit || 0
      );
    },
    txFeeEth() {
      if (new BigNumber(this.txFee).gt(0)) {
        return ethUnit.fromWei(this.txFee, 'ether');
      }
      return 0;
    },
    isValidAmount() {
      const notEnoughCurrencyMsg =
        this.$t('errorsGlobal.not-valid-amount-total') +
        ' ' +
        'SKT' +
        ' ' +
        this.$t('errorsGlobal.to-send');
      const invalidValueMsg = this.$t('errorsGlobal.invalid-value');

      const enoughCurrency = new BigNumber(this.toValue)
        .plus(this.txFeeEth)
        .lte(this.balanceDefault);
      const validDecimal = this.isValidDecimals;
      if (new BigNumber(this.toValue).lt(0)) {
        return {
          msg: invalidValueMsg,
          valid: false
        };
      }

      return {
        valid: enoughCurrency && validDecimal,
        msg: enoughCurrency
          ? ''
          : !enoughCurrency
          ? notEnoughCurrencyMsg
          : invalidValueMsg
      };
    },
    isValidDecimals() {
      const decimals = (this.toValue + '').split('.')[1];
      if (!decimals) return true;
      if (this.isToken) {
        return decimals.length <= this.selectedCurrency.decimals;
      }
      return decimals.length <= 18;
    },
    isValidData() {
      return Misc.validateHexString(this.toData);
    },
    isValidGasLimit() {
      return new BigNumber(this.gasLimit).gte(0);
    },
    balanceDefault() {
      return new BigNumber(this.account.balance);
    },
    validInputs() {
      return this.isValidAmount.valid && this.isValidAddress;
    },
    isToken() {
      // const symbol = 'SKT';
      return false;
    },
    txData() {
      if (this.isToken) {
        return this.getTokenTransferABI(
          this.toValue,
          this.selectedCurrency.decimals
        );
      }
      return Misc.sanitizeHex(this.toData);
    },
    txValue() {
      if (this.isToken) {
        return '0x00';
      }
      return Misc.sanitizeHex(
        ethUnit.toWei(this.toValue, 'ether').toString(16)
      );
    },
    txTo() {
      return this.isToken
        ? this.selectedCurrency.address.toLowerCase()
        : this.hexAddress.toLowerCase().trim();
    },
    multiWatch() {
      return (
        this.toValue,
        this.isValidAddress,
        this.toData,
        this.selectedCurrency,
        new Date().getTime() / 1000
      );
    },
    convert() {
      if (this.ethPrice) {
        return new BigNumber(
          new BigNumber(this.txFeeEth).times(new BigNumber(this.ethPrice))
        )
          .toFixed(2)
          .toString();
      }
      return '--';
    }
  },
  watch: {
    // multiWatch: utils._.debounce(function () {
    // //  if (this.validInputs) this.estimateGas();
    // }, 500),
    network() {
      // if (this.online && newVal.type.name === 'ETH') this.getEthPrice();
    },
    isPrefilled() {
      // this.prefillForm();
    }
  },
  mounted() {
    this.checkPrefilled();
    this.getUtxo();
    //if (this.online && this.network.type.name === 'ETH') this.getEthPrice();
  },
  methods: {
    async getUtxo() {
      const url = `http://52.83.60.115:3002/api/utxo/${this.account.address}/0`;
      const fetchValues = await fetch(url);
      const values = await fetchValues.json();
      this.utxos = values.map(function (item) {
        item.vout = item.n;
        item.amount = item.value;
        item.scriptPubKey = item.script_public_key.asm;
        return item;
      });
      console.log(values, 'zzz');
    },
    clear() {
      this.toData = '';
      this.toValue = '0';
      this.hexAddress = '';
      this.address = '';
      this.gasLimit = '21000';
      this.isValidAddress = false;
      this.advancedExpand = false;
      this.clearAddress = !this.clearAddress;
      this.selectedCurrency = {
        name: 'SKT',
        symbol: 'SKT'
      };
    },
    getToAddress(data) {
      this.address = data.address;
      this.hexAddress = data.address;
      this.isValidAddress = data.valid;
    },
    prefillForm() {
      if (this.isPrefilled) {
        const foundToken = this.tokensymbol
          ? this.tokensWithBalance.find(item => {
              return (
                item.symbol.toLowerCase() === this.tokensymbol.toLowerCase()
              );
            })
          : undefined;

        this.toData = Misc.validateHexString(this.data) ? this.data : '';
        this.toValue = this.value;
        this.hexAddress = this.to;
        this.address = this.to;
        this.gasLimit = new BigNumber(this.gaslimit).toString();

        this.selectedCurrency = foundToken ? foundToken : this.selectedCurrency;
        this.advancedExpand = true;
        Toast.responseHandler(
          'Form has been prefilled. Please proceed with caution!',
          Toast.WARN
        );
        this.clearPrefilled();
      }
    },
    openSettings() {
      this.$eventHub.$emit('open-settings');
    },
    sendEntireBalance() {
      if (this.isToken) this.toValue = this.selectedCurrency.balance;
      else
        this.toValue =
          this.balanceDefault > 0
            ? this.balanceDefault.minus(
                ethUnit.fromWei(
                  new BigNumber(ethUnit.toWei(this.gasPrice, 'gwei'))
                    .times(this.gasLimit)
                    .toString(),
                  'ether'
                )
              )
            : 0;
    },
    getTokenTransferABI(amount, decimals) {
      const jsonInterface = [
        {
          constant: false,
          inputs: [
            {
              name: '_to',
              type: 'address'
            },
            {
              name: '_amount',
              type: 'uint256'
            }
          ],
          name: 'transfer',
          outputs: [
            {
              name: '',
              type: 'bool'
            }
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ];
      const contract = new this.web3.eth.Contract(jsonInterface);
      return contract.methods
        .transfer(
          this.hexAddress.toLowerCase(),
          new BigNumber(amount).times(new BigNumber(10).pow(decimals)).toFixed()
        )
        .encodeABI();
    },
    async estimateGas() {
      const coinbase = await this.web3.eth.getCoinbase();
      const params = {
        from: coinbase,
        value: this.txValue,
        to: this.txTo,
        gasPrice: Misc.sanitizeHex(
          ethUnit.toWei(this.gasPrice, 'gwei').toString(16)
        ),
        data: this.txData
      };

      this.web3.eth
        .estimateGas(params)
        .then(gasLimit => {
          this.gasLimit = gasLimit;
        })
        .catch(err => {
          this.gasLimit = -1;
          Toast.responseHandler(err, Toast.ERROR);
        });
    },
    async submitTransaction() {
      window.scrollTo(0, 0);
      try {
        const amounts = {};
        console.log(this)
        amounts[this.address] = 10;
        const body = {
          inputs: [
            {
              tx_id: this.utxos[0].txid,
              vout: 0
            }
          ],
          amounts,
          lock_time: 0
        };
        const req = JSON.stringify(body);
        console.log(JSON.stringify(body));
        const url = `http://52.83.60.115:9699/v1/transactions/create`;
        const fetchValues = await fetch(url, {
          method: 'post',
          body: req,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('ffff', fetchValues);
        const BufferWriter = bitcore.encoding.BufferReader;
        let writer = new BufferWriter();
        writer.writeInt32LE(this.version);

        // const tx = new bitcore.Transaction();
        // console.log(this.utxos);
        // txnet.from(this.utxos);
        // tx.to(this.address, 10000);
        // tx.change(this.account.address);
        // tx.sign(this.wallet.privateKey);
        // console.log(22222222222);
        // tx.serialize();

        // const coinbase = await this.web3.eth.getCoinbase();
        // const nonce = await this.web3.eth.getTransactionCount(coinbase);
        // const raw = {
        //   nonce: Misc.sanitizeHex(new BigNumber(nonce).toString(16)),
        //   gasPrice: Misc.sanitizeHex(
        //     ethUnit.toWei(this.gasPrice, 'gwei').toString(16)
        //   ),
        //   gasLimit: Misc.sanitizeHex(new BigNumber(this.gasLimit).toString(16)),
        //   to: this.txTo,
        //   value: this.txValue,
        //   data: this.txData
        // };
        // const _tx = new Transaction(raw);
        // const json = _tx.toJSON(true);
        // json.from = coinbase;
        // this.web3.eth.sendTransaction(json).catch(err => {
        //   Toast.responseHandler(err, Toast.ERROR);
        // });
        // this.clear();
      } catch (e) {
        Toast.responseHandler(e, Toast.ERROR);
      }
    },
    async getEthPrice() {
      const price = await fetch(
        'https://cryptorates.mewapi.io/ticker?filter=ETH'
      )
        .then(res => {
          return res.json();
        })
        .catch(e => {
          Toast.responseHandler(e, Toast.ERROR);
        });
      this.ethPrice =
        typeof price === 'object' ? price.data.ETH.quotes.USD.price : 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'SendCurrencyContainer.scss';
</style>
