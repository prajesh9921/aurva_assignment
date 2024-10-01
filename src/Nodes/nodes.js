import ExploreNode from "./exploreNode";
import ItemNode from "./itemNode";
import OptionNode from "./optionNode";

export const initialNodes = [
    { id: "1", type: "explore", position: { x: 50, y: 200 }, data: { label: "Explore" } },
];

export const nodeTypes = {
    "explore": ExploreNode,
    "item": ItemNode,
    "meal-option": OptionNode,
    "meal-item": ItemNode
};