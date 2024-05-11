import { DagreLayout, GridLayout } from '@antv/layout';
import { Graph, Model } from '@antv/x6';
import { Parser } from '@dbml/core';
import { Col, Row, theme } from 'antd';
import { debounce } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

import parseDatabaseToER from '@/parser/parser';
import { Snapline } from '@antv/x6-plugin-snapline';
import './index.less';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

export default () => {
  // constructor
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const initCode = `Table users {
  id integer
  username varchar
  role varchar
  created_at timestamp

  Note: 'User Table'
}

Table posts {
  id integer [primary key]
  title varchar
  body text [note: 'Content of the post']
  user_id integer
  status post_status
  created_at timestamp
}

Enum post_status {
  draft
  published
  private [note: 'visible via URL only']
}

Ref: posts.user_id > users.id // many-to-one
`;
  const [code, setCode] = useState(initCode);
  const [models, setModels] = useState<Model.FromJSONData>({});
  const containerRef = useRef(null);
  const parser = new Parser();
  new GridLayout({
    type: 'grid',
    width: 600,
    height: 400,
    rows: 6,
    cols: 4,
  });
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

  // editorDidMount
  const editorDidMount = (editor: any, monaco: any) => {
    const database = parser.parse(code, 'dbmlv2');
    let models = parseDatabaseToER(database);
    setModels(layout.layout(models));
  };

  // onchange
  const onChange = (newValue: any, e: any) => {
    const database = parser.parse(newValue, 'dbmlv2');
    console.log(database);
    let models = parseDatabaseToER(database);
    console.log(models);
    setModels(layout.layout(models));
  };
  const debouncedOnChange = debounce(onChange, 500);

  const { name } = useModel('global');

  return (
    <PageContainer ghost header={{ title: '' }}>
      <Row>
        <Col span={12}>
          <MonacoEditor
            // dbml not works
            language="dbml"
            theme="vs-dark"
            value={code}
            options={{
              selectOnLineNumbers: true,
              minimap: {
                enabled: false,
              },
            }}
            onChange={debouncedOnChange}
            editorDidMount={editorDidMount}
          />
        </Col>
        <Col span={12}>
          <div className="react-shape-app">
            <div className="app-content" ref={containerRef} />
          </div>
        </Col>
      </Row>
    </PageContainer>
  );
};
