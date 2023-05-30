<template>
  <!--
    1. 화면이 로딩되면 어떤 공간에서(웹 등등) 필요한 데이터를 먼저 가져온다.
    2. 그 데이터를 가지고 왔다면 변수에 저장한다(변수 저장시 this.변수명 = 데이터값).
      변수는 data안에 설정. 가지고온 데이터/저장된 데이터가 잘 나오는지 콘솔에 한번 테스트.
    3. 반복할 요소(div가 되었건 p가 되었건 반복할 부분)에
      v-for = "작명 in 변수명" :key="작명"
      변수명에 있던 모든 데이터는 작명에 들어간다.
  -->
  <div class="w-full bg-[#e9f1f6] px-[2%] pb-12 pt-32 box-border">
    <div class="max-w-7xl mx-auto flex flex-wrap gap-x-[1%]">
      <ul class="flex justify-center flex-wrap bg-white rounded-md border box-border p-4 basis-full mb-4 gap-x-4">
        <li @click="cateName='전체'" class="cursor-pointer text-xs md:text-base basis-[20%] sm:basis-[15%] md:basis-[10%] lg:basis-[8%] text-center mb-2 sm:mb-0" :class="cateName === '전체' && 'font-extrabold text-sky-600'">전체</li>
        <li v-for="e in cateList" :key="e" class="cursor-pointer text-xs md:text-base basis-[20%] sm:basis-[15%] md:basis-[10%] lg:basis-[8%] text-center mb-2 sm:mb-0" :class="cateName === e.GUGUN_NM && 'font-extrabold text-sky-600'" @click="cateName = e.GUGUN_NM">{{ e.GUGUN_NM }}</li>
      </ul>
      <div v-for="(e) in cateItem" :key="e" class="bg-white relative basis-full sm:basis-[49%] lg:basis-[32.5%] mb-4 box-border border rounded-md p-5 cursor-pointer">
        <h3 class="mb-4 text-xl font-bold">{{ e.TITLE }}</h3>
        <img :src="e.MAIN_IMG_THUMB" :alt="e.TITLE" class="w-full mb-6">
        <ul>
        <li>전화번호 : {{ e.CNTCT_TEL }}</li>
        <li>행정구 : {{ e.GUGUN_NM }}</li>
        <li v-if="e.USAGE_AMOUNT ===''">이용요금: 무료</li>
        <li v-else>이용요금: {{ e.USAGE_AMOUNT }}</li>
        <li><button class="mt-1 p-1 rounded cursor-pointer text-sm bg-blue-200" @click="open_page(e.HOMEPAGE_URL)" v-if="e.HOMEPAGE_URL !== ''">홈페이지</button></li>
        </ul>
        <div class="right-4 bottom-4 absolute">
            <router-link :to="'detail/'+(e.UC_SEQ)" @click="ResultList(e.UC_SEQ)"><span class="rounded-lg bg-blue-600 text-white text-sm px-4 py-2">상세보기</span></router-link>
        </div>
      </div>
      <div class="basis-full bg-white flex justify-around">
        <ul class="flex justify-center">
          <li v-for="e in totalCount / pageList" :key="e" class="cursor-pointer mx-1" :class="e === page && 'font-extrabold'" @click="page = e; getItem()">{{ e }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      pageList: 30, // 한 페이지당 10개
      listItem:[], // 배열 넣을 땐 대괄호 꼭 해줘야함!
      page: 1,
      totalCount:0, //총 개수
      cateName: "전체"
    }
  },
  methods:{
    ResultList(e){
      return this.listItem.filter((data)=>{
        if(data.UC_SEQ === e){
          return this.session(data)
          // return console.log(data)
        }
      })
    },
    session(data){
      sessionStorage.setItem('data',JSON.stringify(data));
    },
    open_page(url){window.open(url);},
    getItem: function(){
      axios.get(`https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=KtePiH0wS0n9WxO%2B1OdkKwifZ1EPV4piArpxjcCK8WZApKzLTx%2Bk8PSu0XrcFeQsl8Sn12ry0lsgL8AGIuqrxw%3D%3D&pageNo=${this.page}&numOfRows=10&resultType=json
`).then((res)=>{
        this.listItem = res.data.getFestivalKr.item;
      }).catch((error)=>{
        console.log(error);
      })
    }
  },
  mounted(){
    console.log("create 이후 실행")
  }, // mounted: 부모, 자식관계의 컴포넌트가 렌더링될 때 created 다음으로 호출. 자식>부모순으로 실행.
  //※Vue는 create를 생성하고 DOM에 부착(mounted) 업데이트(update) 없어지는(destory) 4가지 과정을 거친다.
  created(){
    console.log("먼저 실행")
    axios.get(`https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=KtePiH0wS0n9WxO%2B1OdkKwifZ1EPV4piArpxjcCK8WZApKzLTx%2Bk8PSu0XrcFeQsl8Sn12ry0lsgL8AGIuqrxw%3D%3D&pageNo=1&numOfRows=30&resultType=json
`).then((res)=>{
      console.log(res.data.getFestivalKr);
      this.totalCount = res.data.getFestivalKr.totalCount;
      this.listItem = res.data.getFestivalKr.item;
    }).catch((error)=>{
      console.log(error);
    })
  },
  //created : 인스턴스가 작성된 후 동기적으로 호출.
  //created에 먼저 데이터를 불러와서 넣고>그다음에 mounted에서 뿌리도록 하기
  computed:{
    cateList(){
      return this.listItem.filter((item,i)=>{
        return(
          this.listItem.findIndex((item2)=>{
            return item.GUGUN_NM === item2.GUGUN_NM //중복되는 값이 있다면 return시켜버린다. 중복되지 않는 것만 출력한다.
          }) === i
        )
      });
    },
    cateItem(){
      return this.listItem.filter((data)=>{
        if (this. cateName !== '전체'){
          return data.GUGUN_NM === this.cateName
        }else{
          return data.GUGUN_NM
        }
      })
    }
  },
  // computed: 연산자. 템플릿 내의 값을 연산할 때 사용. 같은 값일때는 연산하지 않는다. computed 사용시 반드시 return을 사용할 것!
  // watch: 같은 값이어도 다시 연산.
  components: {
  }
}
</script>

<style>

</style>