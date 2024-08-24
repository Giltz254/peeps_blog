import { FaRegCheckCircle } from "react-icons/fa";

const FormSuccess = ({message, className}: {message?: string, className?: string}) => {
    if (!message) return null;
  return (
    <div className={`bg-emerald-500/15 ${className} p-3 mb-2 rounded-md flex items-center gap-x-2 text-sm text-primary`}>
        <FaRegCheckCircle size={24} />
        <p>{message}</p>
    </div>
  )
}

export default FormSuccess