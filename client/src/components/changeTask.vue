<template>
  <div>
    <b-modal
      ref="changeTodoModal"
      id="change-modal"
      title="Изменить задачу"
      hide-footer
      v-model="show"
    >
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group
          id="form-description-group"
          label="Описание:"
          label-for="form-description-input"
        >
          <b-form-input
            id="form-description-input"
            type="text"
            v-model="oldDescription"
            required
            placeholder="Изменить задачу"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="form-complete-group"></b-form-group>
        <b-button type="submit" variant="primary">Изменить</b-button>
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
      changeTodoForm: {
        description: "",
        uid: "",
      }
    };
  },

  props: ["taskID", "show", "url", "oldDescription", "userName"],

  methods: {
    // todo: вынести этот функционал в родительский компонент
    // Сохраняем в backend обновленное описание задачи
    // отправляем в родительский компонент сигнал об случившемя изменении
    onSubmit(event) {
      event.preventDefault();
      const requestData = {
        description: this.oldDescription,
        uid: this.taskID
      };
      axios.put(this.url + this.userName, requestData).then(() => {
        this.$emit("changedTask", requestData.description);
        this.resetForm();
      });
    },
    onReset(event) {
      console.log("changeTask onReset");
      event.preventDefault();
      this.resetForm();
    },
    resetForm() {
      console.log("changeTask resetForm");
      this.changeTodoForm.description = "";
      // this.addTodoForm.is_completed = [];
    }
  }
};
</script>
