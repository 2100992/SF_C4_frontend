<template>
  <div class="container">
    <!--
        Компонент работы с именем пользователя
        - выводим приветствие с именем, если оно есть в LocalStorage
        - выводим форму, если имя неизвестно. по вооду сохраняем его в LS
    -------------------------------------------------------------------------->
    <username :name="userName" :showCollapse="showNameRequest" v-on:resetPage="resetPage"></username>
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
      :userName="userName"
      :show="showChangeTaskModal"
      :url="todoListURL"
      :oldDescription="this.oldDescription"
      v-on:changedTask="changedTask"
    ></changetask>
    <!------------------------------------------------------------------------>
    <!-- 
        Компонент с различными уведомлениями
        - над таблицей создаем collapse элемент с различными сообщениями
        ("задача добавлена", "задача удалена", "ошибка сервера")
        -------------------------------------------------------------------- 
    -->
    <confirmation :message="confirmationMessage" :showCollapse="showConfirmation"></confirmation>
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

<style lang="less" scoped>
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
        })
        .catch(error => {
          this.confirmationMessage = `Ошибка подключения к серверу "${error}". Попробуйте позднее.`;
          this.showConfirmation = true;
          setTimeout(() => {
            this.getTodos();
            this.showConfirmation = false;
          }, 15000);
        });
    },
    resetPage() {
      this.getUserName();
      console.log(`Получили событие resetPage`);
    },
    addedTask(desctiption) {
      this.resetPage();
      this.confirmationMessage = `Задача "${desctiption}" добавлена`;
      this.showConfirmation = true;
      setTimeout(() => {
        this.showConfirmation = false;
      }, 2000);
    },
    changeThisTask(event) {
      console.log(`home changeThisTask`);
      console.log(event);
      this.taskID = event.taskID;
      this.taskEvent = event.taskEvent;
      this.oldDescription = event.description;

      console.log(`changeThisTask id = ${this.taskID}`);
      console.log(`changeThisTask event = ${this.taskEvent}`);
      console.log(`oldDesctiption = ${this.oldDescription}`);
      if (this.taskEvent.includes("description")) {
        this.taskDescription = event.description;
        this.showChangeTaskModal = true;
      }
    },
    changedTask(desctiption) {
      this.showChangeTaskModal = false;
      this.resetPage();
      this.confirmationMessage = `Задача "${this.oldDescription}" изменена на "${desctiption}".`;
      this.showConfirmation = true;
      setTimeout(() => {
        this.showConfirmation = false;
      }, 2000);
    },
    doComplete(event) {
      console.log("home doComplete");
      console.log(event);
      axios
        .put(`${todoListURL}${this.userName}`, event)
        .then(() => {
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
          }, 2000);
        })
        .catch(error => {
          this.confirmationMessage = `Ошибка подключения к серверу "${error}". Попробуйте позднее.`;
          this.showConfirmation = true;
          setTimeout(() => {
            this.doRemote(event);
            this.showConfirmation = false;
          }, 15000);
        });
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
