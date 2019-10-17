<template>
    <div>
        <!--
        таблица с задачами 
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
                <tr v-for="(todo, index) in todos" :key="index">
                    <td v-bind:class="todo.uid" class="todo-uid">{{ todo.id }}</td>
                    <td
                        class="description"
                        v-bind:class="todo.uid"
                        :id="todo.uid"
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

.todo-uid,
.complTask,
.delTask {
    text-align: center;
}
</style>

<script>
export default {
    data() {
        return {
            id: ""
        };
    },
    props: ["todos"],
    methods: {
        // По двойному клику на задачу:
        // - вычисляем id соотвествующей задачи и
        // - передаем в родительский компонент команду на изменение задачи
        changeThisTask(enent) {
            this.id = event.target.id;
            console.log(event);
            console.log(`id = ${this.id}`);
            this.$emit("changeThisTask", this.id);
        },
        removeThisTask(event) {
            this.id = event.target.id;
            this.$emit("removeThisTask", this.id);
        },
        completeThisTask(event) {
            this.id = event.target.id;
            this.$emit("completeThisTask", this.id);
        }
    },
    components: {}
};
</script>






// Доделать логику работы кликов по таблице:
// Читаем с клика id задачи и класс столбца для принятия решения по конкретному методу
// либо кидаем в подительский компонент событие на открытие модального окна с изменением задачи
// либо посылкем PUT запрос на закрытие или удаление задачи