<template>
  <div class="navbar bg-yellow-300 flex items-center">
    <div>
      <h1 class="header">Recipes</h1>
    </div>
    <ul class="menu bg-base lg:menu-horizontal rounded-box flex items-center">
      <router-link to="/" exact>
        <li>
          <a :class="{ 'actives': isActive('/') }">
            <i class="fa fa-home h-4 w-5"></i>
            หน้าหลัก
          </a>
        </li>
      </router-link>
      <router-link to="/recipes" >
        <li >
          <a :class="{ 'actives': isActive('/recipes') }">
            <i class="fab fa-readme h-3 w-5"></i>
            สูตรทั้งหมด
          </a>
        </li>
      </router-link>
      <!-- ตรวจสอบสถานะการเข้าถึงสำหรับสร้างสูตรของฉัน -->
      <router-link to="/create" v-if="isLoggedIn" :class="{ 'active': isActive('/create') }">
        <li>
          <a :class="{ 'actives': isActive('/create') }">
            <i class="fas fa-plus-square h-4 w-5"></i>
            เพิ่มสูตรอาหาร
          </a>
        </li>
      </router-link>
      <!-- ตรวจสอบสถานะการเข้าถึงสำหรับสูตรของฉัน -->
      <router-link to="myrecipe" v-if="isLoggedIn" :class="{ 'active': isActive('/myrecipe') }">
        <li>
          <a :class="{ 'actives': isActive('/myrecipe') }">
            <i class="fas fa-house-user h-4 w-5"></i>
            สูตรของฉัน
          </a>
        </li>
      </router-link>
    </ul>
    <ul class="flex items-center ml-auto">
      <!-- ตรวจสอบสถานะการเข้าถึงสำหรับการลงทะเบียน -->
      <router-link v-if="!isLoggedIn" to="/createuser">
        <li>
          <button class="btn btn-success mx-3">สมัครสมาชิก</button>
        </li>
      </router-link>
      <!-- ตรวจสอบสถานะการเข้าถึงสำหรับเข้าสู่ระบบ -->
      <router-link v-if="!isLoggedIn" to="/login">
        <li>
          <button class="btn btn-info">เข้าสู่ระบบ</button>
        </li>
      </router-link>
      <!-- ตรวจสอบสถานะการเข้าถึงสำหรับออกจากระบบ -->
      <li v-if="isLoggedIn">
        
          <button class="btn btn-error" @click="logout">ออกจากระบบ</button>
        
      </li>
    </ul>
  </div>
  </template>
  
  <script setup>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { computed } from 'vue';
  import '@fortawesome/fontawesome-free/css/all.css';
  
  const store = useStore();
  const isLoggedIn = computed(() => store.state.isLoggedIn);
  
  const router = useRouter();
  
  const logout = () => {
    store.commit('logout'); 
    router.push('/login'); // Redirect to login page after logout

    // ทำการออกจากระบบ โดยอาจจะต้อง dispatch action ไปยัง store หรือทำการ clear session ตามที่คุณต้องการ
    // ทำการออกจากระบบ โดยการเรียกใช้ mutations เพื่อเปลี่ยนสถานะการเข้าสู่ระบบเป็น false
    // store.commit('logout');
    // router.push({ name: "login" });
  };

  const isActive = (route) => {
    return router.currentRoute.value.path === route;
  };
  </script>
  
  <style lang="scss" scoped>
.actives {
  color: #0f0e0e; //ตัวหนังสือเป็นสีดำ
  background-color: rgb(165, 165, 165);
}

.header {
  display: flex;
  font-weight: bold;
  font-size: 1.4rem;
}

.navbar {
  position: fixed; /* หรือใช้ sticky แล้วแต่การใช้งาน */
  top: 0;
  left: 0;
  z-index: 1000; /* เพื่อให้ Navbar อยู่ด้านบนสุด */
 
  text-align: center;
}
  </style>
  