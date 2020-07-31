<template>
  <mew-overlay
    :show-overlay="open"
    title="Register domain"
    right-btn-text="Cancel"
  >
    <template v-slot:mewOverlayBody>
      <v-sheet width="100%" max-width="900px" color="transparent">
        <mew-stepper :items="stepperItems" :on-step="onStep">
          <template v-slot:outsideStepContent1><Step1 /></template>
          <template v-slot:outsideStepContent2> </template>
          <template v-slot:outsideStepContent3> </template>
        </mew-stepper>
      </v-sheet>
    </template>
  </mew-overlay>
</template>

<script>
import Step1 from './components/Step1';
export default {
  components: { Step1 },
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
      onStep: 1,
      stepperItems: [
        {
          step: 1,
          name: 'STEP 1. Create password'
        },
        {
          step: 2,
          name: 'STEP 2. Download keystore file'
        },
        {
          step: 3,
          name: 'STEP 3. Well done'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.check-icon {
  font-size: 65px !important;
}
</style>
