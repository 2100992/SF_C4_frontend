<template>
    <div class="container">
        <username :name="userName" :showCollapse="showNameRequest" v-on:uname="getTodos" v-on:resetPage="resetPage"></username>
        <confirmation :message="confirmationMessage" :showCollapse="showConfirmation"></confirmation>
        <tototable v-if="userName" :todos="todos"></tototable>
    </div>
</template>

<style lang="less" scoped>
</style>

<script>
import axios from "axios";
import Confirmation from "./Confirmation.vue";
import todoTable from "./todo_table.vue";
import userName from "./userName.vue";

const todoListURL = "http://localhost:8000/api/tasks/";

export default {
    name: "Home",

    data() {
        return {
            todos: {},
            confirmationMessage: "",
            showConfirmation: false,
            showNameRequest: false,

        };
    },

    methods: {
        getTodos() {
            axios.get(`${todoListURL}${this.userName}`).then(response => {
                this.todos = response.data.tasks;
            });
        },
        getUserName() {
            this.userName = localStorage.getItem("userName");
            if (this.userName != null) {
                this.showNameRequest = false;
                console.log(`userName = ${this.userName}`)
                this.getTodos();
                }
            else {
                this.showNameRequest = true;
            };
            
        },
        resetPage() {
            this.getUserName();
            console.log(`Получили событие resetPage`)
        }
    },

    components: {
        confirmation: Confirmation,
        tototable: todoTable,
        username: userName
    },

    created() {
        this.getUserName();
    }
};
</script>