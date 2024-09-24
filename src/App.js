import { Route, Routes } from "react-router-dom";
import CancelTransaction from "./components/CancelTransaction";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ConfirmPayment from "./components/ConfirmPayment";
import HeaderBar from "./components/HeaderBar";
import Navigation from "./components/Navigation";
import Preview from "./components/Preview";
import { CartProvider } from "./utils/CartContext";
import Header from "./components/Header";
import CarouselSection from "./components/CarouselSection";
import Shop from "./components/Shop";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  
  return (
    
    <div className="App flex flex-col min-h-screen">
    <CartProvider>
      <Header />
      <div className="flex-grow max-h-full">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </div>
      

      {/* <HeaderBar /> */}
      {/* <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/preview" element={<Preview />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cancel" element={<CancelTransaction /> } />
        <Route path="/confirm" element={ <ConfirmPayment /> } />
      </Routes> */}
      <Footer />
      <WhatsAppButton />
    </CartProvider>
    </div>
    );
}

export default App;
