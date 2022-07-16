<template>
    <div class="container" v-for="value of stock" :key="value.stock">
        <div class="d-flex justify-content-between mt-4">
            <a :href="`/position`" class="btn btn-outline-secondary">Назад</a>
            <div>
                <a :href="`/position/edit/${value.id}`" class="btn btn-outline-secondary">Редактировать</a>
                <a :href="`/position/`" class="btn btn-outline-danger ms-3" v-on:click="remove">Удалить</a>
            </div>
        </div>
        <div class="row mt-4" >
            <div class="col">
                <div class="card" style="width: 30rem;">
                    <img :src="`http://localhost:3000/${value.imageSrc}`" class="card-img-top" alt="...">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <span class="mt-4" >{{value.price}}</span>
                                <span class="mt-4" > ₽</span>
                            </li>
                        </ul>
                </div>

            </div>
            <div class="col-6">
                <div>
                    <h2 class="text-start fw-bold">{{value.title}}</h2>
                </div>
                <div class="text-start">
                    <span class="text-wrap">{{value.content}}</span>
                </div>

            </div>

        </div>


    </div>
</template>


<script>
    import axios from "axios";

    export default {
        name: 'PositionCart',
        data() {
            return {
                stock: [],
                errors: []
            }
        },
        methods: {
            remove: function () {
                axios.delete(`http://localhost:3000/api/position/${this.stock[0].id}`,{
                    title: this.title
                })
            }
        },
        created() {
            axios.get(`http://localhost:3000/api${window.location.pathname}`)
                .then(response => {
                    this.stock = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
        }
    }
</script>