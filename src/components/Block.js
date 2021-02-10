import React, {useMemo} from "react";
import {View, StyleSheet} from "react-native";
import {BodyText, Overline} from "material-bread";
import PropTypes from "prop-types";

import colors from "../constants/colors";

const Block = (props) => {
  const {titleId, text} = props;
  const title = useMemo(() => {
    const toNumber = Number(titleId);
    if (toNumber < 10) {
      return `00${toNumber}`;
    } else if (toNumber > 10 && toNumber < 100) {
      return `0${toNumber}`;
    }
    return `${toNumber}`;
  }, [titleId]);
  return (
    <View style={styles.blockItem}>
      <Overline
        text={title}
        style={styles.blockItemTitle}
        color={colors.primaryDark}
      />
      <BodyText type={2} text={text} />
    </View>
  );
};

Block.propTypes = {
  titleId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  blockItem: {
    backgroundColor: "#d9d8d9",
    marginBottom: 8,
    padding: 8,
  },
  blockItemTitle: {
    marginBottom: 4,
  },
});

export default Block;
