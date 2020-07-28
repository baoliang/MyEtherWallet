<template>
  <mew-overlay
    :show-overlay="open"
    title="Add an owned domain"
    right-btn-text="Cancel"
  >
    <template v-slot:mewComponent>
      <v-sheet width="100%" max-width="700px" color="transparent">
        <div class="d-flex">
          <mew-input placeholder="Enter domain name" class="mr-3 flex-grow-1" />
          <mew-button button-size="xlarge" title="Search" />
        </div>

        <mew6-white-sheet class="pa-3">
          <div
            class="d-flex align-center justify-space-between bg_datablock border-radius--5px pa-5"
          >
            <div class="d-flex align-center">
              <v-icon class="check-icon emerald--text mr-2">
                mdi-check-circle-outline
              </v-icon>
              <div>
                <div class="mew-heading-2 emerald--text mb-1">Owned domain</div>
                <div class="mew-heading-2">mewdev009.eth</div>
              </div>
            </div>
            <mew-button
              button-size="large"
              btn-style="outline"
              title="Add to list"
            />
          </div>
          <div class="pa-3">
            <table>
              <tbody>
                <tr>
                  <td>Parent</td>
                  <td>ETH</td>
                </tr>
                <tr>
                  <td>Registrant</td>
                  <td class="d-flex align-center">
                    <blockie
                      :width="blockieSize"
                      :height="blockieSize"
                      class="mr-3"
                    />
                    <div class="monospace d-flex align-center">
                      <div>0xdD8A01dD027BB3963cC7c51dA4c948A02a46EF49</div>
                      <CopyBtn
                        text="0xdD8A01dD027BB3963cC7c51dA4c948A02a46EF49"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Controller</td>
                  <td class="d-flex align-center">
                    <blockie
                      :width="blockieSize"
                      :height="blockieSize"
                      class="mr-3"
                    />
                    <div class="monospace d-flex align-center">
                      <div>0xdD8A01dD027BB3963cC7c51dA4c948A02a46EF49</div>
                      <CopyBtn
                        text="0xdD8A01dD027BB3963cC7c51dA4c948A02a46EF49"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Expiration date</td>
                  <td class="d-flex align-center">
                    <div>03/12/2020 @ 20:30:12</div>
                    <div class="error white--text ml-3 mew-caption">
                      EXPIRE SOON
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </mew6-white-sheet>
      </v-sheet>
    </template>
  </mew-overlay>
</template>

<script>
import CopyBtn from '@/web/components/Buttons/CopyButton';

export default {
  components: { CopyBtn },
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
      blockieSize: '30px'
    };
  }
};
</script>

<style lang="scss" scoped>
.mew-caption {
  line-height: initial;
  padding: 2px 8px;
  border-radius: 3px;
}

.check-icon {
  font-size: 65px !important;
}

table {
  border-collapse: collapse;
  width: 100%;

  tbody {
    tr {
      border-bottom: 2px solid var(--v-bg_datablock-base);
      &:last-child {
        border-bottom: 0;
      }
      td {
        padding: 20px;
      }
    }
  }
}
</style>
