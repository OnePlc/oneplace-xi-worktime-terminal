<template>
    <div>
      <canvas id="canvas" width="600" height="600"></canvas>
    </div>
</template>

<script>
export default {
  name: "Clock",
  data() {
    return {
      canvas: null,
      ctx: null,
      secHandLength: 240,
      angle: 0,
      date: null
    };
  },
  mounted() {
    setInterval(this.showClock, 1000);
  },
  methods: {
    showClock() {
      // DEFINE CANVAS AND ITS CONTEXT.
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');

      this.date = new Date;

      // CLEAR EVERYTHING ON THE CANVAS. RE-DRAW NEW ELEMENTS EVERY SECOND.
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.OUTER_DIAL1();
      this.OUTER_DIAL2();
      this.CENTER_DIAL();
      this.MARK_THE_HOURS();
      this.MARK_THE_SECONDS();

      this.SHOW_SECONDS();
      this.SHOW_MINUTES();
      this.SHOW_HOURS();
    },
    OUTER_DIAL1() {
      this.ctx.beginPath();
      this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.secHandLength + 10, 0, Math.PI * 2);
      this.ctx.strokeStyle = '#92949C';
      this.ctx.stroke();
    },
    OUTER_DIAL2() {
      this.ctx.beginPath();
      this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.secHandLength + 7, 0, Math.PI * 2);
      this.ctx.strokeStyle = '#929BAC';
      this.ctx.stroke();
    },
    CENTER_DIAL() {
      this.ctx.beginPath();
      this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 2, 0, Math.PI * 2);
      this.ctx.lineWidth = 3;
      this.ctx.fillStyle = '#353535';
      this.ctx.strokeStyle = '#0C3D4A';
      this.ctx.stroke();
    },

    MARK_THE_HOURS() {

      for (var i = 0; i < 12; i++) {
        this.angle = (i - 3) * (Math.PI * 2) / 12;       // THE ANGLE TO MARK.
        this.ctx.lineWidth = 1;            // HAND WIDTH.
        this.ctx.beginPath();

        var x1 = (this.canvas.width / 2) + Math.cos(this.angle) * (this.secHandLength);
        var y1 = (this.canvas.height / 2) + Math.sin(this.angle) * (this.secHandLength);
        var x2 = (this.canvas.width / 2) + Math.cos(this.angle) * (this.secHandLength - (this.secHandLength / 7));
        var y2 = (this.canvas.height / 2) + Math.sin(this.angle) * (this.secHandLength - (this.secHandLength / 7));

        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);

        this.ctx.strokeStyle = '#466B76';
        this.ctx.stroke();
      }
    },

    MARK_THE_SECONDS() {

      for (var i = 0; i < 60; i++) {
        this.angle = (i - 3) * (Math.PI * 2) / 60;       // THE ANGLE TO MARK.
        this.ctx.lineWidth = 1;            // HAND WIDTH.
        this.ctx.beginPath();

        var x1 = (this.canvas.width / 2) + Math.cos(this.angle) * (this.secHandLength);
        var y1 = (this.canvas.height / 2) + Math.sin(this.angle) * (this.secHandLength);
        var x2 = (this.canvas.width / 2) + Math.cos(this.angle) * (this.secHandLength - (this.secHandLength / 30));
        var y2 = (this.canvas.height / 2) + Math.sin(this.angle) * (this.secHandLength - (this.secHandLength / 30));

        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);

        this.ctx.strokeStyle = '#C4D1D5';
        this.ctx.stroke();
      }
    },

    SHOW_SECONDS() {

      var sec = this.date.getSeconds();
      this.angle = ((Math.PI * 2) * (sec / 60)) - ((Math.PI * 2) / 4);
      this.ctx.lineWidth = 0.5;              // HAND WIDTH.

      this.ctx.beginPath();
      // START FROM CENTER OF THE CLOCK.
      this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);
      // DRAW THE LENGTH.
      this.ctx.lineTo((this.canvas.width / 2 + Math.cos(this.angle) * this.secHandLength),
          this.canvas.height / 2 + Math.sin(this.angle) * this.secHandLength);

      // DRAW THE TAIL OF THE SECONDS HAND.
      this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);    // START FROM CENTER.
      // DRAW THE LENGTH.
      this.ctx.lineTo((this.canvas.width / 2 - Math.cos(this.angle) * 20),
          this.canvas.height / 2 - Math.sin(this.angle) * 20);

      this.ctx.strokeStyle = '#586A73';        // COLOR OF THE HAND.
      this.ctx.stroke();
    },

    SHOW_MINUTES() {

      var min = this.date.getMinutes();
      this.angle = ((Math.PI * 2) * (min / 60)) - ((Math.PI * 2) / 4);
      this.ctx.lineWidth = 1.5;              // HAND WIDTH.

      this.ctx.beginPath();
      this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);  // START FROM CENTER.
      // DRAW THE LENGTH.
      this.ctx.lineTo((this.canvas.width / 2 + Math.cos(this.angle) * this.secHandLength / 1.1),
          this.canvas.height / 2 + Math.sin(this.angle) * this.secHandLength / 1.1);

      this.ctx.strokeStyle = '#999';  // COLOR OF THE HAND.
      this.ctx.stroke();
    },

    SHOW_HOURS() {

      var hour = this.date.getHours();
      var min = this.date.getMinutes();
      this.angle = ((Math.PI * 2) * ((hour * 5 + (min / 60) * 5) / 60)) - ((Math.PI * 2) / 4);
      this.ctx.lineWidth = 1.5;              // HAND WIDTH.

      this.ctx.beginPath();
      this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);     // START FROM CENTER.
      // DRAW THE LENGTH.
      this.ctx.lineTo((this.canvas.width / 2 + Math.cos(this.angle) * this.secHandLength / 1.5),
          this.canvas.height / 2 + Math.sin(this.angle) * this.secHandLength / 1.5);

      this.ctx.strokeStyle = '#000';   // COLOR OF THE HAND.
      this.ctx.stroke();
    }
  }
}
</script>

<style scoped>

</style>