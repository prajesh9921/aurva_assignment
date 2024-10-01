import { Handle, Position } from "@xyflow/react";

const ItemNode = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        borderRadius: 10,
        borderColor: "red",
        borderWidth: 1,
        padding: 10,
        boxSizing: 'border-box',
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        width: 180,
      }}
    >
      <img src={data.image} alt="cover" style={{height: 20, width: 20, objectFit: 'cover'}}/>
      <p style={{margin: 0, padding: 0}}>{data.label}</p>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right}/>
    </div>
  );
};

export default ItemNode;
