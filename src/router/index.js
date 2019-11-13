import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import Subsystem from '../views/Subsystem.vue'
import Desk from '../components/desk.vue'
import Administration from '../views/Configuration/deploy/Architecture/Administration.vue'
import Unit from '../views/Configuration/deploy/Architecture/unit.vue'
import Car from '../views/Configuration/deploy/Device/Car.vue'
import Station from '../views/Configuration/deploy/Device/Station.vue'
import Vehicle from '../views/Configuration/system/vehicle'
import Sanitation from '../views/Configuration/system/Sanitation'
import Personnel from '../views/Configuration/system/personnel'
import Organization from '../views/Configuration/system/organization'

// const Administration = () => import('../views/Configuration/deploy/Architecture/Administration.vue')

// 垃圾管理系统组件
import Garbage from '../views/classification/deskTop/Garbage'
import Basic from '../views/classification/deskTop/basic'
import Permission from '../views/classification/Permission/Permission'
import Department from '../views/classification/Organization/Department'
import Post from '../views/classification/Organization/Post'
import Employee from '../views/classification/Personnel/Employee'
import Driver from '../views/classification/Personnel/Driver'
import Carlogin from '../views/classification/ElectricCar/Carlogin'
import Carlnfo from '../views/classification/ElectricCar/CarInfo'
import LoginLog from '../views/classification/logManagement/loginLog'
import LoginException from '../views/classification/logManagement/LoginException'
import DataPermission from '../views/classification/Permission/dataPermission'
import SmallStation from '../views/classification/SanitationWork/smallStation'
import RoadRoom from '../views/classification/SanitationWork/roadRoom'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/subsystem',
    name: 'subsystem',
    component: Subsystem
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/desk',
        name: 'desk',
        component: Desk
      },
      {
        path: '/administration',
        name: 'administration',
        component: Administration
      },
      {
        path: '/unit',
        name: 'Unit',
        component: Unit
      },
      {
        path: '/car',
        name: 'Car',
        component: Car
      },
      {
        path: '/station',
        name: 'Station',
        component: Station
      },
      {
        path: '/vehicle',
        name: 'Vehicle',
        component: Vehicle
      },
      {
        path: '/sanitation',
        name: 'Sanitation',
        component: Sanitation
      },
      {
        path: '/personnel',
        name: 'Personnel',
        component: Personnel
      },
      {
        path: '/organization',
        name: 'Organization',
        component: Organization
      }
    ]
  },
  // 垃圾管理系统路由
  {
    path: '/garbage',
    name: 'Garbage',
    component: Garbage,
    children: [
      {
        path: '/basic',
        name: 'basic',
        component: Basic
      },
      {
        path: '/permission',
        name: 'Permission',
        component: Permission
      },
      {
        path: '/department',
        name: 'department',
        component: Department
      },
      {
        path: '/post',
        name: 'post',
        component: Post
      },
      {
        path: '/employee',
        name: 'employee',
        component: Employee
      },
      {
        path: '/driver',
        name: 'driver',
        component: Driver
      },
      {
        path: '/carlogin',
        name: 'carlogin',
        component: Carlogin
      },
      {
        path: '/carlnfo',
        name: 'carlnfo',
        component: Carlnfo
      },
      {
        path: '/loginLog',
        name: 'loginLog',
        component: LoginLog
      },
      {
        path: '/loginException',
        name: 'loginException',
        component: LoginException
      },
      {
        path: '/dataPermission',
        name: 'dataPermission',
        component: DataPermission
      },
      {
        path: '/smallStation',
        name: 'smallStation',
        component: SmallStation
      },
      {
        path: '/roadRoom',
        name: 'roadRoom',
        component: RoadRoom
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
