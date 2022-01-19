<template>
    <div>
        <div>
            comp : {{ car.name }}
        </div>
    </div>
</template>


<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import {Prop, Watch} from "vue-property-decorator";

@Component
export default class TestComp extends Vue {

    @Prop()
    car!: any

    @Watch('car',{
        deep : true
    })
    watchCar() {
        console.log(this.car)
        console.log(this.car.name);
    }

    async beforeCreate() {
    }

    mounted() {
    }
}
</script>

<style scoped>

</style>
