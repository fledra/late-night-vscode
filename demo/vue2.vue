<template>
  <div id="app-container" class="vue-tester">
    <header v-if="isActive" :data-status="currentStatus">
      <h1 @click="handleHeaderClick">{{ title | uppercase }}</h1>
    </header>

    <main>
      <ul class="item-list">
        <li v-for="(item, index) in items" :key="item.id" :class="{ 'is-even': index % 2 === 0 }">
          <slot name="item" :item="item">
            <span>{{ item.label || 'Default Label' }}</span>
          </slot>

          <button @click.stop="removeItem(index)">&times;</button>
        </li>
      </ul>

      <custom-component v-model="inputValue" :is-disabled="loading" @submit.prevent="validateAndSend" />
    </main>
  </div>
</template>

<script>
// 4. Options API Script Testing
export default {
  name: 'ThemeTester',

  filters: {
    uppercase: (value) => (value ? value.toString().toUpperCase() : ''),
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    initialItems: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      isActive: true,
      loading: false,
      inputValue: '',
      items: this.initialItems,
      regex: /vue-theme-[a-z]+/gi,
    };
  },

  computed: {
    currentStatus() {
      return this.loading ? 'processing' : 'idle';
    },
  },

  watch: {
    items: {
      handler(newVal, oldVal) {
        console.log('Items changed:', newVal.length);
      },
      deep: true,
    },
  },

  methods: {
    async removeItem(index) {
      if (confirm('Are you sure?')) {
        this.loading = true;
        await new Promise((resolve) => setTimeout(resolve, 500));
        this.items.splice(index, 1);
        this.loading = false;
        this.$emit('item-removed', index);
      }
    },
    handleHeaderClick() {
      this.$nextTick(() => {
        console.log('DOM updated');
      });
    },
  },
};
</script>

<style scoped>
/* 5. Embedded CSS Testing */
.vue-tester {
  --main-color: #1a3a4a; /* CSS Variables */
  display: flex;
  flex-direction: column;
}

.item-list > .is-even {
  background-color: rgba(90, 29, 29, 0.1); /* Red palette test */
  border-left: 3px solid var(--main-color);
}

button:hover::after {
  content: ' [Delete]';
  font-size: 0.8rem;
  color: #5a1d1d;
}

@media (max-width: 600px) {
  .vue-tester {
    padding: 10px;
  }
}
</style>
