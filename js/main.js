const daysSection = document.getElementById("date-section"),
currentDate = document.getElementById("show-date");

let date = new Date(),
currentYear = date.getFullYear(),
currentMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

function  renderCalendar() {
    let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay(), 
    lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate(), 
    lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="past-month">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currentMonth === new Date().getMonth() 
                     && currentYear === new Date().getFullYear() ? "today" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="next-month">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currentMonth]} ${currentYear}`; // passing current month and year as currentDate text
    daysSection.innerHTML = liTag;
}
function changeMonth(button){
    currentMonth = button.id === "previous" ? currentMonth - 1 : currentMonth + 1;

        if(currentMonth < 0 || currentMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currentYear, currentMonth, new Date().getDate());
            currentYear = date.getFullYear(); // updating current year with new date year
            currentMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date();
        }
        renderCalendar();
}

const buttons = document.getElementsByClassName("changeMonth-btn");
Array.from(buttons).forEach(button => button.addEventListener("click",()=>{
    changeMonth(button)
}));

renderCalendar();
