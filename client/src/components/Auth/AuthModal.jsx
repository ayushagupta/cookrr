import React, { useState } from "react";
import Modal from "react-modal";
import PasswordInput from "../Input//PasswordInput";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
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

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setPasswordAgain("");
        setError("");
        onClose();
      }}
      style={{
        overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
      }}
      className="w-[400px] bg-white mx-auto mt-32 p-6 rounded-md shadow"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-center font-semibold">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

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
