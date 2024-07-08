<template>
<br><br>
<div class="flex justify-center items-center p-5">
  <form @submit.prevent="submitlogin" class="bg-gray-100 rounded-lg shadow-md p-10">
    <div class="form-control flex flex-col mb-5">
      <label class="input-group">
        <span class="mx-2">email</span>
        <input type="email" id="email" name="email" v-model="data.email" placeholder="info@site.com" class="input input-bordered"/>
      </label>
    </div>
    <div class="form-control flex flex-col mb-5">
      <label class="input-group">
        <span class="mx-2">รหัสผ่าน</span>
        <input type="password" id="password" name="password" v-model="data.password" placeholder="" class="input input-bordered" autocomplete="current-password" />
      </label>
    </div>
    <div class="flex justify-center">
      <button class="btn btn-info">ลงชื่อเข้าใช้</button>
    </div>    
  </form> 
</div>

</template>

<script >
import {useRouter} from "vue-router";
import axios from 'axios'; 
import { ref } from "vue";
import { useStore } from 'vuex'; 


export default {
  name: "Login",
  setup() {
    const data = ref({
      email: '',
      password: ''
    });
    const router = useRouter();
    const store = useStore();
    //const username = ref('');
   

    const submitlogin = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/login', {
      email: data.value.email,
      password: data.value.password
    });

 let isLoggedIn = false;
 console.log(isLoggedIn);
    if (response.data.code === "200") {
      const token = response.data.result.access_token;
      isLoggedIn = true;
      const username = response.data.result.username;
      router.push('/')
      console.log(response.data);
      console.log(isLoggedIn);
      alert("เข้าสู่ระบบสำเร็จ");   
      store.commit('setUsername', username); // เรียกใช้ mutation เพื่อเปลี่ยนแปลง state
      const id = response.data.result.id; // รับค่า id จาก response
      store.commit('setId', id); // ส่งค่า id ไปยัง mutation setId เพื่อเซ็ตค่า id ใน store
      store.commit("setLogin_status", isLoggedIn); 
    } else if (response.data.code === "500"){
      console.log("ไม่พบemail");
      alert("ไม่พบemail");
    }
    else if (response.data.code === "400"){
      console.log("รหัสผ่านไม่ถูกต้อง");
      alert("รหัสผ่านไม่ถูกต้อง");
    }
  } catch (error) {
    console.log(error);
  }
}

//  const logout = () => {
//       store.commit('logout');
//  }

    return {
      data,
      submitlogin,
      
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
