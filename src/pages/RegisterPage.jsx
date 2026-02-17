import { registerUser } from "../firebase/authService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation/validateSchema.js";
import toast from "react-hot-toast";
import style from "./RegisterPage.module.css";
import { useState } from "react";
import SuccessIcon from "../icons/SuccessIcon.jsx";
import EyeOffIcon from "../icons/EyeOffIcon.jsx";
import ErrorIcon from "../icons/ErrorIcon.jsx";
import EyeIcon from "../icons/EyeIcon.jsx";
import { useNavigate } from "react-router-dom";
import Logo from "../icons/logo.jsx";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice.js";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });
  const passwordValue = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const hasError = !!errors.password;
  const isValid = passwordValue?.length > 0 && !errors.password;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const token = await registerUser(data.email.trim(), data.password);
      console.log(token);
      dispatch(setUser({ user: data.email, token }));
      toast.success("Kayıt başarılı :)");
      navigate("/recommended");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Bu email ile zaten kayıt var");
      } else {
        toast.error("Kayıt başarısız");
      }
      console.log(error.code);
    }
  };

  return (
    <>
      <div className={style.div_left_right}>
        <div className={style.register}>
          <div className={style.logo}>
            <Logo />
            <p className={style.head}>READ JOURNEY</p>
          </div>
          <h1 className={style.regis_h1}>
            Expand your mind, reading
            <span className={style.regis_sp}> a book</span>
          </h1>

          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.input_group}>
              <label className={style.input_label}>Name:</label>

              <input className={style.form_input} {...register("name")} />
            </div>
            <p className={style.error_text}>{errors.name?.message}</p>
            <div className={style.input_group}>
              <label className={style.input_label}>Email: </label>
              <input
                className={style.form_input}
                type="email"
                {...register("email")}
              />
            </div>
            <p className={style.error_text}>{errors.email?.message}</p>
            <div className={style.input_group2}>
              <label className={style.input_label2}>Password:</label>

              <div className={style.password_wrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className={`${style.form_input2}
               ${hasError ? style.error : ""}
               ${isValid ? style.success : ""}`}
                  {...register("password")}
                />

                <span className={style.iconContainer}>
                  {hasError && <ErrorIcon className={style.errorIcon} />}
                  {isValid && <SuccessIcon className={style.successIcon} />}

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className={style.eyeWrapper}
                  >
                    {showPassword ? (
                      <EyeOffIcon className={style.eyeIcon} />
                    ) : (
                      <EyeIcon className={style.eyeIcon} />
                    )}
                  </span>
                </span>
              </div>
            </div>
            {hasError && (
              <p className={style.error_text}>{errors.password.message}</p>
            )}
            {isValid && (
              <p className={style.success_text}>Password is secure</p>
            )}
            -
            <div className={style.navs}>
              <button className={style.form_button} type="submit">
                Registration
              </button>
              <button
                type="button"
                className={style.navig}
                onClick={() => navigate("/login")}
              >
                Already have an account?
              </button>
            </div>
          </form>
        </div>
        <div className={style.register_right}>
          <img className={style.phone} src="/phone.png" alt="phone" />
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
