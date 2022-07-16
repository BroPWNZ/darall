<template>
    <div class="container">
        <div class="d-flex justify-content-end mb-4">
            <a class="btn btn-outline-secondary" :href="`/position/new`">Создать</a>
        </div>
        <div class="card mb-3" v-for="value of stock" :key="value.stock">
            <a class="card-body btn btn-outline-secondary" :href="`/position/${value.id}`" >
                <h5 class="card-title">{{value.title}}</h5>
            </a>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name: 'PositionLayout',
        data() {
            return {
                stock: [],
                errors: []
            }
        },
        created() {
            axios.get('http://localhost:3000/api/position/')
                .then(response => {
                    this.stock = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
        }
    }
</script>