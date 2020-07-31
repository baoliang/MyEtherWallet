<template>
  <div>
    <div class="bg_datablock py-2 px-8">
      <v-row>
        <v-col cols="6">
          <div class="d-flex align-center">
            <div>Registrant</div>
            <blockie width="25px" height="25px" class="mx-3" />
            <div class="monospace text-overflow--ellipsis">
              0xD4289C524f3A75b783497EB5a459a54F6F4df8D1aaaaaaaaaaaaaa
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="d-flex align-center">
            <div>Controller</div>
            <blockie width="25px" height="25px" class="mx-3" />
            <div class="monospace text-overflow--ellipsis">
              0xD4289C524f3A75b783497EB5a459a54F6F4df8D1aaaaaaaaaaaaaa
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="pa-5">
      <div
        class="d-flex align-center justify-space-between border-bottom pb-5 px-5"
      >
        <div class="mew-heading-3">What do you want to do with the domain?</div>
        <div>Parent - ETH</div>
      </div>
      <div class="pa-5">
        <v-row>
          <v-col
            v-for="(f, key) in domainFunctions"
            :key="key"
            cols="2"
            class="text-center"
          >
            <mew-icon icon-name="ensManager" :img-height="75" />
            <div>{{ f.label }}</div>
            <div v-if="f.expire" class="orange--text">
              <div>Expire at</div>
              <div>{{ f.expire }}</div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      domainFunctions: [
        { label: 'Transfer Domain' },
        { label: 'Renew Domain', expire: '07/21/2020' },
        { label: 'ENS Configurations' },
        { label: 'Manage Multicoins' },
        { label: 'Manage Text Records' },
        { label: 'Upload Website' },
        { label: 'Return Funds' }
      ]
    };
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
