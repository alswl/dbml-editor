import { CompilerDiagnostic, Parser } from '@dbml/core';
import { Col, Row, message } from 'antd';
import { debounce } from 'lodash-es';
import { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

import { InitCode } from '@/components/editor';
import Viewer from '@/components/viewer/viewer';
import { PageContainer } from '@ant-design/pro-components';
import { CompilerError } from '@dbml/core/types/parse/error';
import './index.less';

export default () => {
  const [messageApi, contextHolder] = message.useMessage();
  const parser = new Parser();

  const [code] = useState(InitCode);
  let initialDatabase = parser.parse(code, 'dbmlv2');
  const [database, setDatabase] = useState(initialDatabase);

  // editorDidMount
  const editorDidMount = () => {
    setDatabase(initialDatabase);
  };

  // onchange
  const onChange = (newValue: any) => {
    try {
      const newDB = parser.parse(newValue, 'dbmlv2');
      console.log(newDB);
      setDatabase(newDB);
    } catch (e) {
      if (e as CompilerError) {
        const diags = (e as CompilerError).diags
          .map((d: CompilerDiagnostic) => {
            return `${d.location.start.line}:${d.location.start.column} ${d.message}`;
          })
          .join('\n');

        messageApi.error(diags);
        console.error(e);
        // TODO hl to editor
      } else if (e instanceof Error) {
        messageApi.error(`${e.message}`);
      } else {
        throw e;
      }
    }
  };
  const debouncedOnChange = debounce(onChange, 500);

  return (
    <>
      {contextHolder}
      <PageContainer ghost header={{ title: '' }}>
        <Row gutter={[8, 8]}>
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
            <div className="editor">
              <MonacoEditor
                width={'100%'}
                language="dbml"
                theme="vs-dark"
                value={code}
                options={{
                  selectOnLineNumbers: true,
                  minimap: {
                    enabled: false,
                  },
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                }}
                onChange={debouncedOnChange}
                editorDidMount={editorDidMount}
                // handle resize TODO
              />
            </div>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
            <Viewer code={code} database={database} />
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};
