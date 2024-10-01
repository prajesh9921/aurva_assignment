import { useCallback, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
} from "@xyflow/react";
import { initialNodes, nodeTypes } from "./Nodes/nodes";
import { initialEdges } from "./Edges/edges";
import "@xyflow/react/dist/style.css";
import {
  GetAllCategories,
  GetMealsByCategory,
  GetIngredientsOrTags,
} from "./Api/api";
import { RiShareForwardLine } from "react-icons/ri";

// const initialNodes = [
//   { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
//   { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
// ];
// const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [data, setData] = useState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const fetchCategories = async () => {
    const response = await GetAllCategories();
    const categories = response?.slice(0, 5); // Get top-5 categories

    const categoryNodes = categories.map((category, index) => ({
      id: `category-${index + 1}`,
      type: "item",
      data: { label: category?.strCategory, image: category?.strCategoryThumb },
      position: { x: 300, y: 50 + index * 100 },
    }));

    const categoryEdges = categories.map((_, index) => ({
      id: `edge-${index}`,
      source: "1",
      target: `category-${index + 1}`,
    }));

    setNodes((prev) => [...prev, ...categoryNodes]);
    setEdges((prev) => [...prev, ...categoryEdges]);
  };

  const fetchMeals = async (category) => {
    const response = await GetMealsByCategory(category);
    console.log(response);
    const meals = response.slice(0, 5); // Get top-5 meals

    const mealNodes = meals?.map((meal, index) => {
      const nodeId = `meal-${index + 1}`;
      return {
        id: nodeId,
        type: "meal-item",
        data: { label: meal?.strMeal, image: meal?.strMealThumb },
        position: { x: 900, y: 50 + index * 150 },
      };
    });

    const mealEdges = meals.map((_, index) => ({
      id: `meal-edge-${index}`,
      source: "meal-option",
      target: `meal-${index + 1}`,
    }));

    setNodes((prev) => [...prev, ...mealNodes]);
    setEdges((prev) => [...prev, ...mealEdges]);
  };

  const AddOptionNode = (element) => {
    const optionNode = {
      id: "meal-option",
      type: "meal-option",
      data: {
        icon: <RiShareForwardLine color="#a5db83" />,
        label: "View Meals",
        category: element.data.label,
      },
      position: { x: 600, y: 300 },
    };
    const newEdge = {
      id: "meal-option",
      source: element.id,
      target: "meal-option",
    };

    setNodes((prevNodes) => {
      const existingNode = prevNodes.find((node) => node.id === "meal-option");
      if (existingNode) {
        return prevNodes.map((node) =>
          node.id === "meal-option" ? optionNode : node
        );
      } else {
        return [...prevNodes, optionNode];
      }
    });

    setEdges((prevEdges) => {
      const existingEdge = prevEdges.find((edge) => edge.id === "meal-option");
      if (existingEdge) {
        return prevEdges.map((edge) =>
          edge.id === "meal-option" ? newEdge : edge
        );
      } else {
        return [...prevEdges, newEdge];
      }
    });
  };

  const AddThreeOptionNode = (element) => {
    const optionNode = [
      {
        id: "ingredient-option",
        type: "meal-option-3",
        data: {
          icon: <RiShareForwardLine color="#a5db83" />,
          label: "View Ingredients",
          category: element.data.label,
        },
        position: { x: 1300, y: 300 },
      },
      {
        id: "tag-option",
        type: "meal-option-3",
        data: {
          icon: <RiShareForwardLine color="#a5db83" />,
          label: "View Tags",
          category: element.data.label,
        },
        position: { x: 1300, y: 400 },
      },
      {
        id: "detail-option",
        type: "meal-option-3",
        data: {
          icon: <RiShareForwardLine color="#a5db83" />,
          label: "View Details",
          category: element.data.label,
        },
        position: { x: 1300, y: 500 },
      },
    ];

    const newEdges = [
      {
        id: "meal-option-3-1",
        source: element.id,
        target: "ingredient-option",
      },
      { id: "meal-option-3-2", source: element.id, target: "tag-option" },
      { id: "meal-option-3-3", source: element.id, target: "detail-option" },
    ];

    // Update nodes
    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes];
      optionNode.forEach((newNode) => {
        const existingNodeIndex = updatedNodes.findIndex(
          (node) => node.id === newNode.id
        );
        if (existingNodeIndex > -1) {
          updatedNodes[existingNodeIndex] = newNode;
        } else {
          updatedNodes.push(newNode);
        }
      });
      return updatedNodes;
    });

    setEdges((prevEdges) => {
      const updatedEdges = [...prevEdges];
      newEdges.forEach((newEdge) => {
        const existingEdgeIndex = updatedEdges.findIndex(
          (edge) => edge.id === newEdge.id
        );
        if (existingEdgeIndex > -1) {
          updatedEdges[existingEdgeIndex] = newEdge;
        } else {
          updatedEdges.push(newEdge);
        }
      });
      return updatedEdges;
    });
  };

  // const fetchIngredientOrTags = async (value, id) => {
  //   const response = await GetIngredientsOrTags(value);
  //   const filterresponse = response.filter((item) => item.strMeal === value);

  //   console.log(filterresponse);

  //   if (id === "ingredient-option") {
  //     let ingredientsarr = [];
  //     for (let i = 1; i <= 20; i++) {
  //       const ingredient = filterresponse[0][`strIngredient${i}`];
  //       if (ingredient) {
  //         ingredientsarr.push(ingredient);
  //       }
  //     }
  //     setData(ingredientsarr);
  //   } else if (id === "tag-option") {
  //     const tags = filterresponse[0]?.strTags ? filterresponse[0]?.strTags.split(",") : [];
  //     setData(tags);
  //   } else if (id === "detail-option") {
  //     console.log("details");
  //     console.log(data);
  //   }

  //   const newNodes = data?.map((item, index) => {
  //     const nodeId = `last-${index + 1}`;
  //     return {
  //       id: nodeId,
  //       type: "end-detail",
  //       data: { label: item, image: "https://img.icons8.com/fluency/48/circled.png" },
  //       position: { x: 1800, y: 50 + index * 100 },
  //     };
  //   });

  //   const newEdges = data.map((_, index) => ({
  //     id: `end-edge-${index}`,
  //     source: id,
  //     target: `last-${index + 1}`,
  //   }));

  //   setNodes((prev) => [...prev, ...newNodes]);
  //   setEdges((prev) => [...prev, ...newEdges]);
  // };

  const fetchIngredientOrTags = async (value, id) => {
    const response = await GetIngredientsOrTags(value);
    const filterresponse = response.filter((item) => item.strMeal === value);

    console.log(filterresponse);

    if (id === "ingredient-option") {
      let ingredientsarr = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = filterresponse[0][`strIngredient${i}`];
        if (ingredient) {
          ingredientsarr.push(ingredient);
        }
      }
      setData(ingredientsarr);
    } else if (id === "tag-option") {
      const tags = filterresponse[0]?.strTags
        ? filterresponse[0]?.strTags.split(",")
        : [];
      setData(tags);
    } else if (id === "detail-option") {
      console.log("details");
      console.log(data);
    }

    // Create new nodes and edges
    const newNodes = data?.map((item, index) => {
      const nodeId = `last-${index + 1}`;
      return {
        id: nodeId,
        type: "end-detail",
        data: {
          label: item,
          image: "https://img.icons8.com/fluency/48/circled.png",
        },
        position: { x: 1800, y: 50 + index * 100 },
      };
    });

    const newEdges = data.map((_, index) => ({
      id: `end-edge-${index}`,
      source: id,
      target: `last-${index + 1}`,
    }));

    // Remove existing nodes and edges with specific prefixes
    const filteredNodes = (prev) =>
      prev.filter((node) => !node.id.startsWith("last-"));
    const filteredEdges = (prev) =>
      prev.filter((edge) => !edge.id.startsWith("end-edge-"));

    // Update nodes and edges
    setNodes(filteredNodes);
    setEdges(filteredEdges);

    // Add new nodes and edges
    setNodes((prev) => [...filteredNodes(prev), ...newNodes]);
    setEdges((prev) => [...filteredEdges(prev), ...newEdges]);
  };

  const onElementClick = (event, element) => {
    if (element.type === "explore") {
      fetchCategories();
    } else if (element.type === "item") {
      AddOptionNode(element);
    } else if (element.type === "meal-option") {
      fetchMeals(element.data.category);
    } else if (element.type === "meal-item") {
      AddThreeOptionNode(element);
    } else if (element.type === "meal-option-3") {
      if (element.id === "detail-option") {
        console.log("detail");
      } else {
        fetchIngredientOrTags(element.data.category, element.id);
      }
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
        fitView
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
