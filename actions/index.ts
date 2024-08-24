import { DEFAULT_WEBSITE_URL } from "@/constants";

export const uploadImage = async (imagePath: string) => {
    try {
      const response = await fetch(`${DEFAULT_WEBSITE_URL}/api/upload`, {
        method: "POST",
        body: JSON.stringify({
          path: imagePath,
        }),
      });
      return response.json();
    } catch (err) {
      throw err;
    }
  };
  export const Post_Per_Page = 10;
  
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
export const getDay = (timestamp: Date) => {
  let date = new Date(timestamp);
  return `${date.getDate()} ${months[date.getMonth()]}`
}
export const getFullDay = (timestamp: Date) => {
    let date = new Date(timestamp);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}