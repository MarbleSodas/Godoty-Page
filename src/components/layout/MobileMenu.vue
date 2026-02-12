<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const closeMenu = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div 
        v-if="isOpen"
        class="fixed inset-0 bg-godot-dark z-[60] flex flex-col pt-24 px-6 md:hidden overflow-y-auto"
      >
        <!-- Close Button -->
        <button 
          class="absolute top-4 right-6 p-2 text-white hover:text-godot-blue transition-colors"
          @click="closeMenu"
        >
          <i class="ph ph-x text-2xl"></i>
        </button>

        <div class="flex flex-col gap-6 text-lg font-medium text-godot-muted">
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
