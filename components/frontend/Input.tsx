"use client";
import React, { useState, forwardRef } from "react";
import { IconType } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoMailOpenOutline, IoLockClosedOutline } from "react-icons/io5"; // Import icons
import { LiaHeadingSolid } from "react-icons/lia";
import { LuUser2 } from "react-icons/lu";
import { MdMailOutline, MdOutlineTopic } from "react-icons/md";
import { SlLock } from "react-icons/sl";

interface InputProps {
  placeholder?: string;
  type: string;
  name: string;
  id?: string;
  icon?: string;
  className?: string;
  onFocus?: () => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  value?: string;
  disabled?: boolean;
}

const iconMapping: { [key: string]: IconType } = {
  IoMailOpenOutline,
  IoLockClosedOutline,
  SlLock,
  MdMailOutline,
  LuUser2,
  LiaHeadingSolid,
  MdOutlineTopic
};

const Input = forwardRef<HTMLInputElement, InputProps>(({
  placeholder,
  type,
  name,
  id,
  className,
  onFocus,
  onBlur,
  autoComplete,
  onChange,
  onKeyDown,
  defaultValue,
  required,
  value,
  disabled,
  icon
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  const Icon = icon ? iconMapping[icon] : null;
  return (
    <div
      className={`flex items-center border rounded-full overflow-hidden h-12 border-border ${className} focus-within:ring-2 focus-within:ring-secondary`}
    >
      {Icon && <Icon size={22} className="mr-2 ml-5" />}
      <input
        ref={ref}
        type={showPassword && type === "password" ? "text" : type}
        placeholder={placeholder}
        name={name}
        id={id}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete={autoComplete}
        onChange={onChange}
        onKeyDown={onKeyDown}
        defaultValue={defaultValue}
        required={required}
        value={value}
        disabled={disabled}
        className="flex-1 h-full w-full border-0 outline-0 bg-transparent placeholder:text-sm placeholder:font-medium placeholder:text-muted-foreground autofill:bg-transparent text-sm font-medium text-black"
      />
      {type === "password" && (
        <div onClick={togglePasswordVisibility} className="cursor-pointer mx-2">
          {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
        </div>
      )}
    </div>
  );
});

export default Input;
