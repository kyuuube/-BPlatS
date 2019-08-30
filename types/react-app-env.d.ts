/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: "development" | "production" | "test";
        readonly PUBLIC_URL: string;
    }
}

declare module "*.bmp" {
    const src: string;
    export default src;
}

declare module "*.gif" {
    const src: string;
    export default src;
}

declare module "*.jpg" {
    const src: string;
    export default src;
}

declare module "*.jpeg" {
    const src: string;
    export default src;
}

declare module "*.png" {
    const src: string;
    export default src;
}

declare module "*.webp" {
    const src: string;
    export default src;
}

declare module "*.svg" {
    import * as React from "react";

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

    const src: string;
    export default src;
}

declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.module.scss" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.module.less" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.module.sass" {
    const classes: { [key: string]: string };
    export default classes;
}

/** 富文本编辑器utils */
declare module "braft-utils";

/** web缓存 */
declare module "web-storage-cache" {
    export default class WebStorageCache {
        /** wsCache.set('username', 'wqteam', {exp : 100}); 时间：秒 */
        set(name: string, value: any, option?: { exp: number }) {}
        get: any;
        delete: any;
        clear: any;
    }
}

/** 图片预览插件 */
declare module "react-zmage" {
    export interface ReactZmageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
        /**
         * 序列图片, 可以在 set 中传入多个图片对象用于在查看模式下呈现多张图片，也可用于呈现放大后的高清图片
         * @example
         * set={[
          {
              src: "http://zmage.caldis.me/imgSet/childsDream/1.jpg",
              alt: "图片的占位文字，作为图片的标题, 请尽量保持简短",
              style: { borderRadius: 30 },
              className: 'testClassName'
          },
          {
              src: "http://zmage.caldis.me/imgSet/childsDream/2.jpg",
              alt: "图片的占位文字，作为图片的标题, 请尽量保持简短",
          }
      ]}
         * */
        set?: object[];
        /** 如果传入了set来展示多张图片, 可以用于指定打开后的默认页 */
        defaultPage?: number;
        /** 轻松配置界面的功能及样式 */
        preset?: "auto" | "desktop" | "mobile";
    }
    export default class ReactZmage extends React.PureComponent<ReactZmageProps> {}
}
