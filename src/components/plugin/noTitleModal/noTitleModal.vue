<template>
<transition name='fade'>
    <div class='bg' v-show='bgShow'>
        <div class='bg_model' v-show='bgShow'>
            <slot name="bg_info">

            </slot>
            <slot name="bg_btn">

            </slot>
            <div class='bg_info'>{{noTitleContent}}</div>
            <div class='bg_btn' @click='bgShowFn'>{{btnContent}}</div>
        </div>
    </div> 
</transition>
</template>
<script>
    export default{
        name:"noTitleModal",
        data(){
            return {
                noTitleContent:"",
                btnContent:""
            }
        }
    }
</script>
<style scoped>
/*toast 提示  */
.bg {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.bg_model {
  background: #fff;
  border-radius: 10px;
  width: 2.95rem;
  height: 1.59rem;
}

.bg_info {
  line-height: 1.09rem;
  height: 1.09rem;
  width: 100%;
  font-size: 17px;
  color: #444;
  margin: 0 auto;
  text-align: center;
  display: inline-block;
}

.bg_btn {
  height: 0.5rem;
  width: 100%;
  text-align: center;
  line-height: 0.5rem;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-image: linear-gradient(90deg, #fecc00 0%, #ffec00 98%);
  font-size: 16px;
  color: #ff6f2d;
  font-weight: bold;
}

</style>
