import ButtonForInput from "@/components/ButtonForInput";
import { useForm } from 'react-hook-form';

const Auth = () => {

    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset,
    } = useForm(
        { mode: 'onBlur' }
    );

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
        reset();
    }

    return (

        <div className="row" style={{ marginBottom: '200px' }}>
            <form className="col l12 m12 s12" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col l4 m4 s1"></div>
                    <div className="input-field col l4 m4 s10">
                        <input id="email" type="email" className="validate"

                            {...register("email", {
                                required: "Не валидный email",
                                pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
                            })
                            }
                        />
                        <label for="email">Email</label>
                        <span class="helper-text">{errors?.email && errors?.email?.message}</span>
                    </div>
                    <div className="col l4 m4 s1"></div>
                </div>
                <div className="row">
                    <div className="col l4 m4 s1"></div>
                    <div className="input-field col l4 m4 s10">
                        <input id="password" type="password" className="validate" />
                        <label for="password">Пароль</label>
                    </div>
                    <div className="col l4 m4 s1"></div>
                </div>

                <div className="col l4 m4 s1"></div>
                <div className="col l4 m4 s10">
                    <ButtonForInput text={'отправить'} isvalid={isValid} />
                </div>
                <div className="col l4 m4 s1"></div>
            </form>
        </div>



    );
}

export default Auth;