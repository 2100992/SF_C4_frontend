<template>
    <div>
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
                        v-model="changeTodoForm.description"
                        required
                        placeholder="Изменить задачу"
                    ></b-form-input>
                </b-form-group>
                <b-form-group id="form-complete-group"></b-form-group>
                <b-button type="submit" variant="primary">Изменить</b-button>
                <b-button type="reset" variant="danger">Сброс</b-button>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            changeTodoForm: {
                description: ""
            }
            // todoListURL: "",
            // userName: "",
        };
    },

    props: ["todoListURL", "userName"],

    methods: {
        onSubmit(event) {
            event.preventDefault();
            this.$refs.changeTodoModal.hide();
            const requestData = {
                description: this.changeTodoForm.description
            };
            axios
                .post(this.todoListURL + this.userName, requestData)
                .then(() => {
                    this.$emit("addedTask", this.addTodoForm.description);
                    this.resetForm();
                });
        },
        onReset(event) {
            event.preventDefault();
            this.$refs.addTodoModal.hide();
            this.resetForm();
        },
        resetForm() {
            this.addTodoForm.description = "";
            // this.addTodoForm.is_completed = [];
        }
    }
};
</script>
