import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {NewExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import testIDs from '../testIDs';
import {agendaItems, getMarkedDates} from '../mocks/agendaItems';
import AgendaItem from '../mocks/AgendaItem';
import {getTheme, themeColor, lightThemeColor} from '../mocks/theme';

const ITEMS: any[] = agendaItems;
const leftArrowIcon = require('../img/previous.png');
const rightArrowIcon = require('../img/next.png');

interface Props {
  weekView?: boolean;
}

export default class NewExpandableCalendarScreen extends Component<Props> {
  marked = getMarkedDates();
  theme = getTheme();
  todayBtnTheme = {
    todayButtonTextColor: themeColor
  };

  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  renderItem = ({item}: any) => {
    return <AgendaItem item={item}/>;
  };

  render() {
    return (
      <CalendarProvider
        date={ITEMS[1].title}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
        theme={this.todayBtnTheme}
        // todayBottomMargin={16}
      >
        {this.props.weekView ? (
          <WeekCalendar testID={testIDs.weekCalendar.CONTAINER} firstDay={1} markedDates={this.marked}/>
        ) : (
          <NewExpandableCalendar
            testID={testIDs.expandableCalendar.CONTAINER}
            leftArrowImageSource={leftArrowIcon}
            rightArrowImageSource={rightArrowIcon}
            // disablePan
            // hideKnob
            // disableWeekScroll
            // initialPosition={ExpandableCalendar.positions.OPEN}
            // calendarStyle={styles.calendar}

            calendarListProps={{
              // horizontal: false,
              // animateScroll: true
              calendarProps: {
                theme: this.theme,
                firstDay: 1,
                markedDates: this.marked,
                // hideArrows: true,
                // disableAllTouchEventsForDisabledDays: true
                // headerStyle={styles.calendar} // in ExpandableCalendar - for horizontal only
              }
            }}
          />
        )}
        <AgendaList
          sections={ITEMS}
          renderItem={this.renderItem}
          // scrollToNextEvent
          // sectionStyle={styles.section}
          // dayFormat={'YYYY-MM-d'}
        />
      </CalendarProvider>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize'
  }
});
