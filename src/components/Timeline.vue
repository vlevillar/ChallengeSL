<template>
  <div class="div-main">
    <div class="title-container">
      <p class="title">Agenda de reservas</p>
      <div class="color-box-container">
        <div class="color-box1"></div>
        <span class="color-text">Disponible</span>
        <div class="color-box2"></div>
        <span class="color-text">Reservado</span>
        <div class="color-box3"></div>
        <span class="color-text">Mi reserva actual</span>
      </div>
    </div>
    <div class="container">
      <button class="buttonLeft" @click="move(0.2)"><</button>
      <div class="timeline" ref="visualization"></div>
      <button class="buttonRight" @click="move(-0.2)">></button>
    </div>
  </div>
</template>

<script>
import { onMounted, watch, ref } from "vue";
import vis from "vis";

export default {
  props: {
    turns: Array,
  },
  setup(props) {
    const visualization = ref(null);
    let timeline = null;
    let items = null;

    const options = {
      orientation: {
        axis: "top",
        item: "top",
      },
      zoomMax: 87600900,
      zoomMin: 10000000,
    };

    function updateItems(turns) {
      if (timeline && items) {
        const updatedItems = turns.map((turn) => ({
          id: turn.id,
          content: turn.name,
          start: new Date(turn.start),
          end: new Date(turn.end),
          className: turn.id === "current" ? "current-reservation" : "",
        }));

        items.clear();
        items.add(updatedItems);
        timeline.setItems(items);
        timeline.fit();
      }
    }

    onMounted(() => {
      items = new vis.DataSet([]);
      timeline = new vis.Timeline(visualization.value, items, options);
      updateItems(props.turns);
    });

    watch(
      () => props.turns,
      (newTurns) => {
        updateItems(newTurns);
      },
      { deep: true }
    );

    function move(percentage) {
      const range = timeline.getWindow();
      const interval = range.end - range.start;
      timeline.setWindow({
        start: range.start.valueOf() - interval * percentage,
        end: range.end.valueOf() - interval * percentage,
      });
    }

    return {
      visualization,
      move,
      updateItems,
    };
  },
};
</script>

<style>
@import "../styles/timeline/style.css";
@import "../styles/timeline/full-style.css";
.current-reservation {
  background-color: #91feb5;
  border: 2px dashed #91feb5ac;
}
</style>
