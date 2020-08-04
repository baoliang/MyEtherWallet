<template>
  <div>
    <AddOwnedDomain :open="openAddOwnedDomain" :close="closeAddOwnedDomain" />
    <RegisterDomain :open="openRegisterDomain" :close="closeRegisterDomain" />
    <TransferDomain :open="openTransferDomain" :close="closeTransferDomain" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AddOwnedDomain from './AddOwnedDomain';
import RegisterDomain from './RegisterDomain';
import TransferDomain from './TransferDomain';

export default {
  components: {
    AddOwnedDomain,
    RegisterDomain,
    TransferDomain
  },
  computed: mapState({
    openAddOwnedDomain: state => state.overlays.ensManagerAddOwnedDomain.isOpen,
    openRegisterDomain: state => state.overlays.ensManagerRegisterDomain.isOpen,
    openTransferDomain: state => state.overlays.ensManagerTransferDomain.isOpen
  }),
  methods: {
    closeAddOwnedDomain() {
      this.$store.commit('closeOverlay', 'ensManagerAddOwnedDomain');
    },
    closeRegisterDomain() {
      this.$store.commit('closeOverlay', 'ensManagerRegisterDomain');
    },
    closeTransferDomain() {
      this.$store.commit('closeOverlay', 'ensManagerTransferDomain');
    }
  }
};
</script>
