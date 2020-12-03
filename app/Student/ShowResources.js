import React, { useState, Component } from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SubjectContent from "./SubjectContent";
import ExamPapers from "./ExamPapers";
import Library from "./Library";

export default class ShowResources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      TextbookResources: [],
      ExamResources: [],
      VideosResources: [],
      Resources: [],
      course_ids: [],
      subResource: [],
      modalVisible: false,
      isPortrait: true,
    };
  }

  render() {
    const Tab = createMaterialTopTabNavigator();
    return (
      <Tab.Navigator>
        <Tab.Screen name="Textbooks">
          {(props) => (
            <Library {...props} courseId={this.props.route.params.courseId} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Past Exam Papers">
          {(props) => (
            <ExamPapers
              {...props}
              courseId={this.props.route.params.courseId}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Videos Resources">
          {(props) => (
            <SubjectContent
              {...props}
              courseId={this.props.route.params.courseId}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }
}
