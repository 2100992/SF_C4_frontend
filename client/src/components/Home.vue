<template>
  <div class="container">
    <!--
        Компонент работы с именем пользователя
        - выводим приветствие с именем, если оно есть в LocalStorage
        - выводим форму, если имя неизвестно. по вооду сохраняем его в LS
    -------------------------------------------------------------------------->
    <username :name="userName" :showCollapse="showNameRequest" v-on:resetPage="resetPage"></username>
    <div v-if="userName">
      <p>Задач в вашем списке - {{ todosCounter }}</p>
      <p>Из них пока не выполнено - {{ uncompleteTodosCounter }}</p>
    </div>
    <!------------------------------------------------------------------------>
    <!-- 
        Компонент выводящий модальное окно с формой для заведения новой задачи
        - для активации модального окна нужно нажать на соответствующую кнопку
    -------------------------------------------------------------------------->
    <addtask v-if="userName" v-on:addedTask="addedTask" :userName="userName" :url="todoListURL"></addtask>
    <!------------------------------------------------------------------------>
    <!--
        модальное окно для изменения задачи 
    -------------------------------------------------------------------------->
    <changetask
      :taskID="taskID"
      :show="showChangeTaskModal"
      :oldDescription="this.oldDescription"
      v-on:changedTask="changedTask"
      v-on:closeModal="showChangeTaskModal = false"
    ></changetask>
    <!------------------------------------------------------------------------>
    <!-- 
        Компонент с различными уведомлениями
        - над таблицей создаем collapse элемент с различными сообщениями
        ("задача добавлена", "задача удалена", "ошибка сервера")
        -------------------------------------------------------------------- 
    -->
    <confirmation
      :message="confirmationMessage"
      :showCollapse="showConfirmation"
      v-on:hideConfirmation="hideConfirmation"
    ></confirmation>
    <!------------------------------------------------------------------------>
    <!-- 
        Компонент таблицы с задачами
        - по двойному клику на текст задачи открываем модальное окно с возможностью изменения
        - чекбокс с возможностью "Выполнить" задачу
        - кнопка удаления с модальнымм окном подтверждения удалинея
    -------------------------------------------------------------------------->
    <todotable
      v-if="userName"
      :todos="todos"
      v-on:changeThisTask="changeThisTask"
      v-on:doComplete="doComplete"
      v-on:doRemote="doRemote"
    ></todotable>
    <!------------------------------------------------------------------------>
  </div>
</template>

<style scoped>
p {
  text-align: left;
}
</style>

<script>
import axios from "axios";
import Confirmation from "./Confirmation.vue";
import todoTable from "./todo_table.vue";
import userName from "./userName.vue";
import addTask from "./addTask.vue";

const todoListURL = "http://localhost:8000/api/tasks/";
import changeTask from "./changeTask.vue";

