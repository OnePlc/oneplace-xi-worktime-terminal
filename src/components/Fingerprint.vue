<template>
  <div>
    <v-btn v-if="ready && !waiting" @click="startFingerPrint" x-large color="primary">
      Fingerprint
    </v-btn>
    <v-img :src="require('../assets/fingerprint.gif')" contain :height="200"  v-if="ready && waiting"></v-img>
  </div>
</template>

<script>
import {io} from "socket.io-client";
import Swal from "sweetalert2";
import {KEY_LOGIN} from "@/modules/auth.module";
import {SEND_TIMESTAMP} from "@/modules/worktime.module";

export default {
  name: "Fingerprint",
  data() {
    return {
      ready: false,
      waiting: false,
      serverConnection: null
    };
  },
  mounted() {
    if(!this.serverConnection) {
      this.connectServer()
      this.ready = true;
    } else {
      this.ready = true;
    }
  },
  methods: {
    startFingerPrint() {
      this.serverConnection.emit('startFingerPrint', {});
      this.waiting = true;

      this.serverConnection.on('fingerPrintError', payload => {
        Swal.fire({
          title: payload.message,
          icon: 'error'
        });
      });

      this.serverConnection.on('fingerPrintSuccess', payload => {
        const fingerId = payload.fingerId;
        this.sendTimeToServer(fingerId);
        this.waiting = false;
      });
    },
    sendTimeToServer(fingerId) {
      /**
      Swal.fire({
        title: 'Welcome to work',
        text: 'Finger ' + fingerId,
        icon: 'success',
        background: '#3d3d3d',
      }); **/

      this.$store.dispatch(KEY_LOGIN).then((data) => {
        this.$store.dispatch(SEND_TIMESTAMP, {data: {type: 'fingerprint', hash: fingerId}, token: data.access_token}).then((data) => {
          Swal.fire({
            title: data._embedded.worktime[0].title,
            icon: 'success'
          }).then(value => {
            if(value.isConfirmed) {
              window.location.reload();
            }
          });
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        });
      });
    },
    connectServer() {
      if(!this.serverConnection) {
        this.serverConnection = io('http://localhost:3434');
      }
    }
  }
}
</script>

<style scoped>

</style>