import React, {useMemo} from "react";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

export const HomeCalendar = () => {
    const myEventsList = [
        {
            id: 1,
            title: 'Long Event',
            start: new Date(2024, 10, 12),
            end: new Date(2024, 10, 13),
        }, {
            id: 2,
            title: 'DTS STARTS',
            start: new Date(2024, 10, 13, 0, 0, 0),
            end: new Date(2024, 10, 20, 0, 0, 0),
        }, {
            id: 3,
            title: 'Some Other Event',
            start: new Date(2024, 10, 14, 8, 0, 0),
            end: new Date(2024, 10, 14, 11, 30, 0),
        },
    ];
    const { defaultDate} = useMemo(
        () => ({
            defaultDate: new Date(),
        }),
        []
    );
    const localizer = momentLocalizer(moment);
        return (
            <Calendar
                defaultDate={defaultDate}
                defaultView="week"
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '60vh' }}
            />
        );
}