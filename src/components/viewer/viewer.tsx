import type { ViewMode } from '@/constants/viewMode';
import { VIEW_MODE } from '@/constants/viewMode';
import parseDatabaseToER from '@/services/er';
import {
  CompressOutlined,
  MinusOutlined,
  PlusOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { DagreLayout } from '@antv/layout';
import { Graph, Model } from '@antv/x6';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Button, Space, Switch, Tooltip } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  database: any;
}

const VIEW_MODE_STORAGE_KEY = 'dbml-editor-er-view-mode';

function loadViewModeFromStorage(): ViewMode {
  if (typeof window === 'undefined') return VIEW_MODE.FULL;
  const stored = window.localStorage.getItem(VIEW_MODE_STORAGE_KEY);
  if (stored === VIEW_MODE.TABLE_ONLY || stored === VIEW_MODE.FULL)
    return stored;
  return VIEW_MODE.FULL;
}

// Viewer is a component that renders the ER diagram
const Viewer: React.FC<Props> = (props: Props) => {
  const containerRef = useRef(null);
  const graphRef = useRef<Graph | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [models, setModels] = useState<Model.FromJSONData>({});
  const [zoom, setZoom] = useState<number>(1);
  const [viewMode, setViewMode] = useState<ViewMode>(loadViewModeFromStorage);

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

  // 缩放控制函数
  const handleZoomIn = useCallback(() => {
    if (graphRef.current) {
      graphRef.current.zoom(0.1);
      setZoom(graphRef.current.zoom());
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (graphRef.current) {
      graphRef.current.zoom(-0.1);
      setZoom(graphRef.current.zoom());
    }
  }, []);

  const handleZoomToFit = useCallback(() => {
    if (graphRef.current) {
      graphRef.current.zoomToFit({
        padding: 40,
        maxScale: 2,
        minScale: 0.2,
        preserveAspectRatio: true,
      });
      graphRef.current.centerContent();
      setZoom(graphRef.current.zoom());
    }
  }, []);

  const handleZoomReset = useCallback(() => {
    if (graphRef.current) {
      graphRef.current.zoomTo(1);
      graphRef.current.centerContent();
      setZoom(1);
    }
  }, []);

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
        mousewheel: {
          enabled: true,
          modifiers: ['ctrl', 'meta'],
          minScale: 0.2,
          maxScale: 4,
        },
      });
      graph.use(
        new Snapline({
          enabled: true,
        }),
      );

      // 监听缩放变化
      graph.on('scale', ({ sx }) => {
        setZoom(sx);
      });

      graphRef.current = graph;

      graph.fromJSON(models);
      // 使用 setTimeout 确保渲染完成后再居中
      timeoutRef.current = setTimeout(() => {
        // 确保操作的是当前的 graph 实例
        if (graphRef.current === graph) {
          graph.zoomToFit({
            padding: 40,
            maxScale: 2,
            minScale: 0.2,
            preserveAspectRatio: true,
          });
          graph.centerContent();
          setZoom(graph.zoom());
        }
      }, 0);

      // 清理函数
      return () => {
        // 清除待处理的 timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        graph.dispose();
        graphRef.current = null;
      };
    }
  }, [models]);

  useEffect(() => {
    const tableOnly = viewMode === VIEW_MODE.TABLE_ONLY;
    const m = parseDatabaseToER(props.database, { tableOnly });
    setModels(layout.layout(m));
  }, [props.database, viewMode]);

  return (
    <div className="react-shape-app">
      <div className="app-content" ref={containerRef} />
      <div className="zoom-toolbar">
        <Space direction="vertical" size="small">
          <Tooltip title="仅表名" placement="left">
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Switch
                size="small"
                checked={viewMode === VIEW_MODE.TABLE_ONLY}
                data-testid="er-view-mode-table-only"
                onChange={(checked) => {
                  const next = checked ? VIEW_MODE.TABLE_ONLY : VIEW_MODE.FULL;
                  setViewMode(next);
                  try {
                    window.localStorage.setItem(VIEW_MODE_STORAGE_KEY, next);
                  } catch {
                    // ignore
                  }
                }}
              />
              <span style={{ fontSize: 10, whiteSpace: 'nowrap' }}>仅表名</span>
            </div>
          </Tooltip>
          <Tooltip title="放大 (Ctrl/Cmd + 滚轮向上)" placement="left">
            <Button
              type="default"
              icon={<PlusOutlined />}
              onClick={handleZoomIn}
              size="small"
            />
          </Tooltip>
          <Tooltip title="缩小 (Ctrl/Cmd + 滚轮向下)" placement="left">
            <Button
              type="default"
              icon={<MinusOutlined />}
              onClick={handleZoomOut}
              size="small"
            />
          </Tooltip>
          <Tooltip title="适应屏幕" placement="left">
            <Button
              type="default"
              icon={<CompressOutlined />}
              onClick={handleZoomToFit}
              size="small"
            />
          </Tooltip>
          <Tooltip title="重置视图" placement="left">
            <Button
              type="default"
              icon={<RedoOutlined />}
              onClick={handleZoomReset}
              size="small"
            />
          </Tooltip>
          <div className="zoom-level">{Math.round(zoom * 100)}%</div>
        </Space>
      </div>
    </div>
  );
};

export default Viewer;
