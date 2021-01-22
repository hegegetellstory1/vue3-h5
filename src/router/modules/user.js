const CreateOrder = () => import("../../views/CreateOrder.vue");
const User = () => import("../../views/User.vue");
const Setting = () => import("../../views/Setting.vue");
const Address = () => import("../../views/Address.vue");
const AddressEdit = () => import("../../views/AddressEdit.vue");
const Order = () => import("../../views/Order.vue");
const OrderDetail = () => import("../../views/CreateOrder.vue");
const Collection = () => import("../../views/Collection.vue");

export default [
  {
    path: "/create-order",
    name: "create-order",
    meta: {
      index: 2
    },
    component: CreateOrder
  },
  {
    path: "/order",
    name: "order",
    meta: {
      index: 2
    },
    component: Order
  },
  {
    path: "/order-detail",
    name: "order-detail",
    meta: {
      index: 3
    },
    component: OrderDetail
  },
  {
    path: "/user",
    name: "user",
    meta: {
      index: 2
    },
    component: User
  },
  {
    path: "/collection",
    name: "collection",
    meta: {
      index: 2
    },
    component: Collection
  },
  {
    path: "/setting",
    name: "setting",
    meta: {
      index: 2
    },
    component: Setting
  },
  {
    path: "/address",
    name: "address",
    meta: {
      index: 2
    },
    component: Address
  },
  {
    path: "/address-edit",
    name: "address-edit",
    meta: {
      index: 3
    },
    component: AddressEdit
  }
];
