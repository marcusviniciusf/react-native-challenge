import React from "react";
import PropTypes from "prop-types";
import {View, TouchableOpacity, StyleSheet} from "react-native";
import {Paper, Subtitle, Caption} from "material-bread";
// Assets and Constants
import colors from "../constants/colors";
// UI
import {Expander} from "./Expander";
import Status from "./Status";
import Blocks from "./Blocks";

const Node = (props) => {
  const {node, expanded, toggleNodeExpanded} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => toggleNodeExpanded(node)}>
      <Paper elevation={2} style={styles.container}>
        <View style={styles.headingContainer}>
          <Subtitle
            type={6}
            text={node.name || "Unknown"}
            style={styles.heading}
          />
          <Status loading={node.loading} online={node.online} />
        </View>
        <Caption
          text={node.url}
          color={colors.gray}
          style={styles.secondaryHeading}
        />
        <Expander expanded={expanded} style={styles.icon(expanded)} />
        <View style={styles.heading}>
          <Blocks url={node.url} open={expanded} />
        </View>
      </Paper>
    </TouchableOpacity>
  );
};

Node.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  expanded: PropTypes.bool,
  toggleNodeExpanded: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  heading: {
    marginTop: 5,
    color: colors.text,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingEnd: 30,
    alignItems: "center",
    width: "100%",
  },
  secondaryHeading: {
    marginTop: 5,
    color: colors.faded,
  },
  icon: (expanded) => ({
    position: "absolute",
    top: expanded ? 10 : 20,
    right: 10,
  }),
});

export default Node;
