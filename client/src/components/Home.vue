<template>
    <div class="container">
        <username :name="userName" v-on:uname="getTodos"></username>
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
            showConfirmation: false
        };
    },

    methods: {
        getTodos() {
            axios.get(todoListURL).then(response => {
                this.todos = response.data.tasks;
            });
        },
        getUserName() {
            this.userName = localStorage.getItem("userName");
            if (this.userName != null) {
                console.log(`userName = ${this.userName}`)
                this.getTodos();
            }
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