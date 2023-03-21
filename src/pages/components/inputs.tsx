import { forwardRef, ForwardRefRenderFunction } from "react";
import { StandardTextFieldProps, TextField } from "@mui/material"

interface InputWithProps extends StandardTextFieldProps {
    label: string;
    name: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputWithProps> = ({ label, name, ...rest }, ref) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>

            <TextField
                name={name}
                type={name}
                ref={ref}
                {...rest}
            />
        </>
    )
}

export const InputPropsElement = forwardRef(Input)