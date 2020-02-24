import React from 'react'
import styled from 'styled-components'

const SBudget = styled.div `

`

class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputBudget: null,
      submittedBudget: null,
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({submittedBudget: this.state.inputBudget});
  }

  onChange = (e) => {
    this.setState({inputBudget: e.target.value});
  }

  render() {
    return (
      <SBudget>
        <form onSubmit={this.onSubmit}>
          <h2>Enter your month's budget.</h2>
          <input type="number" step="0.001" onChange={this.onChange} required/>
          <input type="submit" value="This Is My Budget"/>
        </form>
        <h1>{this.state.submittedBudget === null ? '' : `${this.state.submittedBudget} euros`}</h1>
        <section>

        </section>
      </SBudget>
    );
  }
}

export default Budget;