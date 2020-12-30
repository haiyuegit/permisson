

// import home from '@/pages/home'
// import layout from '@/components/layout'
import login from '@/login'

// import menuManage from '@/pages/permissionManage/menuManage'
// import roleManage from '@/pages/permissionManage/roleManage'
// import permManage from '@/pages/permissionManage/permManage'

// import noteManage from '@/pages/systemManage/noteManage'
// import wordBookManage from '@/pages/systemManage/wordBookManage'
// import wordBookDetail from '@/pages/systemManage/wordBookDetail'

// import operateManage from '@/pages/permissionManage/operateManage'
// import resourceManage from '@/pages/permissionManage/resourceManage'
// import userManage from '@/pages/permissionManage/userManage'

// import organization from '@/pages/departmentManage/organization'
// import staff from '@/pages/departmentManage/staff'
// import account from '@/pages/departmentManage/account'

import notFound from '@/pages/notFound'

export let config = [
    
    // {
    //     path: '/',
    //     name: 'layout', 
    //     component: layout,
    //     meta:{
    //         rname: '首页',
    //         pname:'',
    //         level:1
    //     },
    //     children:[
    //         {
    //             path: '/',
    //             name: 'home', 
    //             component: home,
    //             level:1,
    //             meta:{
    //                 pname: '首页',
    //                 rname: '',
    //                 level:1
    //             }
    //         },
    //         {
    //             path: 'permissionManage/menuManage',
    //             name: 'menuManage', 
    //             component: menuManage,
    //             level:1,
    //             meta:{
    //                 pname: '权限管理',
    //                 rname: '菜单管理',
    //                 level:1
    //             }
    //         },
    //         {
    //             path: 'permissionManage/roleManage',
    //             name: 'roleManage', 
    //             component: roleManage,
    //             level:1,
    //             meta:{
    //                 pname: '权限管理',
    //                 rname: '角色管理',
    //                 level:1
    //             }
    //         },
    //         {
    //             path: '/permissionManage/permManage',
    //             name: 'permManage', 
    //             component: permManage,
    //             level:1,
    //             meta:{
    //                 pname: '权限管理',
    //                 rname: '权限管理',
    //                 level:1
    //             }
    //         },
    //         {
    //             path: '/systemManage/noteManage',
    //             name: 'noteManage', 
    //             component: noteManage,
    //             level:1,
    //             meta:{
    //                 pname: '系统管理',
    //                 rname: '日志管理',
    //                 level:1
    //             }
    //         },
    //         {
    //             path: '/permissionManage/operateManage',
    //             name: 'operateManage', 
    //             component: operateManage,
    //             level:1,
    //             meta:{
    //                 pname: '权限管理',
    //                 rname: '操作管理',
    //                 level:1
    //             }
    //         },
    //         {
    //             path: '/systemManage/wordBookManage',
    //             name: 'wordBookManage', 
    //             component: wordBookManage,
    //             level:1,
    //             meta:{
    //                 pname: '系统管理',
    //                 rname: '字典管理',
    //                 level: 1
    //             }
    //         },
    //         {
    //             path: '/permissionManage/resourceManage',
    //             name: 'resourceManage', 
    //             component: resourceManage,
    //             level:1,
    //             meta:{
    //                 pname: '权限管理',
    //                 rname: 'API资源管理',
    //                 level:1
    //             }
    //         },
    //         {
    //             path: '/systemManage/wordBookDetail',
    //             name: 'wordBookDetail', 
    //             component: wordBookDetail,
    //             level:1,
    //             meta:{
    //                 pname: '系统管理',
    //                 rname: '字典管理详情',
    //                 level:1
    //             }
    //         },
    //         {
    //             path: '/permissionManage/userManage',
    //             name: 'userManage', 
    //             component: userManage,
    //             level:1,
    //             meta:{
    //                 pname: '权限管理',
    //                 rname: '用户组管理',
    //                 level:1
    //             }
    //         },
    //         {
    //             path: '/departmentManage/organization',
    //             name: 'organization', 
    //             component: organization,
    //             level:1,
    //             meta:{
    //                 pname: '部门人员管理',
    //                 rname: '部门管理',
    //                 level:1
    //             }
    //         },   
    //         {
    //             path: '/departmentManage/staff',
    //             name: 'staff', 
    //             component: staff,
    //             level:1,
    //             meta:{
    //                 pname: '部门人员管理',
    //                 rname: '员工管理',
    //                 level:1
    //             }
    //         },
    //         {
    //             path: '/departmentManage/account',
    //             name: 'account', 
    //             component: account,
    //             level:1,
    //             meta:{
    //                 pname: '部门人员管理',
    //                 rname: '账号管理',
    //                 level:1
    //             }
    //         },
    //     ]
    // },

    {
        path: '/login',
        name: 'login', 
        component: login,
        meta:{
            rname: '首页',
            pname:'',
            level:1
        }
    },
    
    {
        path: "/404",
        name:'404',
        component: notFound,
        // redirect: "/404"
      }
    
]