import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Network } from 'vis-network/standalone';
import 'vis-network/styles/vis-network.min.css';
import { colors } from '../../constants/colors';
import Edge from './ModelsVis/Edge';
import Node from './ModelsVis/Node';
import { SubjectContext } from '../../context/subject-context';
//import DetailsModal from '../Modals/DetailsModal';
import CardBasic from '../Cards/Basic';
import { useDispatch } from 'react-redux';
import { setSelectedNode } from '../../redux/selectedNodeSlice';

//https://www.npmjs.com/package/vis-network
//https://visjs.github.io/vis-network/examples/
//https://visjs.github.io/vis-network/docs/network/

let data1 = require('../../constants/materias_prerequisitos_corequisitos.json');

const get_nodes_links_annotations = (data) => {
  const nodes = [];
  const edges = [];
  const node1200H = new Node(999, '1200 H', 0);
  //nodes.push(node1200H);

  const populate = (materia, idx) => {
    const nome = materia[0];
    const corequisito = materia[1];
    const prerequisito = materia[2];
    const periodo = materia[3];
    const already_inserted = nodes.find((node) => node.title === nome);
    if (already_inserted) {
      const already_inserted_idx = nodes.findIndex(
        (node) => node.title === nome
      );
      const prereq = nodes.find((node) => node.title === prerequisito);
      const coreq = nodes.find((node) => node.title === corequisito);
      if (prereq) {
        const prereqlink = edges.find(
          (edge) =>
            (edge.from === prereq.id || edge.from === already_inserted.id) &&
            (edge.to === prereq.id || edge.to === already_inserted.id)
        );
        if (!prereqlink) {
          const newlink = new Edge(
            prereq.id,
            already_inserted.id,
            'prerequisito'
          );
          edges.push(newlink);
          if (!nodes[already_inserted_idx].prerequisites.includes(prerequisito))
            nodes[already_inserted_idx].addPrerequisite(prerequisito);
        }
      }
      if (coreq) {
        const coreqlink = edges.find(
          (edge) =>
            (edge.from === coreq.id || edge.from === already_inserted.id) &&
            (edge.to === coreq.id || edge.to === already_inserted.id)
        );
        if (!coreqlink) {
          const newlink = new Edge(
            coreq.id,
            already_inserted.id,
            'corequisito'
          );
          edges.push(newlink);
          nodes[already_inserted_idx].addCorequisite(corequisito);
        }
      }
    } else {
      const newnode = new Node(idx, nome, periodo);
      if (prerequisito === '1200 H') {
        newnode.addPrerequisite('1200 H');
        const newlink = new Edge(node1200H.id, idx, 'prerequisito');
        edges.push(newlink);
      } else if (corequisito !== 'NAO POSSUI') {
        const coreq = nodes.filter((node) => node.title === corequisito);
        if (coreq.length > 0) {
          const newlink = new Edge(coreq[0].id, idx, 'corequisito');
          edges.push(newlink);
          newnode.addCorequisite(corequisito);
        }
      } else if (prerequisito !== 'NAO POSSUI') {
        const prereq = nodes.filter((node) => node.title === prerequisito);
        if (prereq.length > 0) {
          const newlink = new Edge(prereq[0].id, 'prerequisito');
          edges.push(newlink);
          newnode.addPrerequisite(prerequisito);
        }
      }
      nodes.push(newnode);
    }
  };

  data.resultset.map(populate);
  data.resultset.map(populate);

  return { nodes: nodes, edges: edges };
};

const NetworkVis = () => {
  const networkRef = useRef(null);
  const dispatch = useDispatch();

  const ctx = useContext(SubjectContext);
  const { nodes, edges, isLoading } = ctx;

  //const [selectedNode, setSelectedNode] = useState(null);

  const showDetailsHandler = (nodeId) => {
    const selected = nodes[nodes.findIndex((node) => node.id === nodeId)];
    if (!selected) {
      dispatch(setSelectedNode(null));
    } else {
      dispatch(
        setSelectedNode({
          id: selected.id,
          title: selected.title,
          label: selected.label,
          level: selected.level,
          color: selected.color,
          prerequisites: selected.prerequisites,
          corequisites: selected.corequisites,
        })
      );
    }

    //setSelectedNode(selected);
    //onNodeSelect(selected);
  };

  useLayoutEffect(() => {
    const nla = get_nodes_links_annotations(data1);
    ctx.setEdgesArr(nla.edges);
    ctx.setNodesArr(nla.nodes);
  }, []);

  useEffect(() => {
    if (networkRef.current && !isLoading) {
      const options = {
        configure: {
          enabled: false,
          filter:
            'nodes,edges,layout,interaction,manipulation,physics,selection,renderer',
          showButton: true,
        },
        nodes: {
          shape: 'box',
          borderWidth: 0,
          borderWidthSelected: 0,
          color: {
            border: colors.buttons,
            background: colors.buttons,
          },
          chosen: {
            node: (values, id, selected, hovering) => {
              if (selected) {
                values.color = colors.selected_node;
              }
            },
            label: (values, id, selected, hovering) => {
              if (selected) {
                values.size = 25;
              }
            },
          },
          font: {
            face: 'arial',
          },
        },
        edges: {
          endPointOffset: {
            to: 4,
          },
          arrows: {
            to: {
              enabled: true,
              type: 'arrow',
              scaleFactor: 0.5,
            },
          },
          // smooth: https://visjs.github.io/vis-network/examples/network/edgeStyles/smooth.html
          smooth: {
            type: 'diagonalCross',
            roundness: 0.35,
          },
          selectionWidth: 4,
          color: {
            highlight: colors.selected_edge,
          },
        },
        physics: {
          enabled: true,
          hierarchicalRepulsion: {
            centralGravity: 0.4,
          },
        },
        layout: {
          randomSeed: undefined,
          improvedLayout: true,
          clusterThreshold: 150,
          hierarchical: {
            treeSpacing: 1,
            direction: 'UD',
            levelSeparation: 100,
            nodeSpacing: 1,
          },
        },
        interaction: {
          navigationButtons: false,
        },
      }; // Add options for customization if needed

      const network = new Network(
        networkRef.current,
        { nodes: nodes, edges: edges },
        options
      );

      network.on('select', (params) => {
        showDetailsHandler(params.nodes[0]);
      });

      ctx.setNetwork(network);
    }
  }, [nodes, edges, isLoading]);

  if (isLoading) {
    return <CardBasic title='Fluxo'></CardBasic>;
  }

  return (
    <CardBasic title='Fluxo'>
      <div ref={networkRef} style={{ height: '400px' }}></div>
      {/* <DetailsModal hide={!selectedNode} selectedNode={selectedNode} /> */}
    </CardBasic>
  );
};

export default NetworkVis;
