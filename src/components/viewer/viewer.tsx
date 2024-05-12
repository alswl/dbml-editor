import parseDatabaseToER from '@/parser/parser';
import { DagreLayout } from '@antv/layout';
import { Graph, Model } from '@antv/x6';
import { Snapline } from '@antv/x6-plugin-snapline';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  code: string;
  database: any;
}

// Viewer is a component that renders the ER diagram
const Viewer: React.FC<Props> = (props: Props) => {
  const containerRef = useRef(null);

  const [models, setModels] = useState<Model.FromJSONData>({});

  // new GridLayout({
  //   type: 'grid',
  //   width: 600,
  //   height: 400,
  //   rows: 6,
  //   cols: 4,
  // });

  const dagreLayout = new DagreLayout({
    type: 'dagre',
    rankdir: 'LR',
    align: 'UL',
    ranksep: 80,
    nodesep: 60,
    controlPoints: true,
  });
  const layout = dagreLayout;

  useEffect(() => {
    if (containerRef.current) {
      const graph = new Graph({
        container: containerRef.current,
        connecting: {
          anchor: {
            name: 'midSide',
            args: {
              direction: 'H',
            },
          },
          allowBlank: false,
          allowEdge: false,
          allowNode: false,
        },
        background: {
          color: '#F2F7FA',
        },
        interacting: {
          nodeMovable: true,
          edgeMovable: false,
          edgeLabelMovable: false,
          arrowheadMovable: false,
          vertexMovable: false,
          vertexAddable: false,
          vertexDeletable: false,
        },
        panning: true,
        mousewheel: false,
      });
      graph.use(
        new Snapline({
          enabled: true,
        }),
      );

      graph.fromJSON(models);
      graph.centerContent();
    }
  }, [models]);

  useEffect(() => {
    let m = parseDatabaseToER(props.database);
    setModels(layout.layout(m));
  }, [props.database]);

  return (
    <div className="react-shape-app">
      <div className="app-content" ref={containerRef} />
    </div>
  );
};

export default Viewer;
