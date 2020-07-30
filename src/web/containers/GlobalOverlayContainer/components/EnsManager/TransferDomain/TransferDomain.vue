<template>
  <mew-overlay
    :show-overlay="open"
    title="Transfer domain"
    right-btn-text="Cancel"
  >
    <template v-slot:mewComponent>
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
  </mew-overlay>
</template>

<script>
export default {
  components: {},
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
    return {};
  }
};
</script>
