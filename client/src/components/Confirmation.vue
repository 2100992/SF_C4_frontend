<template>
  <div>
    <b-collapse id="collapse-333" class="mt-2 collapse" v-model="showCollapse">
      <b-card>
        <!-- <p class="card-text">{{ message }}</p> -->
        <b-alert class="w-100" v-model="showCollapse" dismissible>
          {{ message }}
          <b>&rArr;</b>
        </b-alert>
        <!-- <b-form @hideConfirmation="hideConfirmation" class="w-100" inline>
          <b-button type="hideConfirmation" variant="danger">X</b-button>
        </b-form>-->
      </b-card>
    </b-collapse>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  props: ["message", "showCollapse"]
};
</script>
