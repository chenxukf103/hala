<template>
    <div class="tabbar" :class="{'visible': state == 1}">
        <div v-for="(menu, index) in menus"
             class="tabbar-item"
             :style="{'color': menuIndex == index ? activeMenuColor : menuColor}"
             @click="menuClicked(index)">
            <div class="icon-wrapper">
                <icon :name="getIconClass(menu, index)" :scale="80"></icon>
            </div>
            <div class="text-wrapper">
                <gs-scalable>
                    <span v-text="menu.text"></span>
                </gs-scalable>
            </div>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    @import "../../components/scss/mixin";
    $tabbar-z-index: 10;

    .tabbar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 44px;
        z-index: $tabbar-z-index;
        background-color: #fff;
        @include display-flex();
        @include flex-wrap(wrap);
        margin: 0;
        padding: 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        /*
        &:before {
          @include hairline(top);
        }
        */

        opacity: 0;
        transition: opacity .2s;
        -webkit-transition: opacity .2s;
        &.visible {
            opacity: 1;
        }

        &.fixed {
            position: fixed;
        }

        .tabbar-item {
            @include display-flex();
            @include flex(1);
            @include flex-direction(column);

            .icon-wrapper {
                @include flex(none);
                height: 32px;
                text-align: center;
                font-size: 28px;
                line-height: 32px;
            }

            .text-wrapper {
                @include flex(1);
                text-align: center;
                font-size: 20px;
                line-height: 20px;
            }
        }
    }
</style>
<script type="text/ecmascript-6">
    import Vue from 'vue';
    import Icon from 'vue-svg-icon/Icon.vue';
    const re_color = /^#([0-9A-Fa-f]{3})|([0-9A-Fa-f]{6})$/;

    export default {
        components:{
            Icon
        },
        props: {
            menuColor: {
                type: String,
                default: '#888',
                validator(v) {
                  return re_color.test(v)
                }
            },

            activeMenuColor: {
                type: String,
                default: '#EA5A49',
                validator(v) {
                  return re_color.test(v)
                }
            },

            onMenuClick: {
                type: Function
            },
            name:''
        },

        mounted() {
            this.$el.setAttribute('ha-tabbar', '')
            this.show()
            setTimeout(() => {
              this.$el.classList.add('fixed')
            }, 600)
        },

        beforeDestroy() {
            window.__disable_nav_title_transition__ = false
        },

        desctoryed() {
            document.body.removeChild(this.$el)
        },

        data() {
            return {
                menus: [],
                menuIndex: 0,
                state: 0
            }
        },

        methods: {
            menuClicked(menuIndex) {
                window.__disable_nav_title_transition__ = true;

                this.menuIndex = menuIndex;
                if (this.menus[menuIndex].path)
                    $router.forward({ path: this.menus[menuIndex].path });
                    //$router.replace({path: this.menus[menuIndex].path});
                if (this.onMenuClick) {
                    this.onMenuClick(menuIndex)
                }
            },

            activate(index) {
                this.menuIndex = index
            },

            show() {
                this.state = 1
            },

            getIconClass(menu, index) {
                let iconClass = {};
                iconClass[menu.iconOn] = this.menuIndex == index;
                //iconClass[menu.iconOff] = this.menuIndex != index;
                return menu.iconOn
            }
        }
    }
</script>
