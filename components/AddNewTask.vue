<script setup lang="ts">
import { nanoid } from 'nanoid';
import { Task } from '~~/types';

const emit = defineEmits<{
  (e: 'create', payload: Task): void;
}>();

const focused = ref(false);
const title: Ref<string> = ref('');

function createTask(e: Event) {
  if (title.value.trim()) {
    e.preventDefault();
    (e.target as HTMLElement).blur();
    const newTask: Task = {
      title: title.value.trim(),
      id: nanoid(),
      createdAt: new Date(),
    };
    emit('create', newTask);
    title.value = '';
  }
}
</script>
<template>
  <textarea
  v-model="title"
    @keydown.tab="createTask"
    @keyup.enter="createTask"
    @focus="focused = true"
    @blur="focused = false"
    :placeholder="!focused ? '+ Add A Card' : 'Enter a title for this card'"
    class="focus:bg-white focus:shadow resize-none rounded w-full border-none bg-transparent p-2 cursor-pointer"
    :class="{
      'h-7': !focused,
      'h-20': focused,
    }"
  ></textarea>

</template>
