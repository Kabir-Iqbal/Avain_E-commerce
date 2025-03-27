import Footer from "../components/footer"
import Header from "../components/header"


function Page() {
  return (
    <div>
         {/* Header */}
        <Header />
          
          <div className="my-40 text-center font-extrabold font-santoshi mb-48 " >
          404 - Page Not Found
          </div>

          {/* footer */}
        <Footer />  
    </div>
  )
}

export default Page
