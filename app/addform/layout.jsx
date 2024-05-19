import Navbar from "../../components/Navbar"

const layout = ({children}) => {
  return (
    <div>
        <Navbar />
        {children}</div>
  )
}

export default layout