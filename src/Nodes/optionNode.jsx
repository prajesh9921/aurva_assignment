import { Handle, Position } from "@xyflow/react";

const OptionNode = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        borderRadius: 25,
        borderColor: "red",
        borderWidth: 1,
        padding: 10,
        boxSizing: 'border-box',
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        width: 200,
        height: 30
      }}
    >
      {data.icon}
      <p style={{margin: 0, padding: 0}}>{data.label}</p>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right}/>
    </div>
  );
};

export default OptionNode;
