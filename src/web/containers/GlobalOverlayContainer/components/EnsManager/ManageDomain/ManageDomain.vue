<template>
  <BaseOverlay :open="open" :close="close" close-text="Cancel">
    <OverlayTitle title="Confirmation" />
    <mew6-white-sheet max-width="600px">
      aaa
    </mew6-white-sheet>
  </BaseOverlay>
</template>

<script>
import BaseOverlay from '@/components/Overlays/BaseOverlay';
import OverlayTitle from '@/components/OverlayTitle';

export default {
  components: {
    BaseOverlay,
    OverlayTitle
  },
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
      panelItems: [
        {
          name: 'Network',
          subtext: 'ETH - myetherapi.com'
        }
      ],
      activeTab: 0
    };
  }
};
</script>
