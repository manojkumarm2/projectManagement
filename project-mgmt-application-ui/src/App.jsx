import React, {
  Component
} from 'react';
import logo from './assets/images/PMServices.png';
import './App.css';
import User from './assets/components/user/User';
import Project from './assets/components/project/Project';
import ViewTask from './assets/components/task/ViewTask';
import AddTask from './assets/components/task/AddTask';
import { Navbar, NavbarBrand, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import request from 'request';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      userList: props.userList || [],
      projectsList: props.projectsList || [],
      taskList: props.taskList || [],
      parentTaskList: props.parentTaskList || [],
    };
  }

  componentWillReceiveProps(props) {
    console.log(props)
    this.setState({
        activeTab: props.activeTab 
    });
}

  componentDidMount() {
    var dis = this;
    request
      .get('http://localhost:3000/spi/users/getAllUsers', function (err, httpResponse, body) {
        console.log(err);
        console.log(httpResponse);
        console.log(body);
        dis.setState({
          userList: JSON.parse(body)
        })
      });

      request
      .get('http://localhost:3000/spi/projects/getAllProjects', function (err, httpResponse, body) {
        console.log(err);
        console.log(httpResponse);
        console.log(body);
        dis.setState({
          projectsList: JSON.parse(body)
        })
      });

      request
      .get('http://localhost:3000/spi/tasks/getAllTasks', function (err, httpResponse, body) {
        console.log(err);
        console.log(httpResponse);
        console.log(body);
        dis.setState({
          taskList: JSON.parse(body)
        })
      });

      request
      .get('http://localhost:3000/spi/tasks/getAllParentTasks', function (err, httpResponse, body) {
        console.log(err);
        console.log(httpResponse);
        console.log(body);
        dis.setState({
          parentTaskList: JSON.parse(body)
        })
      });

  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <div className="app-branding">
          
          <Navbar color="light" light expand="md" sticky="top">
          <NavbarBrand href="/" ><img srcSet={logo} width="250" height="90" /> Project Manager Home</NavbarBrand>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Add Project
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Add Task
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
              >
                Add User
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '4' })}
                onClick={() => { this.toggle('4'); }}
              >
                View Task
            </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        </div>
        <div className="app-container">
        
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <Project userList={this.state.userList} projectsList={this.state.projectsList} addProject={(projects)=>this.addProject(projects)}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <AddTask userList={this.state.userList} projectsList={this.state.projectsList} currentTask={this.state.currentTask} parentTaskList={this.state.parentTaskList}
                    addOrEditTask={(userAction, task) => this.addOrEditTask(userAction, task)} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <User userList={this.state.userList} addOrEditUser={(userList)=>this.addOrEditUser(userList)}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="4">
              <Row>
                <Col sm="12">
                  <ViewTask taskList={this.state.taskList} projectsList={this.state.projectsList} editTask={(userAction, task) => this.editTask(userAction, task)}/>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }

  addProject(projects){
    this.setState({
      projectsList: projects
    });
  }

  addOrEditUser(userList){
    this.setState({
      userList: userList
    });
  }

  addOrEditTask(userAction, taskList) {
    this.setState({
      taskList: taskList
    });
  }

  editTask(userAction, task) {
    if(userAction === 'editTask'){
      this.setState({
        currentTask: task,
        activeTab: '2'
      });
    } else {
      var dis = this;
      request.post(
        {
          url: 'http://localhost:3000/spi/tasks/endTask',
          json: task
        },
        function (err, httpResponse, body) {
          console.log(body);
          dis.setState({
            taskList: body,
            addUserResponse: {
              status: 'success'
            }
          });
        }
      );
    }

  }

}

export default App;