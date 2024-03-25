// 静态资源图片渲染，使用方式：<img :src="importImageUrl(item.img)">
// 图片最好写绝对路径
export const importImageUrl = (path) => new URL(path, import.meta.url).href;
