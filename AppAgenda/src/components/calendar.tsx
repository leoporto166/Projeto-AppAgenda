

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { useNavigate } from "react-router-dom";





export default function Calendar() {


    const[dateClick, setDateClick] = useState<string | null>()
    const navigate = useNavigate()

  return (
    <div className=" bg-white  ">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        dateClick={(info: any) => {
            setDateClick(info.dateStr)
            console.log(dateClick)
            if(dateClick != undefined){
                navigate(`/Projeto-AppAgenda/${dateClick}`)

            }
        }}
      />
    </div>
  );
}