export default {
  name: "Home",

  data() {
    return {
      todos: {},
      todosCounter: 0,
      uncompleteTodosCounter: 0,
      confirmationMessage: "",
      showConfirmation: false,
      showNameRequest: false,
      todoListURL: todoListURL,
      id: "",
      event: "",
      showChangeTaskModal: false,
      taskID: "",
      oldDescription: "",
      userName: ""
    };
  },

  methods: {
    // Возьмем имя текущего пользователя из LS
    // Если имя есть, берем с backand задачи этого пользователя
    // Если нет, выводим форму для ввода имени
    getUserName() {
      this.userName = localStorage.getItem("userName");
      if (this.userName != null) {
        this.showNameRequest = false;
        console.log(`userName = ${this.userName}`);
        this.getTodos();
      } else {
        this.showNameRequest = true;
      }
    },
    // Делаем get запрос на backand
    // Если ошибка, выводим сообщение и повторяем попытку через время
    getTodos() {
      axios
        .get(`${todoListURL}${this.userName}`)
        .then(response => {
          this.todos = response.data.tasks;
          this.todosCounter = this.todos.length;
          this.uncompleteTodosCounter = this.getUncompleteTodosCounter();
        })
        .catch(error => {
          this.confirmationMessage = `Ошибка подключения к серверу "${error}". Попробуйте позднее.`;
          this.showConfirmation = true;
          setTimeout(() => {
            this.getTodos();
            this.showConfirmation = false;
          }, 20000);
        });
    },
    resetPage() {
      this.getUserName();
      console.log(`Получили событие resetPage`);
    },

    // Получаем событие из модального окна компонента addTask
    // Выводим сообщение о добавленной задаче и через время скрываем его
    addedTask(desctiption) {
      this.resetPage();
      this.confirmationMessage = `Задача "${desctiption}" добавлена`;
      this.showConfirmation = true;
      setTimeout(() => {
        this.showConfirmation = false;
      }, 20000);
    },

    // Метод хорошо бы переделать.
    // Получаем это событие из таблицы с задачами (двойной клик по описанию задачи)
    // По событию открываем модальное окно компонента changeTask
    changeThisTask(event) {
      // console.log(`home changeThisTask`);
      // console.log(event);
      this.taskID = event.taskID;
      this.taskEvent = event.taskEvent;
      this.oldDescription = event.description;

      // console.log(`changeThisTask id = ${this.taskID}`);
      // console.log(`changeThisTask event = ${this.taskEvent}`);
      // console.log(`oldDesctiption = ${this.oldDescription}`);
      if (this.taskEvent.includes("description")) {
        this.taskDescription = event.description;
        this.showChangeTaskModal = true;
        // !!!!!!!!
        // ToDo: решить проблему с повторным открытием модала!!!!
        // !!!!!!!!
      }
    },
    // Событие получаем после заполнения формы компонента changeTask
    changedTask(requestData) {
      this.showChangeTaskModal = false;
      axios
        .put(`${todoListURL}${this.userName}`, requestData)
        .then(() => {
          this.resetPage();
          this.confirmationMessage = `Задача "${this.oldDescription}" изменена на "${requestData.description}".`;
          this.showConfirmation = true;
          setTimeout(() => {
            this.showConfirmation = false;
          }, 20000);
          //   this.confirmationMessage = `Задача выполнена".`;
          //   this.showConfirmation = true;
          //   setTimeout(() => {
          //   this.showConfirmation = false;
          //   }, 2000);
        })
        .catch(error => {
          this.confirmationMessage = `Ошибка подключения к серверу "${error}". Попробуйте позднее.`;
          this.showConfirmation = true;
          setTimeout(() => {
            this.doComplete(event);
            this.showConfirmation = false;
          }, 15000);
        });
    },
    doComplete(event) {
      console.log("home doComplete");
      console.log(event);
      axios
        .put(`${todoListURL}${this.userName}`, event)
        .then(() => {
          this.uncompleteTodosCounter = this.getUncompleteTodosCounter();
          //   this.confirmationMessage = `Задача выполнена".`;
          //   this.showConfirmation = true;
          //   setTimeout(() => {
          //   this.showConfirmation = false;
          //   }, 2000);
        })
        .catch(error => {
          this.confirmationMessage = `Ошибка подключения к серверу "${error}". Попробуйте позднее.`;
          this.showConfirmation = true;
          setTimeout(() => {
            this.doComplete(event);
            this.showConfirmation = false;
          }, 20000);
        });
    },
    doRemote(event) {
      console.log("home doRemote");
      console.log(event);
      axios
        .put(`${todoListURL}${this.userName}`, event)
        .then(() => {
          this.resetPage();
          this.confirmationMessage = `Задача "${event.desc}" удалена.`;
          this.showConfirmation = true;
          setTimeout(() => {
            this.showConfirmation = false;
          }, 20000);
        })
        .catch(error => {
          this.confirmationMessage = `Ошибка подключения к серверу "${error}". Попробуйте позднее.`;
          this.showConfirmation = true;
          setTimeout(() => {
            this.doRemote(event);
            this.showConfirmation = false;
          }, 20000);
        });
    },
    hideConfirmation() {
      this.showConfirmation = false;
    },
    getUncompleteTodosCounter() {
      let counter = 0;
      for (let index in this.todos) {
        if (this.todos[index].is_completed === false) {
          counter++;
        }
      }
      return counter;
    }
  },

  components: {
    confirmation: Confirmation,
    todotable: todoTable,
    username: userName,
    addtask: addTask,
    changetask: changeTask
  },

  created() {
    this.getUserName();
  }
};
</script>
