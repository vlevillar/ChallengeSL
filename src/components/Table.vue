<template>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th class="nombre-column">Nombre</th>
            <th class="horario-column" @click="toggleSortOrder">
              Horario
              <span class="sort-arrow">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th class="accion-column">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="turn in sortedTurns" :key="turn.id">
            <td class="nombre-column">
              <b>{{ turn.name }}</b>
            </td>
            <td class="horario-column">{{ formatTime(turn.start, turn.end) }}</td>
            <td class="accion-column">
              <img
                src="/icons/trash.png"
                @click="$emit('delete-turn', turn.id)"
                alt="Borrar"
                class="delete-icon"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      turns: Array,
    },
    data() {
      return {
        sortOrder: 'asc',
      };
    },
    computed: {
      sortedTurns() {
        return [...this.turns].sort((a, b) => {
          const dateA = new Date(a.start);
          const dateB = new Date(b.start);
          return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
      },
    },
    methods: {
      toggleSortOrder() {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        this.$emit('sort-turns', this.sortOrder);
      },
      formatTime(start, end) {
        const startTime = new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const endTime = new Date(end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `de ${startTime} a ${endTime}`;
      },
    },
  };
  </script>
  
  <style scoped>
  @import "../styles/table/style.css";
  </style>
  