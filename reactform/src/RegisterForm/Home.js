import React, { Component } from 'react'
import { connect } from 'react-redux'
import RegisterForm from './RegisterForm'
import TableRegister from './TableRegister'

class Home extends Component {
  render() {
    return (
      <div className='container'>
        <RegisterForm/>
        <TableRegister/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps)(Home)