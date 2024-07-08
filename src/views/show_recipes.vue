<template>
  <br>
 <ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box padding-left mb-5 ">
  <router-link to="/recipes" ><li><a :class="{ 'actives': isActive('/recipes') }">สูตรทั้งหมด</a></li></router-link>
  <router-link to="/tom_recipe"><li><a>ต้ม / แกง</a></li></router-link>
  <router-link to="/pad_recipe"><li><a>ผัด</a></li></router-link>
  <router-link to="/tod_recipe"><li><a>ทอด</a></li></router-link>
  <router-link to="/yum_recipe"><li><a>ยำ / ตำ</a></li></router-link>
  <router-link to="/thoon_recipe"><li><a>ตุ๋น</a></li></router-link>
  <router-link to="/nueng_recipe"><li><a>นึ่ง</a></li></router-link>
</ul>

  <div class="flex items-center justify-center">
    <div class="flex flex-row space-auto flex-wrap">
      <div class="card-container flex justify-center items-center ">
      <div v-for="(recipe, index) in recipes" :key="index" class="card w-96  bg-base-100 shadow-2xl mx-l">
        <h2 class="center-button">{{ recipe.userName }}</h2>
        <br>
        <div>
          <img :src="recipe.image" alt="Recipe Image" class="card-images">
        </div>
        <div class="card-body">
          <h2 class="center-button">{{ recipe.name_menu }}</h2>
          <router-link :to="'/detail/' + recipe._id">
            <div class="center-button">
               <button class="btn btn-s btn-warning">ดูสูตรเพิ่มเติม</button>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref , onMounted } from 'vue'
import axios from 'axios'

const recipes = ref([])

const fetch_recipes = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/recipes`) 
    withCredentials: true,
    recipes.value = response.data
    console.log( recipes.value)
  } catch (error) {
    console.log(error)
  }
}


import { useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path) => {
  return route.path === path;
};

onMounted(() => fetch_recipes())


</script>

<style lang="scss" scoped>
.card-container {
    display: flex;
    justify-content: flex-start;/* วางส่วนประกอบให้อยู่ระหว่างซ้ายและขวาของพื้นที่ */
    flex-wrap: wrap; /* ให้ส่วนประกอบลักษณะแถวหลายรายการ */
}

.card {
    width: calc(346px); /* กำหนดความกว้างของการ์ดให้เป็นครึ่งของพื้นที่ทั้งหมดแล้วลบขอบค่าขอบหน้าและขอบหลัง */
    margin-bottom: 20px; /* ให้มีระยะห่างด้านล่าง */
    margin-left: 5px;
}

.card-images {
    width: 450px; /* กำหนดให้รูปภาพเต็มความกว้างของพื้นที่ที่กำหนด */
    height: 230px;/* ให้รูปภาพปรับความสูงโดยอัตโนมัติเพื่อรักษาสัดส่วน */
    justify-content: center;
}

.center-button {
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}
.menu-vertical li {
  padding-right: 20px; 
  }

  .actives {
      color: #0f0e0e; //ตัวหนังสือเป็นสีดำ
      background-color: rgb(165, 165, 165);
    }
</style>
