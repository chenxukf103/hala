<template>
  <div class="list list-ios list-borderless list-accordion"
    :style="{height: getHeight()}"
    >
    <hairline-item class="item-icon-right" @click.native="onClick()">
      <span v-text="title"></span>
      <i class="icon ion-arrow-down-b"
        :class="{'rotated': expanded}"></i>
    </hairline-item>
    <transition name="fade">
      <div v-show="expanded" class="accordion-content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "./accordion.scss";
</style>
<script type="text/ecmascript-6">
  import config from '../config';
  import HairlineItem from '../hairlineItem/hairlineItem'

  export default {
    name: config.prefix + 'AccordionItem',
    components: {
      HairlineItem
    },
    props: {
      title: String,
      contentHeight: {
        type: String,
        validator: function (value) {
          return /^[\d]{1,}$/.test(value)
        },
        default: '100'
      }
    },

    data() {
      return {
        expanded: false,
        index: -1
      }
    },

    mounted() {
      let children = this.$el.parentNode.children

      for (let i = 0; i < children.length; i++) {
        if (children[i] == this.$el) {
          this.index = i
          break
        }
      }

      // console.log('accordion item index => ', this.index)
      this.$on('activeIndexChanged', activeIndex => {
        if (activeIndex != this.index)
          this.expanded = false
      })
    },

    methods: {
      onClick() {
        this.expanded = !this.expanded;
        if (this.expanded)
          this.$emit('activeIndexChanged', this.index)
      },

      getHeight() {
        return this.expanded ? parseInt(this.contentHeight) + 50 + 'px' : '50px'
      }
    }
  }
</script>
