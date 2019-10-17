<template>
    <div>
        <!--
        Этот Collapse выводим, если нам родительский компонент не передал имя "name"
        -->
        <b-collapse id="collapse-333" class="mt-2 collapse" v-model="showCollapse">
            <b-card>
                <p>Представьтесь пожалуйста!</p>
                <b-form inline @submit="onSubmit">
                    <b-form-input
                        id="form-description-input"
                        required
                        type="text"
                        v-model="form.uname"
                        placeholder="Имя"
                    ></b-form-input>
                    <b-button type="submit" variant="primary">Сохранить</b-button>
                </b-form>
            </b-card>
        </b-collapse>
        <!-- 
        Если имя получено, просто выводим приветствие и кнопку для возможности сброса
        имени из LocalStorage
         -->
        <b-form id="itsNotMe" v-if="name" inline @submit="resetName">
            <h2>Здравствуйте, {{ name }}</h2>
            <b-button type="submit" variant="outline-primary">Ой, это не я!</b-button>
        </b-form>
    </div>
</template>

<style scoped>
h1,
h2,
h3 {
    text-align: left;
}

#itsNotMe {
    justify-content: space-between;
}
</style>

<script>
export default {
    data() {
        return {
            form: {
                uname: ""
            }
        };
    },
    props: ["name", "showCollapse"],

    methods: {
        onSubmit(event) {
            event.preventDefault();
            // alert(JSON.stringify(this.form))
            //this.showCollapse = false;
            localStorage.setItem("userName", this.form.uname);
            this.$emit("resetPage", "");
            // const requestData = {
            //     uname: this.form.uname
            // };
            // console.log(requestData);
        },
        resetName() {
            localStorage.removeItem("userName");
            this.$emit("resetPage", "");
        }
    },

    created() {}
};
</script>
