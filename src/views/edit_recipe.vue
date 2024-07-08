<template>
  <br>
  <div class=" bg-gray-100" >
    <br>
    <div class="text-center"><br>
      <h1 class="mb-2 text-xl font-bold">แก้ไขสูตรอาหาร</h1>
    </div>

    <div class="mx-auto max-w-3xl">
  <div class="text-center mb-2">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text my-texts ">ประเภทอาหาร </span> 
      </div>
      <select v-model="recipe.types" class="select select-bordered w-full max-w-xs">
        <option value="">กรุณาเลือก</option>
        <option value="ต้ม/แกง">ต้ม/แกง</option>
        <option value="ยำ/ตำ">ยำ/ตำ</option>
        <option value="ผัด">ผัด</option>
        <option value="ทอด">ทอด</option>
        <option value="ตุ๋น">ตุ๋น</option>
        <option value="นึ่ง">นึ่ง</option>
        <option value="อื่นๆ">อื่นๆ</option>
      </select>
    </label>
  </div>
</div>

<div class="mx-auto max-w-3xl"> 
  <label class="form-control w-full max-w-xl">
    <div class="label">
      <span class="label-text my-texts">ชื่อเมนู </span>
    </div>
  <input type="name_menu" placeholder="ชื่อเมนู" class="input input-bordered w-full max-w-xl" v-model="recipe.name_menu"/>
  </label>
</div>

<div class="mx-auto max-w-3xl"> 
  <label class="form-control w-full max-w-xl">
    <div class="label">
      <span class="label-text my-texts">คำอธิบาย </span>
    </div>
  <input type="text" placeholder="คำอธิบายสูตร" class="input input-bordered w-full max-w-xl" v-model="recipe.detail"/>
  </label>
</div>
    


<br>
<div class="mx-auto max-w-3xl">
        <span class="label-text">วัตถุดิบ</span>
        <br>
        <ul style="list-style-type: none; padding-left: 0;">
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index" style="text-align: left;">
            <input type="text" v-model="ingredient.name" class="input input-bordered w-full max-w-xs mr-2" style="width: 200px;" placeholder="ชื่อวัตถุดิบ" />
            <input type="text" v-model="ingredient.amount" class="input input-bordered w-full max-w-xs mr-2" style="width: 100px;" placeholder="จำนวน" />
            <select v-model="ingredient.unit" class="select select-bordered w-full max-w-xs mr-2" style="width: 150px;">
              <option value="">กรุณาเลือก</option>
              <option value="กรัม">กรัม</option>
              <option value="กิโลกรัม">กิโลกรัม</option>
              <option value="หัว">หัว</option>
              <option value="หลอด">หลอด</option>
              <option value="ก้อน">ก้อน</option>
              <option value="เม็ด">เม็ด</option>
              <option value="ฟอง">ฟอง</option>
              <option value="ลิตร">ลิตร</option>
              <option value="ลูก">ลูก</option>
              <option value="ใบ">ใบ</option>
              <option value="ต้น">ต้น</option>
              <option value="ห่อ">ห่อ</option>
              <option value="อื่นๆ">อื่นๆ</option>
              <!-- เพิ่มตัวเลือกอื่นๆ ตามต้องการ -->
            </select>
            <button @click.prevent="removeIngredient(index)" class="btn btn-error btn-sm">ลบ</button>
          </li>
        </ul>
        <br>
        <button @click.prevent="addIngredient" class="btn btn-success btn-sm">เพิ่มรายการ</button>
      </div>
      <br>
<div class="mx-auto max-w-3xl">
        <span class="label-text">เครื่องปรุง</span>
        <br>
        <ul style="list-style-type: none; padding-left: 0;">
          <li v-for="(seasoning, index) in recipe.seasoning" :key="index" style="text-align: left;">
            <input type="text" v-model="seasoning.names" class="input input-bordered w-full max-w-xs mr-2" style="width: 200px;" placeholder="ชื่อเครื่องปรุง" />
            <input type="text" v-model="seasoning.amounts" class="input input-bordered w-full max-w-xs mr-2" style="width: 100px;" placeholder="จำนวน" />
            <select v-model="seasoning.units" class="select select-bordered w-full max-w-xs mr-2" style="width: 150px;">
              <option value="">กรุณาเลือก</option>
              <option value="ช้อนชา">ช้อนชา</option>
              <option value="ช้อนโต๊ะ">ช้อนโต๊ะ</option>
              <option value="ก้อน">ก้อน</option>
              <!-- เพิ่มตัวเลือกอื่นๆ ตามต้องการ -->
            </select>
            <button @click.prevent="removeSeasoning(index)" class="btn btn-error btn-sm">ลบ</button>
          </li>
        </ul>
        <br>
        <button @click.prevent="addSeasoning" class="btn btn-success btn-sm">เพิ่มรายการ</button>
      </div>


