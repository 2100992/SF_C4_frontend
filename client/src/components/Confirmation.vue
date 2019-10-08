<template>
  <div>
    <!-- <b-alert variant="success" show>{{ message }}</b-alert> -->

    <b-collapse id="collapse-333" class="mt-2 collapse" v-model="showCollapse">
      <b-card>
        <p class="card-text">{{ message }}</p>
      </b-card>
    </b-collapse>

  <!-- <div>
    <b-button v-b-toggle.collapse-1 variant="primary">Toggle Collapse</b-button>
    <b-collapse id="collapse-1" class="mt-2">
      <b-card>
        <p class="card-text">{{ message }}</p>
      </b-card>
    </b-collapse>
  </div> -->

  </div>
</template>

<script>
export default {
  props: ['message', 'showCollapse'],
};
</script>
