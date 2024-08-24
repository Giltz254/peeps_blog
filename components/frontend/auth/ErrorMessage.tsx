const ErrorMessage = ({message}: {message: string}) => {
    return (
      <div>
          <p className='text-sm font-normal leading-7 text-destructive'>{message}</p>
      </div>
    )
  }
  
  export default ErrorMessage