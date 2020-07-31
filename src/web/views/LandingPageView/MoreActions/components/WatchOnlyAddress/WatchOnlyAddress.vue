<template>
  <div>
    <div class="mew-heading-2 mb-3">Watch only address</div>
    <div class="mb-10">
      This is a recommended way to view your balance. You can only view your
      balance via this option.
    </div>
    <TableContainer />
  </div>
</template>

<script>
import TableContainer from './components/TableContainer';

export default {
  components: { TableContainer },
  data: () => ({})
};
</script>

<style lang="scss" scoped></style>
