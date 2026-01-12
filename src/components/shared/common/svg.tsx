import React from "react";
import Svg from "react-inlinesvg";

interface SVGIconProps {
  iconName: string;
  width?: number;
  height?: number;
}

const SVGIcon = (props: SVGIconProps) => {
  const { iconName = "", width = 30, height = 30 } = props;
  if (!iconName) return null;
  return (
    <Svg src={iconName} width={width} height={height || width} cacheRequests />
  );
};

export default SVGIcon;
