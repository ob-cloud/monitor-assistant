<template>
  <a-carousel autoplay :dots="false" effect="fade">
    <div class="carousel-bg" v-for="item in bglist" :key="item" :style="{'background-image': `url(${item})`}"></div>
  </a-carousel>
</template>

<script>
import bg1 from './images/1.png'
import bg2 from './images/2.png'
import bg3 from './images/3.png'
export default {
  name: 'Carousel',
  data () {
    return {
      bglist: { bg1, bg2, bg3 }
    }
  }
}
</script>

<style scoped>
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 100vh;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
.carousel-bg{
  height: 100vh;
}
</style>
