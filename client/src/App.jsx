import React from "react";
import { Route, Routes } from "react-router-dom";
import Text from "./pages/Text.jsx";
import Image from "./pages/Image.jsx";
import File from "./pages/File.jsx";
import NavBar from "./components/NavBar.jsx";
import UrlEncode from "./pages/UrlEncode.jsx";
import JsonEscape from "./pages/JsonEscape.jsx";
import JsonUnescape from "./pages/JsonUnescape.jsx";
import UrlDecode from "./pages/UrlDecode.jsx";
const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Text />} />
        <Route path="/image-share" element={<Image />} />
        <Route path="/file-share" element={<File />} />
        <Route path="/url-encode" element={<UrlEncode />} />
        <Route path="/json-escape" element={<JsonEscape />} />
        <Route path="/json-unescape" element={<JsonUnescape />} />
        <Route path="/url-decode" element={<UrlDecode />} />
      </Routes>
    </div>
  );
};

export default App;
