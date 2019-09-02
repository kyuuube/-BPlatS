import './swiper.min.css';
import Swiper from "./swiper.js";

export default Swiper;

// http://www.swiper.com.cn/
// 
/*
showModal = (row) => {
    this.setState({ visible:true,row },()=>{
      Promise.all([this.getDetailById(row.id),this.getComponentSwiper()]).then((list)=>{
        console.log("加载完成");
        const swiper = new this.Swiper('.physicalCharacteristic .swiper-container', {
          slidesPerView: 4,
          spaceBetween: 30,
          pagination: {
            el: '.physicalCharacteristic .swiper-pagination',
            clickable: true,
          },
        });
      }).catch((error)=>{
        console.warn(error);
      });  
    });
  }
  // 获取 用户详情数据
  getDetailById=(id)=>{
    return Service.getRowDetailById(id)
    .then((response)=>{
      console.log(response);
      this.setState({
        detailRow: response
      });
    })
    .catch((error)=>{
      console.warn(error);
      // this.setState({ uploading:false });
      message.error(error.message || error);
    });
  }
  // 加载 swiper插件
  getComponentSwiper=()=>{
    return import('components/Swiper')
    .then(Swiper => {
      this.Swiper = Swiper.default;
      console.log("加载swiper");
    });
  }
 */