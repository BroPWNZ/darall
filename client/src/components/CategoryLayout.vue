<template>
    <div class="container">
        <div class="d-flex justify-content-end mb-4">
            <a class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse" href="#edit" aria-expanded="false" aria-controls="edit">Добавить</a>
        </div>
        <div class="collapse multi-collapse" id="edit">
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Название</span>
                </div>
                <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" v-model="title">
                <div class="input-group-prepend ms-3">
                    <button class="btn btn-outline-success" v-on:click="create" data-bs-toggle="collapse" href="#edit" aria-controls="edit">Создать</button>
                </div>
            </div>
            <div>

            </div>
        </div>

        <div class="card mb-3" v-for="value of stock" :key="value.stock">
            <a class="card-body btn btn-outline-secondary" :href="`/category/${value.id}`" >
                <h5 class="card-title">{{value.title}}</h5>
            </a>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name: 'CategoryLayout',
        data() {
            return {
                stock: [],
                errors: []
            }
        },
        methods: {
            create: function () {
                axios.post(`http://localhost:3000/api/category`,{
                    title: this.title
                })
                    .catch(e => {
                        this.errors.push(e)
                    })
                console.log(this.title)
                location.reload()
            }
        },
        created() {
            axios.get('http://localhost:3000/api/category')
                .then(response => {
                    this.stock = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
        }
    }
</script>