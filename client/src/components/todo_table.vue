<template>
    <div>
        <!--
        таблица с текущими задачами 
        -------------------------------------------------------------------------->
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
                <tr v-for="(todo, index) in todos" :key="index" v-bind:class="todo.uid">
                    <td
                        class="todo-id"
                        v-bind:class="todo.uid"
                    >{{ index + 1 }}</td>
                    <td
                        class="description"
                        v-bind:class="todo.uid"
                        v-on:dblclick="changeThisTask"
                    >{{ todo.desc }}</td>
                    <td
                        class="isCompleted"
                        v-bind:class="todo.uid"
                        v-on:dblclick="changeThisTask">
                        <b-form-checkbox
                            v-bind:class="todo.uid"
                            switch size="lg">
                            </b-form-checkbox>
                    </td>
                    <td
                        class="isDeleted"
                        v-bind:class="todo.uid"
                        v-on:dblclick="changeThisTask">
                        <button
                            type="button"
                            class="btn btn-danger btn-sm">X</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- -------------------------------------------------------------------- -->
    </div>
</template>

<style scoped>
h1,
h2,
h3,
td {
    text-align: left;
}

.todo-id,
.isCompleted,
.isDeleted {
    text-align: center;
}
</style>

<script>
export default {
    data() {
        return {
            id: "",
            tasksEvent: "",
        };
    },
    props: ["todos"],
    methods: {
        // По двойному клику на задачу:
        // - вычисляем id соотвествующей задачи и
        // - передаем в родительский компонент команду на изменение задачи
        changeThisTask(enent) {
            this.id = event.target.classList[1];
            this.tasksEvent = event.target.classList[0],
            console.log(event);
            console.log(`id = ${this.id}`);
            console.log(`event = ${this.tasksEvent}`);
            this.$emit("changeThisTask", event.target.classList);
        },
    },
    components: {}
};
</script>






// Доделать логику работы кликов по таблице:
// Читаем с клика id задачи и класс столбца для принятия решения по конкретному методу
// либо кидаем в подительский компонент событие на открытие модального окна с изменением задачи
// либо посылкем PUT запрос на закрытие или удаление задачи