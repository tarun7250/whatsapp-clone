import { useEffect, useRef } from "react";

export default function useEffectOnce<T>(effectFunction: ()=>(()=>void),dependencies:Array<T>) {
    const ref = useRef<number>(0);
    useEffect(()=>{
        if(ref.current === 1) {
            ref.current++;
            return effectFunction();
        }
        else if(ref.current === 2){
            ref.current++;
        }
        else {
            return effectFunction();
        }
    },dependencies);
}