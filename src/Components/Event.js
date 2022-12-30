import { Outlet } from "react-router-dom";

function Event(){
    return(
        <div>
            <h1>Event Page</h1>
            <Outlet/>
        </div>
    )
}

export default Event;
