// 检测元素是否进入视口区域
import { useIntersectionObserver } from '@vueuse/core'

// 定义图片懒加载插件
export const lazyPlugin = {
  install(app) {
    // 定义自定义指令图片懒加载
    app.directive('img-lazy', {
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              el.src = binding.value
              // 完成第一次加载之后停止监听
              stop()
            }
          },
        )
      }
    })
  }
}