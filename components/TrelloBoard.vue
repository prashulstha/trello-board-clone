<script setup lang="ts">
import draggable from 'vuedraggable';
import { Column, Task, ID } from '~~/types';
import { nanoid } from 'nanoid';
const columns = useLocalStorage<Column[]>('trelloBoard', [
  {
    title: 'Backlog',
    id: nanoid(),
    tasks: [
      {
        title: 'Create marketing landing page',
        createdAt: new Date(),
        id: nanoid(),
      } as Task,
      {
        title: 'Develop cool new feature',
        createdAt: new Date(),
        id: nanoid(),
      },
      { title: 'Fix page nav bug', createdAt: new Date(), id: nanoid() },
    ],
  },
  { title: 'Sprint', id: nanoid(), tasks: [] },
  { title: 'In Progress', id: nanoid(), tasks: [] },
  { title: 'Test', id: nanoid(), tasks: [] },
  { title: 'Completed', id: nanoid(), tasks: [] },
] as Column[]);
// Use Alt Modifier from VueUse
const alt = useKeyModifier('Alt');

// Methods
function createNewTask() {
  const newColumn: Column = {
    id: nanoid(),
    title: 'New Column',
    tasks: [] as Task[],
  };
  columns.value.push(newColumn);
  nextTick(() => {
    (
      document.querySelector(
        '.column:last-of-type .title-input'
      ) as HTMLInputElement
    ).focus();
  });
}
</script>
<template>
  <div class="flex items-start gap-4 overflow-x-auto h-full">
    <draggable
      v-model="columns"
      group="columns"
      :animation="150"
      item-key="id"
      class="flex items-start gap-4"
      drag-handle=".drag-hanlde"
    >
      <template #item="{ element: col }: { element: Column }">
        <div class="column bg-gray-200 p-5 rounded min-w-[280px] h-fit">
          <header class="font-bold mb-4">
            <DragHandle />
            <input
              class="title-input bg-transparent focus:bg-white rounded px-1 w-4/5"
              v-model="col.title"
              type="text"
              @keyup.enter="($event.target as HTMLElement).blur()"
              @keydown.backspace="
                col.title === ''
                  ? (columns = columns.filter((c) => c.id !== col.id))
                  : null
              "
            />
          </header>
          <main
            :class="{
              'py-2': col.tasks.length == 0,
            }"
          >
            <draggable
              v-model="col.tasks"
              item-key="id"
              drag-handle=".drag-handle"
              :animation="150"
              :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
            >
              <template #item="{ element: task }: { element: Task }">
                <TrelloBoardTask
                  :task="task"
                  @delete="col.tasks = col.tasks.filter((t) => t.id !== $event)"
                />
              </template>
            </draggable>
          </main>
          <footer>
            <AddNewTask @create="col.tasks.push($event)" />
          </footer>
        </div>
      </template>
    </draggable>
    <button
      @click="createNewTask"
      class="bg-gray-200 p-2 whitespace-nowrap rounded opacity-50 h-[50px]"
    >
      + Add New Column
    </button>
  </div>
</template>
