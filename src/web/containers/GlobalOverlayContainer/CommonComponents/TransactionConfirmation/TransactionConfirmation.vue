<template>
  <mew6-white-sheet>
    <div class="overlay-content pa-8">
      <FromToBlock
        from="0x300be4b1183dca9046349e9e01b1e0c08e362964"
        to="0x02fb7f333fd493b39b79ba57b6d510c64eaa3dc0"
        class="mb-2"
      />

      <BalanceBlock />

      <mew-expand-panel>
        <template v-slot:panelBody0 :panel-items="panelItems">
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

      <div class="d-flex justify-center">
        <mew-button button-size="xlarge" title="Continue on your device" />
      </div>

      <warning-sheet title="NOT RECOMMENDED" description="Not recommanded" />
    </div>
  </mew6-white-sheet>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  }
};
</script>
