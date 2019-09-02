import { UploadProps } from "antd/lib/upload";

declare module "antd/lib/upload" {
  export interface UploadProps {
    /** customRequest: async ({ file, onSuccess, onError } 回调 */
    onSuccess?: Func;
  }
}
