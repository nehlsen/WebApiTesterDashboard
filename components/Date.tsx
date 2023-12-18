import { parseISO, format } from 'date-fns';

export default function Date({ dateString, date }: { dateString?: string, date?: Date }) {
  const dateFormat = 'yyyy-MM-dd HH:mm';

  if (date) {
    return <time dateTime={date.toString()}>{format(parseISO(date.toString()), dateFormat)}</time>;
  }

  if (dateString) {
    return <time dateTime={dateString}>{format(parseISO(dateString), dateFormat)}</time>;
  }

  return (<></>)
}
