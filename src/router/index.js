import { createRouter, createWebHashHistory } from "vue-router";
const Home = () => import("../views/home");
// const About = () => import("../views/About.vue");
// const Category = () => import("../views/Category.vue");
// const Login = () => import("../views/Login.vue");
// const ProductList = () => import("../views/ProductList.vue");
// const ProductDetail = () => import("../views/ProductDetail.vue");
// const Cart = () => import("../views/Cart.vue");

// import UserRoute from "./modules/user";

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        index: 1
      }
    }
    // {
    //   path: "/login",
    //   name: "login",
    //   component: Login,
    //   meta: {
    //     index: 1
    //   }
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   component: About,
    //   meta: {
    //     index: 2
    //   }
    // },
    // {
    //   path: "/category",
    //   name: "category",
    //   component: Category,
    //   meta: {
    //     index: 1
    //   }
    // },
    // {
    //   path: "/product-list",
    //   name: "product-list",
    //   meta: {
    //     index: 2
    //   },
    //   component: ProductList
    // },
    // {
    //   path: "/product/:id",
    //   name: "product",
    //   meta: {
    //     index: 3
    //   },
    //   component: ProductDetail
    // },
    // {
    //   path: "/cart",
    //   name: "cart",
    //   meta: {
    //     index: 1
    //   },
    //   component: Cart
    // },
    // ...UserRoute
  ]
});

export default router;
