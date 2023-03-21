import { UseFormRegister, FieldErrors, UseFormSetValue, FieldValues } from 'react-hook-form';
import { InputPropsElement } from "../../components/inputs"

import styles from "./styles.module.scss"

interface InputWithProps {
    checkCep: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setValue: any) => Promise<void>
    maskedCep: string;
    errors?:  FieldErrors | any; 
    register: UseFormRegister<FieldValues> | any;
    setValue: UseFormSetValue<FieldValues> | any;
}

export function Inputs({ checkCep, maskedCep, errors, register, setValue }: InputWithProps): JSX.Element {
    return (
        <div className={styles.container}>
            <div className={styles.firstInput}>
                <InputPropsElement
                    {...register("name")}
                    label="Nome"
                    name={"name"}
                    defaultValue={""}
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                />
            </div>

            <div className={styles.inputs}>
                <div>
                    <InputPropsElement
                        {...register("cep")}
                        name={"cep"}
                        label="CEP"
                        onChange={(event) => checkCep(event, setValue)}
                        defaultValue={""}
                        value={maskedCep}
                        error={Boolean(errors.cep)}
                        helperText={errors.cep?.message}
                    />
                </div>
                <div>
                    <InputPropsElement
                        {...register("street")}
                        label="Rua"
                        name={"street"}
                        defaultValue={""}
                        error={Boolean(errors.street)}
                        helperText={errors.street?.message}
                    />
                </div>
            </div>
            <div className={styles.inputs}>
                <div>
                    <InputPropsElement
                        {...register("number")}
                        label="Número"
                        name={"number"}
                        defaultValue={""}
                        error={Boolean(errors.number)}
                        helperText={errors.number?.message}
                    />
                </div>
                <div>
                    <InputPropsElement
                        {...register("neighborhood")}
                        label="Bairro"
                        name={"neighborhood"}
                        defaultValue={""}
                        error={Boolean(errors.neighborhood)}
                        helperText={errors.neighborhood?.message}
                    />
                </div>
            </div>
            <div className={styles.inputs}>
                <div>
                    <InputPropsElement
                        {...register("city")}
                        label="Cidade"
                        name={"city"}
                        defaultValue={""}
                        error={Boolean(errors.city)}
                        helperText={errors.city?.message}
                    />
                </div>
                <div>
                    <InputPropsElement
                        {...register("state")}
                        label="Estado"
                        name={"state"}
                        defaultValue={""}
                        error={Boolean(errors.state)}
                        helperText={errors.state?.message}
                    />
                </div>
            </div>
        </div>
    )
}
