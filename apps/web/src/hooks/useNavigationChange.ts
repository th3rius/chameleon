import {useEffect} from "react";

export default function useNavigationChange(callback: () => void) {
  // @ts-expect-error not widely supported yet
  const navigation = window.navigation;
  useEffect(() => {
    if (navigation) {
      navigation.addEventListener("navigate", callback);
      return () => navigation.removeEventListener("navigate", callback);
    }
  });
}
