<template>
  <div class="flex justify-center items-center min-h-screen p-5">
    
    <div class="main-container flex justify-center items-start">

      <!-- ส่วนรายละเอียดสูตรอาหาร -->
      <div v-if="recipeDetail !== null" class="content-container">
        <!-- <h1 class="mb-2 text-xl font-bold">ผู้โพส {{ recipeDetail.userName }}</h1> -->
        <h1 class="mb-2 text-xl font-bold">{{ recipeDetail.name_menu }} โดย{{ recipeDetail.userName }}</h1>
        <h1 v-if="recipeDetail.detail !== 'null'" class="mb-2 text-l">{{ recipeDetail.detail }}</h1>
        <div class="container">
          <table class="table mx-auto">
            <tbody>
              <h1 class="my-texts">สำหรับ: {{ recipeDetail.number_people }} คน</h1>
              <h1 class="my-texts">วัตถุดิบ</h1>
              <tr v-for="(ingredient, index) in recipeDetail.ingredients" :key="index">
                <td>- {{ ingredient.name }}: {{ ingredient.amount }} {{ ingredient.unit }}</td>
              </tr>
              
        
              <h1 class="my-texts">เครื่องปรุง</h1>
              <tr v-for="(seasoning, index) in recipeDetail.seasoning" :key="index">
                <td>- {{ seasoning.names }}: {{ seasoning.amounts }} {{ seasoning.units }}</td>
              </tr>
              <h1 class="my-texts">วิธีทำ</h1>
              <tr v-for="(procedure, index) in recipeDetail.procedure" :key="index">
                <td>{{ procedure }}</td>
              </tr>
              <h1 class="my-texts">สำหรับ: {{ recipeDetail.meal }}</h1>
              <br><br>
              <img :src="recipeDetail.image" alt="Recipe Image" class="card-images mx-auto">
            </tbody>
          </table>
          <video v-if="recipeDetail.video !== 'null'" :src="recipeDetail.video" controls class="card-images mx-auto"></video>
          <div class="like-share-section mt-4">
            <div  class="flex items-center">
              <button :class="['btn', { 'btn-primary': isLiked }]" @click="handleLike">
                <i class="fas fa-thumbs-up"></i>
              </button>
              </div>
              <h1 class="ml-2"> {{ recipeDetail.likes_count }} คนถูกใจสิ่งนี้</h1>
            
            <button @click="shareOnFacebook" aria-label="Share" class="btn btn-info ml-auto">
              <span>แชร์บน Facebook</span>
            </button>
          </div>
        </div>
        <div v-for="(recipe, index) in comments" :key="index" class="comment p-2 rounded-lg">
          <div class="chat chat-start">
            <div class="chat-content">
              <div class="chat-header">{{ recipe.comment[0].username }}</div>
              <div class="chat-message">{{ recipe.comment[0].message }}</div>
            </div>
          </div>
        </div>
        <li  class="flex items-center justify-center comment-input mt-4">
          <input type="text" placeholder="แสดงความคิดเห็น" class="input input-bordered w-full max-w-3xl mr-2" v-model="create.message">
          <button class="btn btn-active" @click="comment">
            <i class="fa fa-paper-plane"></i>
          </button>
        </li>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>

      <!-- แถบด้านขวาสำหรับสูตรแนะนำ -->
      <!-- <div class="recommended-container flex-grow">
        <h2 class="text-xl font-bold mb-4">สูตรแนะนำ</h2>
        <div class="flex flex-col gap-4 p-4">
          <div v-for="(data, index) in similarRecipes" :key="data._id" class="mb-4">
            <router-link :to="'/detail/' + data._id" @click.native="redirectToRecipe(data._id)">

            <div class="relative">
              <img :src="data.image" alt="Recipe Image" class="card-image">
            </div>
            <div>
              <span class="center-button link link-primary">{{ data.name_menu }}</span>
          </div>
         </router-link>
          </div>
        </div>
      </div> -->
       <div  class="recommended-container">
        <h2 class="text-xl font-bold mb-4">สูตรแนะนำ</h2>
        <div class="flex flex-col gap-4 p-4">
          <div v-for="(data, index) in similarRecipes" :key="data._id" class="mb-4 recipe-item">
            <router-link :to="'/detail/' + data._id" @click.native="redirectToRecipe(data._id)">
              <div class="relative">
                <img :src="data.image" alt="Recipe Image" class="card-image">
              </div>
              <div>
                <span class="center-button link link-primary">{{ data.name_menu }}</span>
              </div>
            </router-link>
            <hr v-if="index < similarRecipes.length - 1" class="divider">
          </div>
        </div>
      </div> 
    </div>

  </div>
