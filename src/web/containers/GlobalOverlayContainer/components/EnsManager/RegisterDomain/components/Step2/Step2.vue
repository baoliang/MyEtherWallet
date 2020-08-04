<template>
  <div>
    <TxConfirmation />
    <CompleteRegistration />
  </div>
</template>

<script>
import TxConfirmation from '@/web/containers/GlobalOverlayContainer/CommonComponents/TransactionConfirmation';
import CompleteRegistration from '../CompleteRegistration';

export default {
  components: { TxConfirmation, CompleteRegistration },
  props: {},
  data() {
    return {};
  }
};
</script>
