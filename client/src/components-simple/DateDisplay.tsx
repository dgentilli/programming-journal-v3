import { format, parseISO } from 'date-fns';
import Typography from '@mui/joy/Typography';

interface DateDisplayProps {
  dateString: string;
  format?: 'PPp' | 'EEEE, MMMM do, yyyy';
  /** date-fns can return a wide range of date formats
   * add some type safety here, but keep in simple for now
   * add formats as needed. right now, there are not so many use cases in this small app
   */
}

const formatDate = (dateString: string, formatString = 'PPp') => {
  try {
    // parseISO handles ISO 8601 strings like "2025-08-01T07:14:48.698Z"
    const date = parseISO(dateString);
    return format(date, formatString);
  } catch (error) {
    console.error('Invalid date string:', error);
    return 'Invalid date';
  }
};

const DateDisplay = (props: DateDisplayProps) => {
  const { dateString, format } = props;
  const formattedDate = formatDate(dateString, format);

  return <Typography>{formattedDate}</Typography>;
};

export default DateDisplay;
