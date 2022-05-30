import { router } from "../../routes/CartRoutes";

export const post = (path: string) => {
  return (target: any, key: string, desc: PropertyDescriptor) => {
    router.post(path, target[key]);
  };
};
