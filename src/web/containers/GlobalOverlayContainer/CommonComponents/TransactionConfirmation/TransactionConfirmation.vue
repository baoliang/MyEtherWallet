<template>
  <mew6-white-sheet>
    <div class="overlay-content pa-8">
      <FromToBlock
        from="0x300be4b1183dca9046349e9e01b1e0c08e362964"
        to="0x02fb7f333fd493b39b79ba57b6d510c64eaa3dc0"
        class="mb-2"
      />

      <div
        class="bg_datablock pa-5 mb-2 d-flex align-center justify-space-between border-radius--5px"
      >
        <div>Domain name:</div>
        <div>mewwalet.crypto</div>
      </div>

      <BalanceBlock />

      <mew-expand-panel
        :panel-items="panelItems"
        has-dividers
        class="mt-5 mb-5"
      >
        <template v-slot:panelBody1>
          <div class="px-3">
            <div class="d-flex justify-space-between mb-2">
              <div>Network</div>
              <div>ETH by myetherwallet.com</div>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <div>Gas Price</div>
              <div>40 <span class="emerald--text">GWEI</span></div>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <div>Gas Limit</div>
              <div>21000 <span class="emerald--text">WEI</span></div>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <div>Nonce</div>
              <div>17</div>
            </div>
            <div class="d-flex justify-space-between">
              <div>Data</div>
              <div>0x</div>
            </div>
          </div>
        </template>
      </mew-expand-panel>

      <div class="d-flex justify-center mb-5">
        <mew-button button-size="xlarge" title="Continue on your device" />
      </div>

      <warning-sheet
        :description="warning.description"
        :link-obj="warning.link"
      />
    </div>
  </mew6-white-sheet>
</template>

<script>
import FromToBlock from '@/components/FromToBlock';
import BalanceBlock from '@/components/BalanceBlock';

export default {
  components: {
    FromToBlock,
    BalanceBlock
  },
  data() {
    return {
      warning: {
        description:
          'Make sure all your transaction details are CORRECT. Canceling or replacing transactions can not be guaranteed to work. You still be charged gas fee even transaction failing.',
        link: {
          url: 'https://kb.myetherwallet.com/',
          title: 'Learn more here…'
        }
      },
      panelItems: [
        {
          name: 'Details',
          subtext: ''
        }
      ]
    };
  }
};
</script>
