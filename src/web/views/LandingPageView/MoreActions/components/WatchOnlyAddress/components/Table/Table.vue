<template>
  <mew-table :table-headers="tableHeader" :table-data="tableData" />
</template>

<script>
export default {
  components: {},
  data: () => ({
    tableHeader: [
      {
        text: 'Activity',
        value: 'activity',
        sortable: false,
        filterable: false,
        width: '100%'
      },
      {
        text: 'Date',
        value: 'date',
        sortable: false,
        filterable: false,
        width: '60%'
      },
      {
        text: 'Tx Hash',
        value: 'txHash',
        sortable: false,
        filterable: false,
        containsLink: true,
        width: '100%'
      }
    ],
    tableData: [
      {
        activity: 'Deposited 0.0001 ETH into Vault',
        date: '01/02/2020, 2:16:32 PM',
        txHash: '0xDECAF9CD2367cdbb726E904cD6397eDFcAe6068D'
      },
      {
        activity: 'Generated 30.0000 new Dai from Vault',
        date: '01/02/2020, 1:25:53 PM',
        txHash: '0xAECAF9CD2367cdbb726E904cD6397eDFcAe6068D'
      },
      {
        activity: 'Generated 2.0 new Dai from Vault',
        date: '01/05/2020, 1:25:53 PM',
        txHash: '0xAECAF9CD2367cdbb726E904cD6397eDFcAe6068D'
      }
    ]
  })
};
</script>
