<template>
  <div class="container">
    <div class="col-sm">
      <yourname v-on:uname="getTodos"></yourname>
      <p>{{ name }}</p>
      <h3>Ваши текущие задачи (локально)</h3>

      <button
        type="button"
        id="task-add"
        class="btn btn-success btn-sm align-left d-block"
        v-b-modal.todo-modal
      >Добавить задачу</button>

      <confirmation :message="confirmationMessage" :showCollapse="showConfirmation"></confirmation>
      
      <table class="table table-bordered">
        <thead class="">
          <tr>
            <th>Uid</th>
            <th>Описание</th>
            <th>Выполнена?</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(todo, index) in todos" :key="index">
            <td class="todo-uid">{{ todo.uid }}</td>
            <td>{{ todo.description }}</td>
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
          <b-form-checkbox-group v-model="addTodoForm.is_completed" id="form-checks">
            <b-form-checkbox value="true">Задача выполнена?</b-form-checkbox>
          </b-form-checkbox-group>
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
h1,h2,h3
td {
  text-align: left;
}
.todo-uid {
  text-align: right;
}
</style>

<script>
// import axios from "axios";
import Confirmation from "./Confirmation.vue";
import yourname from "./yourName.vue";
// const todoListURL = "http://localhost:8000/api/tasks/";

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
    getTodos(uname) {
      // axios.get(todoListURL).then(response => {
      //   this.todos = response.data.tasks;
      // });
      this.todos = localStorage.getItem(uname);
      this.name = uname
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
        is_completed: this.addTodoForm.is_completed[0]
      };
      // axios.post(todoListURL, requestData).then(() => {
      //   this.getTodos();
      //   this.confirmationMessage = `Задача "${requestData.description}" добавлена`;
      //   this.showConfirmation = true;
      //   setTimeout(() => {
      //     this.showConfirmation = false;
      //   }, 2000);
      // });

      localStorage.setItem("uname", requestData);
      this.getTodos();
      this.confirmationMessage = `Задача "${requestData.description}" добавлена`;
      this.showConfirmation = true;
      setTimeout(() => {
        this.showConfirmation = false;
      }, 2000);

      this.resetForm();
    },

    onReset(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      this.resetForm();
    }
  },

  components: {
    confirmation: Confirmation,
    yourname: yourname
  },

  created() {
    this.getTodos();
  }
};
</script>