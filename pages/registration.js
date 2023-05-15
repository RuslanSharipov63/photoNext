import ButtonForInput from "@/components/ButtonForInput";
import { useForm } from 'react-hook-form';

const RegistrationPage = () => {

    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset,
    } = useForm({
        mode: 'onBlur'
    });


    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        reset();
    }

    return (
        <div className="row">
            <form className="col s12" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col s4"></div>
                    <div className="input-field col s12 m4 l4 ">
                        <input
                            id="first_name"
                            type="text"
                            className="validate"
                            {...register('firstName', {
                                required: "Поле обязательно к заполнению",
                                minLength: {
                                    value: 5,
                                    message: "Минимум 5 символов"
                                }
                            })}
                        />
                        <label for="first_name">Имя</label>
                        <span className="helper-text">{errors?.firstName && errors?.firstName?.message}</span>
                    </div>
                    <div className="col s4"></div>
                </div>
                <div className="row">
                    <div className="col s4 "></div>
                    <div className="input-field col s12 m4 l4 ">
                        <input
                            id="password"
                            type="password"
                            className="validate"
                            {...register('password', {
                                required: "Поле обязательно к заполнению",
                                minLength: {
                                    value: 8,
                                    message: "От 8 до 10 символов"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "От 8 до 10 символов"
                                }
                            })}
                        />
                        <label for="password">Пароль</label>
                        <span class="helper-text">{errors?.password && errors?.password?.message}</span>
                    </div>
                    <div className="col s4"></div>
                </div>
                <div className="row">
                    <div className="col s4"></div>
                    <div className="input-field col s12 m4 l4">
                        <input
                            id="email"
                            type="email"
                            className="validate"
                            {...register("email", {
                                required: "Не валидный email",
                                pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
                            })
                            }
                        />
                        <label for="email">Email</label>
                        <span class="helper-text">{errors?.email && errors?.email?.message}</span>
                    </div>
                    <div className="col s4"></div>
                </div>
                <div className="row">
                    <div className="col s4"></div>
                    <div className="input-field col s12 m4 l4">
                        <ButtonForInput text={'отправить'} isvalid={isValid} />
                    </div>
                    <div className="col s4"></div>

                </div>
            </form>

        </div>
    );
}

export default RegistrationPage;