import React, { Fragment } from "react";
import formatInWordsToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";

type Props = {
  date: Date;
};
const Time: React.FC<Props> = ({ date }) => {
  return (
    <Fragment>
      {formatInWordsToNow(date, { addSuffix: true, locale: ruLocale })}
    </Fragment>
  );
};

export default Time;
