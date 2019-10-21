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
        <tr v-for="(todo, index) in todos" :key="index" v-bind:id="todo.uid">
          <td class="todo-id" :class="{'is-completed': todo.is_completed}">{{ index + 1 }}</td>
          <td
            class="description"
            :class="{'is-completed': todo.is_completed}"
            v-on:dblclick="changeThisTask"
          >{{ todo.desc }}</td>
          <td class="makeCompleted" :class="{'is-completed': todo.is_completed}">
            <b-form-checkbox
              switch
              size="lg"
              v-model="todo.is_completed"
              v-on:change="doComplete(todo.uid, todo.is_completed)"
            ></b-form-checkbox>
          </td>
          <td class="makeDeleted" :class="{'is-completed': todo.is_completed}">
            <button
              type="button"
              class="btn btn-danger btn-sm"
              size="lg"
              v-on:click="doRemote(todo.uid, todo.desc)"
            >X</button>
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
.makeCompleted,
.makeDeleted {
  text-align: center;
}

.is-completed {
  /* background-color: lightgray; */
  color: lightgrey;
}
</style>

<script>
export default {
  data() {
    return {
      id: "",
      tasksEvent: ""
    };
  },
  props: ["todos"],
  methods: {
    // По двойному клику на задачу:
    // - вычисляем id соотвествующей задачи и
    // - передаем в родительский компонент команду на изменение задачи
    changeThisTask(enent) {
      let fullEvent = {};
      fullEvent.taskID = event.target.parentElement.id;
      fullEvent.taskEvent = event.target.className;
      fullEvent.description = event.target.innerHTML;
      // console.log(event);
      // console.log(`todo_table taskID = ${fullEvent.taskID}`);
      // console.log(`todo_table taskEvent = ${fullEvent.taskEvent}`);
      // console.log(`todo_table description = ${fullEvent.description}`);
      this.$emit("changeThisTask", fullEvent);
    },
    doComplete(uid, status) {
      let fullEvent = {};
      fullEvent.uid = uid;
      fullEvent.is_completed = !status;
      this.$emit("doComplete", fullEvent);
    },
    doRemote(uid, description) {
      let fullEvent = {};
      fullEvent.uid = uid;
      fullEvent.is_deleted = true;
      fullEvent.desc = description;
      this.$emit("doRemote", fullEvent);
    }
  },
  components: {}
};
</script>
