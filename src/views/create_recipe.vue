<template>
  <div class=" bg-gray-100" >
<br>
    <div class="text-center"><br>
      <h1 class="mb-2 text-xl font-bold">เพิ่มสูตรอาหาร</h1>
    </div>
  
    <div class="mx-auto max-w-3xl">
  <div class="text-center mb-2">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text my-texts ">ประเภทอาหาร  <span class="text-red-500"> &nbsp *</span> </span> 
      </div>
      <select v-model="create.types" class="select select-bordered w-full max-w-xs">
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
      <span class="label-text my-texts">ชื่อเมนู <span class="text-red-500"> &nbsp *</span></span>
    </div>
  <input type="name_menu" placeholder="ชื่อเมนู" class="input input-bordered w-full max-w-xl" v-model="create.name_menu"/>
  </label>
</div>

<div class="mx-auto max-w-3xl"> 
  <label class="form-control w-full max-w-xl">
    <div class="label">
      <span class="label-text my-texts">คำอธิบาย </span>
    </div>
  <input type="text" placeholder="คำอธิบายสูตร" class="input input-bordered w-full max-w-xl" v-model="create.detail"/>
  </label>
</div>

<div class="mx-auto max-w-3xl">
  <div class="text-center mb-2">
    <div class="form-control w-full max-w-xs h-full max-h-2xl flex flex-col ">
      <label class="label mb-2">
        <span class="label-text my-texts">วัตถุดิบ <span class="text-red-500"> &nbsp *</span></span>
      </label>

    <ul style="list-style-type: none; padding-left: 0;">
        <li v-for="ingredient in create.ingredients" :key="ingredient.name" style="text-align: left;">
         - {{ ingredient.name }} {{ ingredient.amount }} {{ ingredient.unit }}
        </li>
    </ul>

      <div class="flex ">
        <input type="ingredients" placeholder="ชื่อวัตถุดิบ" class="input input-bordered w-full max-w-3xl mr-2" v-model="create.name" style="width: 300px;"/>
        <input type="ingredients" placeholder="จำนวน" class="input input-bordered w-full max-w-2xl mr-2" v-model="create.amount" style="width: 100px;" min="0" max="999">
        <!-- <input type="ingredients" placeholder="หน่วย" class="input input-bordered w-full max-w-2xl mr-2" v-model="create.unit" style="width: 100px;"/> -->
        <select v-model="create.unit" class="select select-bordered w-full max-w-xs" style="width: 150px;">
        <option value="">กรุณาเลือก</option>
        <option value="กรัม">กรัม</option>
        <option value="กิโลกรัม">กิโลกรัม</option>
        <option value="หัว">หัว</option>
        <option value="หลอด">หลอด</option>
        <option value="ก้อน">ก้อน</option>
        <option value="เม็ด">เม็ด</option>
        <option value="ฟอง">ฟอง</option>
        <option value="ลิตร">ตัว</option>
        <option value="ลูก">ลูก</option>
        <option value="ใบ">ใบ</option>
        <option value="ต้น">ต้น</option>
        <option value="ลิตร">ลิตร</option>
        <option value="ห่อ">ห่อ</option>
        <option value="อื่นๆ">อื่นๆ</option>
      </select>
      </div>
      <br>
      <button class="btn btn-success btn-sm" style="width: 100px " @click="addIngredient">เพิ่มรายการ</button> 
    </div>
  </div>
</div>




<div class="mx-auto max-w-3xl">
  <div class="text-center mb-2">
    <div class="form-control w-full max-w-xs h-full max-h-2xl flex flex-col ">
      <label class="label mb-2">
        <span class="label-text my-texts">เครื่องปรุง <span class="text-red-500"> &nbsp *</span></span>
      </label>

    <ul style="list-style-type: none; padding-left: 0;">
        <li v-for="seasoning in create.seasoning" :key="seasoning.name" style="text-align: left;">
         - {{ seasoning.names }} {{ seasoning.amounts }} {{ seasoning.units }}
        </li>
    </ul>
    <div class="flex ">
    <input type="text" placeholder="ชื่อเครื่องปรุง" class="input input-bordered w-full max-w-3xl mr-2" v-model="create.names" style="width: 300px;"/>
    <input type="text" placeholder="จำนวน" class="input input-bordered w-full max-w-2xl mr-2" v-model="create.amounts" style="width: 100px;" min="0" max="999">
    <select v-model="create.units" class="select select-bordered w-full max-w-xs" style="width: 150px;">
        <option value="">กรุณาเลือก</option>
        <option value="ช้อนโต๊ะ">ช้อนโต๊ะ</option>
        <option value="ช้อนชา">ช้อนชา</option>
        <option value="ก้อน">ก้อน</option>
    </select>

