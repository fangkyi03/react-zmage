/**
 * 默认类型与默认值
 **/

// Libs
import PropTypes from 'prop-types';
// Utils
import { isDesktop, isMobile } from '@/utils'

/**
 * 全局变量缓存
 **/
const env = { isDesktop: null, isMobile: null }
const updateEnv = (force) => {
    if (typeof window == 'object') {
        if (!window.__ZMAGE_INITIALIZED___ || force) {
            const mobile = isMobile()
            window.__ZMAGE_INITIALIZED___ = true
            window.__ZMAGE_ENV_IS_DESKTOP___ = !mobile
            window.__ZMAGE_ENV_IS_MOBILE___ = mobile
        }
        env.isDesktop = window.__ZMAGE_ENV_IS_DESKTOP___
        env.isMobile = window.__ZMAGE_ENV_IS_MOBILE___
    } else {
        const mobile = isMobile()
        env.isDesktop = !mobile
        env.isMobile = mobile
    }
    return env
}
updateEnv()
export { env }

/**
 * 默认类型
 **/
export const defType = {

    /**
     * 基础数据
     **/
    // 图片地址
    src: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),
    // 图片标题
    alt: PropTypes.string,
    // 图片描述
    txt: PropTypes.string,
    // 图片集合
    set: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                src: PropTypes.string,  // 图片地址
                alt: PropTypes.string,  // 图片标题
                text: PropTypes.string, // 图片描述
            })
        ),
        PropTypes.shape({
            src: PropTypes.string,  // 图片地址
            alt: PropTypes.string,  // 图片标题
            text: PropTypes.string, // 图片描述
        }),
    ]),
    // 图片默认页
    defaultPage: PropTypes.number,

    /**
     * 功能控制
     **/
    // 控制器
    controller: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            // 分页
            pagination: PropTypes.bool,
            // 旋转按钮
            rotate: PropTypes.bool,
            // 缩放按钮
            zoom: PropTypes.bool,
            // 关闭按钮
            close: PropTypes.bool,
            // 左右翻页
            flip: PropTypes.bool,
        }),
    ]),
    // 快捷键
    hotKey: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            // 关闭（ESC）
            close: PropTypes.bool,
            // 缩放（空格）
            zoom: PropTypes.bool,
            // 翻页（左右键）
            flip: PropTypes.bool,
        }),
    ]),
    // 预设
    preset: PropTypes.oneOf([
        // 自动
        "auto",
        // 桌面端
        "desktop",
        // 移动端
        "mobile",
    ]),

    /**
     * 界面样式
     **/
    // 背景色
    backdrop: PropTypes.string,
    // 高度
    zIndex: PropTypes.number,
    // 圆角
    radius: PropTypes.number,
    // 边距
    edge: PropTypes.number,

    /**
     * 生命周期
     **/
    onBrowsing: PropTypes.func,
    onZooming: PropTypes.func,
    onSwitching: PropTypes.func,
    onRotating: PropTypes.func,

    /**
     * 内部
     **/
    // components/Wrapper
    // 封面节点
    cover: PropTypes.object,
    // 卸载函数
    remove: PropTypes.func,
}

/**
 * 默认值
 **/

export const defPreset = {

    // 桌面
    desktop: {
        controller: {
            pagination: true,
            rotate: true,
            zoom: true,
            download: false,
            close: true,
            flip: true,
        },
        hotKey: {
            close: true,
            zoom: true,
            flip: true,
        },
        radius: 5,
        edge: 0,
    },

    // 移动端
    mobile: {
        controller: {
            pagination: true,
            rotate: false,
            zoom: false,
            download: false,
            close: true,
            flip: false,
        },
        hotKey: {
            close: false,
            zoom: false,
            flip: false,
        },
        radius: 0,
        edge: 0,
    }

}
export const defProp = {

    /**
     * 基础数据
     **/
    // 图片地址
    src: "",
    // 图片标题
    alt: "",
    // 图片描述
    txt: "",
    // 图片集合
    set: [],
    // 图片默认页
    defaultPage: 0,

    /**
     * 预设
     **/
    preset: "auto",
	
    /**
     * 功能控制
     **/
	// 控制器 (受制于 preset)
	controller: {},
	// 快捷键 (受制于 preset)
	hotKey: {},

    /**
     * 界面样式
     **/
    // 背景色
    backdrop: "#FFFFFF",
    // 高度
    zIndex: 1000,
    // 圆角 (受制于 preset)
    radius: null,
    // 边距 (受制于 preset)
    edge: null,
	
    /**
     * 生命周期
     **/
    onBrowsing: ()=>{},
    onZooming: ()=>{},
    onSwitching: ()=>{},
    onRotating: ()=>{},

    /**
     * 内部
     **/
    // components/Wrapper
    // 封面节点
    cover: {},
    // 卸载函数
    remove: ()=>{},

}

/**
 * 默认值 (不同平台)
 **/
export const defPropAuto = (force) => ({
    ...defProp,
    ...(updateEnv(force).isDesktop ? defPreset.desktop : defPreset.mobile)
})
export const defPropDesktop = {
    ...defProp,
    ...defPreset.desktop
}
export const defPropMobile = {
    ...defProp,
    ...defPreset.mobile
}
