<template>
  <div>
    aaa
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    openOverlay(name) {
      this.$store.commit('openOverlay', name);
    },
    openModal(name) {
      this.$store.commit('openModal', name);
    }
  }
};
</script>
