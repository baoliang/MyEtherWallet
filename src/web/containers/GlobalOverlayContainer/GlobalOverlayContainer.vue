<template>
  <div>
    <AccessWalletOverlays />
    <TransactionOverlays />
    <SignMessageOverlays />
    <EnsManagerOverlays />
  </div>
</template>

<script>
import AccessWalletOverlays from './components/AccessWallet';
import TransactionOverlays from './components/Transaction';
import SignMessageOverlays from './components/SignMessage';
import EnsManagerOverlays from './components/EnsManager';

export default {
  name: 'GlobalOverlayContainer',
  components: {
    AccessWalletOverlays,
    TransactionOverlays,
    SignMessageOverlays,
    EnsManagerOverlays
  },
  data() {
    return {};
  }
};
</script>
