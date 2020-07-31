<template>
  <mew-overlay
    :show-overlay="open"
    title="Transfer domain"
    right-btn-text="Cancel"
  >
    <template v-slot:mewOverlayBody>
      <mew-tabs :items="tabs">
        <template v-slot:tabItemContent1>
          <v-sheet width="100%" max-width="600px" color="transparent">
            <mew6-white-sheet class="pa-3">
              <div class="py-7 px-7">
                <address-select />
                <div class="d-flex justify-center">
                  <mew-button title="Transfer" button-size="xlarge" />
                </div>
              </div>
            </mew6-white-sheet>
          </v-sheet>
        </template>
        <template v-slot:tabItemContent2>
          <v-sheet width="100%" max-width="600px" color="transparent">
            <TxConfirmation />
          </v-sheet>
        </template>
      </mew-tabs>
    </template>
  </mew-overlay>
</template>

<script>
import TxConfirmation from '@/web/containers/GlobalOverlayContainer/CommonComponents/TransactionConfirmation';

export default {
  components: { TxConfirmation },
  props: {
    open: { default: false, type: Boolean },
    close: {
      default: function () {
        return {};
      },
      type: Function
    }
  },
  data() {
    return {
      tabs: [
        {
          name: 'Transfer domain'
        },
        {
          name: 'Confirmation'
        }
      ]
    };
  }
};
</script>
