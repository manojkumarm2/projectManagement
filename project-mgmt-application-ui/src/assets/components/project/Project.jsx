import React, { Component } from 'react';
import './Project.css';
import 'react-rangeslider/lib/index.css';
import AddProject from './AddProject';
import ShowProjects from './ProjectsList';
import request from 'request';
import {
    Row,
    Modal, ModalBody, Spinner
} from 'reactstrap';

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userAction: props.userAction || 'addProject',
            userList: props.userList,
            currentProject: props.currentProject || {},
            projectsList: props.projectsList || []
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("Next set of props")
        console.log(nextProps)
        this.setState({
            userList: nextProps.userList || [],
            projectsList: nextProps.projectsList || []
        });

    }

    render() {
        return (
            <div>
                <div className="addproject-section">
                    <AddProject userList={this.state.userList} currentProject={this.state.currentProject}
                        addProject={(userAction, projectDetails) => this.addProject(userAction, projectDetails)}
                        userAction={this.state.userAction} />
                </div>
                <div className="addproject-divider">

                </div>
                <div>
                    <ShowProjects projectsList={this.state.projectsList} updateProject={(project) => this.updateProject(project)} />
                </div>
                <Modal isOpen={this.state.showLoadingModal}>
                    <ModalBody>
                        <Row>
                            <Spinner color="dark" />
                        </Row>
                        <Row>
                            <p>Saving user action. Please wait...</p>
                        </Row>

                    </ModalBody>
                </Modal>
            </div>
        );
    }

    addProject(userAction, projectDetails) {
        this.setState({
            showLoadingModal: true
        });
        var dis = this;
        request.post(
            {
                url: 'http://localhost:3000/spi/projects/addUpdate',
                json: projectDetails
            },
            function (err, httpResponse, body) {
                console.log(body);
                dis.setState({
                    projectsList: body,
                    currentProject: {},
                    userAction: '',
                    showLoadingModal: false
                });
                dis.props.addProject(body);
            }
        );

    }

    updateProject(project) {
        this.setState({
            currentProject: project,
            userAction: 'updateProject'
        });
    }

}

export default Project;
