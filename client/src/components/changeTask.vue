<template>
  <div>
    <b-modal
      ref="changeTodoModal"
      id="change-modal"
      title="Изменить задачу"
      hide-footer
      v-model="showModal"
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
        <b-button type="reset" variant="danger">Отмена</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // showModal: false,
      changeTodoForm: {
        description: "",
        uid: ""
      }
    };
  },

  props: ["taskID", "show", "oldDescription"],

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
      this.$emit("changedTask", requestData);
    },
    onReset(event) {
      console.log("changeTask onReset");
      event.preventDefault();
      this.resetForm();
      this.showModal = false;
    },
    resetForm() {
      console.log("changeTask resetForm");
      this.changeTodoForm.description = "";
      // this.addTodoForm.is_completed = [];
    }
  },
  computed: {
    showModal: {
      get: function() {
        return this.show;
      },
      set: function(val) {
        console.log(val);
        this.$emit("closeModal")
      }
    }
  }

  // watch: {
  //   show: {
  //     function(val) {
  //       console.log(`watch show=${val}`);
  //     }
  //   }
  // }
};
</script>
