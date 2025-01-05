import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedvalue, setdebouncedvalue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setdebouncedvalue(value)
        },delay || 500);

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay]);

    return debouncedvalue;
};

export default useDebounce;