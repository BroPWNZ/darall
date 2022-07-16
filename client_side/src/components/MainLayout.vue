<template>
    <div class="container" >
        <h1 class="text-start fw-bold">Меню</h1>

        <select class="form-select" aria-label="Default select example" v-model="filtered">
            <option selected value="">Все</option>
            <option  v-for="cats of stock" :key="cats" :value="cats.id">{{cats.title}}</option>
        </select>

        <div class="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1" >
            <CartItem v-for="item of filteredList" :key="item.categoryId" :item="item"></CartItem>
        </div>
    </div>
</template>


<script>
    import axios from "axios";
    import CartItem from "@/components/CartItem";

    export default {
        name: 'MainLayout',
        components: {CartItem},
        data() {
            return {
                filtered: '',
                stock: [],
                items: [],
                errors: []
            }
        },
        computed: {
            filteredList(){
                let fltr = this.filtered;
                return this.items.filter(function (elem) {
                    if(fltr==='') return true;
                    else return elem.categoryId.toString().indexOf(fltr) > -1;
                })
            }
        },
        created() {
            Promise.all([
                axios.get('http://localhost:3000/api/category'),
                axios.get(`http://localhost:3000/api/position/`)
            ]).then(([categories, positions]) => {
                this.stock = categories.data
                this.items = positions.data
            }).catch(e => {
                this.errors.push(e)
            })
        }
    }

</script>