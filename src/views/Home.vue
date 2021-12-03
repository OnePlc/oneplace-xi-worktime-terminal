<template>
  <v-container>
    <v-row>
      <v-col md="12" class="text-center">
        <Clock></Clock>
        <Fingerprint v-if="fingerPrintSensor"></Fingerprint>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Clock from '../components/Clock'
  import Fingerprint from '../components/Fingerprint'

  export default {
    name: 'Home',
    data() {
      return {
        fingerPrintSensor: true
      };
    },

    components: {
      Clock,
      Fingerprint
    },
  }
</script>
