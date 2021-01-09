import { useState } from 'react';

const useInput = (initialValue: any) => {
    const [value, setValue] = useState(initialValue);

    function clear(){
        setValue("");
    }
    
    function handleChange(ev: React.ChangeEvent<HTMLInputElement>){        
        setValue(ev.target.value);    
    }
    
    return [value, handleChange, clear];
}

export default useInput;