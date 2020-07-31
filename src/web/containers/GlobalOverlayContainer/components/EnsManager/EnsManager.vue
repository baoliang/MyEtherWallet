<template>
  <div>
    <AddOwnedDomain :open="openAddOwnedDomain" :close="closeAddOwnedDomain" />
    <ManageDomain :open="openManageDomain" :close="closeManageDomain" />
    <RegisterDomain :open="openRegisterDomain" :close="closeRegisterDomain" />
    <TransferDomain :open="openTransferDomain" :close="closeTransferDomain" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AddOwnedDomain from './AddOwnedDomain';
import ManageDomain from './ManageDomain';
import RegisterDomain from './RegisterDomain';
import TransferDomain from './TransferDomain';

export default {
  components: {
    AddOwnedDomain,
    ManageDomain,
    RegisterDomain,
    TransferDomain
  },
  computed: mapState({
    openAddOwnedDomain: state => state.overlays.ensManagerAddOwnedDomain.isOpen,
    openManageDomain: state => state.overlays.ensManagerManageDomain.isOpen,
    openRegisterDomain: state => state.overlays.ensManagerRegisterDomain.isOpen,
    openTransferDomain: state => state.overlays.ensManagerTransferDomain.isOpen
  }),
  methods: {
    closeAddOwnedDomain() {
      this.$store.commit('closeOverlay', 'ensManagerAddOwnedDomain');
    },
    closeManageDomain() {
      this.$store.commit('closeOverlay', 'ensManagerManageDomain');
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
