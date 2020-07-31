<template>
  <v-theme-provider root>
    <v-sheet
      :max-width="maxWidth"
      color="bg_white_sheet"
      class="border-radius--10px box-shadow"
      :class="[
        sideinfo ? 'sideinfo' : 'full-width',
        overflowHidden ? 'overflow--hidden' : ''
      ]"
    >
      <slot />
    </v-sheet>
  </v-theme-provider>
</template>

<script>
export default {
  props: {
    sideinfo: { default: false, type: Boolean },
    overflowHidden: { default: false, type: Boolean },
    maxWidth: { default: '', type: String }
  }
};
</script>

<style lang="scss" scoped>
.full-width {
  width: 100%;
}

.sideinfo {
  width: 350px;
}
</style>

<style lang="scss">
/* Set light theme box-shadow for white sheet */
#app.theme--light .box-shadow {
  box-shadow: 0 0 15px var(--v-box_shadow-base);
}

/* Set dark theme box-shadow for white sheet */
#app.theme--dark .box-shadow {
  box-shadow: 0 0 15px #3c3c3c;
}
</style>
