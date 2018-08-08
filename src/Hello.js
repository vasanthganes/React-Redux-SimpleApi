import React, { Component } from 'react';
import { Provider,connect } from 'react-redux'
import { fetchUsers } from "./actions";


class Hello extends Component {
  constructor(){
   super();
    this.state = {
      departments: ['hr', 'engineering'],
      employees:{"hr":[1,2,3,4,5],"engineering":[6,7,8,9,10]},
      employeeId:"1", department:"hr",avatar:'',user:[]

    };
  this.departmentChange = this.departmentChange.bind(this);
  this.getSecondLevelField = this.getSecondLevelField.bind(this);
  this.changeEmployeeId = this.changeEmployeeId.bind(this);
  this.getUser = this.getUser.bind(this)

  }
  

   departmentChange = e => {

      if(e.target.value=='hr'){
        this.setState({ employeeId: 1 });
      }else{
         this.setState({ employeeId: 6 });
      }
      this.setState({ department: e.target.value });
    }

    changeEmployeeId = e => {
      this.setState({ employeeId: e.target.value });
    }


    getUser = e =>{
       this.setState({ user: "" });
      e.preventDefault();
      this.props.dispatch(fetchUsers(this.state.employeeId)).then(data=>{
          this.setState({ avatar: data.avatar });
          this.setState({ user: data });
      });
  
      return true;
    }


    getSecondLevelField= function () {
        if (!this.state.department) {
          return null;
        }
    let userList = this.state.employees[this.state.department].map((val) =>
      <option key={val} value={val}>{val}</option> 
    );

    return (
        <select className="custom-select mr-sm-2" value={this.state.employeeId} onChange={this.changeEmployeeId}>
       {userList}
       </select>
    )
  }

  render() {

    const { error, loading, user } = this.props;
    const listItems = this.state.departments.map((val) => <option value={val} key={val}>{val}</option> );

    const isUser = this.state.user.avatar;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
       <form style={{margin: '10px'}}>
      <div className="form-group row">
          <label className="col-sm-2 col-form-label">Departments</label>
          <div className="col-sm-10">
            <select className="custom-select mr-sm-2" onChange={this.departmentChange}>
                {listItems}
            </select>
          </div>
      </div>

      <div className="form-group row">
          <label className="col-sm-2 col-form-label">Employee Id</label>
          <div className="col-sm-10">
             {this.getSecondLevelField()}
          </div>
      </div>
       <div>
          <button className="btn btn-primary mb-2" onClick={this.getUser}>Get User</button>
          <span style={{marginLeft: '10px'}}> </span>
            <button className="btn btn-primary mb-2" onClick={()=> this.setState({ user: "" }) }>Clear</button>
        </div>
      </form>
       <div>
        {isUser ? (
          <div style={{width:'200px',margin:'0 auto'}}>
          <img className="card-img-top" src={this.state.user.avatar}/>
          <div className="card-body">
           <p>ID: {this.state.user.id} Name : {this.state.user.first_name}</p>
          </div>
          </div>
          ):(<div></div>)
     }
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user,
  loading: state.loading,
  error: state.error
});

export default connect(mapStateToProps)(Hello)


