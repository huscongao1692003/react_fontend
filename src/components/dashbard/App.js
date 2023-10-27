import MainDash from "../MainDash/MainDash";
import RightSide from "../RightSide/RightSide";
import Sidebar from "../Sidebar/Sidebar";
import dynamic from "next/dynamic";

function App() {
  return (
    <div className="App">
        <div className="AppGlass">
          <Sidebar/>
        </div>
    </div>
  );
}

export default dynamic (() => Promise.resolve(App), {ssr: false})

