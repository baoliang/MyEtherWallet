<template>
  <div>
    <mew-stepper :items="items" :on-step="2">
      <template v-slot:outsideStepContent0>
        111
      </template>
      <template v-slot:outsideStepContent0>
        222
      </template>
      <template v-slot:outsideStepContent0>
        333
      </template>
    </mew-stepper>
    <mew6-white-sheet>
      <Step1 />
    </mew6-white-sheet>
    <mew6-white-sheet>
      <Step2 />
    </mew6-white-sheet>
    <mew6-white-sheet>
      <Step3 />
    </mew6-white-sheet>
  </div>
</template>

<script>
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';

export default {
  components: { Step1, Step2, Step3 },
  data: () => ({
    items: [
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
  })
};
</script>

<style lang="scss" scoped></style>
