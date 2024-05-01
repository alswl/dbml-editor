import { Col, Row, theme } from 'antd';
import MonacoEditor from 'react-monaco-editor';

export default () => {
  // constructor
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const code = `Table staff {
  id int [pk]
  name varchar
  age int
  email varchar
}`;

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
      <Col span={12}></Col>
    </Row>
  );
};
