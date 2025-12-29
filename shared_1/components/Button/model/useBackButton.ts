import { useRouter } from "expo-router";

export function useBackButton() {
  const router = useRouter();

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return { goBack };
}
