import React, { Component } from 'react'
import { connect } from 'react-redux'

class TableRegister extends Component {
  state = {
    registerReducer:this.props.registerReducer
  }
  handleChange=(e)=>{
    let {value} = document.querySelector('#searchInput');
    const action = {
      type:'GET_ARR_REGISTER',
      payload:value
    }
    this.props.dispatch(action);
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    this.handleChange();
  }
  componentDidMount(){
    this.handleChange();
  }
  render() {

    return (
      <div className='container mt-3'>
        <form className="form-group d-flex justify-content-end align-items-baseline" onSubmit={this.handleSubmit}>
          <input type="text" className="form-control my-2 w-25 " id='searchInput' onChange={this.handleChange}/>
          <i className="fa fa-search fs-4 mx-2" type='submit'></i>
        </form>
        <table className='table'>
            <thead className='text-white bg-dark'>
                <tr className='py-5'>
                    <th >Mã SV</th>
                    <th >Họ và tên</th>
                    <th >Số điện thoại</th>
                    <th >Email</th>
                    <th ></th>
                </tr>
            </thead>
            <tbody>
                {this.props.registerReducer.map((item,index)=>{
                    return <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td><button className="btn btn-danger my-0" onClick={()=>{
                          const action = {
                            type:'DELETE_REGISTER',
                            payload:{
                              id:item.id
                            }
                          }
                          this.props.dispatch(action);
                        }}>Delete</button>
                        <button className="btn btn-primary mx-2" onClick={()=>{
                          const action = {
                            type:'EDIT_REGISTER',
                            payload:item
                          }
                          this.props.dispatch(action);
                        }}>Edit</button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    registerReducer:state.arrRegisterReducer
})


export default connect(mapStateToProps)(TableRegister)