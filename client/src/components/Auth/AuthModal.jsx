import React, { useState, useContext } from "react";
import Modal from "react-modal";
import PasswordInput from "../Input//PasswordInput";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (!isLogin && password !== passwordAgain) {
      setError("Passwords should match.");
      return;
    }

    setError("");

    // API call
    const apiPath = isLogin ? "/api/auth/login" : "/api/auth/signup";

    try {
      const payload = isLogin
        ? { email, password }
        : { fullName, email, password };

      const res = await axios.post(apiPath, payload);
      const { user, token } = res.data;

      localStorage.setItem("cookrr-token", token);
      localStorage.setItem("cookrr-user", JSON.stringify(user));
      setCurrentUser(user);

      navigate("/");

      handleClose();
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(msg);
    }
  };

  const handleClose = () => {
    setIsLogin(true);
    setFullName("");
    setEmail("");
    setPassword("");
    setPasswordAgain("");
    setError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={{
        overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
      }}
      className="w-[400px] bg-white mx-auto mt-32 p-6 rounded-md shadow"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-center font-semibold">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border px-4 py-3 rounded mb-4 text-sm outline-none"
          />
        )}

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-3 rounded mb-4 text-sm outline-none"
        />

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isLogin && (
          <PasswordInput
            placeholder="Re-enter Password"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
        )}

        {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition-colors"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-4">
          {isLogin ? "Not registered yet?" : "Already have an account?"}{" "}
          <span
            className="font-medium text-orange-600 underline cursor-pointer"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "Create an Account" : "Login"}
          </span>
        </p>
      </form>
    </Modal>
  );
};

export default AuthModal;