</div>
<br>
<button class="btn btn-success btn-sm" style="width: 100px" @click="addSeasoning">เพิ่มรายการ</button> 

    </div>
  </div>
</div>

    <!-- <div class="mx-auto max-w-3xl">
      <div class="text-center mb-2">
        <label class="form-control w-full max-w-xs h-full max-h-2xl">
          <div class="label">
            <span class="label-text my-texts">เครื่องปรุง</span>
          </div>
          <textarea
            class="textarea textarea-bordered"
            placeholder="1.น้ำปลา 1 ช้อนโต๊ะ"
            v-model="create.seasoning"
          ></textarea>
        </label>
      </div>
    </div> -->
    
    <div class="mx-auto max-w-3xl">
      <div class="text-center mb-2">
        <label class="form-control w-full max-w-3xl h-full max-h-xl">
          <div class="label">
            <span class="label-text my-texts">ขั้นตอนการทำ <span class="text-red-500"> &nbsp *</span></span>
          </div>
          <textarea
            class="textarea textarea-bordered"
            placeholder="1. แกะกุ้ง"
            v-model="create.procedure"
          ></textarea>
        </label>
      </div>
    </div>

    <div class="mx-auto max-w-3xl">
  <div class="text-center mb-2">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text my-texts">อาหารเหมาะกับกี่คน <span class="text-red-500"> &nbsp *</span></span>
      </div>
      <input
        type="number"
        placeholder="ระบุจำนวนคน"
        class="input input-bordered w-full max-w-xl"
        v-model="create.number_people"
        min="1" max="100" step="1"
      />
    </label>
  </div>
</div>


<div class="mx-auto max-w-3xl">
  <div class="text-center mb-2">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text my-texts">สำหรับมื้อไหน <span class="text-red-500"> &nbsp *</span></span>
      </div>
      <select v-model="create.meal" class="select select-bordered w-full max-w-xs">
        <option value="">กรุณาเลือก</option>
        <option value="มื้อเช้า">เช้า</option>
        <option value="มื้อกลางวัน">กลางวัน</option>
        <option value="มื้อเย็น">เย็น</option>
        <option value="ทุกมื้อ">ทุกมื้อ</option>
      </select>
    </label>
  </div>
</div>


    <div className = "imageContainer" class="mx-auto max-w-3xl">
    <div class="text-center mb-2">
      <label class="form-control w-full max-w-xs mb-2">
        <div class="label">
          <span class="label-text my-texts">รูปภาพ <span class="text-red-500" > &nbsp *</span></span>
        </div>
        <input type="file" class="file-input file-input-bordered file-input-warning w-full max-w-xs" @change="handleUploadImage"/>
        <br>
        <div class="label ">
          <span class="label-text my-texts ">วิดีโอ</span>
        </div>
        <input type="file" class="file-input file-input-bordered file-input-warning w-full max-w-xs" @change="handleFileUpload"/>
      </label>
    </div>
  </div>

  <br>
    <div class="text-center ">
      <button class="btn btn-success" @click="insert_recipe">เพิ่มสูตรอาหาร</button>
    </div>
    <br>
  </div>

  
</template>

<!-- <script setup>
import { ref , watch} from "vue";
import axios from "axios";
import router from "../router";
import { useStore } from 'vuex';
const store = useStore();

const userName =  store.state.loginUsername
const userId =  store.state.loginId;

const create = ref({
  name_menu: "",
  detail:"",
  ingredients: [], // เริ่มต้นเป็นอาร์เรย์เปล่า
  seasoning:[],
  procedure: [],
  number_people: "",
  types:"",
  meal: "",
  image:null,
  video: '',
  userId :'',
  userName:'',
  name: '', // เพิ่มตัวแปร name
  amount: '', // เพิ่มตัวแปร amount
  unit: '', // เพิ่มตัวแปร unit
  names: '', // เพิ่มตัวแปร name
  amounts: '', // เพิ่มตัวแปร amount
  units: '', // เพิ่มตัวแปร unit
});


const textInput = ref('');

const addToArray = () => {
      if (textInput.value.trim() !== '') {
        create.value.ingredients.push(textInput.value.trim());
        textInput.value = ''; // Clear text input after adding to the array
      }
};

// const imagebase64 =  async(file) => {
//   const reader = new FileReader();
//   await reader.readAsDataURL(file)
//   const data = new Promise((resolve,reject)=>{
//     reader.onload=()=> resolve(reader.result)
//     reader.onerror = (err) => reject(err)
//   })
//   return data
//   }

