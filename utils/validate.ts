interface Event {
  id: number;
  user_id: number;
  title: string;
  description: string;
  date_time_start: string;
  date_time_end: string;
  is_private: boolean;
  created_at: string;
  user: {
    id: number;
    email: string;
    created_at: string;
  };
}

interface TransformedEvent {
  id: string;
  name: string;
  height: number;
  day: string;
}

interface TransformedData {
  [date: string]: TransformedEvent[];
}

// Function to validate and filter data based on selected date
export const filterBySelectedDate = (data: any, selectedDate: any) => {
  return data?.filter((item: any) => {
    // Extract only the date part from the 'date_time_start' field
    const itemDate = item.date_time_start.split(" ")[0];
    // Compare with the selected date
    return itemDate === selectedDate;
  });
};

export const transformData = (data: Event[]): TransformedData => {
  const result: TransformedData = {};

  data?.forEach((event) => {
    // Extract the date from date_time_start
    const date = event.date_time_start.split(" ")[0]; // "YYYY-MM-DD"

    // Create the event object with desired structure
    const eventData: TransformedEvent = {
      id: String(event.id),
      name: event.title, // Assuming title is used as name
      height: 50, // Placeholder value as in example
      day: date,
    };

    // Initialize the date array if it doesn't exist
    if (!result[date]) {
      result[date] = [];
    }

    // Add the event to the correct date
    result[date].push(eventData);
  });

  return result;
};