</template>

<script setup>
  
  import { onMounted, ref ,computed} from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import { useStore } from 'vuex';
  
const store = useStore();

const userName =  store.state.loginUsername
const isLoggedIn = store.state.isLoggedIn;
const liked = store.state.liked;
//console.log(liked)
// const liked = store.state.liked;
const route = useRoute();
let action = ''
// console.log(action)
const likedRecipes = computed(() => store.state.likedRecipes);
const isLiked = computed(() => likedRecipes.value[route.params._id]);
console.log(likedRecipes)

const data = ref({});

function shareOnFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=https://3d52-27-55-69-72.ngrok-free.app/detail/${route.params._id}`);
}

const id_recipe = route.params._id
//console.log(id_recipe)
//   const name_menu = route.params.name;
  const recipeDetail = ref({}); 

const fetchRecipeDetail = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/recipe/${route.params._id}`, {
      withCredentials: true,
    });
    // เข้าถึงอ็อบเจกต์แรกในอาร์เรย์
    recipeDetail.value = response.data;
    // console.log(recipeDetail.value);
  } catch (error) {
    console.error(error);
  }
};
// const addLike = async () => {
//   try {
//     const response = await axios.post(`${import.meta.env.VITE_API}/like`, {
//       recipe_id: recipeDetail.value.id,
//       username: userName
//     });

//     if (response.status === 200) {
//       const data = response.data;
//       // console.log(data);

//       if (!recipeDetail.value.liked_by) {
//         recipeDetail.value.liked_by = [];
//       }
//       console.log(isLiked)
//       // อัปเดต likes_count และ liked_by
//       let liked = false;
//       if (data.message === "Liked successfully") {
//         recipeDetail.value.likes_count += 1;
//         recipeDetail.value.liked_by.push(userName);
//         liked = true;
//       } else if (data.message === "Unliked successfully") {
//         recipeDetail.value.likes_count -= 1;
//         recipeDetail.value.liked_by = recipeDetail.value.liked_by.filter(id => id !== userName);
//         liked = false;
//       }

//       // อัปเดตค่า liked ใน Vuex store โดยเรียกใช้ action setLike
//       console.log(recipeDetail.value.id)
//       console.log(liked)
//       store.dispatch('setLike', { recipeId: recipeDetail.value.id, liked });
//     } else {
//       console.error("Unexpected response status:", response.status);
//     }
//   } catch (error) {
//     console.error("Error liking/unliking the recipe:", error);
//   }
// };

const handleLike = () => {
  if (!isLoggedIn) {
    alert("กรุณาลงชื่อเข้าใช้งาน");
    // router.push('/login');
    return;
  }
  addLike();
};


const addLike = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API}/like`, {
      recipe_id: recipeDetail.value.id,
      username: userName
    });

    if (response.status === 200) {
      const data = response.data;

      if (!recipeDetail.value.liked_by) {
        recipeDetail.value.liked_by = [];
      }

      let liked = false;
      if (data.message === "Liked successfully") {
        recipeDetail.value.likes_count += 1;
        recipeDetail.value.liked_by.push(userName);
        liked = true;
      } else if (data.message === "Unliked successfully") {
        recipeDetail.value.likes_count -= 1;
        recipeDetail.value.liked_by = recipeDetail.value.liked_by.filter(id => id !== userName);
        liked = false;
      }

      store.dispatch('setLike', { recipeId: recipeDetail.value.id, liked });
    } else {
      console.error("Unexpected response status:", response.status);
    }
  } catch (error) {
    console.error("Error liking/unliking the recipe:", error);
  }
};


