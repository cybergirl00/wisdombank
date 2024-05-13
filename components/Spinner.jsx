import { Audio } from 'react-loader-spinner'
const Spinner = ({message}) => {
  return (
    <div className="flex items-center justify-center">
    <div classname='flex items-center justify-center flex-col text-primary gap-3'>
        <Audio
  height="100"
  width="100"
  color="black"
  ariaLabel="audio-loading"
  wrapperStyle={{}}
  wrapperClass="wrapper-class"
  visible={true}
  />
  <h2 className='text-primary font-bold text-lg'>{message}</h2>
    </div>
    </div>
  )
}

export default Spinner