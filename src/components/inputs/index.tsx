import { forwardRef, ForwardRefRenderFunction } from "react";
import { StandardTextFieldProps, TextField } from "@mui/material"
import { motion } from "framer-motion"

interface InputWithProps extends StandardTextFieldProps {
    label: string;
    name:  string;
    x:     number;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputWithProps> = ({ label, name, ...rest }, ref) => {
    return (
        <motion.div
            initial={{
                x: -200,
                opacity: 0
            }}
            animate={{
                x: 0,
                opacity: 1
            }}
            transition={{
                duration: 1.3
            }}
        >
            <label htmlFor={name}>{label}</label>

            <TextField
                name={name}
                type={name}
                ref={ref}
                {...rest}
            />
        </motion.div>
    )
}

export const InputPropsElement = forwardRef(Input)