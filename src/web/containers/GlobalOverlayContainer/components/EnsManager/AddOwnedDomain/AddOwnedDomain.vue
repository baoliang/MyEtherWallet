<template>
  <mew-overlay
    :show-overlay="open"
    title="Add an owned domain"
    right-btn-text="Cancel"
  >
    <template v-slot:mewComponent>
      <v-sheet max-width="600px" color="transparent">
        <div class="d-flex">
          <mew-input placeholder="Enter domain name" class="mr-3 flex-grow-1" />
          <mew-button button-size="xlarge" title="Search" />
        </div>
      </v-sheet>
      <mew6-white-sheet>
        <v-sheet>aaaa</v-sheet>
      </mew6-white-sheet>
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
