import React, {Fragment} from "react";
import PropTypes from "prop-types";
import formatInWordsToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";


export default function Time({ date }) {
  return <Fragment>{formatInWordsToNow(date, { addSuffix: true, locale: ruLocale })}</Fragment> 
}

Time.propTypes = {
  data: PropTypes.instanceOf(Date)
};
