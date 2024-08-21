
export function formatDateTime(date:any) {
    const now = new Date();
    const inputDate = new Date(date);
  
    // Get time components
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  
    // Check if the date is today, yesterday, or earlier
    const isToday = now.toDateString() === inputDate.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === inputDate.toDateString();
  
    if (isToday) {
      return {
        date:"Today",
        time: formattedTime
      };
    } else if (isYesterday) {
        return {
            date:"Yesterday",
            time: formattedTime
          };
    } else {
      const formattedDate = inputDate.toLocaleDateString(); 
      return{
            date:formattedDate,
            time: formattedTime
      }
    }
  }