<template>
<br><br>
<div class="flex justify-center items-center p-5">
  <form @submit.prevent="submit" class="bg-gray-100 rounded-lg shadow-md p-10">
  <h1 class="mb-2 text-xl font-bold flex flex-col items-center">เพิ่มข้อมูลผู้ใช้</h1>
    <div class="form-control">
      <label class="input-group">
        <span class="mx-2">ชื่อผู้ใช</span>
        <input type="text" id="username" name="username" v-model="data.username" placeholder="" class="input input-bordered" />
      </label>
    </div>

    <br>
    <div class="form-control">
      <label class="input-group">
        <span class="mx-2">email</span>
        <input type="email"  v-model="data.email" placeholder="info@site.com" class="input input-bordered"/>
      </label>
    </div>
    <br>
    <div class="form-control">
      <label class="input-group">
        <span class="mx-2">หมายเลขโทรศัพท์</span>
        <input type="t" id="phone_number" name="phone_number" v-model="data.phone_number" placeholder="xxx-xxxxxxx" class="input input-bordered" />
      </label>
    </div>
    <br>
    <div class="form-control">
      <label class="input-group">
        <span class="mx-2">รหัสผ่าน</span>
        <input type="password" id="password" name="password" v-model="data.password" placeholder="" class="input input-bordered" autocomplete="current-password" />
      </label>
    </div>
    <br>
    <div class="flex justify-center">
      <button class="btn btn-info">เพิ่มข้อมูลผู้ใช้</button>
    </div>  
  </form> 
</div>
</template>
  
<script >
import {reactive} from 'vue';
import {useRouter} from "vue-router";
import axios from 'axios'; 
import { ref } from "vue";
export default {
  name: "Register",
  setup() {
    const data = ref({
      username: '',
      email: '',
      phone_number: '',
      password: ''
    });

    const router = useRouter();

    const submit = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/register', {
          username: data.value.username,
          email: data.value.email,
          phone_number: data.value.phone_number,
          password: data.value.password
        });
        console.log(response.data);
        router.push('/login'); 
      } catch (error) {
        console.log(error);
      }
    }

    return {
      data,
      submit
    };
  }
}
</script>
