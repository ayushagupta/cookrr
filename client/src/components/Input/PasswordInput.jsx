import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center border border-gray-300 px-4 py-3 rounded mb-4">
      <input
        type={isShowPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent outline-none"
      />
      <button type="button" onClick={toggleShowPassword}>
        {isShowPassword ? (
          <FaRegEye className="text-orange-600 ml-2" size={20} />
        ) : (
          <FaRegEyeSlash className="text-gray-400 ml-2" size={20} />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
