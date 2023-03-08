import { useState } from "react";

export const useToggle = (initialValue: boolean) => {
    const [toggleValue, setToggleValue] = useState<boolean>(initialValue);

    function toggle() {
        setToggleValue((prev) => !prev);
    }

    return [toggleValue, toggle];
}