import React, { useContext, useState, useEffect } from "react";

import { Context } from "../../Context/Context";

import "./style.css";

import { Card } from "react-bootstrap";

import { addDays, differenceInDays,format, eachDayOfInterval } from "date-fns";

import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme

function Calendar() {
  const { calendar, setCalendar, setRent } = useContext(Context);

  const [reserva, setReserva] = useState([]);
  
  //Ele transforma as datas do periodo para um formato aceitado pelo disableDates
  const reservado = reserva?.map((day) => format(new Date(day), 'P'))
  console.log("Os valores de reservado são", reservado);
  //variavel teste de disableDates ( eu selecionei o objeto retornado de um seleção ebotei para testar )
  const julia = [
    "11/22/2022",
    "11/23/2022",
    "11/24/2022",
    "11/25/2022",
    "11/26/2022"]

    console.log("As datas nesse intervalo são", reservado);

    // Aqui está desabilitando cada dia
    const bloqueio = julia?.map((day2) => new Date(day2))
    
    console.log("bloqueio = ", bloqueio)

  setRent(differenceInDays(calendar[0].endDate, calendar[0].startDate));

  // Responsividade do calendário
  const [months, setMonths] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 767px)");
    const listener = () => setMonths(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [months]);

  return (
    <>
      <Card className="calendar_container_card">
        <div className="calendar_container_card_dates">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => {
              //Muda o estado no calendário
              setCalendar([item.selection]);

              //Traz todas as  datas selecionadas
              setReserva(eachDayOfInterval({
                start: new Date(item.selection.startDate),
                end: new Date(item.selection.endDate)
              }),)
              //Simula o valor do aluguel e a quatidade de dias
              setRent(
                differenceInDays(
                  item.selection.endDate,
                  item.selection.startDate
                )
              );
            }}
            moveRangeOnFirstSelection={false}
            ranges={calendar}
            months={months ? 2 : 1}
            initialFocusedRang={0}
            locale={locales.pt}
            disabledDates={(bloqueio)}
            minDate={addDays(new Date(), 0)}
            maxDate={addDays(new Date(), 180)}
            scroll={{ calendarHeight: 100 }}
            direction="horizontal"
            preventSnapRefocus={true}
            dateDisplayFormat="dd/MM/yyyy"
            fixedHeight={true}
          />
        </div>
      </Card>
    </>
  );
}

export default Calendar;