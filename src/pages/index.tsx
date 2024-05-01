import { Graph, Node } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import { Col, Dropdown, Row, theme } from 'antd';
import { useEffect, useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import './index.less';

const CustomComponent = ({ node }: { node: Node }) => {
  const label = node.prop('label');
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: 'copy',
            label: '复制',
          },
          {
            key: 'paste',
            label: '粘贴',
          },
          {
            key: 'delete',
            label: '删除',
          },
        ],
      }}
      trigger={['contextMenu']}
    >
      <div className="custom-react-node">{label}</div>
    </Dropdown>
  );
};

register({
  shape: 'custom-react-node',
  width: 100,
  height: 40,
  component: CustomComponent,
});

const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'custom-react-node',
      x: 40,
      y: 40,
      label: 'hello',
    },
    {
      id: 'node2',
      shape: 'custom-react-node',
      x: 160,
      y: 180,
      label: 'world',
    },
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      target: 'node2',
      label: 'x6',
      attrs: {
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
        },
      },
    },
  ],
};
export default () => {
  // constructor
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const initCode = `Table staff {
  id int [pk]
  name varchar
  age int
  email varchar
}`;
  const [code, setCode] = useState(initCode);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const graph = new Graph({
        container: containerRef.current,
        background: {
          color: '#F2F7FA',
        },
      });

      graph.fromJSON(data);
      graph.centerContent();
    }
  }, []);

  // editorDidMount
  const editorDidMount = (editor: any, monaco: any) => {
    console.log('editorDidMount', editor);
  };

  // onchange
  const onChange = (newValue: any, e: any) => {
    console.log('onChange', newValue, e);
  };

  return (
    <Row>
      <Col span={12}>
        <MonacoEditor
          width="800"
          height="600"
          // dbml not works
          language="dbml"
          theme="vs-dark"
          value={code}
          options={{
            selectOnLineNumbers: true,
          }}
          onChange={onChange}
          editorDidMount={editorDidMount}
        />
      </Col>
      <Col span={12}>
        <div className="react-shape-app">
          <div className="app-content" ref={containerRef} />
        </div>
      </Col>
    </Row>
  );
};
