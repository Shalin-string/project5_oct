import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://192.168.1.229:3001/api/auth/login",
                {
                    method: "POST",

                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            console.log("Login response:", data);

            if (response.ok) {

                alert("Login successful!");

                if (data.token) {
                    localStorage.setItem(
                        "token",
                        data.token
                    );
                }

                if (data.role) {
                    localStorage.setItem(
                        "role",
                        data.role
                    );
                }

                if (data.role === "ADMIN") {

                    navigate("/admin");

                } else {

                    navigate("/user/menu");

                }

            } else {

                alert(
                    data.message ||
                    "Invalid email or password"
                );

            }

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            alert("Cannot connect to backend");
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1>Welcome Back</h1>

                <p className="auth-subtitle">
                    Login to continue ordering
                </p>

                <form
                    className="auth-form"
                    onSubmit={loginUser}
                >

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Login
                    </button>

                </form>


                <p className="auth-bottom">

                    Don't have an account?

                    <button
                        type="button"
                        className="auth-link"
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Register
                    </button>

                </p>

            </div>

        </div>
    );
}

export default Login;