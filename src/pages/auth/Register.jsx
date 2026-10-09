import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const registerUser = async (data) => {

        try {

            const response = await fetch(
                "http://192.168.1.229:3001/api/auth/register",
                {
                    method: "POST",

                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        password: data.password
                    })
                }
            );

            const result = await response.json();

            console.log("Backend response:", result);

            if (response.ok) {

                alert("Registration successful!");

                reset();

                navigate("/login");

            } else {

                alert(
                    result.message ||
                    "Registration failed"
                );

            }

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            alert("Cannot connect to backend");
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1>Create Account</h1>

                <p className="auth-subtitle">
                    Register to start ordering
                </p>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit(registerUser)}
                >

                    <div className="form-group">

                        <label>
                            First Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter first name"
                            {...register("firstName", {
                                required: true
                            })}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Last Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter last name"
                            {...register("lastName", {
                                required: true
                            })}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true
                            })}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            {...register("password", {
                                required: true
                            })}
                        />

                    </div>


                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Register
                    </button>

                </form>


                <p className="auth-bottom">

                    Already have an account?

                    <button
                        type="button"
                        className="auth-link"
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Login
                    </button>

                </p>

            </div>

        </div>
    );
}

export default Register;