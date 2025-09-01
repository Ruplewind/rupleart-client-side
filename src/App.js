import { Route, Routes, Navigate } from "react-router-dom";
import CancelTransaction from "./components/CancelTransaction";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ConfirmPayment from "./components/ConfirmPayment";
import HeaderBar from "./components/HeaderBar";
import Navigation from "./components/Navigation";
import Preview from "./components/Preview";
import SharedPreview from "./components/SharedPreview";
import { CartProvider } from "./utils/CartContext";
import Header from "./components/Header";
import CarouselSection from "./components/CarouselSection";
import Shop from "./components/Shop";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import WhatsAppButton from "./components/WhatsAppButton";
import Login from "./components/Login";
import Register from "./components/Register";
import MyProfile from "./components/MyProfile";
import Events from "./components/Events";
import MyAds from "./components/MyAds";
import { useContext } from "react";
import { AuthContext } from "./utils/AuthContext";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import FAQ from "./components/FAQ";
import TermsAndConditions from "./components/TermsAndConditions";
import ReturnPolicy from "./components/ReturnPolicy";
import HowItWorks from "./components/HowItWorks";
import DmcaNotice from "./components/DCMANotice";
import SuccessTransaction from "./components/SuccessTransaction";
import FailedTransaction from "./components/FailedTransaction";
import MyOrders from "./components/MyOrders";
import DeleteAccount from "./components/DeleteAccount";
import DownloadApk from "./components/DownloadApk";

function App() {

  const { token } = useContext(AuthContext);
  
  return (
    
    <div className="App flex flex-col min-h-screen">
    <CartProvider>
      <Header />
      <div className="flex-grow bg-gray-100">
        {/* <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/preview/:id" element={<SharedPreview />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/contact_us" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/return" element={<ReturnPolicy />} />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="/dcma" element={<DmcaNotice />} />
          <Route path="/confirm" element={<ConfirmPayment />} />
          <Route path="/cancel" element={<CancelTransaction />} />
          <Route path="/delete_account" element={<DeleteAccount />} />
          <Route path="/download_app" element={<DownloadApk />} />
        
        {
          token ?
          <> 
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/myads" element={<MyAds />} />
            <Route path="/orders" element={<MyOrders />} />
          </>
          :
          null
        }

        </Routes> */}
          <Routes>
  <Route path="/" element={<Shop />} />
  <Route path="/preview/:id" element={<SharedPreview />} />
  <Route path="/preview" element={<Preview />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/events" element={<Events />} />
  <Route path="/about_us" element={<AboutUs />} />
  <Route path="/contact_us" element={<ContactUs />} />
  <Route path="/faq" element={<FAQ />} />
  <Route path="/terms" element={<TermsAndConditions />} />
  <Route path="/return" element={<ReturnPolicy />} />
  <Route path="/howitworks" element={<HowItWorks />} />
  <Route path="/dcma" element={<DmcaNotice />} />
  <Route path="/confirm" element={<ConfirmPayment />} />
  <Route path="/cancel" element={<CancelTransaction />} />
  <Route path="/delete_account" element={<DeleteAccount />} />
  <Route path="/download_app" element={<DownloadApk />} />

  {/* Protected Routes */}
  <Route
    path="/checkout"
    element={token ? <Checkout /> : <Navigate to="/login" />}
  />
  <Route
    path="/profile"
    element={token ? <MyProfile /> : <Navigate to="/login" />}
  />
  <Route
    path="/myads"
    element={token ? <MyAds /> : <Navigate to="/login" />}
  />
  <Route
    path="/orders"
    element={token ? <MyOrders /> : <Navigate to="/login" />}
  />
</Routes>
      </div>
      <Footer />
      <WhatsAppButton />
    </CartProvider>
    </div>
    );
}

export default App;
