export const formatDate = (isoDateString: any) => {
  const date = new Date(isoDateString);

  // Format the date to "YYYY-MM-DD HH:mm:ss"
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = "14"; // Static hour as per your request
  const minutes = "00"; // Static minutes
  const seconds = "00"; // Static seconds

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const convertDateToLongFormat = (dateString: any) => {
  const date = new Date(dateString);

  // Get month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get components of the date
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  // Format as "Month Day, Year"
  return `${month} ${day}, ${year}`;
};

export const convertToISOString = (dateString: any) => {
  const date = new Date(dateString.replace(" ", "T") + "Z");
  return date.toISOString();
};
