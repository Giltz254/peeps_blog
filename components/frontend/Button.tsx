interface ButtonProps {
    title: string;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    type?: "submit" | "reset" | "button";
}

const Button = ({onClick, type, className, disabled, children, title}:ButtonProps) => {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`relative flex items-center justify-center gap-2 h-12 overflow-hidden rounded bg-primary px-5 py-2.5 text-white transition-all duration-300 hover:bg-primary/80 hover:ring-2 hover:ring-primary hover:ring-offset-2 ${className}`}>
        {children}
      <span className="relative text-sm font-medium">{title}</span>
    </button>
  );
};

export default Button;
