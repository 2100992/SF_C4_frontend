<template>
  <div>
    <div>
      <h2>Здравствуйте, {{ name }}</h2>
    </div>
    <!-- <div>
      <b-collapse id="collapse-333" class="mt-2 collapse" v-model="showCollapse">
        <b-card>
          <p class="card-text">{{ message }}</p>
        </b-card>
      </b-collapse>
    </div> -->
  </div>
</template>

<style>
h1, h2, h3 {
  text-align: left;
}
</style>

<script>
export default {
  props: ["message", "showCollapse"],


  methods: {
    getName() {
      this.name = localStorage.getItem("name");
    }
  },

  created() {
    this.getName();
    this.$emit('uname', this.name)
    console.log(`name = ${this.name}`);
  }
};
</script>
