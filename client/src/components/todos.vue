<template>
  <div class="container">
    <div class="col-sm">
      <h1>Задачи</h1>

      <confirmation :message="confirmationMessage" :showCollapse="showConfirmation"></confirmation>

      <button
        type="button"
        id="task-add"
        class="btn btn-success btn-sm align-left d-block"
        v-b-modal.todo-modal
      >Добавить задачу</button>

      <table class="table table-dark table-stripped table-hover">
        <thead class="thead-light">
          <tr>
            <th>Uid</th>
            <th>Описание</th>
            <th>Выполнена?</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(todo, index) in todos" :key="index">
            <td class="todo-uid">{{ todo.id }}</td>
            <td>{{ todo.desc }}</td>
            <td>
              <span v-if="todo.is_completed">Выполнено</span>
              <span v-else>Не выполнено</span>
            </td>
            <td>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-secondary btn-sm">Обновить</button>
                &nbsp;
                <button type="button" class="btn btn-danger btn-sm">X</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

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
        <b-form-group id="form-complete-group">
        </b-form-group>
        <b-button type="submit" variant="primary">Добавить</b-button>
        <b-button type="reset" variant="danger">Сброс</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<style>
button#task-add {
  margin-top: 20px;
  margin-bottom: 20px;
}
h1,
td {
  text-align: left;
}
.todo-uid {
  text-align: right;
}
</style>

<script>
import axios from "axios";
import Confirmation from "./Confirmation.vue";

const todoListURL = "http://localhost:8000/api/tasks/";

export default {
  name: "Todo",

  data() {
    return {
      todos: [],
      addTodoForm: {
        description: "",
        is_completed: []
      },
      confirmationMessage: "",
      showConfirmation: false
    };
  },

  methods: {
    getTodos() {
      axios.get(todoListURL).then(response => {
        this.todos = response.data.tasks;
      });
    },

    resetForm() {
      this.addTodoForm.description = "";
      this.addTodoForm.is_completed = [];
    },

    onSubmit(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      const requestData = {
        description: this.addTodoForm.description,
        is_completed: this.addTodoForm.is_completed[0],
        uid: uuid
      };
      axios.post(todoListURL, requestData).then(() => {
        this.getTodos();
        this.confirmationMessage = `Задача "${requestData.description}" добавлена`;
        this.showConfirmation = true;
        setTimeout(() => {
          this.showConfirmation = false;
        }, 2000);
      });
      this.resetForm();
    },

    onReset(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      this.resetForm();
    },

    uuidv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  },

  components: {
    confirmation: Confirmation
  },

  created() {
    this.getTodos();
  }
};
</script>