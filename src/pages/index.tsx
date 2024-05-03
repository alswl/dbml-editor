import registerER from '@/nodes/er';
import { Graph } from '@antv/x6';
import { Parser } from '@dbml/core';
import { Col, Row, theme } from 'antd';
import { debounce } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

import parseDatabaseToER from '@/parser/parser';
import './index.less';

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
  const [models, setModels] = useState([]);
  const containerRef = useRef(null);
  const parser = new Parser();

  useEffect(() => {
    registerER();
    if (containerRef.current) {
      const graph = new Graph({
        container: containerRef.current,
        background: {
          color: '#F2F7FA',
        },
      });

      graph.fromJSON(models);
      graph.centerContent();
    }
  }, [models]);

  // editorDidMount
  const editorDidMount = (editor: any, monaco: any) => {
    const database = parser.parse(code, 'dbmlv2');
    let models = parseDatabaseToER(database);
    setModels(models);
  };

  // onchange
  const onChange = (newValue: any, e: any) => {
    const database = parser.parse(newValue, 'dbmlv2');
    console.log(database);
    let models = parseDatabaseToER(database);
    console.log(models);
    setModels(models);
  };
  const debouncedOnChange = debounce(onChange, 500);

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
  );
};
