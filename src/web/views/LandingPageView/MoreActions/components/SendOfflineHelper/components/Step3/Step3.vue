<template>
  <div>
    <v-textarea
      outlined
      label="Signature"
      value=""
      placeholder=" "
    ></v-textarea>

    <mew-expand-panel :panel-items="item1" is-toggle has-dividers />
    <mew-expand-panel :panel-items="item2" is-toggle has-dividers />

    <div class="d-flex justify-center">
      <mew-button
        button-size="xlarge"
        title="Back"
        class="mt-3 mr-3"
        btn-style="outline"
      />
      <mew-button button-size="xlarge" title="Confirm & Send" class="mt-3" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      item1: [
        {
          name: 'Raw transaction'
        }
      ],
      item2: [
        {
          name: 'Details'
        }
      ]
    };
  }
};
</script>
