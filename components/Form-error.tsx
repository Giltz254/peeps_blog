import { BsExclamationTriangle } from "react-icons/bs";

const Formerror = ({message}: {message?: string}) => {
    if (!message) return null;
  return (
    <div className="bg-red-100 p-3 rounded-md mb-2 flex items-center gap-x-2 text-sm text-red-500">
        <BsExclamationTriangle size={24} />
        <p>{message}</p>
    </div>
  )
}

export default Formerror