<template>
    <div class="div-main">
      <p class="title">Agenda de reservas</p>
      <div class="container">
        <button class="buttonLeft" id="moveLeft"><</button>
        <div class="timeline" ref="visualization">
        </div>
        <button class="buttonRight" id="moveRight">></button>
      </div>
    </div>
  </template>  

<script>
import moment from "moment";
import vis from "vis";

export default {
  data() {
    return {
      timeline: null,
      items: new vis.DataSet([
        {
          id: 1,
          content: "Reserva 1",
          start: "2019-03-1 10:00",
          end: "2019-03-1 10:30",
        },
        {
          id: 2,
          content: "Reserva 2",
          start: "2019-03-1 11:00",
          end: "2019-03-1 11:45",
        },
      ]),
      options: {
        orientation: {
          axis: "top",
          item: "top",
        },
        zoomMax: 87600900,
        zoomMin: 10000000,
      },
    };
  },
  mounted() {
    const container = this.$refs.visualization;

    this.timeline = new vis.Timeline(container, this.items, this.options);

    document.getElementById("moveLeft").onclick = () => {
      this.move(0.2);
    };
    document.getElementById("moveRight").onclick = () => {
      this.move(-0.2);
    };
    document.getElementById("sliderZoom").addEventListener("input", (e) => {
      this.zoom(e.target.value);
    });
    document.getElementById("fit").onclick = () => {
      this.fitTimeline();
    };
  },
  methods: {
    move(percentage) {
      const range = this.timeline.getWindow();
      const interval = range.end - range.start;
      this.timeline.setWindow({
        start: range.start.valueOf() - interval * percentage,
        end: range.end.valueOf() - interval * percentage,
      });
    },
    zoom(value) {
      if (value < 0) {
        const start = moment().year(moment().year() - 100000);
        const end = moment().year(moment().year() + 1);
        this.timeline.zoomOut(-value);
        if (value === "-1") {
          this.timeline.setWindow(start, end);
        }
      } else if (value > 0) {
        const start = moment();
        const end = moment(moment().utc() + 10);
        this.timeline.zoomIn(value);
        if (value === "1") {
          this.timeline.setWindow(start, end);
        }
      } else {
        this.fitTimeline();
      }
    },
    fitTimeline() {
      document.getElementById("sliderZoom").value = 0;
      this.timeline.fit(this.items.getIds());
    },
  },
};
</script>

<style>
@import "../styles/timeline/style.css";
@import "../styles/timeline/full-style.css";
</style>
