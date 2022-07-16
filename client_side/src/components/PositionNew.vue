<template>
    <div class="container">
        <div class="d-flex justify-content-between mb-4">
            <a class="btn btn-outline-secondary" :href="`/position`">Назад</a>
            <a class="btn btn-outline-success" :href="`/position`" v-on:click="create">Создать</a>
        </div>
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Название</span>
            </div>
            <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                   v-model="title">
            <div class="input-group-prepend ms-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Цена</span>
            </div>
            <input type="number" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                   v-model="price">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Описание</span>
            <textarea type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="content"></textarea>
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



        <div class="input-group mb-3" >
            <label class="input-group-text" for="inputGroupFile01">Обложка</label>
            <input type="file" class="form-control" id="inputGroupFile01" name="imageSrc" enctype =" multipart/form-data " @change="sync">
        </div>
    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name: 'CategoryNew',
        data() {
            return {
                stock: [],
                errors: []
            }
        },
        methods: {
            create: async function () {
                let form = new FormData();
                form.append('title', this.title)
                form.append('content', this.content)
                form.append('price', this.price)
                form.append('imageSrc', this.imageSrc)
                form.append('categoryId', this.categoryId)

                await axios.post(`http://localhost:3000/api/position`, form)
                    .then(response => {
                        this.stock = response.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            sync (e) {
                e.preventDefault();
                this.imageSrc = e.target.files[0];
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