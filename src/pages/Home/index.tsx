import { exporter, importer, Parser } from '@dbml/core';
import { Col, FloatButton, message, Modal, Row, Select, Space } from 'antd';
import { debounce } from 'lodash-es';
import { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

import { InitCode } from '@/components/editor';
import Viewer from '@/components/viewer/viewer';
import ErrorFmt, { ExportFormat, ImportFormat } from '@/services/dbml';
import { ExportOutlined, ImportOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { CompilerError } from '@dbml/core/types/parse/error';
import TextArea from 'antd/es/input/TextArea';
import './index.less';

const defaultBuildDelay = 2000;

export default () => {
  const [messageApi, contextHolder] = message.useMessage();
  const parser = new Parser();
  const initialDatabase = parser.parse(InitCode, 'dbmlv2');

  const [code, setCode] = useState(InitCode);
  const [database, setDatabase] = useState(initialDatabase);

  const [importText, setImportText] = useState('');
  const [importFormat, setImportFormat] = useState<ImportFormat>('mysql');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('mysql');
  const [exportText, setExportText] = useState('');
  const [regen, setRegen] = useState(0);

  // editor init
  const editorDidMount = () => {
    setDatabase(initialDatabase);
  };

  // editor change
  const editorOnChange = (newValue: any) => {
    setCode(newValue);
  };
  const debouncedOnChange = debounce(editorOnChange, defaultBuildDelay);

  // handle import
  const handleImport = () => {
    try {
      const s = importer.import(importText, importFormat);
      setCode(s);
      setIsImportModalOpen(false);
    } catch (e) {
      if (e as CompilerError) {
        messageApi.error(ErrorFmt(e as CompilerError));
      } else if (e instanceof Error) {
        messageApi.error(`${e.message}`);
        return;
      } else {
        throw e;
      }
    }
  };

  // code change regen database
  useEffect(() => {
    try {
      const newDB = parser.parse(code, 'dbmlv2');
      setDatabase(newDB);
    } catch (e) {
      if (e as CompilerError) {
        messageApi.error(ErrorFmt(e as CompilerError));
        // TODO hl to editor
      } else if (e instanceof Error) {
        messageApi.error(`${e.message}`);
      } else {
        throw e;
      }
    }
  }, [code]);

  // export regen
  useEffect(() => {
    if (!isExportModalOpen) return;

    try {
      const s = exporter.export(code, exportFormat);
      setExportText(s);
    } catch (e) {
      if (e as CompilerError) {
        messageApi.error(ErrorFmt(e as CompilerError));
      } else if (e instanceof Error) {
        messageApi.error(`${e.message}`);
      } else {
        throw e;
      }
    }
  }, [exportFormat, regen]);

  return (
    <>
      {contextHolder}
      <FloatButton
        tooltip={<div>Import SQL</div>}
        icon={<ImportOutlined />}
        style={{ left: 24 }}
        onClick={function () {
          setIsImportModalOpen(true);
        }}
      />
      <FloatButton
        tooltip={<div>Export SQL</div>}
        icon={<ExportOutlined />}
        style={{ left: 72 }}
        onClick={function () {
          setRegen(regen + 1);
          setIsExportModalOpen(true);
        }}
      />

      <Modal
        title="Import SQL"
        open={isImportModalOpen}
        onOk={handleImport}
        onCancel={() => {
          setIsImportModalOpen(false);
        }}
      >
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Select
            defaultValue={importFormat}
            style={{ width: 120 }}
            onChange={(v) => setImportFormat(v)}
            options={[
              { value: 'mysql', label: 'MySQL' },
              { value: 'postgres', label: 'Postgres' },
              { value: 'postgresLegacy', label: 'Postgres Legacy' },
              { value: 'dbml', label: 'DBML' },
              { value: 'mssql', label: 'MSSQL' },
              { value: 'json', label: 'JSON' },
            ]}
          />
          <TextArea
            rows={24}
            placeholder="Import your schema"
            onChange={(e) => setImportText(e.target.value)}
          />
        </Space>
      </Modal>

      <Modal
        title="Export SQL"
        open={isExportModalOpen}
        onOk={() => {
          setIsExportModalOpen(false);
        }}
        onCancel={() => {
          setIsExportModalOpen(false);
        }}
      >
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Select
            defaultValue={exportFormat}
            style={{ width: 120 }}
            onChange={(v) => setExportFormat(v)}
            options={[
              { value: 'mysql', label: 'MySQL' },
              { value: 'postgres', label: 'Postgres' },
              { value: 'dbml', label: 'DBML' },
              { value: 'mssql', label: 'MSSQL' },
              { value: 'oracle', label: 'Oracle' },
              { value: 'json', label: 'JSON' },
            ]}
          />
          <TextArea rows={24} value={exportText} readOnly />
        </Space>
      </Modal>

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
              />
            </div>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
            <Viewer database={database} />
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};
