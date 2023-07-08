import React, { Component } from 'react'
import { connect } from 'react-redux'

class RegisterForm extends Component {
  
  

  handleChange=(e)=>{
    const {id,value} = e.target;
    const action = {
      type:'FORM_HANDLE_CHANGE',
      payload:{
        id:id,
        value:value
      }
    }
    this.props.dispatch(action);
  }

  handleSubmit= (e)=>{
    e.preventDefault();
    const validateId=(id)=>{
      const idValidate = this.props.arrRegisterReducer.findIndex(item => item.id===id);
      if(idValidate!==-1){
        document.querySelector('#error_id').innerHTML = 'ID đã tồn tại';
        return false;
      }
      else{
        document.querySelector('#error_id').innerHTML = '';
        return true;
      }
      
    }
    const {nameError,emailError,phoneError,idError} = this.props.arrErrorReducer;
    const {id} = this.props.registerReducer;
    if((nameError+emailError+phoneError+idError)==''&&validateId(id)){
      const action = {
        type:'ADD_REGISTER',
        payload:this.props.registerReducer
      }
      this.props.dispatch(action);
    }
  }
  render() {
    const {name,email,phone,id} = this.props.registerReducer;
    const {nameError,emailError,phoneError,idError} = this.props.arrErrorReducer;
    const {idInputState,addButtonState,editButtonState} = this.props.stateFormReducer;
    return (
      <div className='container'>
        <div className="card ">
          <div className="card-header bg-dark text-white">
            <p className='fs-3 text-start fw-fw-semibold'>Thông tin sinh viên</p>
          </div>
          <div className="card-body">
            <form action="" className='frm' onSubmit={this.handleSubmit}>
              <div className='row'>
              <div className="form-group col-sm-12 col-md-6  mt-3">
                <div className='d-flex justify-content-between'>
                  <p className='text-start'>Mã SV</p>
                  <p className='error_input text-end text-danger' id='error_id'>{idError}</p>
                </div>
                <input type="text" className='form-control' value={id} onChange={this.handleChange} id='id' disabled={idInputState}/>
              </div>
              <div className="form-group col-sm-12 col-md-6 mt-3">
                <div className='d-flex justify-content-between'>
                  <p className='text-start'>Họ và tên</p>
                  <p className='error_input text-end text-danger' id='error_name'>{nameError}</p>
                </div>
                <input type="text" className='form-control' value={name} onChange={this.handleChange} id='name'/>
              </div>
              <div className="form-group col-sm-12 col-md-6 mt-3">
                <div className='d-flex justify-content-between'>
                  <p className='text-start'>Số điện thoại</p>
                  <p className='error_input text-end text-danger' id='error_phone'>{phoneError}</p>
                </div>
                <input type="text" className='form-control' value={phone} onChange={this.handleChange} id='phone'/>
              </div>
              <div className="form-group col-sm-12 col-md-6 mt-3">
                <div className='d-flex justify-content-between'>
                  <p className='text-start'>Email</p>
                  <p className='error_input text-end text-danger' id='error_email'>{emailError}</p>
                </div>
                <input type="text" className='form-control' value={email} onChange={this.handleChange} id='email'/>
              </div>
              </div>
              <div className='text-start mt-3'>
              <button className="btn btn-success" type='submit' disabled={addButtonState}>Thêm sinh viên</button>
              <button className="btn btn-warning mx-2" type='button' disabled={editButtonState} onClick={()=>{
                const action ={
                  type:'EDIT_FORM_COMMIT',
                  payload:this.props.registerReducer
                }
                this.props.dispatch(action);
              }}>Cập nhật</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount(){

  }
}

const mapStateToProps = (state) => ({
  registerReducer:state.registerReducer,
  arrErrorReducer:state.arrErrorReducer,
  arrRegisterReducer:state.arrRegisterReducer,
  stateFormReducer:state.stateFormReducer
})


export default connect(mapStateToProps)(RegisterForm)
