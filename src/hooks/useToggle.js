import { useState } from "react";

export function useToggle() {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => setIsToggled((toggle) => !toggle);

  const close = () => setIsToggled(false);

  return { isToggled, toggle, close };
}
