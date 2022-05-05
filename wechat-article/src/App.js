import "./App.css";
import { Routes, Route } from "react-router-dom";
import List from "./components/List";
import Detail from "./components/Detail";
import AdminContainer from "./views/admin";
import AcountContainer from "./views/admin/Account/index";
import NotFoundContainer from "./views/admin/NotFound";

function App() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/admin" element={<AdminContainer />}>
                    <Route index element={<AcountContainer />}></Route>
                    <Route path="account" element={<AcountContainer />}></Route>
                    <Route path='*' element={<NotFoundContainer />}></Route>
                </Route>
                <Route path="/detail" element={<Detail />} />
            </Routes>
        </div>
    );
}
export default App;
