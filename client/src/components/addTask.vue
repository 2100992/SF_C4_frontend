<template>
  <div>
    <b-button
      type="button"
      id="task-add"
      class="btn btn-sm align-left d-block w-100"
      variant="outline-secondary"
      v-b-modal.todo-modal
    >Добавить задачу</b-button>
    <b-modal ref="addTodoModal" id="todo-modal" title="Добавить задачу" hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group
          id="form-description-group"
          label="Описание:"
          label-for="form-description-input"
        >
          <b-form-input
            id="form-description-input"
            type="text"
            v-model="addTodoForm.description"
            required
            placeholder="Завести задачу"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-complete-group"></b-form-group>
        <b-button type="submit" variant="primary">Добавить</b-button>
        <b-button type="reset" variant="danger">Сброс</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      addTodoForm: {
        description: ""
      }
    };
  },

  props: ["url", "userName"],

  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      const requestData = {
        description: this.addTodoForm.description
      };
      axios.post(this.url + this.userName, requestData).then(() => {
        this.$emit("addedTask", requestData.description);
      });
      this.resetForm();
    },
    onReset(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      this.resetForm();
    },
    resetForm() {
      this.addTodoForm.description = '';
      // this.addTodoForm.is_completed = [];
    },
  },
};
</script>