//   const handleUploadImage = (e) => {
//   const file = e.target.files[0];
//   imagebase64(file)
//     .then((image) => {
//       //console.log(image);
//       create.value.image = image;
//     })
//     .catch((error) => {
//       console.error("Error handling image upload:", error);
//       // จัดการข้อผิดพลาดตามที่คุณต้องการ
//     });
// };

const imagebase64 = async (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  const data = new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
  return data;
};

const handleUploadImage = (e) => {
  const file = e.target.files[0];
  // Check if the file type is an image
  if (!file.type.startsWith('image/')) {
    console.error("Error: Only image files are allowed.");
    alert("อนุญาตเฉพาะไฟล์รูปภาพเท่านั้น");
    // อนุญาตเฉพาะไฟล์รูปภาพเท่านั้น (jpg, jpeg, png, gif, bmp, webp, svg, tiff, ico)
    return;
  }
  
  imagebase64(file)
    .then((image) => {
      // console.log(image);
      create.value.image = image;
    })
    .catch((error) => {
      console.error("Error handling image upload:", error);
      // Handle error as needed
    });
};

const videobase64 = async (file) => {
  const reader = new FileReader();

  // สร้าง Promise เพื่อรอการอ่านไฟล์
  const fileLoaded = new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (err) => {
      reject(err);
    };
  });

  // อ่านไฟล์และรอให้การอ่านเสร็จสิ้น
  reader.readAsDataURL(file);
  const videoString = await fileLoaded;

  return videoString;
};

const handleFileUpload = async(event) => {
  const file = event.target.files[0];

  try {
    const videoString = await videobase64(file); // รอให้การแปลงเป็น base64 เสร็จสิ้น
    create.value.video = videoString;
    console.log(create.value.video); // ตรวจสอบค่าของ create.value.video หลังจากกำหนด
  } catch (error) {
    console.error("Error handling video upload:", error);
    // จัดการข้อผิดพลาดตามที่คุณต้องการ
  }
};


