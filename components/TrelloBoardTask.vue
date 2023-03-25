<script setup lang="ts">
import { Task, ID } from '~~/types';

const props = defineProps({
  task: { type: Object as PropType<Task>, required: true },
});
const focused = ref(false);
const emit = defineEmits<{
  (e: 'delete', payload: ID): void;
}>();

onKeyStroke('Backspace', (e) => {
  if (focused.value) emit('delete', props.task.id);
});
</script>

<template>
  <div
    :title="task.createdAt.toLocaleString()"
    class="task flex items-center bg-white p-2 mb-2 rounded shadow-sm max-w-[280px]"
    @focus="focused = true"
    @blur="focused = false"
    tabindex="0"
  >
    <DragHandle />

    <span>{{ task.title }}</span>
    <!-- <input
      v-if="focused"
      type="text"
      v-model="task.title"
      class="title-input focus:bg-gray bg-slate-300 rounded w-full"
      @keyup.enter="focused = false"
    />
    <span v-else>{{ task.title }}</span> -->
  </div>
</template>
<style>
.sortable-drag .task {
  transform: rotate(5deg);
}
.sortable-ghost .task {
  position: relative;
}
.sortable-ghost .task::after {
  content: '';
  @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300 rounded;
}
.task:focus,
.task:focus-visible {
  @apply outline-gray-400 !important;
  outline: gray auto 1px;
}
</style>
