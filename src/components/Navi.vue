<template>
    <div>
      <!-- 해당 메뉴 페이지에 있을 때 글씨 색상을 파랑으로('text-blue-500') 표시하기 -->
        <router-link to="/" :class=" $route.path === '/' && 'text-blue-500'">홈</router-link>
        <!--
          $route.path는 지금 내가 보는 페이지 주소창에서 localhost:8080 뒤에 붙은 것. path 주소는 index.js의 path: ''을 보면 알 수 있다.
          그러니까 $route.path === '/event' 이면 주소창이 localhost:8080/event <일 때를 말한다.
          a === b && c 구조는 'a가 b와 같으면 c를 적용해라' 이니까
          :class=" $route.path === '/event' && 'text-blue-500'" : 주소 뒤에 붙은게 /event 이면! class="text-blue-500" 로 해라, 라는 의미.
        -->
        <router-link to="/event" :class=" $route.path === '/event' && 'text-blue-500'">이벤트</router-link>
        <router-link to="/sub" :class=" $route.path === '/sub' && 'text-blue-500'">서브메뉴</router-link>
    </div>
</template>
  
  <script>
  export default {
    name: 'NaviMenu'
  }
  </script>
  
  <style>
  
  </style>