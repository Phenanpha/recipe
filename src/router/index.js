import { createRouter, createWebHistory}from 'vue-router'
import show_recipes from '../views/show_recipes.vue'
import create_recipe from '../views/create_recipe.vue'
import edit_recipe from '../views/edit_recipe.vue'
import home_recipe from '../views/home_recipe.vue'
import create_user from '../views/create_user.vue'
import login from '../views/login.vue'
import detail_recipe from '../views/detail_recipe.vue'
import my_recipe from '../views/my_recipe.vue'
import pad_recipe from '../views/pad_recipe.vue'
import tom_recipe from '../views/tom_recipe.vue'
import kang_recipe from '../views/kang_recipr.vue'
import tod_recipe from '../views/tod_recipe.vue'
import yum_recipe from '../views/yum_recipe.vue'
import thoon_recipe from '../views/thoon_recipe.vue'
import nueng_recipe from '../views/nueng_recipe.vue'




const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path : '/recipes',
            component: show_recipes
        },
        {
            path : '/create',
            component: create_recipe
        },

        {
            path : '/edit/:_id',
            component: edit_recipe
        },

        {
            path : '/',
            component: home_recipe
        },

        {
            path : '/createuser',
            component: create_user
        },
        
        {
            path : '/login',
            component: login
        },

        {
            path : '/detail/:_id',
            component: detail_recipe
        },

        {
            path : '/myrecipe',
            component: my_recipe
        },
        {
            path : '/pad_recipe',
            component: pad_recipe
        },
        {
            path : '/tom_recipe',
            component: tom_recipe
        },
        {
            path : '/kang_recipe',
            component: kang_recipe
        },
        {
            path : '/tod_recipe',
            component: tod_recipe
        },
        {
            path : '/yum_recipe',
            component: yum_recipe
        },
        {
            path : '/thoon_recipe',
            component: thoon_recipe
        },
        {
            path : '/nueng_recipe',
            component: nueng_recipe
        },
 
    ]
})
export default router