import { Handle, Position } from "@xyflow/react";
import { BsGlobe2 } from "react-icons/bs";

const ExploreNode = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        borderRadius: 10,
        borderColor: "red",
        borderWidth: 1,
        padding: 10,
        boxSizing: 'border-box',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          backgroundColor: "#717070",
          borderRadius: 5,
          textAlign: "center",
        }}
      >
        <BsGlobe2 color="#fff" size={15} />
      </div>
      <p style={{margin: 0, padding: 0}}>{data.label}</p>
      <Handle type="source" position={Position.Right}/>
    </div>
  );
};

export default ExploreNode;
