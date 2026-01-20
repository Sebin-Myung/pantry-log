import { useRouter } from "expo-router";

export function useRouterFunc() {
  const router = useRouter();

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return { goBack };
}
