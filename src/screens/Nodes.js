import React, {useState, useEffect, useCallback} from "react";
import PropTypes from "prop-types";
import {StyleSheet, ScrollView} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Heading} from "material-bread";
// Redux
import * as allActions from "../actions/nodes";
// UI
import Node from "../components/Node";

export const Nodes = (props) => {
  const {actions, nodes} = props;
  const {list} = nodes;
  const [expandedNodeURL, setExpandedNodeURL] = useState(null);

  const doInitialFetch = useCallback(() => {
    actions.checkNodeStatuses(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions]);

  useEffect(() => {
    doInitialFetch();
  }, [doInitialFetch]);

  const toggleNodeExpanded = (node) => {
    setExpandedNodeURL((p) => (node.url === p ? null : node.url));
  };
  return (
    <ScrollView>
      <Heading style={styles.heading} type={4}>
        Nodes
      </Heading>
      {nodes.list.map((node) => (
        <Node
          node={node}
          key={node.url}
          expanded={node.url === expandedNodeURL}
          toggleNodeExpanded={toggleNodeExpanded}
        />
      ))}
    </ScrollView>
  );
};

Nodes.propTypes = {
  actions: PropTypes.object.isRequired,
  nodes: PropTypes.object.isRequired,
};
const styles = StyleSheet.create({
  heading: {marginLeft: 30, marginTop: 45, fontWeight: "700"},
});

function mapStateToProps(state) {
  return {
    nodes: state.nodes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(allActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nodes);
