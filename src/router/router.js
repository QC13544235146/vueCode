import App from '../App'

const home=r => require.ensure([], () => r(require('../page/home/home')), 'home')
const personCenter=r => require.ensure([], () => r(require('../page/personCenter/personCenter')), 'personCenter')
const record=r => require.ensure([], () => r(require('../page/record/record')), 'record')
const report=r => require.ensure([], () => r(require('../page/report/report')), 'report')

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children:[{
    path:'',
    redirect: '/home'
  },{
    path:'/home',
    component:home
  },{
    path:'/personCenter',
    component:personCenter
  },{
    path:'/record',
    component:record
  },{
    path:'/report',
    component:report
  }],
  // scrollBehavior (to, from, savedPosition) {   //vue-router的滚动行为，避免当前页面滚动到底部，跳转其他页面时也在底部
  //   console.log(savedPosition);
    
  //   return { x: 0, y: 0 }
  // }
}]
