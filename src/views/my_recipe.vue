<template>
<div >
  <div class="text-center"><br>
    <h1 class="mb-2 text-2xl font-bold">สูตรของ {{loginUsername}}</h1>
  </div>
  <div v-if="userrecipes.length === 0">
    <p>ไม่เคยโพส</p>
  </div>
  <div v-else>

    <div class="flex items-center justify-center">
    <div class="flex flex-row space-auto flex-wrap">
      <div class="card-container flex justify-center items-center ">
      <div v-for="(recipe, index) in userrecipes" :key="index" class="card w-96  bg-base-100 shadow-2xl mx-l">
        <h2 class="center-button">{{ recipe.userName }}</h2>
        <br>
        <div>
          <img :src="recipe.image" alt="Recipe Image" class="card-images">
        </div>
        <div class="card-body">
          <h2 class="center-button">{{ recipe.name_menu }}</h2>
          <router-link :to="'/detail/' + recipe.id">
            <div class="center-button">
               <button class="btn btn-s btn-warning">ดูสูตรเพิ่มเติม</button>
            </div>
          </router-link>
          <div class="center-button">
          <router-link :to="'/edit/' + recipe.id">
            <button class="btn btn-s btn-success btn-sm">แก้ไข</button>
          </router-link>
          <span style="margin-left: 10px;"></span>
          <button class="btn btn-s btn-error btn-sm" @click="confirmDelete(recipe.id)">ลบ</button>

            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</template>
  
  <script setup>
  import axios from 'axios';
  import { useStore } from 'vuex';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const userrecipes = ref({});
  

  const store = useStore();
  const loginId = store.state.loginId;
  const loginUsername =  store.state.loginUsername;

  const fetchMyRecipe = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/userrecipe/${loginId}`, {
      withCredentials: true,
    });
    // เข้าถึงอ็อบเจกต์แรกในอาร์เรย์
    userrecipes.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
// const delete_recipe = async (recipeId) => {
//   try {
//     await axios.delete(`${import.meta.env.VITE_API}/recipe/${recipeId}`);
//     alert("ลบเรียบร้อยแล้ว");
//     fetchMyRecipe(); // เรียกฟังก์ชัน fetchMyRecipe เพื่อโหลดสูตรอาหารใหม่หลังจากลบแล้ว
//   } catch (error) {
//     console.log(error);
//   }
// }

const confirmDelete = async (recipeId) => {
  try {
    // ใช้ confirm เพื่อยืนยันการลบ
    const confirmDelete = confirm("คุณต้องการลบสูตรนี้หรือไม่?");
    if (confirmDelete) {
      await axios.delete(`${import.meta.env.VITE_API}/recipe/${recipeId}`);
      alert("ลบเรียบร้อยแล้ว");
      fetchMyRecipe(); // เรียกฟังก์ชัน fetchMyRecipe เพื่อโหลดสูตรอาหารใหม่หลังจากลบแล้ว
    }
  } catch (error) {
    console.log(error);
  }
}


  onMounted(() => {
    fetchMyRecipe();
  });
  </script>

<style lang="scss" scoped>
.recipe-container {
  margin: 0 auto; /* จัดให้อยู่ตรงกลาง */
  max-width: auto; /* กำหนดความกว้างสูงสุดของข้อมูลแต่ละสูตร */
  padding: 20px; /* เพิ่มการเว้นระยะห่างรอบขอบ */
  border: 1px solid #ccc; /* เพิ่มเส้นขอบ */
  border-radius: 8px; /* เพิ่มขอบมน */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* เพิ่มเงาใต้ */
  background-color: #f9f9f9; /* สีพื้นหลัง */
  margin-bottom: 20px;
}
.card-images {
    width: 550px; /* กำหนดให้รูปภาพเต็มความกว้างของพื้นที่ที่กำหนด */
    height: 255px; /* ให้รูปภาพปรับความสูงโดยอัตโนมัติเพื่อรักษาสัดส่วน */
    margin: 0 auto;
    border-radius: 8px;
}


.card {
    width: calc(346px); /* กำหนดความกว้างของการ์ดให้เป็นครึ่งของพื้นที่ทั้งหมดแล้วลบขอบค่าขอบหน้าและขอบหลัง */
    margin-bottom: 20px; /* ให้มีระยะห่างด้านล่าง */
    margin-left: 5px;
}

.card-container {
    display: flex;
    justify-content: flex-start;/* วางส่วนประกอบให้อยู่ระหว่างซ้ายและขวาของพื้นที่ */
    flex-wrap: wrap; /* ให้ส่วนประกอบลักษณะแถวหลายรายการ */
}
.card-images {
    width: 650px; /* กำหนดให้รูปภาพเต็มความกว้างของพื้นที่ที่กำหนด */
    height: 220px;/* ให้รูปภาพปรับความสูงโดยอัตโนมัติเพื่อรักษาสัดส่วน */
    justify-content: center;
}

.center-button {
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}
.actives {
  color: #0f0e0e; //ตัวหนังสือเป็นสีดำ
  background-color: rgb(165, 165, 165);
}
</style>

  
  