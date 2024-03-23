export const getWelcome = () => {
    const hour = new Date().getHours();
    if(hour < 24) return "Good evening!"
    else if(hour < 18) return "Good afternoon"
    else if(hour < 12) return "Good morning"
    else if(hour < 6) return "it's too late"
  }