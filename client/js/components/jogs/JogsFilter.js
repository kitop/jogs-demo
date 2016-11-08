import React from "react";
import styles from "./styles.scss";

class JogsFilter extends React.Component {

  render () {
    return (
      <div className={ styles.filters }>
        <h2>Filter</h2>
        <div>
          <label>From</label>
          <input type="date" ref="dateFrom"/>
        </div>
        <div>
          <label>To</label>
          <input type="date" ref="dateTo"/>
        </div>
        <div>
          <button>Filter</button>
        </div>
      </div>
    )
  }
}

export default JogsFilter;
