import { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background
} from "@xyflow/react";
import { initialNodes, nodeTypes } from "./Nodes/nodes";
import { initialEdges } from "./Edges/edges";
import "@xyflow/react/dist/style.css";
import { GetAllCategories, GetMealsByCategory } from "./Api/api";
import { RiShareForwardLine } from "react-icons/ri";

// const initialNodes = [
//   { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
//   { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
// ];
// const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const fetchCategories = async () => {
      const response = await GetAllCategories()
      const categories = response?.slice(0, 5); // Get top-5 categories

      const categoryNodes = categories.map((category, index) => ({
        id: `category-${index+1}`,
        type: "item",
        data: { label: category?.strCategory, image: category?.strCategoryThumb },
        position: { x: 300, y: 50 + index * 100 },
      }));
      
      const categoryEdges = categories.map((_, index) => ({
        id: `edge-${index}`,
        source: '1',
        target: `category-${index+1}`
      }));

      setNodes((prev) => [...prev, ...categoryNodes]);
      setEdges((prev) => [...prev, ...categoryEdges]);
  }

  const fetchMeals = async (category) => {
      const response = await GetMealsByCategory(category);
      console.log(response);
      const meals = response.slice(0, 5); // Get top-5 meals

      const mealNodes = meals?.map((meal, index) => {
        const nodeId = `meal-${index+1}`;
        return {
          id: nodeId,
          type: 'meal-item',
          data: { label: meal?.strMeal, image: meal?.strMealThumb },
          position: { x: 900, y: 50 + index * 100 },
        };
      });

      const mealEdges = meals.map((_, index) => ({
        id: `meal-edge-${index}`,
        source: "meal-option",
        target: `meal-${index+1}`, 
      }));

      setNodes((prev) => [...prev, ...mealNodes,]);
      setEdges((prev) => [...prev, ...mealEdges]);
    }

  const AddOptionNode = (element) => {
    const optionNode = {
      id: 'meal-option',
      type: "meal-option",
      data: { icon: <RiShareForwardLine color="#a5db83" />, label: "View Meals", category: element.data.label},
      position: { x: 600, y: 300 }
    };
    const newEdge = { id: 'meal-option', source: element.id, target: 'meal-option' };
  
    setNodes((prevNodes) => {
      const existingNode = prevNodes.find(node => node.id === 'meal-option');      
      if (existingNode) {
        return prevNodes.map(node =>
          node.id === 'meal-option' ? optionNode : node
        );
      } else {
        return [...prevNodes, optionNode];
      }
    });
  
    setEdges((prevEdges) => {
      const existingEdge = prevEdges.find(edge => edge.id === 'meal-option');  
      if (existingEdge) {
        return prevEdges.map(edge =>
          edge.id === 'meal-option' ? newEdge : edge
        );
      } else {
        return [...prevEdges, newEdge];
      }
    });
  };  

  const onElementClick = (event, element) => {
    if (element.type === 'explore') {
      fetchCategories()
    } else if (element.type === 'item') {
      AddOptionNode(element);
    } else if (element.type === 'meal-option') {
      fetchMeals(element.data.category)
    } else if (element.type === 'meal-item') {
      console.log(element);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges} 
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode="system"
        onNodeClick={onElementClick}
        // fitView
      >
        <Controls/>
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
