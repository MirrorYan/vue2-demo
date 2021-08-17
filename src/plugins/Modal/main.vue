<template>
  <div class="modal_wrapper" v-if="show">
    <div class="modal_overlay" @click="handleClose"></div>
    <transition>
      <div class="modal_container">
        <div class="modal_header">{{ title }}</div>
        <div class="modal_content">
          <slot></slot>
        </div>
        <div class="modal_footer">
          <button @click="handleClose">取消</button>
          <button @click="handleCheck">确认</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      title: null,
      message: ''
    }
  },
  methods: {
    handleShow () {

    },
    handleClose () {
      this.show = false;
    },
    handleCheck () {

    }
  }
}
</script>

<style lang="less">
.modal_overlay {
  background-color: rgba(#000, .4);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>