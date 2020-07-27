<template>
  <div>
    <div class="mew-heading-2 mb-3">Verify Message</div>
    <div class="mb-10">
      This is a recommended way to view your balance. You can only view your
      balance via this option.
    </div>
    <v-textarea
      outlined
      label="Signature"
      :value="signature"
      placeholder=" "
    ></v-textarea>
    <div class="d-flex justify-center mb-5 mt-5">
      <mew-button title="Verify" button-size="xlarge" />
    </div>
    <div class="d-flex justify-center">
      <mew-button
        title="Clean all"
        button-size="medium"
        btn-style="transparent"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    signature: `{
      "address": "0xf6827a968275bd62c8ca5fc08cf498b8711491c1",
      "msg": "hellow",
      "sig": "0x32e4c6b54fb88487b1ea6b0bd41509aec82eb98969eec7127ecc8a1f1a8275724f3e97283ca3beb4692dd093150216cf602cd7a915605bfc3fb56f74f6e065d31c",
      "version": "3",
      "signer": "MEW"
    }`
  })
};
</script>

<style lang="scss" scoped></style>
