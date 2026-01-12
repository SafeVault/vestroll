import { classNames } from "@/utils/classNames";
import { ComponentProps } from "react";

type TruncatedAddressProps = ComponentProps<"span"> & {
    address:string,
    front?:number,
    back?:number
}

export default function TruncatedAddress({front=9,back=9,address,className="",...props}: TruncatedAddressProps) {
    const trunkedAddress = `${address.slice(0,front)}....${address.slice(-back)}`
    return <span {...props} className={classNames("text-black",className)}>{trunkedAddress}</span>
}