<div class="mx-auto max-w-3xl">
      <div class="text-center mb-2">
        <label class="form-control w-full max-w-3xl h-full max-h-2xl">
          <div class="label">
            <span class="label-text my-texts">ขั้นตอนการทำ </span>
          </div>
          <textarea
            class="textarea textarea-bordered custom-textarea "
            v-model="procedureText"
          ></textarea>
        </label>
      </div>
    </div>




    <div class="mx-auto max-w-3xl">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">อาหารเหมาะกับกี่คน</span>
        </div>
        <input type="number" placeholder="ระบุจำนวนคน" class="input input-bordered w-full max-w-xs" v-model="recipe.number_people"/>
      </label>
    </div>

    <div class="mx-auto max-w-3xl">
  <div class="text-center mb-2">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text my-texts">สำหรับมื้อไหน <span class="text-red-500"> &nbsp *</span></span>
      </div>
      <select v-model="recipe.meal" class="select select-bordered w-full max-w-xs">
        <option value="">กรุณาเลือก</option>
        <option value="มื้อเช้า">เช้า</option>
        <option value="มื้อกลางวัน">กลางวัน</option>
        <option value="มื้อเย็น">เย็น</option>
        <option value="ทุกมื้อ">ทุกมื้อ</option>
      </select>
    </label>
  </div>
</div>

    <div class="mx-auto max-w-3xl">
      <label class="form-control w-full max-w-xs mb-2">
        <div class="label">
          <span class="label-text">รูปภาพ</span>
        </div>
        <div>
        <img :src="recipe.image" alt="Recipe Image" v-if="recipe.image" class="max-w-xs my-2"/>
        <button @click="$refs.fileInput.click()" class="btn btn-success  btn-sm">แก้ไขรูปภาพ</button>
        <input ref="fileInput" type="file" @change="handleImageUpload" class="hidden" />

      </div>
      </label>
    </div>
    <br>
    <div class="text-center ">
      <button class="btn btn-warning" @click="edit_recipe()">แก้ไขสูตรอาหาร</button>
    </div>

<br>
  </div>
</template>

<script setup>
import { ref, onMounted , computed} from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const recipe = ref({
  name_menu: '',
  ingredients: [],
  seasoning: [],
  procedure: [],  // เปลี่ยนให้เป็น array
  number_people: 0,
  meal: '',
  image: '',
  video: null,
  userId: '',
  userName: '',
  types: ''
});

const fetch_single_recipe = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/recipe/${route.params._id}`);
    const data = response.data;
    
    recipe.value.name_menu = data.name_menu;
    recipe.value.ingredients = data.ingredients;
    recipe.value.detail = data.detail;
    recipe.value.seasoning = data.seasoning;
    recipe.value.procedure = data.procedure;
    recipe.value.number_people = data.number_people;
    recipe.value.meal = data.meal;
    recipe.value.image = data.image;
    recipe.value.video = data.video;
    recipe.value.userId = data.userId;
    recipe.value.userName = data.userName;
    recipe.value.types = data.types;
  } catch (err) {
    console.log(err);
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      recipe.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const procedureText = computed({
  get() {
    return recipe.value.procedure.join('\n');
  },
  set(value) {
    recipe.value.procedure = value.split('\n').map(step => step.trim());
  }
});
const addIngredient = () => {
  recipe.value.ingredients.push({ name: '', amount: '', unit: '' });
};

const addSeasoning = () => {
  recipe.value.seasoning.push({ name: '', amount: '', unit: ''  });
};

const removeIngredient = (index) => {
  recipe.value.ingredients.splice(index, 1);
};

const removeSeasoning = (index) => {
  recipe.value.seasoning.splice(index, 1);
};


onMounted(fetch_single_recipe);

const edit_recipe = async () => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API}/recipe/${route.params._id}`, {
      name_menu: recipe.value.name_menu,
      detail: recipe.value.detail,
      ingredients: recipe.value.ingredients,
      seasoning: recipe.value.seasoning,
      procedure: recipe.value.procedure,  // ให้แน่ใจว่าเป็น array
      number_people: recipe.value.number_people,
      meal: recipe.value.meal,
      image: recipe.value.image,
      video: recipe.value.video,
      userId: recipe.value.userId,
      userName: recipe.value.userName,
      types: recipe.value.types
    });

    console.log(response);
    router.push('/myrecipe');
  } catch (err) {
    console.log(err);
  }
};

</script>

<style lang="scss" scoped>

.custom-textarea {
  height: 150px; /* กำหนดความสูงตามที่ต้องการ */
}

</style>