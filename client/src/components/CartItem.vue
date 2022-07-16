<template>
    <div class="top-cover center-block mt-2 mb-3">
        <div class="card col-sm-12"  >
            <img :src="`http://localhost:3000/${item.imageSrc}`" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{item.title}}</h5>
                <p class="card-text">{{item.price}} ₽</p>
                <a :href="`/position/${item.id}`" class="btn btn-secondary">Подробнее</a>
            </div>
        </div>
    </div>
</template>


<script>

    export default {
        props: {
            item: {
                title: String,
                price: Number,
                imageSrc: String,
                id: Number
            }
        },
        name: 'CartItem'
    }
</script>