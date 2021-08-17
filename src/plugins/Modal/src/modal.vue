<template>
  <div class="modal_wrapper" v-if="show">
    <div class="modal_overlay" @click="handleClose"></div>
    <transition>
      <div class="modal_container">
        <div class="modal_header">
          <h4 class="modal_title">{{ title }}</h4>
        </div>
        <span class="md_close_icon" @click="handleClose"></span>
        <div class="modal_content">
          {{ message }}
          <slot></slot>
        </div>
        <div class="modal_footer">
          <button class="md_btn_line" @click="handleClose">取消</button>
          <button class="md_btn_primary" @click="handleCheck">确认</button>
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
    handleShow (options) {
      const { title, message } = options;
      this.title = title;
      this.message = message;
      this.show = true;
    },
    handleClose () {
      this.show = false;
    },
    handleCheck () {
      // callback
    }
  }
}
</script>

<style lang="less">
@blue: #409eff;

.modal_wrapper {
  font-size: 16px;
}
.modal_overlay {
  background-color: rgba(#000, .4);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.modal_container {
  min-width: 500px;
  border-radius: 4px;
  padding: 20px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.modal_title {
  margin-top: 0;
  margin-bottom: 20px;
}
.md_close_icon {
  display: block;
  width: 20px;
  height: 20px;
  background: url(./images/close.svg) no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}
.modal_footer {
  margin-top: 30px;
  text-align: center;
  font-size: 0;
  button {
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid @blue;
    transition: all .3s ease;
    cursor: pointer;
    & + button {
      margin-left: 15px;
    }
  }
}
.md_btn_primary {
  color: #fff;
  background-color: @blue;
  &:hover {
    color: @blue;
    background-color: #fff;
  }
}
.md_btn_line {
  color: @blue;
  background-color: #fff;
  &:hover {
    color: #fff;
    background-color: @blue;
  }
}
</style>