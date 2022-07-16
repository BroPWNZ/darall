<template>
    <div class="container">
        <div class="d-flex justify-content-between mb-4" v-for="position of item" :key="position">
            <a class="btn btn-outline-secondary" :href="`/position/${position.id}`">Назад</a>
            <a class="btn btn-outline-success" :href="`/position/${position.id}`" v-on:click="save">Сохранить</a>
        </div>
        <div class="input-group input-group-sm mb-3" v-for="position of item" :key="position">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm" >Название</span>
            </div>
            <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                   v-model="position.title" :text="position.title">
            <div class="input-group-prepend ms-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Цена</span>
            </div>
            <input type="number" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                   v-model="position.price">
        </div>
        <div class="input-group mb-3" v-for="position of item" :key="position">
            <span class="input-group-text" id="inputGroup-sizing-default">Описание</span>
            <textarea type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="position.content"></textarea>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Категория</span>
            <select v-model="categoryId" class="form-select">
                <option v-for="value of stock"
                        :key="value.id"
                        :value="value.id"
                        v-text="value.title">
                </option>
            </select>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name: 'PositionEdit',
        data() {
            return {
                stock: [],
                item: [],
                errors: []
            }
        },
        methods: {
            save: async function () {
                let result = {
                    title: this.item[0].title,
                    content: this.item[0].content,
                    price: this.item[0].price,
                    imageSrc: this.item[0].imageSrc,
                    categoryId: this.categoryId
                }

                await axios.patch(`http://localhost:3000/api/position/${window.location.href.split('/').pop()}`, result)
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
                axios.get('http://localhost:3000/api/category'),
                axios.get(`http://localhost:3000/api/position/${window.location.href.split('/').pop()}`)
            ]).then(([categories, position]) => {
                this.stock = categories.data
                this.item = position.data
            }).catch(e => {
                this.errors.push(e)
            })
        }
    }
</script>