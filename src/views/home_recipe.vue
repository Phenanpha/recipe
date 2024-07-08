<template>
  <div class="bg-gray-100 min-h-screen ">
    
    <!-- <li v-if="isLoggedIn">
      <p class="mb-3 text-2xl font-bold max-w-3xl">{{loginUsername }}</p>
    </li> -->
     <br>
      
  <div class="flex flex-col items-center justify-center">
    <h1 class="mb-4 popular-title">เมนูเเนะนำ</h1>
      <div class="overflow-x-auto">
          <div class="flex gap-4 p-4">
              <div v-for="(data, index) in maxData" :key="data._id" class="cards bg-base-100 shadow-2xl flex-shrink-0">
                 <router-link :to="'/detail/' + data._id">
                  <div class="relative">
                      <img :src="data.image" alt="Recipe Image" class="card-image ">
                  </div>
                 
                  <div>
                      <span class="center-button link link-primary">{{ data.name_menu }}</span>
                  </div>
                </router-link>
                  <div>
                      <span>{{ data.likes_count}} คนถูกใจสิ่งนี้</span>
                  </div>
                  <!-- <router-link :to="'/detail/' + data._id">
                          <button class="btn btn-s btn-warning">ดูสูตรเพิ่มเติม</button>
                      </router-link> -->
              </div>
          </div>
      </div>
  </div>
  <br>
    <div class="flex justify-center items-center">
      <div class="form-control " style="width: 500px;"> <!-- กำหนดความกว้างเป็น 300px -->
        <input v-model="searchTerm" type="text" placeholder="ค้นหาได้ด้วย ชื่ออาหาร หรือวัตถุดิบ" class="input input-bordered w-full" @input="fetchRecipes" />
        <!-- <input type="text" v-model="searchTerm" @input="fetchRecipes" placeholder="ค้นหา..." /> -->
      </div>
        <button class="btn btn-info center ml-2" @click="fetchRecipes" >ค้นหา</button>
      </div>  
        <div class="not-found-message text-center">
          <div v-if="notFoundMessage" >{{ notFoundMessage }}</div>
        </div >  
    
    <br>
    <div class="flex items-center justify-center">
    <div class="flex flex-row flex-wrap justify-center">
        <div class="card-container flex justify-center items-center">
            <div v-for="searchResult in searchResults" :key="searchResult.name_menu" class="card w-96 bg-base-100 shadow-2xl mx-l mb-4">
                <!-- Your card content here -->
                <figure><img :src="searchResult.image" :alt="searchResult.name_menu" class="card-images" /></figure>
                <div class="card-body flex flex-col items-center">
                    <h2 class="card-title text-center">{{ searchResult.name_menu }}</h2>
                    <router-link :to="'/detail/' + searchResult.id">
                        <button class="btn btn-s btn-warning mt-4">ดูสูตรเพิ่มเติม</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</div>

  </div>
  </template>
    
    <script setup>
  import { ref, onMounted,watch} from 'vue';
  import axios from 'axios';
  import { useStore } from 'vuex';



  const store = useStore();
  
  const loginUsername =  store.state.loginUsername; // เรียกใช้ state ที่ถูกจัดเก็บ
  
  const searchTerm = ref('');
  const searchResults = ref([]);
  const searchPerformed = ref(false);
  const notFoundMessage = ref('');

  const fetchRecipes = async () => {
      if (!searchTerm.value) {
        searchResults.value = [];
        notFoundMessage.value = '';
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/search/${searchTerm.value}`, {
          withCredentials: true,
        });
        searchResults.value = response.data;

        // ตรวจสอบว่ามีข้อมูลหรือไม่
        if (searchResults.value.length === 0) {
          notFoundMessage.value = 'ไม่พบข้อมูล';
        } else {
          notFoundMessage.value = ''; // รีเซ็ตข้อความเมื่อพบข้อมูล
        }
      } catch (error) {
        searchResults.value = [];
        notFoundMessage.value = 'ไม่พบข้อมูลสูตร'; // แสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาด
        console.log(error);
      }
    };

    // Watcher สำหรับการเปลี่ยนแปลงของ searchTerm
    watch(searchTerm, (newTerm) => {
      fetchRecipes();
    });


 
  const maxData = ref([])
  
  const fetch_maxData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/maxData`, { withCredentials: true })
      maxData.value = response.data.maxData // ใช้ response.data.maxData เพื่อรับข้อมูลจาก API อย่างถูกต้อง
      //console.log(response.data.maxData)
    } catch (error) {
      console.log(error)
      

    }
  }
  
  

  
  onMounted(() => {
    // fetchRecipes();
    fetch_maxData();
  });
  
  
  </script>
  
    
  <style scoped lang="scss">
  .card-container {
      display: flex;
      justify-content: space-between; /* วางส่วนประกอบให้อยู่ระหว่างซ้ายและขวาของพื้นที่ */
      flex-wrap: wrap; /* ให้ส่วนประกอบลักษณะแถวหลายรายการ */  
  }
  
  .cards {
      width: calc(450px); /* กำหนดความกว้างของการ์ดให้เป็นครึ่งของพื้นที่ทั้งหมดแล้วลบขอบค่าขอบหน้าและขอบหลัง */
      margin-bottom: 20px; /* ให้มีระยะห่างด้านล่าง */
  }
  
  .card {
      width: calc(350px); /* กำหนดความกว้างของการ์ดให้เป็นครึ่งของพื้นที่ทั้งหมดแล้วลบขอบค่าขอบหน้าและขอบหลัง */
      margin-bottom: 20px; /* ให้มีระยะห่างด้านล่าง */
  }
  
  .card-images {
      width: 450px; /* กำหนดให้รูปภาพเต็มความกว้างของพื้นที่ที่กำหนด */
      height: 220px/* ให้รูปภาพปรับความสูงโดยอัตโนมัติเพื่อรักษาสัดส่วน */
  }
  
  .card-image {
      width: 500px; /* ปรับความกว้างตามที่ต้องการ */
      height: 250px; /*/* ให้รูปภาพปรับความสูงโดยอัตโนมัติเพื่อรักษาสัดส่วน */
  }
  
  .overflow-x-auto {
          max-width:95%;
          text-align: left;
      }
  .popular-title {
          font-size: 1.5rem; /* ปรับขนาดตัวหนังสือ */
          font-weight: bold; /* ทำให้ตัวหนังสือเป็นตัวหนา */
          color: #72590b; /* กำหนดสีของตัวหนังสือ */
          text-align: center; /* จัดวางตัวหนังสือให้กึ่งกลาง */
      }
  
.center-button {
    display: flex;
    justify-content: center;
    font-weight: bold;
  }
  
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
  .card-title{
    font-size: 1.4rem;
  }

  .not-found-message {
  margin-top: 20px; /* ระยะห่างด้านบนเพื่อเว้นบรรทัด */
}
  </style>
  