const addIngredient = async () => {
  // เพิ่มอ็อบเจกต์วัตถุดิบใหม่ลงในรายการ create.value.ingredients
  if (create.value.name.trim() === '' || create.value.amount.trim() === '' || create.value.unit.trim() === '') {
    console.error('กรุณากรอกข้อมูลให้ครบทุกช่อง');
    return;
  }
   const newIngredient = {
        name: create.value.name.trim(),
        amount: create.value.amount.trim(),
        unit: create.value.unit.trim()
      };
   
    create.value.ingredients.push(newIngredient)
    // ล้างค่าในช่องกรอก
    create.value.name = '';
    create.value.amount = '';
    create.value.unit = '';
    console.log(create.value.ingredients)
  };

  const addSeasoning = async () => {
    // เพิ่มอ็อบเจกต์วัตถุดิบใหม่ลงในรายการ create.value.ingredients
    if (create.value.names.trim() === '' || create.value.amounts.trim() === '' || create.value.units.trim() === '') {
        console.error('กรุณากรอกข้อมูลให้ครบทุกช่อง');
        return;
    }
    const newSeasoning = {
        names: create.value.names.trim(),
        amounts: create.value.amounts.trim(),
        units: create.value.units.trim()
    };

    create.value.seasoning.push(newSeasoning); // แก้เป็น newSeasoning แทน newSeasoningt
    // ล้างค่าในช่องกรอก
    create.value.names = '';
    create.value.amounts = '';
    create.value.units = '';
    console.log(create.value.seasoning);
};


  
const insert_recipe = async (e) => {
  e.preventDefault();

  // แยกข้อมูลที่รับมาจากช่อง input ด้วยตัวคั่นที่ไม่จำเป็น เช่น ช่องว่าง
  //const inputseasoning = create.value.seasoning.split('\n');
  const inputprocedure = create.value.procedure.split('\n');

  // // สร้าง array ใหม่เพื่อเก็บข้อมูลที่แยกแล้ว
  // const seasoningList = [];
  // inputseasoning.forEach(seasoning => {
  //   if (seasoning.trim() !== '') {
  //     seasoningList.push(seasoning.trim());
  //   }
  // });

  const procedureList = [];
  inputprocedure.forEach(procedure => {
    if (procedure.trim() !== '') {
      procedureList.push(procedure.trim());
    }
  });

  // ตรวจสอบว่ามีการเลือกวิดีโอหรือไม่
  if (create.value.video) {
    // ถ้ามีการเลือกวิดีโอ
    // ส่งข้อมูลไปยัง API พร้อมกับข้อมูลวิดีโอ
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/recipe`, {
        types: create.value.types,
        name_menu: create.value.name_menu,
        detail:create.value.detail,
        ingredients: create.value.ingredients,
        seasoning: create.value.seasoning,
        procedure: procedureList,
        number_people: create.value.number_people,
        meal: create.value.meal,
        image: create.value.image,
        video: create.value.video,
        userId: userId,
        userName: userName,
      });
      console.log( create.value.ingredients);
      console.log(response);
      router.push('/recipes');
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งข้อมูลไปยัง API:', error);
    }
  } else {
    // ถ้าไม่มีการเลือกวิดีโอ
    // ส่งข้อมูลไปยัง API โดยไม่รวมข้อมูลวิดีโอ
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/recipe`, {
        types: create.value.types,
        name_menu: create.value.name_menu,
        detail:create.value.detail,
        ingredients: create.value.ingredients,
        seasoning: create.value.seasoning,
        procedure: procedureList,
        number_people: create.value.number_people,
        meal: create.value.meal,
        image: create.value.image,
        video: 'null',
        userId: userId,
        userName: userName,
      });
      console.log( create.value.ingredients);
      console.log(response);
      router.push('/recipes');
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งข้อมูลไปยัง API:', error);
    }
  }
};


  </script> -->
  

  <script setup>
  import { ref } from "vue";
  import axios from "axios";
  import router from "../router";
  import { useStore } from 'vuex';
  const store = useStore();
  
  const userName = store.state.loginUsername;
  const userId = store.state.loginId;
  
  const create = ref({
    name_menu: "",
    detail:"",
    ingredients: [],
    seasoning:[],
    procedure: "",
    number_people: "",
    types:"",
    meal: "",
    image: null,
    video: '',
    userId: userId,
    userName: userName,
    name: '',
    amount: '',
    unit: '',
    names: '',
    amounts: '',
    units: '',
  });
  
  const imagebase64 = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
    return data;
  };
  
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      alert("อนุญาตเฉพาะไฟล์รูปภาพเท่านั้น");
      return;
    }
    
    imagebase64(file)
      .then((image) => {
        create.value.image = image;
      })
      .catch((error) => {
        console.error("Error handling image upload:", error);
      });
  };
  
  const videobase64 = async (file) => {
    const reader = new FileReader();
    const fileLoaded = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
    reader.readAsDataURL(file);
    const videoString = await fileLoaded;
    return videoString;
  };
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    try {
      const videoString = await videobase64(file);
      create.value.video = videoString;
    } catch (error) {
      console.error("Error handling video upload:", error);
    }
  };
  
  const addIngredient = () => {
    if (create.value.name.trim() === '' || create.value.amount.trim() === '' || create.value.unit.trim() === '') {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    const newIngredient = {
      name: create.value.name.trim(),
      amount: create.value.amount.trim(),
      unit: create.value.unit.trim()
    };
    create.value.ingredients.push(newIngredient);
    create.value.name = '';
    create.value.amount = '';
    create.value.unit = '';
  };
  
  const addSeasoning = () => {
    if (create.value.names.trim() === '' || create.value.amounts.trim() === '' || create.value.units.trim() === '') {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    const newSeasoning = {
      names: create.value.names.trim(),
      amounts: create.value.amounts.trim(),
      units: create.value.units.trim()
    };
    create.value.seasoning.push(newSeasoning);
    create.value.names = '';
    create.value.amounts = '';
    create.value.units = '';
  };
  
  const insert_recipe = async (e) => {
    e.preventDefault();
    
    // Check for required fields
    if (
      !create.value.types ||
      !create.value.name_menu ||
      create.value.ingredients.length === 0 ||
      create.value.seasoning.length === 0 ||
      !create.value.procedure ||
      !create.value.number_people ||
      !create.value.meal ||
      !create.value.image
    ) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
  
    const inputprocedure = create.value.procedure.split('\n');
    const procedureList = [];
    inputprocedure.forEach(procedure => {
      if (procedure.trim() !== '') {
        procedureList.push(procedure.trim());
      }
    });
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/recipe`, {
        types: create.value.types,
        name_menu: create.value.name_menu,
        detail: create.value.detai || 'null',
        ingredients: create.value.ingredients,
        seasoning: create.value.seasoning,
        procedure: procedureList,
        number_people: create.value.number_people,
        meal: create.value.meal,
        image: create.value.image,
        video: create.value.video || 'null',
        userId: userId,
        userName: userName,
      });
      console.log(response);
      router.push('/recipes');
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งข้อมูลไปยัง API:', error);
    }
  };
  </script>
   
  <style lang="scss" scoped>

.my-texts {
  display: flex;
  font-weight: bold;
  font-size: 1rem;
}
//   .select {
//   @apply appearance-none bg-white border border-gray-300 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500;
// }

// .select-bordered {
//   @apply border;
// }

  </style>