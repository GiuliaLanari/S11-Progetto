import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SideBarVertical from "./components/SiderBarVertical";
import Main from "./components/Main";
import NavBarFlexBootom from "./components/NavBarFlexBootom";

function App() {
  return (
    <>
      <SideBarVertical />
      <Main />
      <NavBarFlexBootom />
    </>
  );
}

export default App;
