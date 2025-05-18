import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import ChatWindow from "./components/ChatWindow"

function App() {
  return (
    <div className="w-full h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<ChatWindow />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;