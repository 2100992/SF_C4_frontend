<template>
    <div>
        <!-- модальное окно для изменения задачи 
        !!! ToDo - вынести в отдельный компонент
        ---------------------------------------------------------------------->
        <b-modal ref="changeTodoModal" id="change-modal" title="Изменить задачу" hide-footer>
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
                        placeholder="Изменить задачу"
                    ></b-form-input>
                </b-form-group>
                <b-form-group id="form-complete-group"></b-form-group>
                <b-button type="submit" variant="primary">Изменить</b-button>
                <b-button type="reset" variant="danger">Сброс</b-button>
            </b-form>
        </b-modal>
        <!-- таблица с задачами 
        ---------------------------------------------------------------------->
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
                        v-bind:class="todo.uid"
                        :id="todo.uid"
                        v-on:dblclick="testAllert"
                    >{{ todo.desc }}</td>
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
// import changeTask from "./changeTask.vue";

export default {
    props: ["todos"],
    methods: {
        testAllert(enent) {
            console.log(event.target.id);
            this.$refs.changeTodoModal.show();
        }
    },
    components: {
        // changetask: changeTask
    }
};
</script>