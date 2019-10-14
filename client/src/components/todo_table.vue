<template>
    <table class="table table-bordered">
        <thead class>
            <tr>
                <th>№</th>
                <th>Задача</th>
                <th>Выполнить</th>
                <th>Удалить</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(todo, index) in todos" :key="index">
                <td v-bind:class="todo.uid" class="todo-uid">{{ todo.id }}</td>
                <td v-bind:class="todo.uid" v-on:dblclick="testAllert">{{ todo.desc }}</td>
                <td v-bind:class="todo.uid" class="complTask">
                    <b-form-checkbox v-bind:class="todo.uid" switch size="lg"></b-form-checkbox>
                    <!-- <span v-if="todo.is_completed">Выполнено</span>
                    <span v-else>Не выполнено</span>-->
                </td>
                <td v-bind:class="todo.uid" class="delTask">
                    <button type="button" class="btn btn-danger btn-sm">X</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
h1,
h2,
h3,
td {
    text-align: left;
}

.todo-uid,
.complTask,
.delTask {
    text-align: center;
}
</style>

<script>
export default {
    props: ["todos"],
    methods: {
        testAllert() {
            alert("click");
        }
    }
};
</script>