const create = ref({
  id_recipe: "",
  comments: [], 
  username: "",
  message : ""
});

// const addcomment = async () => {
//   // เพิ่มอ็อบเจกต์วัตถุดิบใหม่ลงในรายการ create.value.ingredients
//   const newComment = {
//     username: userName,
//     message: create.value.message.trim(),
//   };
   
//   create.value.comments.push(newComment);
//   // ล้างค่าในช่องกรอก
//   create.value.message = ''; // เพียงแค่ล้างค่าของ message ออกเท่านั้น
//   console.log(create.value.comments);
// };

const comment = () => {
  if (!isLoggedIn) {
    alert("กรุณาลงชื่อเข้าใช้งาน");
    // router.push('/login');
    return;
  }
  insert_comment();
};

const insert_comment = async (e) => {


  try {
    const newComment = {
      username: userName,
      message: create.value.message.trim(),
    };
    create.value.comments.push(newComment);
    // ล้างค่าในช่องกรอก
    create.value.message = ''; // เพียงแค่ล้างค่าของ message ออกเท่านั้น
    console.log(create.value.comments);

    const response = await axios.post(`${import.meta.env.VITE_API}/comments`, {
      id_recipe: id_recipe,
      comment: create.value.comments,
    });
 
    window.location.reload(); // รีเฟรชหน้าเว็บหลังจากส่งความคิดเห็นเสร็จสิ้น
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการส่งข้อมูลไปยัง API:', error);
  }
};

const comments = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/comments/${id_recipe}`);
    comments.value = response.data;
  } catch (error) {
   console.log(error)
  }
});
import { useRouter } from 'vue-router';

const router = useRouter();
const redirectToRecipe = (recipeId) => {
      router.push({ path: '/detail/' + recipeId }).then(() => {
        // รีเฟรชหน้าจอโดยใช้ setTimeout เพื่อให้มั่นใจว่าการเปลี่ยน URL ได้เสร็จสิ้นก่อน
        setTimeout(() => {
          location.reload();
        }, 100);
      }).catch(err => {
        console.error(err);
      });
    };


const similarRecipes = ref([]);
console.log(similarRecipes.value.length)

async function fetchSimilarRecipes(recipeId) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/maxtype/${id_recipe}`);
    similarRecipes.value = response.data.similarRecipes;
  } catch (error) {
    console.error('Error fetching similar recipes:', error);
  }
}




onMounted(() => {
  fetchSimilarRecipes();
  fetchRecipeDetail();

});

  </script>
  
  <style scoped lang="scss">
 .recipe-item {
  position: relative;
}
 .divider {
  border: none;
  border-top: solid #ffffff; /* สีของเส้นขั้น */
  margin: 2rem 0; /* ระยะห่างระหว่างเส้นกับเนื้อหา */
}
  
  .content-container {
  background-color: #ebeeee;  /* ใช้สีเดียวกับพื้นหลังหลัก */
  width: 80%;
  max-width: 900px;
  text-align: center;
  padding: 2rem;
  margin-left: 0.3rem;
  
}
  
  .my-texts {
    font-weight: bold;
    font-size: 1.1rem;
    margin-top: 1rem;
  }
  
  .card-images {
    width: 60%;
    max-width: 630px;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  
  .like-share-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
  }
  
 
  
  // .comment-input {
  //   margin-top: 1rem;
  // }
  
  .input {
    width: 100%;
  }
  
  .btn {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
  
  .btn-primary {
    background-color: rgb(0, 54, 251);
    color: white;
  }
  
  .min-h-screen {
    min-height: 100vh;
  }

  .recommended-container {
  width: 20%; /* ความกว้างของแถบด้านขวา */
  padding: 2rem;
  background-color: #d9d8d4;
  margin-left: 0.3rem;
  text-align: center;
  // border-radius: 0.5rem;
}
// .chat {
//   display: flex;
// }

.chat-content {
  display: flex;
  flex-direction: column;
}

.chat-header {
  font-weight: bold;
  // margin-bottom: 5px;
  align-self: flex-start;
}

.chat-message {
  background-color: #c0bdbd;
  padding: 10px;
  border-radius: 5px;
}
  </style>