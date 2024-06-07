import react from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CreatePlant from "./pages/CreatePlant";
import ShowPlant from "./pages/ShowPlant";
import EditPlant from "./pages/EditPlant";
import DeletePlant from "./pages/DeletePlant";

const App = () => {
  return (
    <Routes>
      <Route path = "/plants/:id" element = {<ShowPlant/>}/> 
      <Route path="/plants/create" element={<CreatePlant />} />
      <Route path = "/plants/:id/edit" element = {<EditPlant/>}/>
      <Route path = "/plants/:id/delete" element = {<DeletePlant/>}/>
      <Route path="/plants" element={<Homepage />} />
    </Routes>
  )
}

export default App;
