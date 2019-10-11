<template>
    <div>
        <div>
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
        </div>
        <div v-if="name">
            <h2>Здравствуйте, {{ name }}</h2>
            <!-- <b-button type="submit" variant="primary">Это не я!</b-button> -->
        </div>
    </div>
</template>

<style scoped>
h1,
h2,
h3 {
    text-align: left;
}
</style>

<script>
export default {
    data() {
        return {
            showCollapse: true,
            form: {
                uname: ""
            }
        };
    },
    props: ["name"],

    methods: {
        onSubmit(event) {
            event.preventDefault();
            // alert(JSON.stringify(this.form))
            this.showCollapse = false;
            localStorage.setItem("userName", this.form.uname);
            // const requestData = {
            //     uname: this.form.uname
            // };
            // console.log(requestData);
        }
    },

    created() {}
};
</script>
