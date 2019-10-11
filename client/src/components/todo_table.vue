<template>
    <table class="table table-bordered">
        <thead class>
            <tr>
                <th>Uid</th>
                <th>Описание</th>
                <th>Выполнена?</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(todo, index) in todos" :key="index">
                <td class="todo-uid">{{ todo.id }}</td>
                <td>{{ todo.desc }}</td>
                <td>
                    <span v-if="todo.is_completed">Выполнено</span>
                    <span v-else>Не выполнено</span>
                </td>
                <td>
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-secondary btn-sm">Обновить</button>
                        &nbsp;
                        <button
                            type="button"
                            class="btn btn-danger btn-sm"
                        >X</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
button#task-add {
    margin-top: 20px;
    margin-bottom: 20px;
}

h1,
h2,
h3,
td {
    text-align: left;
}

.todo-uid {
    text-align: center;
}

</style>

<script>
export default {
    props: ["todos"]
};
</script>