<template>
  <div class="vue3-root">
    <Teleport to="body">
      <div v-if="isOverlayOpen" class="modal">
        <h3>{{ modalTitle }}</h3>
      </div>
    </Teleport>

    <main class="content-area">
      <section v-show="!isLoading">
        <h2 :class="[stateColor, 'title-text']">Project: {{ activeProject.name }}</h2>

        <SearchInput v-model:query.trim="searchQuery" placeholder="Search assets..." @update:query="handleSearch" />

        <div class="stats-grid">
          <div v-for="{ id, value, label } in stats" :key="id" class="stat-card">
            <span class="val">{{ formatValue(value) }}</span>
            <label>{{ label }}</label>
          </div>
        </div>
      </section>

      <div class="loading-spinner">
        <p>Fetching data from {{ apiEndpoint }}...</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// 4. Composition API Script Setup
import { ref, reactive, computed, onMounted, watchEffect } from 'vue';
import type { Project, Stat } from './types';

// Props and Emits (Compiler Macros)
const props = defineProps<{
  apiEndpoint: string;
  initialState?: boolean;
}>();

const emit = defineEmits<{
  (e: 'change', value: number): void;
  (e: 'close'): void;
}>();

// 5. Reactive State
const isOverlayOpen = ref(false);
const searchQuery = ref('');
const isLoading = ref(true);

const activeProject = reactive<Project>({
  id: 'pro_99',
  name: 'Theme Stress Test',
  tags: ['red', 'blue', 'vscode'],
});

const stats = ref<Stat[]>([
  { id: 1, value: 4200, label: 'Requests' },
  { id: 2, value: 0.98, label: 'Success Rate' },
]);

// 6. Logic and Computed Properties
const modalTitle = computed(() => {
  return `Editing: ${activeProject.name}`;
});

const stateColor = computed(() => {
  return props.initialState ? 'text-info-blue' : 'text-deep-red';
});

const formatValue = (val: number): string => {
  return val > 1 ? val.toLocaleString() : `${(val * 100).toFixed(0)}%`;
};

// 7. Lifecycle and Watchers
watchEffect(() => {
  if (searchQuery.value.length > 3) {
    console.log(`Searching for: ${searchQuery.value}`);
  }
});

onMounted(async () => {
  await new Promise((r) => setTimeout(r, 800));
  isLoading.value = false;
});
</script>

<style scoped lang="scss">
/* 8. Embedded SCSS Testing */
.vue3-root {
  $base-padding: 2rem;

  .content-area {
    padding: $base-padding;

    .title-text {
      &.text-deep-red {
        color: #5a1d1d;
      }
      &.text-info-blue {
        color: #1a3a4a;
      }
    }
  }

  // Testing CSS v-bind (Vue 3 feature)
  .stat-card {
    opacity: v-bind('isLoading ? 0.5 : 1');
    transition: opacity 0.3s ease;
  }
}
</style>
