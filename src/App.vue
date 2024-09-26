<script setup>
import { ref, computed, watch } from "vue";
import Timeline from "./components/Timeline.vue";
import Reserve from "./components/Reserve.vue";
import Table from "./components/Table.vue";

const exampleTurns = [
  {
    id: 1,
    name: "Juan Pérez",
    start: "2024-09-26 09:00",
    end: "2024-09-26 10:00",
  },
  {
    id: 2,
    name: "María García",
    start: "2024-09-26 11:30",
    end: "2024-09-26 12:30",
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    start: "2024-09-26 14:00",
    end: "2024-09-26 15:00",
  },
];

const turns = ref(exampleTurns);
const timelineRef = ref(null);
const currentReservation = ref(null);

const allTurns = computed(() => {
  return currentReservation.value
    ? [...turns.value, currentReservation.value]
    : turns.value;
});

function addTurn(newTurn) {
  const turnToAdd = {
    id: Date.now(),
    name: newTurn.name,
    start: `${newTurn.date} ${newTurn.startTime}`,
    end: `${newTurn.date} ${newTurn.endTime}`,
  };
  turns.value.push(turnToAdd);
  console.log("Turno agregado:", turnToAdd);
  sortTurns("asc");
  currentReservation.value = null;
}

function deleteTurn(turnId) {
  turns.value = turns.value.filter((turn) => turn.id !== turnId);
}

function sortTurns(order) {
  turns.value.sort((a, b) => {
    const dateA = new Date(a.start);
    const dateB = new Date(b.start);
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
}

function updateCurrentReservation(reservation) {
  if (!reservation) {
    return;
  }
  if (
    reservation.name &&
    reservation.date &&
    reservation.startTime &&
    reservation.endTime
  ) {
    currentReservation.value = {
      id: "current",
      name: reservation.name,
      start: `${reservation.date} ${reservation.startTime}`,
      end: `${reservation.date} ${reservation.endTime}`,
    };
    console.log("Actualizando reserva:", reservation.name);
  } else {
    currentReservation.value = null;
  }
}

watch(
  allTurns,
  () => {
    if (timelineRef.value) {
      timelineRef.value.updateItems(allTurns.value);
    }
  },
  { deep: true }
);
</script>

<template>
  <Reserve
    @add-turn="addTurn"
    @update-current-reservation="updateCurrentReservation"
  />
  <Timeline ref="timelineRef" :turns="allTurns" />
  <Table :turns="turns" @delete-turn="deleteTurn" @sort-turns="sortTurns" />
</template>
