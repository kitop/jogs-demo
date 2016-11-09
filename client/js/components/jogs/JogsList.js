import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
import * as formatters from "../../utils/formatters";
import Jog from "./Jog";
import styles from "./styles.scss";

class JogsList extends React.Component {

  render() {
    return (
      <div className={ styles.list }>
        <h2>Jogs</h2>
        { this.renderGroups() }
        { this.emptyMessage() }
      </div>
    )
  }

  renderGroups() {
    if(!this.props.jogs) { return }

    let minDate = _.minBy(this.props.jogs, jog => jog.date );
    let maxDate = _.maxBy(this.props.jogs, jog => jog.date );

    let grouped = _.groupBy(this.props.jogs, jog => {
      let date = moment(jog.date);
      return [date.year(), date.week()].join(" ");
    });

    // TODO sort groups

    let renderedGroups = _.map(grouped, (value, key) => {
      let list = _.chain(value).sortBy(jog => jog.date).reverse().value()

      return this.renderGroup(key, list)
    })

    return renderedGroups;
  }

  renderGroup(week_key, jogs) {
    let date = moment(week_key, "YYYY w");
    let from = date.clone().startOf('week');
    let to = date.endOf('week');
    let distance = _.sumBy(jogs, jog => jog.distance);
    let averageSpeed = _.sumBy(jogs, jog => jog.average_speed) / jogs.length

    return (
      <div className={ styles.week} key={week_key}>
        <header className={ styles.weekHeader }>
          <div className={ styles.weekDates }>
            { from.format("MMMM Do YYYY") } - { to.format("MMMM Do YYYY") }
          </div>
          <div className={ styles.weekStats }>
            <div>
              Total Distance: <span className={ styles.totalDistance }>
                { formatters.formatDistance(distance) }
              </span>
            </div>
            <div>
              Average Speed: <span className={ styles.avgSpeed }>
                { formatters.formatSpeed(averageSpeed) }
              </span>
            </div>
          </div>
        </header>
        <div className={ styles.jogsList }>
          { jogs.map(jog => this.renderJog(jog)) }
        </div>
      </div>
    )
  }

  emptyMessage() {
    let children;
    if(this.props.jogs == null) {
      children = <div className={ styles.loading }>Loading...</div>
    } else if(this.props.jogs.length == 0) {
      children = <div className={ styles.empty }>No jogs logged yet!</div>
    }
    return children
  }

  renderJog(jog) {
    return (
      <Jog
        key={jog.id}
        jog={jog}
        onEditJog={this.props.onEditJog}
        onDeleteJog={this.props.onDeleteJog}
      />
    )
  }
}

export default JogsList;
