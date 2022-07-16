<template>
    <div class="container">
        <div class="d-flex justify-content-between mb-4">
            <div class="justify-content-start">
                <a class="btn btn-outline-secondary" :href="`/categories`" >Назад</a>
            </div>
            <div class="justify-content-end">
                <a class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse" href="#edit" aria-expanded="false" aria-controls="edit">Редактировать</a>
                <a class="btn btn-outline-danger ms-3" :href="`/categories`" v-on:click="remove">Удалить</a>
            </div>
        </div>
        <div v-for="value of stock" :key="value.stock">
            <h3>{{value.title}}</h3>
        </div>
        <div class="collapse multi-collapse" id="edit">
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Новое название</span>
                </div>
                <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="title">
                <div class="input-group-prepend ms-3">
                    <button class="btn btn-outline-success" v-on:click="edit" data-bs-toggle="collapse" href="#edit" aria-controls="edit">Сохранить</button>
                </div>
            </div>
        </div>
        <div class="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1">
            <div class="col" v-for="item of items" :key="item">
                <CartItem :item="item"></CartItem>
            </div>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'
    import CartItem from "@/components/CartItem";

    export default {
        name: 'CategoryCart',
        components: {CartItem},
        data() {
            return {
                stock: [],
                items: [],
                errors: []
            }
        },
        methods: {
            edit: function () {
                axios.patch(`http://localhost:3000/api${window.location.pathname}`,{
                    title: this.title
                })
                    .then(response => {
                        this.stock = response.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            remove: function () {
                axios.delete(`http://localhost:3000/api${window.location.pathname}`)
                    .then(response => {
                        this.stock = response.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
        },
        created() {
            Promise.all([
                axios.get(`http://localhost:3000/api${window.location.pathname}`),
                axios.get(`http://localhost:3000/api/position/${window.location.pathname}`)
            ]).then(([category, positions]) => {
                this.stock = category.data
                this.items = positions.data
            }).catch(e => {
                this.errors.push(e)
            })
        }
    }
</script>