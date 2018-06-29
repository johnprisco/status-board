<template>
  <transition name='slide-fade' tag='div'>
    <div class='content' v-if='isValid'>
      <img :src='icon' />
      <span>
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </span>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'Headline',
  props: {
    icon: String,
    title: String,
    description: String,
    validIndices: Array,
    index: Number
  },
  computed: {
    isValid: function() {
      return this.validIndices.includes(this.index)
    }
  }
}
</script>

<style scoped>
img {
  height: 64px;
  width: 64px;
  border-radius: 40px;
}

h3, p {
  margin: 0;
}

span {
  padding-left: 20px;
}

.content {
  display: inline-flex;
  align-items: center;
  margin-bottom: 10px;
}

.slide-fade-enter-active {
  transition: all .8s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-100%);
}

</style>