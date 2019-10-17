<template>
    <div class="container">
        <!--
        Компонент работы с именем пользователя
        - выводим приветствие с именем, если оно есть в LocalStorage
        - выводим форму, если имя неизвестно. по вооду сохраняем его в LS
        --------------------------------------------------------------------
        -->
        <username
            :name="userName"
            :showCollapse="showNameRequest"
            v-on:uname="getTodos"
            v-on:resetPage="resetPage"
        ></username>
        <!-- 
        Компонент выводящий модальное окно с формой для заведения новой задачи
        - для активации модального окна нужно нажать на соответствующую кнопку
        -------------------------------------------------------------------- 
        -->
        <addTask
            v-if="userName"
            v-on:addedTask="addedTask"
            :userName="userName"
            :todoListURL="todoListURL"
        ></addTask>
        <!-- 
        Компонент с различными уведомлениями
        - над таблицей создаем collapse элемент с различными сообщениями
        ("задача добавлена", "задача удалена", "ошибка сервера")
        -------------------------------------------------------------------- 
        -->
        <confirmation :message="confirmationMessage" :showCollapse="showConfirmation"></confirmation>
        <!-- 
        Компонент таблицы с задачами
        - по двойному клику на текст задачи открываем модальное окно с возможностью изменения
        - чекбокс с возможностью "Выполнить" задачу
        - кнопка удаления с модальнымм окном подтверждения удалинея
        -------------------------------------------------------------------- 
        -->
        <tototable v-if="userName" :todos="todos" v-on:resetPage="resetPage"></tototable>
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

export default {
    name: "Home",

    data() {
        return {
            todos: {},
            confirmationMessage: "",
            showConfirmation: false,
            showNameRequest: false,
            todoListURL: todoListURL
        };
    },

    methods: {
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
                        this.showConfirmation = false;
                    }, 5000);
                });
        },
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
        }
    },

    components: {
        confirmation: Confirmation,
        tototable: todoTable,
        username: userName,
        addTask: addTask
    },

    created() {
        this.getUserName();
    }
};
</script>