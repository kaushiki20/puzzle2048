import React from "react";
import * as actions from "../../actions/index";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { flattenTiles } from "../../utils/index";
import "./tiles.css";

const Tiles = ({ flatTiles }) => {
  return (
    <div className="tile-container">
      {flatTiles.map((tile, index) => (
        <Tile key={"tile-" + tile.uuid + index} {...tile}></Tile>
      ))}
    </div>
  );
};

Tiles.propTypes = {
  flatTiles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    flatTiles: flattenTiles(state.tiles),
    tile: state.tiles,
  };
};

export default connect(mapStateToProps, null)(Tiles);

const TILE_WIDTH = 100;
const TILE_GAP = 10;

let Tile = (props) => {
  let { col, row } = props;

  let classMap = {
    tile: true,
    [`tile-${props.number}`]: true,
    "tile-new": props.newGenerated,
    "tile-merged": !!props.newMerged,
  };

  let classNames = Object.keys(classMap)
    .filter((cls) => !!classMap[cls])
    .join(" ");
  let x = col * (TILE_WIDTH + TILE_GAP) + "px";
  let y = row * (TILE_WIDTH + TILE_GAP) + "px";
  let style = { transform: `translate3d(${x}, ${y}, 0)` };
  return (
    <div className={classNames} style={style}>
      <div className="tile-inner" onAnimationEnd={props.onAnimationEnd}>
        {props.number}
      </div>
    </div>
  );
};

Tile.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  newGenerated: PropTypes.bool.isRequired,
  newMerged: PropTypes.bool.isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
};

const mapDispatchToTileProps = (dispatch, ownProps) => {
  return {
    onAnimationEnd({ animationName }) {
      let { col, row } = ownProps;
      if (animationName === "a-tile-new") {
        dispatch(actions.resetNewGeneratedTileTag({ col, row }));
      } else if (animationName === "a-tile-merged") {
        dispatch(actions.resetNewMergedTileTag({ col, row }));
      }
    },
  };
};

Tile = connect(null, mapDispatchToTileProps)(Tile);
