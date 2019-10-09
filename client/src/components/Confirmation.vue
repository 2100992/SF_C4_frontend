<template>
  <div>
    <b-collapse id="collapse-333" class="mt-2 collapse" v-model="showCollapse">
      <b-card>
        <p class="card-text">{{ message }}</p>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: ["message", "showCollapse"]
};
</script>
