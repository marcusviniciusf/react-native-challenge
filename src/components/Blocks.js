import React, {useEffect, useState} from "react";
import {ActivityIndicator, View, StyleSheet} from "react-native";
import {Overline} from "material-bread";
import PropTypes from "prop-types";
// Components
import Block from "./Block";
// Assets and Constants
import colors from "../constants/colors";

export const Blocks = (props) => {
  const {url, open} = props;

  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function doFetchBlocksByUrl() {
      try {
        setLoading(true);
        const response = await fetch(`${url}/api/v1/blocks`).then((r) =>
          r.json(),
        );
        const {data} = response;
        setLoading(false);
        setError(false);
        setBlocks(data);
      } catch (error) {
        console.log("error: ", error);
        setError(true);
        setLoading(false);
      }
    }
    if (url && open && blocks.length === 0) {
      doFetchBlocksByUrl();
    }
  }, [url, open, blocks]);

  if (!open) {
    return null;
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator color={colors.gray} />
      </View>
    );
  }

  if (error) {
    return <Overline style={styles.error} color={colors.danger} text="Error" />;
  }

  return (
    <View style={styles.blocksList}>
      {blocks.map((item) => {
        return (
          <Block
            key={item.id}
            titleId={item.id}
            text={item?.attributes?.data || ""}
            style={styles.blockListItem}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  blocksList: {
    marginTop: 10,
  },
  error: {
    marginTop: 10,
  },
});

Blocks.propTypes = {
  url: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Blocks;
