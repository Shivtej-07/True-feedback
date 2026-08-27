import { toast as toastManager } from "@/components/ui/toast";

export const toast = (props: any) => {
  if (typeof (toastManager as any)?.create === 'function') {
    return (toastManager as any).create(props);
  }
  if (typeof (toastManager as any)?.add === 'function') {
    return (toastManager as any).add(props);
  }
  return (toastManager as any)(props);
};

export function useToast() {
  return { toast };
}
